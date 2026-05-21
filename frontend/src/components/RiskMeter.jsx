import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { getRiskTier, mapApiRiskLevel } from '../utils/trustScore';

export default function RiskMeter({ riskLevel = 'caution', trustScore = 50 }) {
  const tierKey = mapApiRiskLevel(riskLevel);
  const tier = getRiskTier(trustScore);
  const fill = 100 - trustScore;

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-200">Threat Level</h3>
        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase ${tier.badge}`}>
          {tier.label}
        </span>
      </div>
      <div className="relative h-4 w-full rounded-full bg-slate-800/80 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            tierKey === 'critical'
              ? 'bg-gradient-to-r from-red-600 via-red-500 to-orange-500'
              : tierKey === 'dangerous'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                : tierKey === 'suspicious'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${fill}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between mt-2 text-[10px] uppercase tracking-wider text-slate-600">
        <span>Safe</span>
        <span>Critical</span>
      </div>
    </GlassCard>
  );
}
