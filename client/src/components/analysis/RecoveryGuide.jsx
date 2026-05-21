import { LifeBuoy } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export function RecoveryGuide({ steps = [] }) {
  if (!steps.length) return null;

  return (
    <GlassCard className="border-red-500/20">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-red-300 mb-4">
        <LifeBuoy className="h-4 w-4" />
        Recovery Guidance
      </h3>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm text-slate-300">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-300">
              {i + 1}
            </span>
            <span className="leading-relaxed pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </GlassCard>
  );
}
