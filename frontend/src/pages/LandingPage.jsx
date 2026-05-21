import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  ArrowRight,
  Brain,
  Gauge,
  Scan,
  AlertTriangle,
  Play,
  ChevronRight,
} from 'lucide-react';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import ThreatPulse from '../components/landing/ThreatPulse';
import MiniTrustGauge from '../components/landing/MiniTrustGauge';
import { LANDING_STATS } from '../data/demoExamples';

const features = [
  {
    title: 'Trust Score Engine',
    desc: 'Animated radial gauge with Safe → Critical risk tiers.',
    icon: Gauge,
  },
  {
    title: 'Manipulation Detection',
    desc: 'Surfaces fear, urgency, and authority tactics scammers use.',
    icon: Brain,
  },
  {
    title: 'Live Threat Scan',
    desc: 'Cinematic AI analysis with step-by-step visualization.',
    icon: Scan,
  },
];

const steps = [
  { n: '01', title: 'Paste', desc: 'Drop a suspicious SMS, email, or URL.' },
  { n: '02', title: 'Scan', desc: 'Guardian AI runs multi-layer fraud analysis.' },
  { n: '03', title: 'Understand', desc: 'Get trust score, tactics, and plain-language explanation.' },
  { n: '04', title: 'Recover', desc: 'Follow guided steps if you may have been targeted.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5 },
};

export default function LandingPage() {
  return (
    <div className="gradient-mesh">
      {/* HERO */}
      <section className="relative px-4 sm:px-6 pt-12 pb-20 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}>
            <ThreatPulse />
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Your AI shield against{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 animate-gradient">
                digital fraud
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">
              Guardian AI detects phishing, urgency manipulation, and scam psychology — then
              explains the threat like a security expert sitting beside you.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/demo">
                <Button className="w-full sm:w-auto group">
                  <Play className="h-4 w-4" />
                  Judge Demo Mode
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" className="w-full sm:w-auto">
                  Open Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <GlassCard className="glass-hover p-6 lg:p-8" glow>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Scan Preview</p>
                  <p className="font-mono text-sm text-red-300 mt-1">URGENT: Account frozen...</p>
                </div>
                <MiniTrustGauge score={12} />
              </div>
              <div className="space-y-2">
                {['Urgency Pressure', 'Authority Impersonation', 'Fear Tactic'].map((tag, i) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-200"
                  >
                    <AlertTriangle className="h-3.5 w-3.5" />
                    {tag}
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 h-1 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-red-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 2, delay: 0.8 }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2 font-mono">Analyzing manipulation patterns...</p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 sm:px-6 py-16 border-y border-slate-800/60 bg-guardian-900/30">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {LANDING_STATS.map((stat, i) => (
            <motion.div key={stat.label} {...fadeUp} transition={{ delay: i * 0.08 }}>
              <p className="font-display text-3xl sm:text-4xl font-bold text-cyan-400">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-4 sm:px-6 py-24 max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Built for real-world scams
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Not just spam filters — psychological fraud detection with explainable AI.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ title, desc, icon: Icon }, i) => (
            <motion.div key={title} {...fadeUp} transition={{ delay: i * 0.1 }}>
              <GlassCard className="glass-hover h-full p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 mb-5">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 sm:px-6 py-24 max-w-6xl mx-auto">
        <motion.h2 {...fadeUp} className="font-display text-3xl font-bold text-white text-center mb-16">
          How Guardian AI Works
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div key={step.n} {...fadeUp} transition={{ delay: i * 0.1 }}>
              <div className="glass rounded-2xl p-6 h-full border-l-2 border-l-cyan-500/50">
                <span className="font-display text-4xl font-bold text-cyan-500/30">{step.n}</span>
                <h3 className="mt-4 font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DEMO PREVIEW */}
      <section className="px-4 sm:px-6 py-24 max-w-6xl mx-auto">
        <GlassCard className="p-8 lg:p-12 overflow-hidden relative" glow>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="grid lg:grid-cols-2 gap-10 items-center relative">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Hackathon-ready Demo Mode
              </h2>
              <p className="mt-4 text-slate-400">
                One-click scans with realistic banking, delivery, and KYC scam examples — built
                for judges to feel the impact instantly.
              </p>
              <Link to="/demo" className="inline-block mt-8">
                <Button>
                  Launch Demo Mode
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="animate-float">
                <Shield className="h-32 w-32 text-cyan-500/20" strokeWidth={1} />
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* WHY IT MATTERS */}
      <section className="px-4 sm:px-6 py-24 max-w-3xl mx-auto text-center">
        <motion.div {...fadeUp}>
          <h2 className="font-display text-3xl font-bold text-white">Why This Matters</h2>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed">
            Scammers don’t just steal passwords — they hijack emotion. Guardian AI gives
            everyone access to the same clarity a security team would provide, in seconds,
            before irreversible damage happens.
          </p>
          <Link to="/analyze/message" className="inline-block mt-10">
            <Button variant="outline">
              Try a Free Scan
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
