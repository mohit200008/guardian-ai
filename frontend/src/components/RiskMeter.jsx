import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { getRiskBadgeClass } from '../utils/trustScore';

const RISK_LABELS = {
  safe: { text: 'Low Risk', pct: 15 },
  caution: { text: 'Moderate Risk', pct: 45 },
  high_risk: { text: 'High Risk', pct: 75 },
  danger: { text: 'Critical Risk', pct: 95 },
};

export default function RiskMeter({ riskLevel = 'caution', trustScore = 50 }) {
  const meta = RISK_LABELS[riskLevel] ?? RISK_LABELS.caution;
  const fill = 100 - trustScore;

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-200">Risk Meter</h3>
        <span
          className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase ${getRiskBadgeClass(riskLevel)}`}
        >
          {meta.text}
        </span>
      </div>
      <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
          initial={{ width: 0 }}
          animate={{ width: `${fill}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Higher fill = greater detected threat level based on AI analysis.
      </p>
    </GlassCard>
  );
}
