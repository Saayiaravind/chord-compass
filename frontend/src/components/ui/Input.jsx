import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({
  label,
  type = 'text',
  error,
  className = '',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="font-heading font-medium text-neutral-700 text-sm">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          className={`
            w-full rounded-xl border-2 px-4 py-2.5
            font-body text-neutral-900 bg-white
            placeholder:text-neutral-400
            transition-all duration-200
            focus:outline-none focus:ring-4
            ${error
              ? 'border-error focus:border-error focus:ring-red-100'
              : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-100'
            }
            ${isPassword ? 'pr-12' : ''}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors bg-transparent border-none cursor-pointer p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-error text-sm">{error}</p>}
    </div>
  );
}

export function TextArea({ label, error, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="font-heading font-medium text-neutral-700 text-sm">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full rounded-xl border-2 px-4 py-2.5
          font-body text-neutral-900 bg-white
          placeholder:text-neutral-400
          transition-all duration-200
          focus:outline-none focus:ring-4 resize-vertical min-h-[100px]
          ${error
            ? 'border-error focus:border-error focus:ring-red-100'
            : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-100'
          }
        `}
        {...props}
      />
      {error && <p className="text-error text-sm">{error}</p>}
    </div>
  );
}

export function Select({ label, error, children, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="font-heading font-medium text-neutral-700 text-sm">
          {label}
        </label>
      )}
      <select
        className={`
          w-full rounded-xl border-2 px-4 py-2.5
          font-body text-neutral-900 bg-white
          transition-all duration-200
          focus:outline-none focus:ring-4 cursor-pointer
          ${error
            ? 'border-error focus:border-error focus:ring-red-100'
            : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-100'
          }
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-error text-sm">{error}</p>}
    </div>
  );
}
