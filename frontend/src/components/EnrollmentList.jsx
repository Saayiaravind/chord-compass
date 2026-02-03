import { useState, useEffect } from 'react';
import axios from 'axios';
function EnrollmentList({ token }) {
const [enrollments, setEnrollments] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
useEffect(() => {
if (!token) {
setLoading(false);
return;
}
const fetchEnrollments = async () => {
try {
console.log('Fetching enrollments with token:', token);
const response = await axios.get('http://localhost:8082/api/enrollments', {
headers: {
'Authorization': `Bearer ${token}`
}
});
console.log('Enrollments fetched successfully:', response.data);
setEnrollments(response.data);
setLoading(false);
} catch (err) {
console.error('Error fetching enrollments:', err.response || err);
setError(err.response?.data?.message || err.message);
setLoading(false);
}
};
fetchEnrollments();
}, [token]);
if (loading) return 
<p>Loading enrollments...</p>
;
if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
if (!token) return 
<p>Please login to view enrollments.</p>
;
return (
<div>
   <h2>Student Enrollments</h2>
   <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
   <thead>
      <tr>
         <th>Student</th>
         <th>Course</th>
         <th>Payment Plan</th>
         <th>Price</th>
         <th>Sessions Remaining</th>
         <th>Status</th>
      </tr>
   </thead>
   <tbody>
      {enrollments.map(enrollment => (
      <tr key={enrollment.id}>
         <td>{enrollment.student?.name || 'N/A'}</td>
         <td>{enrollment.course?.title || 'N/A'}</td>
         <td>{enrollment.paymentPlan}</td>
         <td>${enrollment.priceAmount}</td>
         <td>{enrollment.sessionsRemaining}</td>
         <td>{enrollment.isActive ? 'Active' : 'Inactive'}</td>
      </tr>
      ))}
   </tbody>
   </table>
   {enrollments.length === 0 && 
   <p>No enrollments found.</p>
   }
</div>
);
}
export default EnrollmentList;