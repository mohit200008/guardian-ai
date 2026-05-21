import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import GlassCard from './ui/GlassCard';

const severityConfig = {
  low: { border: 'border-slate-600/40', bg: 'bg-slate-800/40', dot: 'bg-slate-400' },
  medium: { border: 'border-amber-500/35', bg: 'bg-amber-500/8', dot: 'bg-amber-400' },
  high: { border: 'border-red-500/40', bg: 'bg-red-500/10', dot: 'bg-red-400 animate-pulse' },
};

export default function ThreatAnalysisCard({ threats = [], redFlags = [] }) {
  const items = [
    ...threats.map((t) => ({ ...t, kind: 'threat' })),
    ...redFlags.map((flag) => ({
      type: 'Red Flag',
      severity: 'medium',
      description: flag,
    })),
  ];

  return (
    <GlassCard>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15 text-red-400">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-white">Threat Analysis</h3>
          <p className="text-xs text-slate-500">
            {items.length} indicator{items.length !== 1 ? 's' : ''} detected
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-400 py-4 text-center">No specific threats flagged.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((item, i) => {
            const cfg = severityConfig[item.severity] ?? severityConfig.low;
            return (
              <motion.li
                key={`${item.type}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`rounded-xl border p-4 ${cfg.border} ${cfg.bg}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                  <span className="text-xs font-mono uppercase text-cyan-400/90">{item.type}</span>
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500/80 ml-auto" />
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
              </motion.li>
            );
          })}
        </ul>
      )}
    </GlassCard>
  );
}
