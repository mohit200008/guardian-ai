import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, Brain, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const features = [
  { icon: Shield, title: 'Trust Scoring', desc: 'Instant safety ratings for messages and URLs' },
  { icon: Brain, title: 'Explainable AI', desc: 'Plain-language breakdowns, not jargon' },
  { icon: Zap, title: 'Real-time Scan', desc: 'Detect phishing, urgency tricks, and spoofing' },
];

export default function LandingPage() {
  return (
    <section className="relative px-4 sm:px-6 pt-16 pb-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-medium text-cyan-300 mb-6">
          <Shield className="h-3.5 w-3.5" />
          AI-Powered Digital Trust Shield
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          Spot scams before you{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            click or pay
          </span>
        </h1>
        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
          Guardian AI analyzes suspicious messages and links — then explains the risk in
          human terms with actionable recovery guidance.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard">
            <Button className="w-full sm:w-auto">
              Start Protecting
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/analyze/message">
            <Button variant="outline" className="w-full sm:w-auto">
              Try Message Scan
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="mt-24 grid sm:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass rounded-2xl p-6 text-center"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-400">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
