import { motion } from 'framer-motion';

export default function MiniTrustGauge({ score = 12, animated = true }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;

  return (
    <div className="relative">
      <svg className="h-28 w-28 -rotate-90" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(51,65,85,0.6)" strokeWidth="6" />
        <motion.circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke="#f87171"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={animated ? { strokeDashoffset: c } : { strokeDashoffset: offset }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold font-display text-red-400">{score}</span>
        <span className="text-[8px] uppercase text-slate-500">Risk</span>
      </div>
    </div>
  );
}
