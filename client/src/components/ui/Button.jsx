export function Button({
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-cyan-500 text-guardian-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/25',
    ghost:
      'border border-slate-600/50 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300',
    danger: 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30',
  };

  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
