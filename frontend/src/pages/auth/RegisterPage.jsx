import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/authService';
import logo from '../../assets/pictures/Chord Compass - Logo (Light mode).png';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Select } from '../../components/ui/Input';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, role);
      toast.success('Account created! Please sign in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-400 via-primary-200 to-secondary-100 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-32 right-20 w-64 h-64 rounded-full bg-primary-500/15 blur-3xl" />
          <div className="absolute bottom-20 left-16 w-48 h-48 rounded-full bg-secondary-300/15 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16">
          <img src={logo} alt="Chord Compass" className="max-w-[600px] w-auto mb-8" />
          <h2 className="font-heading text-4xl font-bold text-neutral-900 leading-tight mb-4">
            Start Your<br />Musical Journey
          </h2>
          <p className="text-neutral-600 text-lg max-w-md">
            Join our community of learners and take your music skills to the next level.
          </p>
        </div>
      </div>

      {/* Right: Register form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-neutral-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <img src={logo} alt="Chord Compass" className="h-9" />
          </div>

          <h1 className="font-heading text-3xl font-bold text-neutral-900 mb-2">Create an account</h1>
          <p className="text-neutral-500 mb-8">Get started with your music journey</p>

          {error && (
            <div className="bg-error/10 border border-error/20 text-error rounded-xl px-4 py-3 mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Select
              label="I am a..."
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Administrator</option>
            </Select>
            <Button type="submit" loading={loading} className="w-full">
              Create Account
            </Button>
          </form>

          <p className="text-center text-neutral-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium no-underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
