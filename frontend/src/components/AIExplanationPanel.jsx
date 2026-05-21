import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, LifeBuoy, ChevronDown, Globe } from 'lucide-react';
import GlassCard from './ui/GlassCard';

function CollapsibleSection({ title, icon: Icon, children, defaultOpen = true, accent = 'cyan' }) {
  const [open, setOpen] = useState(defaultOpen);
  const accentMap = {
    cyan: 'text-cyan-400 bg-cyan-500/15',
    red: 'text-red-300 bg-red-500/15',
  };

  return (
    <GlassCard className={!open ? 'pb-4' : ''}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${accentMap[accent]}`}>
            <Icon className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-slate-700/50">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

export default function AIExplanationPanel({
  explanation,
  confidence,
  recoverySteps = [],
  domainAnalysis,
}) {
  return (
    <div className="space-y-4">
      <CollapsibleSection title="AI Explanation" icon={Brain} defaultOpen>
        <p className="text-sm text-slate-300 leading-relaxed">{explanation}</p>
        {confidence != null && (
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full bg-cyan-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <span className="text-xs text-cyan-400 font-mono">{confidence}%</span>
          </div>
        )}
      </CollapsibleSection>

      {domainAnalysis && (
        <CollapsibleSection title="Domain Analysis" icon={Globe} defaultOpen={false}>
          <p className="font-mono text-cyan-400 text-sm break-all">{domainAnalysis.domain}</p>
          {domainAnalysis.looksLike && (
            <p className="text-sm text-slate-400 mt-3">
              <span className="text-slate-500">Impersonates:</span> {domainAnalysis.looksLike}
            </p>
          )}
        </CollapsibleSection>
      )}

      {recoverySteps.length > 0 && (
        <CollapsibleSection title="Recovery Guidance" icon={LifeBuoy} accent="red">
          <ol className="space-y-3">
            {recoverySteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-300">
                  {i + 1}
                </span>
                <span className="pt-1 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </CollapsibleSection>
      )}
    </div>
  );
}
