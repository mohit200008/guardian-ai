import { Brain, Link2, AlertTriangle, Gauge, Sparkles } from 'lucide-react';

export const SCAN_PHASES = [
  { id: 'language', label: 'Analyzing language patterns', icon: Brain },
  { id: 'phishing', label: 'Checking phishing indicators', icon: Link2 },
  { id: 'urgency', label: 'Detecting urgency manipulation', icon: AlertTriangle },
  { id: 'trust', label: 'Calculating trust score', icon: Gauge },
  { id: 'explain', label: 'Generating AI explanation', icon: Sparkles },
];

export const PHASE_MS = 750;
export const MIN_SCAN_MS = 3200;
