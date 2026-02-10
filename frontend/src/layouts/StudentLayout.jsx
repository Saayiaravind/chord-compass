import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  FileText,
  Video,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/pictures/Chord Compass - Logo (Light mode).png';

const navItems = [
  { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/student/schedule', label: 'My Schedule', icon: Calendar },
  { to: '/student/courses', label: 'My Courses', icon: BookOpen },
  { to: '/student/practice-notes', label: 'Practice Notes', icon: FileText },
  { to: '/student/videos', label: 'My Videos', icon: Video },
];

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <img src={logo} alt="Chord Compass" className="h-9" />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Student navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                    flex items-center gap-2 px-4 py-2 rounded-xl
                    font-medium text-sm transition-all duration-200 no-underline
                    ${isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <item.icon size={16} />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <span className="hidden md:block text-sm text-white/80">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl
                  bg-white/10 hover:bg-white/20 text-white text-sm font-medium
                  transition-all duration-200 cursor-pointer border-none"
              >
                <LogOut size={16} />
                Logout
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors bg-transparent border-none text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {menuOpen && (
            <nav className="md:hidden mt-4 pb-2 space-y-1 border-t border-white/10 pt-4 animate-slide-down" aria-label="Student navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    font-medium text-sm transition-all duration-200 no-underline
                    ${isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-white/10 mt-2">
                <p className="px-4 py-1 text-xs text-white/50">{user?.email}</p>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl
                    text-white/70 hover:text-white hover:bg-white/10
                    font-medium text-sm transition-all duration-200
                    bg-transparent border-none cursor-pointer"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 animate-fade-in-up">
        <Outlet />
      </main>
    </div>
  );
}
