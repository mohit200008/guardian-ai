import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquareWarning,
  Link2,
  FileBarChart,
  Shield,
  Sparkles,
} from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/analyze/message', label: 'Message Analyzer', icon: MessageSquareWarning },
  { to: '/analyze/url', label: 'URL Analyzer', icon: Link2 },
  { to: '/results', label: 'Results', icon: FileBarChart },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-slate-800/80 bg-guardian-900/40">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800/80">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <p className="font-bold text-white text-sm">Guardian AI</p>
          <p className="text-[11px] text-slate-500">Trust Shield</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="m-3 rounded-xl glass p-4 border-cyan-500/10">
        <p className="flex items-center gap-2 text-xs font-medium text-cyan-400">
          <Sparkles className="h-3.5 w-3.5" />
          Gemini AI
        </p>
        <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
          Explainable threat analysis powered by Google AI.
        </p>
      </div>
    </aside>
  );
}
