import { motion } from 'framer-motion';
import { TrustScoreRing } from './TrustScoreRing';
import { ThreatList } from './ThreatList';
import { ExplanationCard } from './ExplanationCard';
import { RecoveryGuide } from './RecoveryGuide';
import { Badge } from '../ui/Badge';
import { getRiskBadgeClass } from '../../utils/trustScore';
import { GlassCard } from '../ui/GlassCard';

export function AnalysisResult({ data }) {
  if (!data) return null;

  const riskLabel = (data.riskLevel ?? 'caution').replace(/_/g, ' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <GlassCard className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <TrustScoreRing score={data.trustScore} label={data.trustLabel} />
        <div className="text-center sm:text-left space-y-3">
          <Badge className={getRiskBadgeClass(data.riskLevel)}>{riskLabel}</Badge>
          <p className="text-sm text-slate-400 max-w-xs">
            {data.trustScore >= 80
              ? 'This content appears relatively safe, but stay vigilant.'
              : data.trustScore >= 50
                ? 'Some warning signs detected. Proceed with caution.'
                : 'High fraud risk. Do not click links or share personal data.'}
          </p>
        </div>
      </GlassCard>

      <ExplanationCard explanation={data.explanation} confidence={data.confidence} />
      <ThreatList threats={data.threats} redFlags={data.redFlags} />
      <RecoveryGuide steps={data.recoverySteps} />

      {data.domainAnalysis && (
        <GlassCard>
          <h3 className="text-sm font-semibold text-slate-200 mb-2">Domain Analysis</h3>
          <p className="font-mono text-cyan-400 text-sm">{data.domainAnalysis.domain}</p>
          {data.domainAnalysis.looksLike && (
            <p className="text-sm text-slate-400 mt-2">
              Impersonation: {data.domainAnalysis.looksLike}
            </p>
          )}
        </GlassCard>
      )}
    </motion.div>
  );
}
