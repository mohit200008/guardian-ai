import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, AlertCircle, Link2, Sparkles } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import ScanVisualizer from '../components/ScanVisualizer';
import { useScanExperience } from '../hooks/useScanExperience';

export default function UrlAnalyzerPage() {
  const [url, setUrl] = useState('');
  const { loading, error, activePhase, run, clearError } = useScanExperience();

  const handleSubmit = () => {
    clearError();
    run('url', url.trim(), url.trim());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <header className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">URL Trust Analyzer</h1>
        <p className="mt-2 text-slate-400 text-sm">
          Detect phishing links, typosquatting, and credential-harvesting domains.
        </p>
      </header>

      {loading ? (
        <ScanVisualizer activePhase={activePhase} />
      ) : (
        <>
          <GlassCard>
            <label className="block text-sm font-medium text-slate-300 mb-3">Suspicious URL</label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://suspicious-site-verify.xyz/login"
                className="w-full rounded-xl border border-slate-700/60 bg-guardian-950/80 pl-10 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 font-mono"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={handleSubmit} disabled={!url.trim()}>
                <Search className="h-4 w-4" />
                Run Threat Scan
              </Button>
              <Link to="/demo" className="text-xs text-cyan-500 hover:text-cyan-400 flex items-center gap-1 self-center">
                <Sparkles className="h-3.5 w-3.5" />
                Demo Mode
              </Link>
            </div>
          </GlassCard>

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
