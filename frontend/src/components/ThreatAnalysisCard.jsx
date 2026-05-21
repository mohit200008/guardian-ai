import { AlertTriangle } from 'lucide-react';
import GlassCard from './ui/GlassCard';

const severityStyles = {
  low: 'border-slate-600/40 bg-slate-800/30',
  medium: 'border-amber-500/30 bg-amber-500/5',
  high: 'border-red-500/30 bg-red-500/5',
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
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-4">
        <AlertTriangle className="h-4 w-4 text-amber-400" />
        Threat Analysis
      </h3>
      {items.length === 0 ? (
        <p className="text-sm text-slate-400">No specific threats flagged in this scan.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li
              key={`${item.type}-${i}`}
              className={`rounded-xl border p-3 ${severityStyles[item.severity] ?? severityStyles.low}`}
            >
              <div className="flex justify-between gap-2 mb-1">
                <span className="text-xs font-mono uppercase text-cyan-400/90">{item.type}</span>
                <span className="text-[10px] uppercase text-slate-500">{item.severity}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </GlassCard>
  );
}
