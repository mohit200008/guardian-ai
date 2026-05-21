import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Building2, Package, IdCard, Wallet, Gift, CreditCard } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import ScanVisualizer from '../components/ScanVisualizer';
import { useScanExperience } from '../hooks/useScanExperience';
import { fetchDemoThreats } from '../api/threats';
import { DEMO_SCAMS } from '../data/demoExamples';

const ICONS = {
  building: Building2,
  package: Package,
  id: IdCard,
  wallet: Wallet,
  gift: Gift,
  card: CreditCard,
};

export default function DemoModePage() {
  const [demos, setDemos] = useState(DEMO_SCAMS);
  const [selected, setSelected] = useState(DEMO_SCAMS[0]);
  const { loading, error, activePhase, run, clearError } = useScanExperience();

  useEffect(() => {
    fetchDemoThreats()
      .then((data) => {
        if (data?.length) {
          setDemos(data);
          setSelected(data[0]);
        }
      })
      .catch(() => {
        /* fallback to local DEMO_SCAMS */
      });
  }, []);

  const handleDemoScan = () => {
    clearError();
    const content = selected.content || selected.message;
    run('message', content, selected.title);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium mb-2">
          <Sparkles className="h-4 w-4" />
          Threat Intelligence Demo · Kaggle-inspired corpus
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
          One-click fraud detection
        </h1>
        <p className="mt-3 text-slate-400 max-w-2xl">
          Realistic banking, KYC, delivery, and reward scams from curated SMS & phishing URL
          patterns — built for judge demos.
        </p>
      </motion.div>

      {loading ? (
        <div className="mt-10">
          <ScanVisualizer activePhase={activePhase} />
        </div>
      ) : (
        <>
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {demos.map((demo) => {
              const Icon = ICONS[demo.icon] ?? Building2;
              const active = selected.id === demo.id;
              return (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => setSelected(demo)}
                  className={`text-left rounded-2xl border p-5 transition-all glass-hover ${
                    active
                      ? 'border-cyan-500/50 bg-cyan-500/10 ring-1 ring-cyan-500/30'
                      : 'border-slate-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          active ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{demo.title}</p>
                        <p className="text-xs text-slate-500">{demo.category}</p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                        demo.riskLevel === 'Critical'
                          ? 'border-red-500/40 text-red-300 bg-red-500/10'
                          : 'border-amber-500/40 text-amber-300 bg-amber-500/10'
                      }`}
                    >
                      {demo.riskLevel || 'High'}
                    </span>
                  </div>
                  {demo.tactics && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {demo.tactics.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] rounded bg-slate-800 px-1.5 py-0.5 text-slate-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <GlassCard className="mt-8">
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">Preview</p>
            <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
              {selected.content || selected.message}
            </pre>
            <Button className="mt-6 w-full sm:w-auto" onClick={handleDemoScan}>
              <Play className="h-4 w-4" />
              Run Demo Scan — {selected.title}
            </Button>
          </GlassCard>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}
        </>
      )}
    </div>
  );
}
