import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';

export default function RiskFactorBreakdown({ factors = [] }) {
  if (!factors.length) return null;

  return (
    <GlassCard>
      <h3 className="text-sm font-semibold text-slate-200 mb-4">Risk factor breakdown</h3>
      <p className="text-xs text-slate-500 mb-4">Hybrid score from AI + threat intelligence engines</p>
      <ul className="space-y-4">
        {factors.map((f, i) => (
          <motion.li
            key={f.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300">{f.label}</span>
              <span className="font-mono text-cyan-400">{Math.round(f.impact)}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${f.impact}%` }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              />
            </div>
            {f.detail && <p className="text-[10px] text-slate-600 mt-1">{f.detail}</p>}
          </motion.li>
        ))}
      </ul>
    </GlassCard>
  );
}
