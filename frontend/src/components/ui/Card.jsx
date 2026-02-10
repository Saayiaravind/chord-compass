export default function Card({
  children,
  hover = false,
  gradient,
  className = '',
  ...props
}) {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-lg p-6
        ${hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer' : ''}
        ${gradient ? `border-l-4 ${gradient}` : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
