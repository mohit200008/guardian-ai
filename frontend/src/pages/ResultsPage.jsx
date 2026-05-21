import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useAnalysisContext } from '../context/AnalysisContext';
import TrustScoreCard from '../components/TrustScoreCard';
import ThreatAnalysisCard from '../components/ThreatAnalysisCard';
import RiskMeter from '../components/RiskMeter';
import AIExplanationPanel from '../components/AIExplanationPanel';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';

export default function ResultsPage() {
  const { result, inputPreview, clearResult } = useAnalysisContext();

  if (!result) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <GlassCard>
          <p className="text-slate-400 mb-6">No scan results yet. Run an analysis first.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/analyze/message">
              <Button>Message Scan</Button>
            </Link>
            <Link to="/analyze/url">
              <Button variant="ghost">URL Scan</Button>
            </Link>
          </div>
        </GlassCard>
      </div>
    );
  }

  const backTo =
    result.type === 'url' ? '/analyze/url' : '/analyze/message';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Scan Results</h1>
          <p className="mt-1 text-sm text-slate-500 capitalize">
            {result.type} analysis · {result.trustLabel}
          </p>
        </div>
        <div className="flex gap-2">
          <Link to={backTo}>
            <Button variant="ghost">
              <RotateCcw className="h-4 w-4" />
              Scan Again
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {inputPreview && (
        <GlassCard className="mb-6">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Scanned input</p>
          <p className="text-sm text-slate-300 font-mono line-clamp-3 break-all">{inputPreview}</p>
        </GlassCard>
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid lg:grid-cols-2 gap-6"
      >
        <div className="space-y-6">
          <TrustScoreCard score={result.trustScore} label={result.trustLabel} />
          <RiskMeter riskLevel={result.riskLevel} trustScore={result.trustScore} />
        </div>
        <div className="space-y-6">
          <AIExplanationPanel
            explanation={result.explanation}
            confidence={result.confidence}
            recoverySteps={result.recoverySteps}
            domainAnalysis={result.domainAnalysis}
          />
        </div>
      </motion.div>

      <div className="mt-6">
        <ThreatAnalysisCard threats={result.threats} redFlags={result.redFlags} />
      </div>

      <button
        type="button"
        onClick={clearResult}
        className="mt-8 text-xs text-slate-600 hover:text-slate-400"
      >
        Clear results from session
      </button>
    </div>
  );
}
