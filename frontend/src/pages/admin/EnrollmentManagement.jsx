import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { Select } from '../../components/ui/Input';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { useApiQuery } from '../../hooks/useApiQuery';
import { getEnrollments, createEnrollment, updateEnrollment, deleteEnrollment } from '../../services/enrollmentService';
import { getStudents } from '../../services/studentService';
import { getCourses } from '../../services/courseService';

export default function EnrollmentManagement() {
  const { data: enrollments, loading, refetch } = useApiQuery(getEnrollments);
  const { data: students } = useApiQuery(getStudents);
  const { data: courses } = useApiQuery(getCourses);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    student: { id: '' },
    course: { id: '' },
    paymentPlan: 'FIXED_MONTHLY',
    priceAmount: '',
    sessionsRemaining: '',
    isActive: true,
  });

  const openCreate = () => {
    setEditing(null);
    setForm({
      student: { id: '' },
      course: { id: '' },
      paymentPlan: 'FIXED_MONTHLY',
      priceAmount: '',
      sessionsRemaining: '',
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEdit = (enrollment) => {
    setEditing(enrollment);
    setForm({
      student: { id: enrollment.studentId || '' },
      course: { id: enrollment.courseId || '' },
      paymentPlan: enrollment.paymentPlan,
      priceAmount: enrollment.priceAmount || '',
      sessionsRemaining: enrollment.sessionsRemaining || '',
      isActive: enrollment.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        student: { id: parseInt(form.student.id) },
        course: { id: parseInt(form.course.id) },
        paymentPlan: form.paymentPlan,
        priceAmount: parseFloat(form.priceAmount),
        sessionsRemaining: form.sessionsRemaining ? parseInt(form.sessionsRemaining) : null,
        isActive: form.isActive,
      };
      if (editing) {
        await updateEnrollment(editing.id, payload);
        toast.success('Enrollment updated');
      } else {
        await createEnrollment(payload);
        toast.success('Enrollment created');
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
      await deleteEnrollment(deleting.id);
      toast.success('Enrollment deleted');
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
        title="Enrollments"
        description="Manage student enrollments and pricing"
        action={<Button onClick={openCreate}><Plus size={18} /> New Enrollment</Button>}
      />

      {(!enrollments || enrollments.length === 0) ? (
        <EmptyState
          title="No enrollments yet"
          description="Create an enrollment to link a student to a course"
          actionLabel="New Enrollment"
          onAction={openCreate}
        />
      ) : (
        <Table
          columns={['Student', 'Course', 'Plan', 'Price', 'Sessions Left', 'Status', 'Actions']}
          data={enrollments}
          renderRow={(e) => (
            <>
              <td className="px-4 py-3 text-sm font-medium">{e.studentName || 'N/A'}</td>
              <td className="px-4 py-3 text-sm">{e.courseTitle || 'N/A'}</td>
              <td className="px-4 py-3">
                <Badge variant={e.paymentPlan}>{e.paymentPlan?.replace(/_/g, ' ')}</Badge>
              </td>
              <td className="px-4 py-3 text-sm">${e.priceAmount}</td>
              <td className="px-4 py-3 text-sm">{e.sessionsRemaining ?? '—'}</td>
              <td className="px-4 py-3">
                <Badge variant={e.isActive ? 'active' : 'inactive'}>
                  {e.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(e)}
                    aria-label="Edit enrollment"
                    className="p-2 rounded-lg hover:bg-primary-50 text-neutral-400 hover:text-primary-600 transition-colors bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => { setDeleting(e); setDeleteModalOpen(true); }}
                    aria-label="Delete enrollment"
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
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Enrollment' : 'New Enrollment'} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Student" value={form.student.id} onChange={(e) => setForm({ ...form, student: { id: e.target.value } })} required>
              <option value="">Select student...</option>
              {(students || []).map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
              ))}
            </Select>
            <Select label="Course" value={form.course.id} onChange={(e) => setForm({ ...form, course: { id: e.target.value } })} required>
              <option value="">Select course...</option>
              {(courses || []).map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </Select>
          </div>
          <Select label="Payment Plan" value={form.paymentPlan} onChange={(e) => setForm({ ...form, paymentPlan: e.target.value })}>
            <option value="FIXED_MONTHLY">Fixed Monthly</option>
            <option value="CLUSTER">Cluster (Session Pack)</option>
            <option value="PAY_PER_SESSION">Pay Per Session</option>
          </Select>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Price Amount" type="number" step="0.01" value={form.priceAmount}
              onChange={(e) => setForm({ ...form, priceAmount: e.target.value })} required />
            {form.paymentPlan === 'CLUSTER' && (
              <Input label="Sessions Remaining" type="number" value={form.sessionsRemaining}
                onChange={(e) => setForm({ ...form, sessionsRemaining: e.target.value })} />
            )}
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="isActive" checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="w-4 h-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500" />
            <label htmlFor="isActive" className="text-sm font-medium text-neutral-700">Active</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>{editing ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Enrollment" size="sm">
        <p className="text-neutral-600 mb-6">
          Are you sure you want to delete this enrollment for <strong>{deleting?.studentName}</strong> in <strong>{deleting?.courseTitle}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
