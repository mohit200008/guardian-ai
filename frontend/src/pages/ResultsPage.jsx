import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, ShieldAlert, CheckCircle2, Cpu } from 'lucide-react';
import { useAnalysisContext } from '../context/AnalysisContext';
import TrustGauge from '../components/TrustGauge';
import ThreatAnalysisCard from '../components/ThreatAnalysisCard';
import RiskMeter from '../components/RiskMeter';
import AIExplanationPanel from '../components/AIExplanationPanel';
import ManipulationTactics from '../components/ManipulationTactics';
import ThreatIntelligencePanel from '../components/ThreatIntelligencePanel';
import RiskFactorBreakdown from '../components/RiskFactorBreakdown';
import HighlightedMessage from '../components/HighlightedMessage';
import ScamCategoryBadge from '../components/ScamCategoryBadge';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import { getRiskTier, isCriticalRisk } from '../utils/trustScore';

export default function ResultsPage() {
  const { result, inputPreview, clearResult } = useAnalysisContext();

  if (!result) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <GlassCard className="p-10">
          <ShieldAlert className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 mb-6">No scan results yet. Run an analysis or try Demo Mode.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/demo">
              <Button>Demo Mode</Button>
            </Link>
            <Link to="/analyze/message">
              <Button variant="ghost">Message Scan</Button>
            </Link>
          </div>
        </GlassCard>
      </div>
    );
  }

  const backTo = result.type === 'url' ? '/analyze/url' : '/analyze/message';
  const critical = isCriticalRisk(result.trustScore);
  const tier = getRiskTier(result.trustScore);
  const fullText = inputPreview;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border p-4 sm:p-5 mb-6 flex flex-wrap items-center justify-between gap-4 ${
          critical
            ? 'border-red-500/40 bg-red-500/10'
            : 'border-cyan-500/20 bg-cyan-500/5'
        }`}
      >
        <div className="flex items-center gap-4 flex-wrap">
          {critical ? (
            <ShieldAlert className="h-10 w-10 text-red-400 shrink-0" />
          ) : (
            <CheckCircle2 className="h-10 w-10 text-cyan-400 shrink-0" />
          )}
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Threat Intelligence Report
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <ScamCategoryBadge category={result.scamCategory} />
              <span className={`text-sm capitalize ${tier.color}`}>{tier.label} risk</span>
            </div>
          </div>
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
      </motion.div>

      {result.fallbackMode && (
        <p className="mb-4 text-xs text-amber-400/90 border border-amber-500/30 bg-amber-500/10 rounded-lg px-3 py-2">
          Threat intelligence mode — AI was busy; result uses pattern matching (still flags shorteners & phishing).
        </p>
      )}

      {result.scoringMethod && (
        <p className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-mono">
          <Cpu className="h-3.5 w-3.5 text-cyan-500/70" />
          {result.scoringMethod.replace(/_/g, ' ')}
          {result.intelligenceConfidence != null && (
            <span className="text-cyan-500/80">
              · intel {result.intelligenceConfidence}% · AI {result.confidence}%
            </span>
          )}
        </p>
      )}

      <div className="mb-8">
        <ThreatIntelligencePanel
          threatIntel={result.threatIntel}
          scamCategory={result.scamCategory}
          intelligenceConfidence={result.intelligenceConfidence}
          spamPatternMatch={result.threatIntel?.spamPatternMatch}
        />
      </div>

      {fullText && result.type === 'message' && (
        <div className="mb-8">
          <HighlightedMessage
            text={fullText}
            phrases={result.highlightedPhrases}
          />
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-6">
          <TrustGauge score={result.trustScore} label={result.trustLabel} />
          <RiskMeter riskLevel={result.riskLevel} trustScore={result.trustScore} />
          <RiskFactorBreakdown factors={result.riskFactors} />
        </div>
        <div className="lg:col-span-7 space-y-6">
          <AIExplanationPanel
            explanation={result.explanation}
            confidence={result.confidence}
            recoverySteps={result.recoverySteps}
            domainAnalysis={result.domainAnalysis}
          />
        </div>
      </div>

      {(result.manipulationTactics?.length > 0 || result.highlightedPhrases?.length > 0) && (
        <div className="mt-8">
          <ManipulationTactics
            tactics={result.manipulationTactics}
            highlightedPhrases={result.highlightedPhrases}
          />
        </div>
      )}

      <div className="mt-8">
        <ThreatAnalysisCard threats={result.threats} redFlags={result.redFlags} />
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/demo">
          <Button variant="outline">Run Another Demo</Button>
        </Link>
      </div>

      <button
        type="button"
        onClick={clearResult}
        className="block mx-auto mt-6 text-xs text-slate-600 hover:text-slate-400"
      >
        Clear session results
      </button>
    </div>
  );
}
