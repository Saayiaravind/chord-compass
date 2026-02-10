import { Link } from 'react-router-dom';
import { ShieldX } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-6">
          <ShieldX size={36} className="text-error" />
        </div>
        <h1 className="font-heading text-4xl font-bold text-neutral-900 mb-2">Access Denied</h1>
        <p className="text-neutral-500 mb-8 max-w-md">
          You don't have permission to view this page. Contact your administrator if you think this is an error.
        </p>
        <Link to="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
