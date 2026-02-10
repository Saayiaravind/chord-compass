import { Calendar, Video, BookOpen, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { useApiQuery } from '../../hooks/useApiQuery';
import { getSchedules } from '../../services/scheduleService';
import { getCourses } from '../../services/courseService';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { data: schedules, loading: l1 } = useApiQuery(getSchedules);
  const { data: courses, loading: l2 } = useApiQuery(getCourses);

  if (l1 || l2) return <LoadingSpinner />;

  const upcoming = (schedules || [])
    .filter(s => s.status === 'SCHEDULED')
    .sort((a, b) => a.scheduledDate?.localeCompare(b.scheduledDate));

  const nextClass = upcoming[0];

  const completed = (schedules || []).filter(s => s.status === 'COMPLETED');
  const recentNotes = completed
    .filter(s => s.practiceNotes)
    .slice(-3)
    .reverse();

  return (
    <div>
      <PageHeader title="My Dashboard" description={`Welcome back, ${user?.email}`} />

      {/* Next class card */}
      {nextClass ? (
        <Card className="mb-8 bg-gradient-to-r from-primary-600 to-secondary-600 text-white border-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm font-medium mb-1">Next Class</p>
              <h2 className="font-heading text-2xl font-bold mb-1">{nextClass.courseTitle || 'Upcoming Lesson'}</h2>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1"><Calendar size={14} /> {nextClass.scheduledDate}</span>
                <span>{nextClass.scheduledTime}</span>
                <span>{nextClass.durationMinutes} min</span>
              </div>
            </div>
            {nextClass.meetLink && (
              <a href={nextClass.meetLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary-600 rounded-xl font-heading font-semibold hover:bg-white/90 transition-colors no-underline">
                <Video size={18} /> Join Lesson
              </a>
            )}
          </div>
        </Card>
      ) : (
        <Card className="mb-8">
          <EmptyState
            icon={Calendar}
            title="No upcoming classes"
            description="Your next class will appear here when it's scheduled"
          />
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Courses summary */}
        <div>
          <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-primary-500" /> My Courses
          </h2>
          {courses && courses.length > 0 ? (
            <div className="space-y-3">
              {courses.map(c => (
                <Card key={c.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-semibold text-neutral-900">{c.title}</h3>
                      <p className="text-sm text-neutral-500">{c.sessionDurationMinutes} min sessions</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState icon={BookOpen} title="No courses" description="You haven't been enrolled in any courses yet" />
          )}
        </div>

        {/* Recent practice notes */}
        <div>
          <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">
            <FileText size={20} className="text-secondary-500" /> Recent Practice Notes
          </h2>
          {recentNotes.length > 0 ? (
            <div className="space-y-3">
              {recentNotes.map(s => (
                <Card key={s.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-heading font-medium text-sm text-neutral-900">{s.courseTitle}</span>
                    <span className="text-xs text-neutral-400">{s.scheduledDate}</span>
                  </div>
                  <p className="text-sm text-neutral-600 whitespace-pre-line">{s.practiceNotes}</p>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState icon={FileText} title="No practice notes yet" description="Notes will appear after your classes" />
          )}
        </div>
      </div>
    </div>
  );
}
