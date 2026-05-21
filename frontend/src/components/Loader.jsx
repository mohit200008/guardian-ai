import { Shield } from 'lucide-react';

export default function Loader({ message = 'Analyzing threats...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-2 border-cyan-500/20" />
        <div className="absolute inset-0 h-16 w-16 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin" />
        <Shield className="absolute inset-0 m-auto h-6 w-6 text-cyan-400" />
      </div>
      <p className="text-sm text-slate-400 animate-pulse">{message}</p>
    </div>
  );
}
