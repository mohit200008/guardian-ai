import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, AlertCircle, Sparkles } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import ScanVisualizer from '../components/ScanVisualizer';
import { useScanExperience } from '../hooks/useScanExperience';
import { fetchDemoThreats } from '../api/threats';
import { DEMO_SCAMS } from '../data/demoExamples';

export default function MessageAnalyzerPage() {
  const [content, setContent] = useState('');
  const [quickDemos, setQuickDemos] = useState(DEMO_SCAMS.slice(0, 4));
  const { loading, error, activePhase, run, clearError } = useScanExperience();

  useEffect(() => {
    fetchDemoThreats()
      .then((data) => data?.length && setQuickDemos(data.slice(0, 4)))
      .catch(() => {});
  }, []);

  const handleSubmit = () => {
    clearError();
    run('message', content.trim(), content.trim().slice(0, 200));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <header className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
          Scam Message Analyzer
        </h1>
        <p className="mt-2 text-slate-400 text-sm">
          AI-powered detection of phishing, urgency tricks, and emotional manipulation.
        </p>
      </header>

      {loading ? (
        <ScanVisualizer activePhase={activePhase} />
      ) : (
        <>
          <GlassCard>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Suspicious message
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              placeholder="Paste SMS, email, WhatsApp, or social DM content..."
              className="w-full resize-none rounded-xl border border-slate-700/60 bg-guardian-950/80 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 font-mono"
            />
            <div className="mt-4 flex flex-wrap gap-3 items-center">
              <Button onClick={handleSubmit} disabled={content.trim().length < 10}>
                <Search className="h-4 w-4" />
                Run Threat Scan
              </Button>
              <Link to="/demo" className="text-xs text-cyan-500 hover:text-cyan-400 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                Demo Mode
              </Link>
            </div>
          </GlassCard>

          <p className="mt-4 text-xs text-slate-500">Quick load:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {quickDemos.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setContent(d.content || d.message)}
                className="rounded-lg border border-slate-700/60 px-3 py-1.5 text-xs text-slate-400 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
              >
                {d.title}
              </button>
            ))}
          </div>

          {error && (
            <div className="mt-6 flex gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
