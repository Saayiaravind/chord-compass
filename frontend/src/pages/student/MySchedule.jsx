import { Calendar, Video, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { useApiQuery } from '../../hooks/useApiQuery';
import { getSchedules } from '../../services/scheduleService';

export default function MySchedule() {
  const { data: schedules, loading } = useApiQuery(getSchedules);
  const [expandedId, setExpandedId] = useState(null);

  if (loading) return <LoadingSpinner />;

  const upcoming = (schedules || [])
    .filter(s => s.status === 'SCHEDULED' || s.status === 'NOTES_PENDING')
    .sort((a, b) => a.scheduledDate?.localeCompare(b.scheduledDate));

  const past = (schedules || [])
    .filter(s => s.status === 'COMPLETED' || s.status === 'CANCELLED' || s.status === 'NO_SHOW')
    .sort((a, b) => b.scheduledDate?.localeCompare(a.scheduledDate));

  return (
    <div>
      <PageHeader title="My Schedule" description="Your upcoming and past classes" />

      {/* Upcoming */}
      <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-4">Upcoming</h2>
      {upcoming.length === 0 ? (
        <EmptyState icon={Calendar} title="No upcoming classes" description="Your scheduled classes will appear here" />
      ) : (
        <div className="space-y-3 mb-10">
          {upcoming.map(s => (
            <Card key={s.id} className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-heading font-semibold text-neutral-900">{s.courseTitle || 'Lesson'}</h3>
                    <Badge variant={s.status}>{s.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {s.scheduledDate}</span>
                    <span>{s.scheduledTime}</span>
                    <span>{s.durationMinutes} min</span>
                  </div>
                </div>
                {s.meetLink && (
                  <a href={s.meetLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl font-heading font-semibold text-sm hover:bg-primary-600 transition-colors no-underline">
                    <Video size={16} /> Join
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Past */}
      <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-4">Past Classes</h2>
      {past.length === 0 ? (
        <EmptyState icon={Calendar} title="No past classes" description="Your completed classes will appear here" />
      ) : (
        <div className="space-y-3">
          {past.map(s => (
            <Card key={s.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-heading font-medium text-neutral-900">{s.courseTitle || 'Lesson'}</h3>
                    <Badge variant={s.status}>{s.status?.replace(/_/g, ' ')}</Badge>
                  </div>
                  <p className="text-sm text-neutral-500">{s.scheduledDate} at {s.scheduledTime}</p>
                </div>
                {(s.classNotes || s.practiceNotes) && (
                  <button
                    onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                    className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {expandedId === s.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                )}
              </div>
              {expandedId === s.id && (
                <div className="mt-4 pt-4 border-t border-neutral-100 space-y-3">
                  {s.classNotes && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-1">Class Notes</p>
                      <p className="text-sm text-neutral-700 whitespace-pre-line">{s.classNotes}</p>
                    </div>
                  )}
                  {s.practiceNotes && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary-500 mb-1">Practice Notes</p>
                      <p className="text-sm text-neutral-700 whitespace-pre-line">{s.practiceNotes}</p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
