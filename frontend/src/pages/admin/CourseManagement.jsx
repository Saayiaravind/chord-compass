import { useState } from 'react';
import { Plus, Pencil, Trash2, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { TextArea } from '../../components/ui/Input';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { useApiQuery } from '../../hooks/useApiQuery';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../../services/courseService';

export default function CourseManagement() {
  const { data: courses, loading, refetch } = useApiQuery(getCourses);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', sessionDurationMinutes: 45 });
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', description: '', sessionDurationMinutes: 45 });
    setModalOpen(true);
  };

  const openEdit = (course) => {
    setEditing(course);
    setForm({
      title: course.title,
      description: course.description || '',
      sessionDurationMinutes: course.sessionDurationMinutes || 45,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateCourse(editing.id, form);
        toast.success('Course updated');
      } else {
        await createCourse(form);
        toast.success('Course created');
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
      await deleteCourse(deleting.id);
      toast.success('Course deleted');
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
        title="Courses"
        description="Manage your course offerings"
        action={<Button onClick={openCreate}><Plus size={18} /> Add Course</Button>}
      />

      {(!courses || courses.length === 0) ? (
        <EmptyState
          title="No courses yet"
          description="Create your first course to start enrolling students"
          actionLabel="Add Course"
          onAction={openCreate}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} hover>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-heading font-semibold text-lg text-neutral-900">{course.title}</h3>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(course)}
                    aria-label="Edit course"
                    className="p-2 rounded-lg hover:bg-primary-50 text-neutral-400 hover:text-primary-600 transition-colors bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => { setDeleting(course); setDeleteModalOpen(true); }}
                    aria-label="Delete course"
                    className="p-2 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-error transition-colors bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-neutral-500 text-sm mb-4 line-clamp-2">
                {course.description || 'No description'}
              </p>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Clock size={14} className="text-primary-500" />
                <span>{course.sessionDurationMinutes || 45} min per session</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Course' : 'Add Course'}>
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <TextArea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input label="Session Duration (minutes)" type="number" value={form.sessionDurationMinutes}
            onChange={(e) => setForm({ ...form, sessionDurationMinutes: parseInt(e.target.value) || 45 })} />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>{editing ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Course" size="sm">
        <p className="text-neutral-600 mb-6">
          Are you sure you want to delete <strong>{deleting?.title}</strong>? This will also remove all associated enrollments.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
