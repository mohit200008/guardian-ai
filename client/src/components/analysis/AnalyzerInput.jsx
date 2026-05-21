import { Search, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';

const PLACEHOLDERS = {
  message:
    'Paste a suspicious SMS, email, or chat message here...\n\nExample: "URGENT: Your bank account will be locked. Verify now: http://secure-bank-verify.xyz/login"',
  url: 'https://example-suspicious-site.com/login',
};

export function AnalyzerInput({ mode, value, onChange, onSubmit, loading }) {
  const isMessage = mode === 'message';

  return (
    <GlassCard>
      <label className="block text-sm font-medium text-slate-300 mb-3">
        {isMessage ? 'Suspicious message' : 'Suspicious URL'}
      </label>
      {isMessage ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={PLACEHOLDERS.message}
          rows={6}
          className="w-full resize-none rounded-xl border border-slate-700/60 bg-guardian-950/80 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 font-mono"
        />
      ) : (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={PLACEHOLDERS.url}
          className="w-full rounded-xl border border-slate-700/60 bg-guardian-950/80 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 font-mono"
        />
      )}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button onClick={onSubmit} disabled={loading || !value.trim()}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Run Threat Scan
            </>
          )}
        </Button>
        <p className="text-xs text-slate-500">
          {isMessage ? 'Min 10 characters' : 'Must be a valid URL'}
        </p>
      </div>
    </GlassCard>
  );
}
