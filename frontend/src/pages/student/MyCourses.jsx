import { Clock, BookOpen } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { useApiQuery } from '../../hooks/useApiQuery';
import { getCourses } from '../../services/courseService';

export default function MyCourses() {
  const { data: courses, loading } = useApiQuery(getCourses);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="My Courses" description="Courses available to you" />

      {(!courses || courses.length === 0) ? (
        <EmptyState
          icon={BookOpen}
          title="No courses available"
          description="Courses you're enrolled in will appear here"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <Card key={course.id} hover>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mb-3">
                  <BookOpen size={22} className="text-primary-600" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-2">{course.title}</h3>
                <p className="text-neutral-500 text-sm line-clamp-3">{course.description || 'No description available'}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600 pt-4 border-t border-neutral-100">
                <Clock size={14} className="text-primary-500" />
                <span>{course.sessionDurationMinutes || 45} min per session</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
