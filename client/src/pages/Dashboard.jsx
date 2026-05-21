import { useState } from 'react';
import { MessageSquareWarning, Link2, AlertCircle } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Tabs } from '../components/ui/Tabs';
import { AnalyzerInput } from '../components/analysis/AnalyzerInput';
import { AnalysisResult } from '../components/analysis/AnalysisResult';
import { useAnalysis } from '../hooks/useAnalysis';

const TABS = [
  { id: 'message', label: 'Message', icon: <MessageSquareWarning className="h-4 w-4" /> },
  { id: 'url', label: 'URL', icon: <Link2 className="h-4 w-4" /> },
];

const DEMO_MESSAGE = `URGENT SECURITY ALERT: Your PayPal account has been temporarily limited due to suspicious activity. You must verify your identity within 2 hours or your funds will be frozen permanently.

Click here immediately: http://paypa1-secure-verify.xyz/account/login

Do NOT ignore this message. Failure to verify will result in permanent account closure.`;

export function Dashboard() {
  const [tab, setTab] = useState('message');
  const [input, setInput] = useState('');
  const { result, loading, error, run, reset } = useAnalysis();

  const handleSubmit = () => {
    run(tab, input.trim());
  };

  const loadDemo = () => {
    reset();
    setTab('message');
    setInput(DEMO_MESSAGE);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Threat Scan
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
            Paste a suspicious message or URL. Guardian AI analyzes phishing patterns,
            urgency tricks, and spoofing — then explains the risk in plain language.
          </p>
        </div>

        <Tabs tabs={TABS} active={tab} onChange={(id) => { setTab(id); reset(); setInput(''); }} />

        <div className="mt-6 space-y-6">
          <AnalyzerInput
            mode={tab}
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {tab === 'message' && !result && !loading && (
            <button
              type="button"
              onClick={loadDemo}
              className="text-xs text-cyan-500/80 hover:text-cyan-400 underline-offset-2 hover:underline"
            >
              Load demo phishing message for hackathon pitch
            </button>
          )}

          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Analysis failed</p>
                <p className="text-red-300/80 mt-1">{error}</p>
              </div>
            </div>
          )}

          <AnalysisResult data={result} />
        </div>
      </div>
    </Layout>
  );
}
