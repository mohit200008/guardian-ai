import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { SCAN_PHASES } from '../constants/scanPhases';
import GlassCard from './ui/GlassCard';

export default function ScanVisualizer({ activePhase = 0 }) {
  const progress = ((activePhase + 1) / SCAN_PHASES.length) * 100;

  return (
    <GlassCard className="relative overflow-hidden" glow>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute left-0 right-0 h-24 bg-gradient-to-b from-cyan-500/20 to-transparent animate-[scan-line_2.5s_ease-in-out_infinite]"
          style={{ animation: 'scan-line 2.5s ease-in-out infinite' }}
        />
      </div>

      <div className="relative flex flex-col items-center py-6">
        <div className="relative mb-8">
          <div className="h-20 w-20 rounded-full border-2 border-cyan-500/30 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin" />
            <Shield className="h-8 w-8 text-cyan-400 relative z-10" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
          </span>
        </div>

        <p className="text-sm font-medium text-cyan-300 mb-1">Live Threat Scan</p>
        <p className="text-xs text-slate-500 mb-6">Guardian AI is analyzing your content</p>

        <div className="w-full max-w-md h-1.5 rounded-full bg-slate-800 mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <ul className="w-full max-w-md space-y-3">
          {SCAN_PHASES.map((phase, i) => {
            const Icon = phase.icon;
            const done = i < activePhase;
            const current = i === activePhase;

            return (
              <motion.li
                key={phase.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all ${
                  current
                    ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-200'
                    : done
                      ? 'text-emerald-400/90 border border-transparent'
                      : 'text-slate-600 border border-transparent'
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${current ? 'animate-pulse' : ''}`}
                />
                <span className="flex-1">{phase.label}</span>
                {done && <span className="text-xs text-emerald-500">✓</span>}
                {current && (
                  <span className="flex gap-0.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1 w-1 rounded-full bg-cyan-400 animate-bounce"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </span>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </GlassCard>
  );
}
