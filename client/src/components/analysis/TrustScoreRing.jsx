import { motion } from 'framer-motion';
import { getScoreColor, getScoreRingColor } from '../../utils/trustScore';

export function TrustScoreRing({ score, label }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const stroke = getScoreRingColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="rgba(51,65,85,0.5)"
            strokeWidth="8"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="animate-pulse-ring"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={score}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-4xl font-bold tabular-nums ${getScoreColor(score)}`}
          >
            {score}
          </motion.span>
          <span className="text-xs text-slate-500 uppercase tracking-wider">Trust Score</span>
        </div>
      </div>
      {label && (
        <p className="mt-2 text-sm font-medium text-slate-300">{label}</p>
      )}
    </div>
  );
}
