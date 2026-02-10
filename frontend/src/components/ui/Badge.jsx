const colorMap = {
  // Schedule statuses
  SCHEDULED: 'bg-info/10 text-info',
  NOTES_PENDING: 'bg-warning/10 text-warning',
  COMPLETED: 'bg-success/10 text-success',
  CANCELLED: 'bg-error/10 text-error',
  NO_SHOW: 'bg-neutral-200 text-neutral-600',
  // Enrollment statuses
  active: 'bg-success/10 text-success',
  inactive: 'bg-neutral-200 text-neutral-600',
  // Payment plans
  FIXED_MONTHLY: 'bg-primary-100 text-primary-700',
  CLUSTER: 'bg-info/10 text-info',
  PAY_PER_SESSION: 'bg-accent-100 text-accent-700',
  // Generic
  default: 'bg-neutral-200 text-neutral-600',
};

export default function Badge({ children, variant = 'default', className = '' }) {
  const colors = colorMap[variant] || colorMap.default;

  return (
    <span className={`
      inline-flex items-center rounded-full px-3 py-1
      text-xs font-semibold uppercase tracking-wide
      ${colors} ${className}
    `}>
      {children}
    </span>
  );
}
