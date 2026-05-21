import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { getRiskTier, isCriticalRisk } from '../utils/trustScore';

export default function TrustGauge({ score = 0, label, size = 'lg' }) {
  const tier = getRiskTier(score);
  const radius = size === 'lg' ? 58 : 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const critical = isCriticalRisk(score);
  const dim = size === 'lg' ? 'h-44 w-44' : 'h-32 w-32';
  const textSize = size === 'lg' ? 'text-5xl' : 'text-3xl';

  return (
    <GlassCard
      className={`flex flex-col items-center text-center relative overflow-hidden ${
        critical ? 'animate-danger-pulse border-red-500/30' : ''
      }`}
      glow={!critical}
    >
      {critical && (
        <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
      )}

      <div
        className={`relative ${dim} flex items-center justify-center`}
        style={{ filter: `drop-shadow(0 0 24px ${tier.glow})` }}
      >
        <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 140 140">
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="rgba(30,41,59,0.8)"
            strokeWidth="10"
          />
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={tier.stroke}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className={critical ? 'animate-pulse-ring' : ''}
          />
        </svg>
        <div className="relative flex flex-col items-center">
          <motion.span
            key={score}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className={`font-bold tabular-nums font-display ${textSize} ${tier.color}`}
          >
            {score}
          </motion.span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">
            Trust Score
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2">
        <span
          className={`inline-flex rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-wider ${tier.badge}`}
        >
          {label || tier.label}
        </span>
        <p className="text-xs text-slate-500 max-w-[200px]">
          {score >= 80
            ? 'Content appears trustworthy'
            : score >= 50
              ? 'Exercise caution before acting'
              : score >= 20
                ? 'High fraud indicators detected'
                : 'Do not click links or share data'}
        </p>
      </div>
    </GlassCard>
  );
}
