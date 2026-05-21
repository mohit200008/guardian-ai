import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Clock,
  Crown,
  DollarSign,
  Flame,
  Gift,
} from 'lucide-react';
import GlassCard from './ui/GlassCard';

const TACTIC_META = {
  'Fear Tactic': { icon: Flame, color: 'from-red-500/20 to-orange-500/10 border-red-500/30 text-red-300' },
  'Urgency Pressure': { icon: Clock, color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-300' },
  'Authority Impersonation': { icon: Crown, color: 'from-purple-500/20 to-violet-500/10 border-purple-500/30 text-purple-300' },
  'Financial Threat': { icon: DollarSign, color: 'from-orange-500/20 to-red-500/10 border-orange-500/30 text-orange-300' },
  'Panic Language': { icon: AlertTriangle, color: 'from-red-500/20 to-rose-500/10 border-red-500/30 text-red-300' },
  'Suspicious Reward Offer': { icon: Gift, color: 'from-emerald-500/20 to-cyan-500/10 border-emerald-500/30 text-emerald-300' },
};

const DEFAULT_META = {
  icon: AlertTriangle,
  color: 'from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-300',
};

export default function ManipulationTactics({ tactics = [], highlightedPhrases = [] }) {
  if (!tactics.length && !highlightedPhrases.length) return null;

  return (
    <div className="space-y-6">
      <GlassCard className="border-amber-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <h3 className="font-display text-lg font-bold text-white mb-1">
          Why this message is manipulative
        </h3>
        <p className="text-sm text-slate-400 mb-6">
          Guardian AI detected psychological tactics designed to bypass your judgment.
        </p>

        {tactics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tactics.map((tactic, i) => {
              const meta = TACTIC_META[tactic.type] ?? DEFAULT_META;
              const Icon = meta.icon;
              return (
                <motion.span
                  key={`${tactic.type}-${i}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className={`inline-flex items-center gap-2 rounded-full border bg-gradient-to-r px-3 py-1.5 text-xs font-semibold ${meta.color}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tactic.type}
                </motion.span>
              );
            })}
          </div>
        )}

        {tactics.length > 0 && (
          <ul className="space-y-3">
            {tactics.map((tactic, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-xl border border-slate-700/50 bg-guardian-950/50 p-4"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-1">
                  {tactic.type}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">{tactic.description}</p>
              </motion.li>
            ))}
          </ul>
        )}
      </GlassCard>

      {highlightedPhrases.length > 0 && (
        <GlassCard>
          <h4 className="text-sm font-semibold text-slate-200 mb-3">Suspicious phrases</h4>
          <div className="flex flex-wrap gap-2">
            {highlightedPhrases.map((phrase, i) => (
              <motion.mark
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg bg-red-500/15 border border-red-500/25 px-3 py-1.5 text-sm text-red-200 font-mono"
              >
                “{phrase}”
              </motion.mark>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
