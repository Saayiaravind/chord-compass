import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RoleRouter({ admin, student, instructor }) {
  const { user } = useAuth();

  if (user?.role === 'ADMIN') return <Navigate to={admin} replace />;
  if (user?.role === 'INSTRUCTOR') return <Navigate to={instructor || admin} replace />;
  if (user?.role === 'STUDENT') return <Navigate to={student} replace />;
  return <Navigate to="/login" replace />;
}
