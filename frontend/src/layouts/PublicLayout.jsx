import { Outlet, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/pictures/Chord Compass - Logo (Light mode).png';
import { useState } from 'react';
import Button from '../components/ui/Button';

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-md border-b border-neutral-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <nav className="hidden md:flex items-center gap-8">
            <a href="#courses" className="text-neutral-600 hover:text-primary-600 font-medium transition-colors no-underline">
              Courses
            </a>
            <a href="#about" className="text-neutral-600 hover:text-primary-600 font-medium transition-colors no-underline">
              About
            </a>
            <a href="#contact" className="text-neutral-600 hover:text-primary-600 font-medium transition-colors no-underline">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:block">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/register" className="hidden sm:block">
              <Button size="sm">Get Started</Button>
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors bg-transparent border-none cursor-pointer"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={22} className="text-neutral-700" /> : <Menu size={22} className="text-neutral-700" />}
            </button>
            <Link to="/" className="no-underline">
              <img src={logo} alt="Chord Compass" className="h-12" />
            </Link>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-neutral-100 bg-white animate-slide-down">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
              <a href="#courses" onClick={() => setMenuOpen(false)}
                className="text-neutral-600 hover:text-primary-600 font-medium transition-colors no-underline py-2">
                Courses
              </a>
              <a href="#about" onClick={() => setMenuOpen(false)}
                className="text-neutral-600 hover:text-primary-600 font-medium transition-colors no-underline py-2">
                About
              </a>
              <a href="#contact" onClick={() => setMenuOpen(false)}
                className="text-neutral-600 hover:text-primary-600 font-medium transition-colors no-underline py-2">
                Contact
              </a>
              <div className="flex gap-3 pt-2 border-t border-neutral-100">
                <Link to="/login" className="flex-1">
                  <Button variant="ghost" size="sm" className="w-full">Login</Button>
                </Link>
                <Link to="/register" className="flex-1">
                  <Button size="sm" className="w-full">Get Started</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-neutral-900 text-neutral-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <img src={logo} alt="Chord Compass" className="h-7" />
            <p className="text-sm">&copy; {new Date().getFullYear()} Chord Compass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
