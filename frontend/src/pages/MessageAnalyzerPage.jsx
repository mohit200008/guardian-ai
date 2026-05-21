import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Loader from '../components/Loader';
import { useAnalysis } from '../hooks/useAnalysis';

const DEMO = `URGENT SECURITY ALERT: Your PayPal account has been temporarily limited due to suspicious activity. Verify within 2 hours: http://paypa1-secure-verify.xyz/login`;

export default function MessageAnalyzerPage() {
  const [content, setContent] = useState('');
  const { loading, error, run, clearError } = useAnalysis();

  const handleSubmit = () => {
    clearError();
    run('message', content.trim(), content.trim().slice(0, 120));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Scam Message Analyzer</h1>
        <p className="mt-2 text-slate-400 text-sm">
          Paste suspicious SMS, email, or chat content for AI-powered fraud detection.
        </p>
      </header>

      {loading ? (
        <Loader message="Scanning message for scam patterns..." />
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
              placeholder="Paste the full message here..."
              className="w-full resize-none rounded-xl border border-slate-700/60 bg-guardian-950/80 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 font-mono"
            />
            <div className="mt-4 flex flex-wrap gap-3 items-center">
              <Button onClick={handleSubmit} disabled={content.trim().length < 10}>
                <Search className="h-4 w-4" />
                Analyze Message
              </Button>
              <button
                type="button"
                onClick={() => setContent(DEMO)}
                className="text-xs text-cyan-500/80 hover:text-cyan-400 underline"
              >
                Load demo phishing message
              </button>
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
