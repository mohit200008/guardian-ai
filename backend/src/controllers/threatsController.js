import { getThreatData } from '../utils/loadThreatData.js';

export function getDemoThreats(_req, res) {
  const { demoThreats } = getThreatData();
  const messageThreats = demoThreats.threats.filter((t) => t.type !== 'url');
  res.json({
    success: true,
    source: demoThreats.source,
    data: messageThreats.map((t) => ({
      id: t.id,
      title: t.title,
      category: t.category,
      icon: t.icon || 'building',
      content: t.message,
      tactics: t.tactics,
      riskLevel: t.riskLevel,
      suspiciousKeywords: t.suspiciousKeywords,
    })),
  });
}
