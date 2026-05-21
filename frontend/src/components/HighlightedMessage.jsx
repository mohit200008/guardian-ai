import GlassCard from './ui/GlassCard';

export default function HighlightedMessage({ text, phrases = [] }) {
  if (!text) return null;

  let parts = [{ text, highlight: false }];

  if (phrases.length > 0) {
    const sorted = [...phrases].sort((a, b) => b.length - a.length);
    parts = [];
    let remaining = text;

    while (remaining.length > 0) {
      let earliest = { index: remaining.length, phrase: null };
      for (const phrase of sorted) {
        const idx = remaining.toLowerCase().indexOf(phrase.toLowerCase());
        if (idx !== -1 && idx < earliest.index) {
          earliest = { index: idx, phrase };
        }
      }
      if (!earliest.phrase) {
        parts.push({ text: remaining, highlight: false });
        break;
      }
      if (earliest.index > 0) {
        parts.push({ text: remaining.slice(0, earliest.index), highlight: false });
      }
      parts.push({
        text: remaining.slice(earliest.index, earliest.index + earliest.phrase.length),
        highlight: true,
      });
      remaining = remaining.slice(earliest.index + earliest.phrase.length);
    }
  }

  return (
    <GlassCard>
      <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
        Original content — suspicious phrases highlighted
      </p>
      <p className="text-sm text-slate-300 font-mono leading-relaxed whitespace-pre-wrap break-words">
        {parts.map((p, i) =>
          p.highlight ? (
            <mark
              key={i}
              className="rounded bg-red-500/25 text-red-100 px-0.5 border-b border-red-400/50"
            >
              {p.text}
            </mark>
          ) : (
            <span key={i}>{p.text}</span>
          )
        )}
      </p>
    </GlassCard>
  );
}
