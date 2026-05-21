import { Link } from 'react-router-dom';
import {
  MessageSquareWarning,
  Link2,
  FileBarChart,
  ShieldCheck,
  ArrowRight,
  Play,
} from 'lucide-react';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';

const tools = [
  {
    to: '/analyze/message',
    title: 'Scam Message Analyzer',
    desc: 'Scan SMS, emails, and chat for fraud patterns',
    icon: MessageSquareWarning,
    color: 'text-amber-400 bg-amber-500/15',
  },
  {
    to: '/analyze/url',
    title: 'URL Trust Analyzer',
    desc: 'Check links for phishing and typosquatting',
    icon: Link2,
    color: 'text-cyan-400 bg-cyan-500/15',
  },
  {
    to: '/results',
    title: 'View Results',
    desc: 'See your latest threat analysis report',
    icon: FileBarChart,
    color: 'text-emerald-400 bg-emerald-500/15',
  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <div className="mb-10">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-slate-400 text-sm sm:text-base">
          Your command center for digital fraud prevention.
        </p>
      </div>

      <GlassCard glow className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 glass-hover">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-white">System Ready</h2>
          <p className="text-sm text-slate-400 mt-1">
            Trust scores, manipulation tactics, and explainable AI — ready for your next scan.
          </p>
        </div>
        <Link to="/demo">
          <Button>
            <Play className="h-4 w-4" />
            Demo Mode
          </Button>
        </Link>
      </GlassCard>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(({ to, title, desc, icon: Icon, color }) => (
          <Link key={to} to={to} className="group">
            <GlassCard className="h-full transition-colors hover:border-cyan-500/30">
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-white group-hover:text-cyan-300 transition-colors">
                {title}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs text-cyan-500/80 group-hover:text-cyan-400">
                Open <ArrowRight className="h-3 w-3" />
              </span>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
