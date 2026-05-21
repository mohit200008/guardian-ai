import { Brain } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export function ExplanationCard({ explanation, confidence }) {
  return (
    <GlassCard glow>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
          <Brain className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white mb-1">AI Explanation</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{explanation}</p>
          {confidence != null && (
            <p className="mt-3 text-xs text-slate-500">
              Analysis confidence: <span className="text-cyan-400">{confidence}%</span>
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
