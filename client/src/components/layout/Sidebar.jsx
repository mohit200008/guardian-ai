import { Shield, MessageSquareWarning, Link2, Sparkles } from 'lucide-react';

const navItems = [
  { id: 'scan', label: 'Threat Scan', icon: Shield, active: true },
  { id: 'message', label: 'Message Analyzer', icon: MessageSquareWarning, active: false },
  { id: 'url', label: 'URL Trust', icon: Link2, active: false },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-slate-800/80 bg-guardian-900/50">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-800/80">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">Guardian AI</h1>
          <p className="text-xs text-slate-500">Digital Trust Shield</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
              item.active
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                : 'text-slate-500'
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
            {!item.active && (
              <span className="ml-auto text-[10px] uppercase text-slate-600">Soon</span>
            )}
          </div>
        ))}
      </nav>

      <div className="px-4 py-4 m-3 rounded-xl glass border-cyan-500/10">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-medium mb-1">
          <Sparkles className="h-3.5 w-3.5" />
          Powered by Gemini
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Real-time AI threat analysis with human-friendly explanations.
        </p>
      </div>
    </aside>
  );
}
