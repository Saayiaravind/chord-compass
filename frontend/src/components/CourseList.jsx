import { useState, useEffect } from 'react';
import axios from 'axios';
function CourseList({ token }) {
const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
useEffect(() => {
if (!token) {
setLoading(false);
return;
}
const fetchCourses = async () => {
try {
console.log('Fetching courses with token:', token);
const response = await axios.get('http://localhost:8082/courses', {
headers: {
'Authorization': `Bearer ${token}`
}
});
console.log('Courses fetched successfully:', response.data);
setCourses(response.data);
setLoading(false);
} catch (err) {
console.error('Error fetching courses:', err.response || err);
setError(err.response?.data?.message || err.message);
setLoading(false);
}
};
fetchCourses();
}, [token]);
if (loading) return 
<p>Loading courses...</p>
;
if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
if (!token) return 
<p>Please login to view courses.</p>
;
return (
<div>
   <h2>Course List</h2>
   <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
   <thead>
      <tr>
         <th>Course Title</th>
         <th>Description</th>
         <th>Session Duration</th>
      </tr>
   </thead>
   <tbody>
      {courses.map(course => (
      <tr key={course.id}>
         <td>{course.title}</td>
         <td>{course.description}</td>
         <td>{course.sessionDurationMinutes} minutes</td>
      </tr>
      ))}
   </tbody>
   </table>
   {courses.length === 0 && 
   <p>No courses available.</p>
   }
</div>
);
}
export default CourseList;