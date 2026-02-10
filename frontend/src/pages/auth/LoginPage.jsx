import { useState } from 'react';
import AnimatedText from '../../components/ui/AnimatedText';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login as loginApi } from '../../services/authService';
import { ChevronDown, ChevronUp } from 'lucide-react';
import logo from '../../assets/pictures/Chord Compass - Logo (Light mode).png';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const cyclerWords = [
  'chords', 'harmony', 'raagas', 'counterpoint', 'gamakas', 'modulation',
  'taalas', 'voice leading', 'melakarta', 'inversions', 'swara prastaaram',
  'cadences', 'janaka raagas', 'circle of fifths', 'niraval', 'polytonality',
  'arpeggios', 'shruti', 'thattu-mettu', 'solfège', 'janya raagas', 'scales',
  'alapana', 'partimento', 'triads', 'kritis', 'syncopation', 'varnams',
  'microtones', 'sonata form', 'kalpanaswaram', 'intervals', 'gathi',
  'chromaticism', 'swara gnanam', 'polyrhythms', 'graha bhedam', 'tritones',
  'laya', 'modes', 'sangathis', 'dynamics', 'korvai', 'sight reading',
  'staff notation', 'tonicity', 'atonality', 'manodharmam', 'resolution',
  'rhythm', 'amsa swaras', 'vadi-samvadi', 'secondary dominants', 'tillana',
  'aural perception',
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await loginApi(email, password);
      login(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left: Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-400 via-primary-200 to-primary-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary-500/15 blur-3xl" />
          <div className="absolute bottom-32 right-16 w-48 h-48 rounded-full bg-secondary-300/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-primary-300/10 blur-2xl" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center px-16 w-full">
          <img src={logo} alt="Chord Compass" className="max-w-[480px] w-full mb-4" />
          <h2 className="font-heading text-4xl font-bold text-neutral-900 leading-none mb-3 text-left w-full max-w-lg">
            Learn<br />
            <AnimatedText words={cyclerWords} interval={2000} className="bg-gradient-to-r from-[#3A2000] to-[#DAA520] bg-clip-text text-transparent" />
            <br />from first principles
          </h2>
          <p className="text-neutral-600 text-lg max-w-lg text-left">
            Bridge the gap between notation and soul. Master the essential building blocks of harmony and rhythm to build your own musical vocabulary from the ground up.
          </p>
        </div>
      </div>

      {/* Right: Login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-6 bg-neutral-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-6">
            <img src={logo} alt="Chord Compass" className="h-9" />
          </div>

          <h1 className="font-heading text-3xl font-bold text-neutral-900 mb-2">Welcome back</h1>
          <p className="text-neutral-500 mb-6">Sign in to your account to continue</p>

          {error && (
            <div className="bg-error/10 border border-error/20 text-error rounded-xl px-4 py-3 mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" loading={loading} className="w-full">
              Sign In
            </Button>
          </form>

          <p className="text-center text-neutral-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium no-underline">
              Get started
            </Link>
          </p>

          {/* Demo credentials */}
          <div className="mt-6 border-t border-neutral-200 pt-4">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-600 transition-colors bg-transparent border-none cursor-pointer mx-auto"
            >
              Demo credentials
              {showDemo ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {showDemo && (
              <div className="mt-3 space-y-2">
                <button
                  onClick={() => fillDemo('admin@chordcompass.com', 'admin123')}
                  className="w-full text-left px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors text-sm cursor-pointer border-none"
                >
                  <span className="font-medium text-neutral-700">Admin:</span>{' '}
                  <span className="text-neutral-500">admin@chordcompass.com</span>
                </button>
                <button
                  onClick={() => fillDemo('student@chordcompass.com', 'student123')}
                  className="w-full text-left px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors text-sm cursor-pointer border-none"
                >
                  <span className="font-medium text-neutral-700">Student:</span>{' '}
                  <span className="text-neutral-500">student@chordcompass.com</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
