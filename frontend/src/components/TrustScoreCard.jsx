import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { getScoreColor, getScoreStroke } from '../utils/trustScore';

export default function TrustScoreCard({ score = 0, label }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const stroke = getScoreStroke(score);

  return (
    <GlassCard className="flex flex-col items-center text-center" glow>
      <div className="relative h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(51,65,85,0.5)" strokeWidth="8" />
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
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={score}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-4xl font-bold tabular-nums ${getScoreColor(score)}`}
          >
            {score}
          </motion.span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500">Trust Score</span>
        </div>
      </div>
      {label && <p className="mt-3 text-sm font-medium text-slate-300">{label}</p>}
    </GlassCard>
  );
}
