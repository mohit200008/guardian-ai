import { useState } from 'react';
import { Search, AlertCircle, Link2 } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Loader from '../components/Loader';
import { useAnalysis } from '../hooks/useAnalysis';

export default function UrlAnalyzerPage() {
  const [url, setUrl] = useState('');
  const { loading, error, run, clearError } = useAnalysis();

  const handleSubmit = () => {
    clearError();
    run('url', url.trim(), url.trim());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">URL Trust Analyzer</h1>
        <p className="mt-2 text-slate-400 text-sm">
          Verify links before clicking — detect phishing and look-alike domains.
        </p>
      </header>

      {loading ? (
        <Loader message="Analyzing URL trust signals..." />
      ) : (
        <>
          <GlassCard>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Suspicious URL
            </label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example-suspicious-site.com/login"
                className="w-full rounded-xl border border-slate-700/60 bg-guardian-950/80 pl-10 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 font-mono"
              />
            </div>
            <div className="mt-4">
              <Button onClick={handleSubmit} disabled={!url.trim()}>
                <Search className="h-4 w-4" />
                Analyze URL
              </Button>
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
