import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  Calendar,
  Video,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/pictures/Chord Compass - Logo (Light mode).png';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/students', label: 'Students', icon: Users },
  { to: '/admin/courses', label: 'Courses', icon: BookOpen },
  { to: '/admin/enrollments', label: 'Enrollments', icon: ClipboardList },
  { to: '/admin/schedule', label: 'Schedule', icon: Calendar },
  { to: '/admin/videos', label: 'Videos', icon: Video },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarContent = (
    <>
      <div className="p-6">
        <div>
          <img src={logo} alt="Chord Compass" className="h-10" />
          <p className="text-neutral-400 text-xs mt-1">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1" aria-label="Admin navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl
              font-medium text-sm transition-all duration-200 no-underline
              ${isActive
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }
            `}
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="px-4 py-2 mb-2">
          <p className="text-sm text-white font-medium truncate">{user?.email}</p>
          <p className="text-xs text-neutral-500">{user?.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl
            text-neutral-400 hover:text-white hover:bg-white/5
            font-medium text-sm transition-all duration-200 cursor-pointer
            bg-transparent border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-neutral-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-neutral-900 fixed inset-y-0 left-0">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 animate-fade-in"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative flex flex-col w-64 bg-neutral-900 h-full animate-slide-in-left">
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
              className="absolute top-4 right-4 text-neutral-400 hover:text-white bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg p-1"
            >
              <X size={20} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="bg-white border-b border-neutral-100 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <Menu size={20} className="text-neutral-600" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 lg:p-8 animate-fade-in-up">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
