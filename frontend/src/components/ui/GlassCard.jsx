export default function GlassCard({ children, className = '', glow = false }) {
  return (
    <div className={`glass rounded-2xl p-6 ${glow ? 'glow-cyber' : ''} ${className}`}>
      {children}
    </div>
  );
}
