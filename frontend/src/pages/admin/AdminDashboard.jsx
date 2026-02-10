import { Users, BookOpen, ClipboardList, Calendar } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useApiQuery } from '../../hooks/useApiQuery';
import { getStudents } from '../../services/studentService';
import { getCourses } from '../../services/courseService';
import { getEnrollments } from '../../services/enrollmentService';
import { getSchedules } from '../../services/scheduleService';

export default function AdminDashboard() {
  const { data: students, loading: l1 } = useApiQuery(getStudents);
  const { data: courses, loading: l2 } = useApiQuery(getCourses);
  const { data: enrollments, loading: l3 } = useApiQuery(getEnrollments);
  const { data: schedules, loading: l4 } = useApiQuery(getSchedules);

  if (l1 || l2 || l3 || l4) return <LoadingSpinner />;

  const activeEnrollments = enrollments?.filter(e => e.isActive) || [];
  const upcomingSchedules = (schedules || [])
    .filter(s => s.status === 'SCHEDULED')
    .sort((a, b) => a.scheduledDate?.localeCompare(b.scheduledDate))
    .slice(0, 5);

  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of your music academy" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          label="Total Students"
          value={students?.length || 0}
          gradient="from-primary-600 to-primary-800"
        />
        <StatCard
          icon={ClipboardList}
          label="Active Enrollments"
          value={activeEnrollments.length}
          gradient="from-secondary-500 to-secondary-700"
        />
        <StatCard
          icon={Calendar}
          label="Upcoming Classes"
          value={upcomingSchedules.length}
          gradient="from-accent-500 to-accent-700"
        />
        <StatCard
          icon={BookOpen}
          label="Total Courses"
          value={courses?.length || 0}
          gradient="from-green-500 to-emerald-700"
        />
      </div>

      {upcomingSchedules.length > 0 && (
        <div className="mb-8">
          <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-4">Upcoming Classes</h2>
          <Table
            columns={['Date', 'Time', 'Student', 'Course', 'Status', 'Meet Link']}
            data={upcomingSchedules}
            renderRow={(s) => (
              <>
                <td className="px-4 py-3 text-sm">{s.scheduledDate}</td>
                <td className="px-4 py-3 text-sm">{s.scheduledTime}</td>
                <td className="px-4 py-3 text-sm font-medium">{s.studentName || 'N/A'}</td>
                <td className="px-4 py-3 text-sm">{s.courseTitle || 'N/A'}</td>
                <td className="px-4 py-3"><Badge variant={s.status}>{s.status}</Badge></td>
                <td className="px-4 py-3 text-sm">
                  {s.meetLink ? (
                    <a href={s.meetLink} target="_blank" rel="noopener noreferrer"
                       className="text-primary-600 hover:text-primary-700 font-medium no-underline">
                      Join
                    </a>
                  ) : '—'}
                </td>
              </>
            )}
          />
        </div>
      )}

      {enrollments?.length > 0 && (
        <div>
          <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-4">Recent Enrollments</h2>
          <Table
            columns={['Student', 'Course', 'Plan', 'Price', 'Status']}
            data={(enrollments || []).slice(-5).reverse()}
            renderRow={(e) => (
              <>
                <td className="px-4 py-3 text-sm font-medium">{e.studentName || 'N/A'}</td>
                <td className="px-4 py-3 text-sm">{e.courseTitle || 'N/A'}</td>
                <td className="px-4 py-3"><Badge variant={e.paymentPlan}>{e.paymentPlan?.replace('_', ' ')}</Badge></td>
                <td className="px-4 py-3 text-sm">${e.priceAmount}</td>
                <td className="px-4 py-3">
                  <Badge variant={e.isActive ? 'active' : 'inactive'}>
                    {e.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
              </>
            )}
          />
        </div>
      )}
    </div>
  );
}
