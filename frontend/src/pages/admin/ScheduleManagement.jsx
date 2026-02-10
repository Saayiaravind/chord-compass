import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { Select, TextArea } from '../../components/ui/Input';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { useApiQuery } from '../../hooks/useApiQuery';
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from '../../services/scheduleService';
import { getEnrollments } from '../../services/enrollmentService';

export default function ScheduleManagement() {
  const { data: schedules, loading, refetch } = useApiQuery(getSchedules);
  const { data: enrollments } = useApiQuery(getEnrollments);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [form, setForm] = useState({
    enrollment: { id: '' },
    scheduledDate: '',
    scheduledTime: '',
    durationMinutes: 45,
    meetLink: '',
    status: 'SCHEDULED',
    attended: false,
    classNotes: '',
    practiceNotes: '',
  });

  const filtered = (schedules || []).filter(s =>
    statusFilter === 'ALL' || s.status === statusFilter
  );

  const openCreate = () => {
    setEditing(null);
    setForm({
      enrollment: { id: '' },
      scheduledDate: '',
      scheduledTime: '',
      durationMinutes: 45,
      meetLink: '',
      status: 'SCHEDULED',
      attended: false,
      classNotes: '',
      practiceNotes: '',
    });
    setModalOpen(true);
  };

  const openEdit = (schedule) => {
    setEditing(schedule);
    setForm({
      enrollment: { id: schedule.enrollmentId || '' },
      scheduledDate: schedule.scheduledDate || '',
      scheduledTime: schedule.scheduledTime || '',
      durationMinutes: schedule.durationMinutes || 45,
      meetLink: schedule.meetLink || '',
      status: schedule.status || 'SCHEDULED',
      attended: schedule.attended || false,
      classNotes: schedule.classNotes || '',
      practiceNotes: schedule.practiceNotes || '',
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        enrollment: { id: parseInt(form.enrollment.id) },
        scheduledDate: form.scheduledDate,
        scheduledTime: form.scheduledTime,
        durationMinutes: parseInt(form.durationMinutes),
        meetLink: form.meetLink || null,
        status: form.status,
        attended: form.attended,
        classNotes: form.classNotes || null,
        practiceNotes: form.practiceNotes || null,
      };
      if (editing) {
        await updateSchedule(editing.id, payload);
        toast.success('Schedule updated');
      } else {
        await createSchedule(payload);
        toast.success('Lesson scheduled');
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSchedule(deleting.id);
      toast.success('Schedule deleted');
      setDeleteModalOpen(false);
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        title="Schedule"
        description="Manage class schedules and lessons"
        action={<Button onClick={openCreate}><Plus size={18} /> New Lesson</Button>}
      />

      <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2">
        <span className="text-sm text-neutral-500 shrink-0">Filter:</span>
        {['ALL', 'SCHEDULED', 'NOTES_PENDING', 'COMPLETED', 'CANCELLED', 'NO_SHOW'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border-none shrink-0
              ${statusFilter === s
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
          >
            {s === 'ALL' ? 'All' : s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No lessons found"
          description={statusFilter !== 'ALL' ? 'No lessons with this status' : 'Schedule your first lesson'}
          actionLabel={statusFilter === 'ALL' ? 'New Lesson' : undefined}
          onAction={statusFilter === 'ALL' ? openCreate : undefined}
        />
      ) : (
        <Table
          columns={['Date', 'Time', 'Duration', 'Student', 'Course', 'Status', 'Meet Link', 'Actions']}
          data={filtered}
          renderRow={(s) => (
            <>
              <td className="px-4 py-3 text-sm">{s.scheduledDate}</td>
              <td className="px-4 py-3 text-sm">{s.scheduledTime}</td>
              <td className="px-4 py-3 text-sm">{s.durationMinutes} min</td>
              <td className="px-4 py-3 text-sm font-medium">{s.studentName || 'N/A'}</td>
              <td className="px-4 py-3 text-sm">{s.courseTitle || 'N/A'}</td>
              <td className="px-4 py-3"><Badge variant={s.status}>{s.status?.replace(/_/g, ' ')}</Badge></td>
              <td className="px-4 py-3 text-sm">
                {s.meetLink ? (
                  <a href={s.meetLink} target="_blank" rel="noopener noreferrer"
                     className="text-primary-600 hover:text-primary-700 font-medium no-underline">
                    Join
                  </a>
                ) : '—'}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(s)}
                    aria-label="Edit lesson"
                    className="p-2 rounded-lg hover:bg-primary-50 text-neutral-400 hover:text-primary-600 transition-colors bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => { setDeleting(s); setDeleteModalOpen(true); }}
                    aria-label="Delete lesson"
                    className="p-2 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-error transition-colors bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </>
          )}
        />
      )}

      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Lesson' : 'Schedule Lesson'} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          {!editing && (
            <Select label="Enrollment" value={form.enrollment.id}
              onChange={(e) => setForm({ ...form, enrollment: { id: e.target.value } })} required>
              <option value="">Select enrollment...</option>
              {(enrollments || []).map(en => (
                <option key={en.id} value={en.id}>
                  {en.studentName || 'Student'} — {en.courseTitle || 'Course'}
                </option>
              ))}
            </Select>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Date" type="date" value={form.scheduledDate}
              onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })} required />
            <Input label="Time" type="time" value={form.scheduledTime}
              onChange={(e) => setForm({ ...form, scheduledTime: e.target.value })} required />
            <Input label="Duration (min)" type="number" value={form.durationMinutes}
              onChange={(e) => setForm({ ...form, durationMinutes: parseInt(e.target.value) || 45 })} />
          </div>
          <Input label="Meet Link" type="url" placeholder="https://meet.google.com/..."
            value={form.meetLink} onChange={(e) => setForm({ ...form, meetLink: e.target.value })} />

          {editing && (
            <>
              <Select label="Status" value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="SCHEDULED">Scheduled</option>
                <option value="NOTES_PENDING">Notes Pending</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="NO_SHOW">No Show</option>
              </Select>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="attended" checked={form.attended}
                  onChange={(e) => setForm({ ...form, attended: e.target.checked })}
                  className="w-4 h-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500" />
                <label htmlFor="attended" className="text-sm font-medium text-neutral-700">Student Attended</label>
              </div>
              <TextArea label="Class Notes" placeholder="What was covered in class..."
                value={form.classNotes} onChange={(e) => setForm({ ...form, classNotes: e.target.value })} />
              <TextArea label="Practice Notes" placeholder="Homework and practice instructions..."
                value={form.practiceNotes} onChange={(e) => setForm({ ...form, practiceNotes: e.target.value })} />
            </>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>{editing ? 'Update' : 'Schedule'}</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Lesson" size="sm">
        <p className="text-neutral-600 mb-6">
          Are you sure you want to delete this lesson on <strong>{deleting?.scheduledDate}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
