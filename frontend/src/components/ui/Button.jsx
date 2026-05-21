export default function Button({
  children,
  variant = 'primary',
  className = '',
  disabled,
  type = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-cyan-500 text-guardian-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20',
    ghost: 'border border-slate-600/50 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300',
    outline: 'border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10',
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
