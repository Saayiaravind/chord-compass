import { useState, useEffect } from 'react';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch students from backend when component loads
    const fetchStudents = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJhZG1pbkBjaG9yZGNvbXBhc3MuY29tIiwiaWF0IjoxNzY3ODYwOTQ0LCJleHAiOjE3Njc5NDczNDR9.ovg8g86nBNFhZayEQL318nTmmUD9b4SzCde8mqw589c'; // We'll get a real token later
        const response = await axios.get('http://localhost:8081/students', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []); // Empty array means run once when component mounts

  if (loading) return <div>Loading students...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Student List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;