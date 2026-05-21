import { Shield } from 'lucide-react';

export function Header() {
  return (
    <header className="lg:hidden flex items-center gap-3 px-4 py-4 border-b border-slate-800/80 bg-guardian-900/80">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
        <Shield className="h-4 w-4" />
      </div>
      <div>
        <h1 className="text-base font-bold text-white">Guardian AI</h1>
        <p className="text-[11px] text-slate-500">Digital Trust Shield</p>
      </div>
    </header>
  );
}
