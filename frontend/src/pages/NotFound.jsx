import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
          <Music size={36} className="text-primary-500" />
        </div>
        <h1 className="font-heading text-6xl font-bold text-neutral-900 mb-2">404</h1>
        <p className="text-xl text-neutral-600 mb-2">Page not found</p>
        <p className="text-neutral-400 mb-8 max-w-md">
          Looks like this note is missing from the score. Let's get you back on track.
        </p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
