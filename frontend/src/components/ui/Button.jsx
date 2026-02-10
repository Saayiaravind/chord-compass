const variants = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg',
  secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-md hover:shadow-lg',
  outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50',
  ghost: 'text-primary-600 hover:bg-primary-50',
  danger: 'bg-error hover:bg-red-600 text-white shadow-md hover:shadow-lg',
  accent: 'bg-accent-400 hover:bg-accent-500 text-neutral-900 shadow-md hover:shadow-lg',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        font-heading font-semibold rounded-xl
        transition-all duration-200
        hover:scale-105 active:scale-95
        focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        inline-flex items-center justify-center gap-2 cursor-pointer
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
