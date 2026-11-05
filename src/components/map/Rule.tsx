/** A hand-inked divider with a small lozenge, drawn when it scrolls into view. */
export default function Rule({ className = "" }: { className?: string }) {
  return (
    <svg data-ink viewBox="0 0 600 20" preserveAspectRatio="none" className={`h-5 w-full ${className}`} aria-hidden="true">
      <g fill="none" stroke="var(--ink-line)" strokeLinecap="round" filter="url(#wobble)">
        <path className="draw" pathLength={1} strokeWidth="0.9" d="M4 10 C 120 8, 200 12, 284 10" style={{ "--dur": "1.4s" } as React.CSSProperties} />
        <path className="draw" pathLength={1} strokeWidth="0.9" d="M316 10 C 400 12, 480 8, 596 10" style={{ "--dur": "1.4s" } as React.CSSProperties} />
        <path className="draw" pathLength={1} strokeWidth="1" d="M300 3 L307 10 L300 17 L293 10 Z" style={{ "--d": "0.8s", "--dur": "0.6s" } as React.CSSProperties} />
      </g>
    </svg>
  );
}

/** "{m}" in a sentence becomes an underlined, emphasised metric. */
export function WithMetric({ text, metric }: { text: string; metric: string }) {
  const [before, after = ""] = text.split("{m}");
  return (
    <>
      {before}
      <span className="mark">{metric}</span>
      {after}
    </>
  );
}

export function d(seconds: number) {
  return { "--d": `${seconds}s` } as React.CSSProperties;
}
