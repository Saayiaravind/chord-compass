import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { Select, TextArea } from '../../components/ui/Input';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { useApiQuery } from '../../hooks/useApiQuery';
import { getVideos, createVideo, updateVideo, deleteVideo } from '../../services/videoService';
import { getStudents } from '../../services/studentService';
import { extractYouTubeId, getYouTubeThumbnail } from '../../utils/youtubeUtils';

export default function VideoManagement() {
  const { data: videos, loading, refetch } = useApiQuery(getVideos);
  const { data: students } = useApiQuery(getStudents);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);
  const [studentFilter, setStudentFilter] = useState('ALL');
  const [form, setForm] = useState({
    student: { id: '' },
    title: '',
    youtubeUrl: '',
    description: '',
  });

  const filtered = (videos || []).filter(v =>
    studentFilter === 'ALL' || String(v.studentId) === studentFilter
  );

  const openCreate = () => {
    setEditing(null);
    setForm({
      student: { id: '' },
      title: '',
      youtubeUrl: '',
      description: '',
    });
    setModalOpen(true);
  };

  const openEdit = (video) => {
    setEditing(video);
    setForm({
      student: { id: video.studentId || '' },
      title: video.title || '',
      youtubeUrl: video.youtubeUrl || '',
      description: video.description || '',
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        student: { id: parseInt(form.student.id) },
        title: form.title,
        youtubeUrl: form.youtubeUrl,
        description: form.description || null,
      };
      if (editing) {
        await updateVideo(editing.id, payload);
        toast.success('Video updated');
      } else {
        await createVideo(payload);
        toast.success('Video added');
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
      await deleteVideo(deleting.id);
      toast.success('Video deleted');
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
        title="Videos"
        description="Manage YouTube videos assigned to students"
        action={<Button onClick={openCreate}><Plus size={18} /> Add Video</Button>}
      />

      <div className="mb-6 flex items-center gap-3">
        <span className="text-sm text-neutral-500 shrink-0">Filter by student:</span>
        <select
          value={studentFilter}
          onChange={(e) => setStudentFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg text-sm border-2 border-neutral-200 bg-white text-neutral-700 focus:outline-none focus:border-primary-500 font-body"
        >
          <option value="ALL">All Students</option>
          {(students || []).map(s => (
            <option key={s.id} value={String(s.id)}>{s.name}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No videos found"
          description={studentFilter !== 'ALL' ? 'No videos for this student' : 'Add your first video'}
          actionLabel={studentFilter === 'ALL' ? 'Add Video' : undefined}
          onAction={studentFilter === 'ALL' ? openCreate : undefined}
        />
      ) : (
        <Table
          columns={['Thumbnail', 'Title', 'Student', 'Description', 'Actions']}
          data={filtered}
          renderRow={(v) => {
            const videoId = extractYouTubeId(v.youtubeUrl);
            const thumbnail = getYouTubeThumbnail(videoId, 'mqdefault');
            return (
              <>
                <td className="px-4 py-3">
                  {thumbnail ? (
                    <img src={thumbnail} alt={v.title} className="w-28 h-16 object-cover rounded-lg" />
                  ) : (
                    <div className="w-28 h-16 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400 text-xs">
                      No preview
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-sm font-medium">{v.title}</td>
                <td className="px-4 py-3 text-sm">{v.studentName || 'N/A'}</td>
                <td className="px-4 py-3 text-sm text-neutral-500 max-w-xs truncate">{v.description || '—'}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(v)}
                      aria-label="Edit video"
                      className="p-2 rounded-lg hover:bg-primary-50 text-neutral-400 hover:text-primary-600 transition-colors bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => { setDeleting(v); setDeleteModalOpen(true); }}
                      aria-label="Delete video"
                      className="p-2 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-error transition-colors bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </>
            );
          }}
        />
      )}

      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Video' : 'Add Video'} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          {!editing && (
            <Select label="Student" value={form.student.id}
              onChange={(e) => setForm({ ...form, student: { id: e.target.value } })} required>
              <option value="">Select student...</option>
              {(students || []).map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </Select>
          )}
          <Input label="Title" placeholder="e.g. C Major Scale Practice"
            value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input label="YouTube URL" type="url" placeholder="https://www.youtube.com/watch?v=..."
            value={form.youtubeUrl} onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })} required />
          <TextArea label="Description (optional)" placeholder="What this video covers..."
            value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>{editing ? 'Update' : 'Add Video'}</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Video" size="sm">
        <p className="text-neutral-600 mb-6">
          Are you sure you want to delete <strong>{deleting?.title}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
