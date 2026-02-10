import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { useApiQuery } from '../../hooks/useApiQuery';
import { getSchedules } from '../../services/scheduleService';

export default function PracticeNotes() {
  const { data: schedules, loading } = useApiQuery(getSchedules);
  const [expandedId, setExpandedId] = useState(null);

  if (loading) return <LoadingSpinner />;

  const withNotes = (schedules || [])
    .filter(s => s.status === 'COMPLETED' && s.practiceNotes)
    .sort((a, b) => b.scheduledDate?.localeCompare(a.scheduledDate));

  return (
    <div>
      <PageHeader title="Practice Notes" description="Your homework and practice instructions from each class" />

      {withNotes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No practice notes yet"
          description="After each completed lesson, your teacher's practice notes will appear here"
        />
      ) : (
        <div className="space-y-4 max-w-3xl">
          {withNotes.map(s => (
            <Card key={s.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-heading font-semibold text-neutral-900">{s.courseTitle || 'Lesson'}</h3>
                  <p className="text-sm text-neutral-400">{s.scheduledDate}</p>
                </div>
                {s.classNotes && (
                  <button
                    onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                    className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-600 transition-colors bg-transparent border-none cursor-pointer"
                  >
                    Class notes {expandedId === s.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                )}
              </div>
              <div className="bg-primary-50 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 mb-2">Practice</p>
                <p className="text-sm text-neutral-800 whitespace-pre-line">{s.practiceNotes}</p>
              </div>
              {expandedId === s.id && s.classNotes && (
                <div className="mt-3 bg-neutral-50 rounded-xl p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-2">What we covered</p>
                  <p className="text-sm text-neutral-700 whitespace-pre-line">{s.classNotes}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
