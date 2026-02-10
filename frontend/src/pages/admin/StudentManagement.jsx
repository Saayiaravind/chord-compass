import { useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { useApiQuery } from '../../hooks/useApiQuery';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../../services/studentService';

export default function StudentManagement() {
  const { data: students, loading, refetch } = useApiQuery(getStudents);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [saving, setSaving] = useState(false);

  const filtered = (students || []).filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', email: '', phone: '' });
    setModalOpen(true);
  };

  const openEdit = (student) => {
    setEditing(student);
    setForm({ name: student.name, email: student.email, phone: student.phone || '' });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateStudent(editing.id, form);
        toast.success('Student updated');
      } else {
        await createStudent(form);
        toast.success('Student created');
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
      await deleteStudent(deleting.id);
      toast.success('Student deleted');
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
        title="Students"
        description="Manage your students"
        action={<Button onClick={openCreate}><Plus size={18} /> Add Student</Button>}
      />

      <div className="mb-6 relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No students found"
          description={search ? 'Try a different search term' : 'Add your first student to get started'}
          actionLabel={!search ? 'Add Student' : undefined}
          onAction={!search ? openCreate : undefined}
        />
      ) : (
        <Table
          columns={['Name', 'Email', 'Phone', 'Actions']}
          data={filtered}
          renderRow={(s) => (
            <>
              <td className="px-4 py-3 text-sm font-medium text-neutral-900">{s.name}</td>
              <td className="px-4 py-3 text-sm text-neutral-600">{s.email}</td>
              <td className="px-4 py-3 text-sm text-neutral-600">{s.phone || '—'}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(s)}
                    aria-label="Edit student"
                    className="p-2 rounded-lg hover:bg-primary-50 text-neutral-400 hover:text-primary-600 transition-colors bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => { setDeleting(s); setDeleteModalOpen(true); }}
                    aria-label="Delete student"
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
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Student' : 'Add Student'}>
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>{editing ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Student" size="sm">
        <p className="text-neutral-600 mb-6">
          Are you sure you want to delete <strong>{deleting?.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
