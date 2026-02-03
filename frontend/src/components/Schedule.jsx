import { useState, useEffect } from 'react';
import axios from 'axios';

function Schedule({ token }) {  // Add token parameter
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        // Remove this line: const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8082/api/schedules', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setSchedules(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch schedules');
        setLoading(false);
      }
    };

    if (token) {  // Only fetch if token exists
      fetchSchedules();
    }
  }, [token]);  // Add token to dependency array

  if (loading) return <div>Loading schedules...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Lesson Schedule</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Duration</th>
            <th>Student</th>
            <th>Course</th>
            <th>Status</th>
            <th>Meet Link</th>
          </tr>
        </thead>
        <tbody>
          {schedules.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No lessons scheduled</td>
            </tr>
          ) : (
            schedules.map(schedule => (
              <tr key={schedule.id}>
                <td>{schedule.scheduledDate}</td>
                <td>{schedule.scheduledTime}</td>
                <td>{schedule.durationMinutes} min</td>
                <td>{schedule.enrollment?.student?.name || 'N/A'}</td>
                <td>{schedule.enrollment?.course?.title || 'N/A'}</td>
                <td>{schedule.status}</td>
                <td>
                  {schedule.meetLink ? (
                    <a href={schedule.meetLink} target="_blank" rel="noopener noreferrer">
                      Join Lesson
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;
