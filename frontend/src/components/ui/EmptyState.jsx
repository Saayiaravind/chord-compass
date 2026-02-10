import { Music } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = Music,
  title = 'Nothing here yet',
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
        <Icon size={28} className="text-primary-500" />
      </div>
      <h3 className="font-heading font-semibold text-lg text-neutral-800 mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-neutral-500 text-sm max-w-sm mb-4">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">{actionLabel}</Button>
      )}
    </div>
  );
}
