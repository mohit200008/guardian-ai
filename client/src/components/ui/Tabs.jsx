export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 rounded-xl bg-guardian-800/80 p-1 border border-slate-700/50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
            active === tab.id
              ? 'bg-cyan-500/20 text-cyan-300 shadow-inner'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
