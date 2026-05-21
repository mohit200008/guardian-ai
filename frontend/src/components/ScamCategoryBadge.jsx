import { Tag } from 'lucide-react';

const CATEGORY_STYLES = {
  'Banking Scam': 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-200',
  'KYC Scam': 'from-purple-500/20 to-violet-500/10 border-purple-500/30 text-purple-200',
  'Delivery Scam': 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-200',
  'Reward Scam': 'from-emerald-500/20 to-green-500/10 border-emerald-500/30 text-emerald-200',
  'Payment Scam': 'from-orange-500/20 to-red-500/10 border-orange-500/30 text-orange-200',
  'Credential Harvesting': 'from-red-500/20 to-rose-500/10 border-red-500/30 text-red-200',
};

export default function ScamCategoryBadge({ category }) {
  if (!category) return null;
  const style =
    CATEGORY_STYLES[category] ??
    'from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-200';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border bg-gradient-to-r px-4 py-1.5 text-sm font-semibold ${style}`}
    >
      <Tag className="h-3.5 w-3.5" />
      {category}
    </span>
  );
}
