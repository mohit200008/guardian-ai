import { motion } from 'framer-motion';
import { Database, CheckCircle2, AlertTriangle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import GlassCard from './ui/GlassCard';

const DEFAULT_INSIGHTS = [
  'Threat intelligence layer active',
  'Pattern matching against curated scam corpus',
];

export default function ThreatIntelligencePanel({
  threatIntel,
  scamCategory,
  intelligenceConfidence,
  spamPatternMatch,
}) {
  const [open, setOpen] = useState(true);
  const insights = threatIntel?.insights?.length ? threatIntel.insights : DEFAULT_INSIGHTS;

  return (
    <GlassCard className="border-cyan-500/25 relative overflow-hidden" glow>
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 text-left relative"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.2)]">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-white">Threat Intelligence Match</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Kaggle-inspired SMS & phishing URL pattern corpus
            </p>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-4 relative"
        >
          {scamCategory && (
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              Category: {scamCategory}
            </div>
          )}

          <ul className="space-y-3">
            {insights.map((insight, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 rounded-xl border border-slate-700/50 bg-guardian-950/40 px-4 py-3"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300 leading-relaxed">{insight}</span>
              </motion.li>
            ))}
          </ul>

          {threatIntel?.matchedThreatTitle && (
            <p className="text-xs text-slate-500 font-mono">
              Corpus match: <span className="text-cyan-400/90">{threatIntel.matchedThreatTitle}</span>
              {threatIntel.corpusMatchScore != null && (
                <span className="ml-2">· score {threatIntel.corpusMatchScore}</span>
              )}
            </p>
          )}

          <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-700/50">
            <StatusPill
              ok={spamPatternMatch}
              label={spamPatternMatch ? 'Phishing pattern match' : 'Low corpus similarity'}
            />
            {intelligenceConfidence != null && (
              <span className="text-xs text-slate-500">
                Intel confidence:{' '}
                <span className="text-cyan-400 font-mono">{intelligenceConfidence}%</span>
              </span>
            )}
          </div>
        </motion.div>
      )}
    </GlassCard>
  );
}

function StatusPill({ ok, label }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium border ${
        ok
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          : 'bg-slate-800/50 border-slate-600/40 text-slate-400'
      }`}
    >
      {ok ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : (
        <AlertTriangle className="h-3 w-3" />
      )}
      {label}
    </span>
  );
}
