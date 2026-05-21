import { Brain, LifeBuoy } from 'lucide-react';
import GlassCard from './ui/GlassCard';

export default function AIExplanationPanel({
  explanation,
  confidence,
  recoverySteps = [],
  domainAnalysis,
}) {
  return (
    <div className="space-y-6">
      <GlassCard glow>
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">AI Explanation</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{explanation}</p>
            {confidence != null && (
              <p className="mt-3 text-xs text-slate-500">
                Confidence: <span className="text-cyan-400">{confidence}%</span>
              </p>
            )}
          </div>
        </div>
      </GlassCard>

      {domainAnalysis && (
        <GlassCard>
          <h3 className="text-sm font-semibold text-slate-200 mb-2">Domain Analysis</h3>
          <p className="font-mono text-cyan-400 text-sm">{domainAnalysis.domain}</p>
          {domainAnalysis.looksLike && (
            <p className="text-sm text-slate-400 mt-2">Impersonates: {domainAnalysis.looksLike}</p>
          )}
        </GlassCard>
      )}

      {recoverySteps.length > 0 && (
        <GlassCard className="border-red-500/20">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-red-300 mb-4">
            <LifeBuoy className="h-4 w-4" />
            Recovery Guidance
          </h3>
          <ol className="space-y-3">
            {recoverySteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-300">
                  {i + 1}
                </span>
                <span className="pt-0.5 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </GlassCard>
      )}
    </div>
  );
}
