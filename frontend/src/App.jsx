import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import StudentLayout from './layouts/StudentLayout';

import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import StudentManagement from './pages/admin/StudentManagement';
import CourseManagement from './pages/admin/CourseManagement';
import EnrollmentManagement from './pages/admin/EnrollmentManagement';
import ScheduleManagement from './pages/admin/ScheduleManagement';
import VideoManagement from './pages/admin/VideoManagement';

import StudentDashboard from './pages/student/StudentDashboard';
import MySchedule from './pages/student/MySchedule';
import MyCourses from './pages/student/MyCourses';
import PracticeNotes from './pages/student/PracticeNotes';
import MyVideos from './pages/student/MyVideos';

import ProtectedRoute from './components/common/ProtectedRoute';
import RoleRouter from './components/common/RoleRouter';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>

          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Post-login redirect based on role */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <RoleRouter
                admin="/admin/dashboard"
                student="/student/dashboard"
                instructor="/admin/dashboard"
              />
            </ProtectedRoute>
          } />

          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'INSTRUCTOR']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<StudentManagement />} />
            <Route path="courses" element={<CourseManagement />} />
            <Route path="enrollments" element={<EnrollmentManagement />} />
            <Route path="schedule" element={<ScheduleManagement />} />
            <Route path="videos" element={<VideoManagement />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Student routes */}
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="schedule" element={<MySchedule />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="practice-notes" element={<PracticeNotes />} />
            <Route path="videos" element={<MyVideos />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Error pages */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
