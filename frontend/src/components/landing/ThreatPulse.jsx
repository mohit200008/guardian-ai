import { motion } from 'framer-motion';

export default function ThreatPulse() {
  return (
    <div className="flex items-center gap-2 text-xs font-mono text-red-400/90">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
      </span>
      <span className="animate-threat-pulse">LIVE THREATS DETECTED</span>
    </div>
  );
}
