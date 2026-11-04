/** Footprint symbols, the name banner, and Manthan's pacing footprints. */

export function FootprintDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <symbol id="foot-r" viewBox="0 0 10 22" overflow="visible">
          <path d="M5.6 0.3C8.4 0.5 9.7 3.2 9.5 6.4 9.3 9.4 8 11.2 7.7 13.1H2.9C2.5 11 0.6 9.3 0.6 6.1 0.6 2.6 2.6 0.1 5.6 0.3Z" />
          <path d="M3 15.1C3 14.5 3.6 14.2 5.3 14.2 7 14.2 7.6 14.5 7.6 15.1V19.4C7.6 20.9 6.6 21.7 5.3 21.7 4 21.7 3 20.9 3 19.4Z" />
        </symbol>
        <symbol id="foot-l" viewBox="0 0 10 22" overflow="visible">
          <g transform="translate(10 0) scale(-1 1)">
            <use href="#foot-r" width="10" height="22" />
          </g>
        </symbol>
      </defs>
    </svg>
  );
}

/** A footprint centred on (x, y), toes pointing along `angle` (degrees, 0 = up). */
export function Foot({
  x,
  y,
  angle,
  left,
  scale = 1,
  className,
  style,
}: {
  x: number;
  y: number;
  angle: number;
  left: boolean;
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <use
      href={left ? "#foot-l" : "#foot-r"}
      width="10"
      height="22"
      transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(1)}) scale(${scale}) translate(-5 -11)`}
      className={className}
      style={style}
    />
  );
}

/** The little name scroll that hovers over a set of footprints. */
export function Banner({ x, y, label, sub }: { x: number; y: number; label: string; sub?: string }) {
  const w = Math.max(label.length * 6.4, (sub?.length ?? 0) * 5.1) + 22;
  const h = sub ? 30 : 19;
  return (
    <g transform={`translate(${(x - w / 2).toFixed(1)} ${(y - h).toFixed(1)})`}>
      <path d={`M-7 4 L2 4 L2 ${h + 2} L-7 ${h + 2} L-3 ${(h + 6) / 2} Z`} fill="var(--color-paper-deep)" stroke="var(--ink-line)" strokeWidth="0.8" />
      <path
        d={`M${w + 7} 4 L${w - 2} 4 L${w - 2} ${h + 2} L${w + 7} ${h + 2} L${w + 3} ${(h + 6) / 2} Z`}
        fill="var(--color-paper-deep)"
        stroke="var(--ink-line)"
        strokeWidth="0.8"
      />
      <rect width={w} height={h} fill="var(--color-paper)" stroke="var(--ink-line)" strokeWidth="0.9" />
      <rect x="2" y="2" width={w - 4} height={h - 4} fill="none" stroke="var(--ink-line)" strokeWidth="0.4" />
      <text
        x={w / 2}
        y={sub ? 13 : 13.2}
        textAnchor="middle"
        fill="var(--color-ink)"
        style={{ fontFamily: "var(--font-display)", fontSize: 11.5, fontStyle: "italic" }}
      >
        {label}
      </text>
      {sub && (
        <text
          x={w / 2}
          y={24}
          textAnchor="middle"
          fill="var(--color-ink-soft)"
          style={{ fontFamily: "var(--font-display)", fontSize: 8.5, fontStyle: "italic" }}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

/** Footprints walking a small loop forever, with a name banner — pure CSS. */
export function PacingFootprints({
  label,
  sub,
  className,
}: {
  label: string;
  sub?: string;
  className?: string;
}) {
  const steps = 10;
  const cx = 90;
  const cy = 74;
  const rx = 40;
  const ry = 17;
  const cycle = 6;
  return (
    <svg viewBox="0 0 180 104" className={className} aria-hidden="true" overflow="visible">
      <g className="pace" fill="var(--color-ink)" style={{ "--cycle": `${cycle}s` } as React.CSSProperties}>
        {Array.from({ length: steps }, (_, i) => {
          const t = (i / steps) * Math.PI * 2;
          const left = i % 2 === 0;
          const off = left ? -4 : 4;
          // tangent of a clockwise ellipse walk
          const tx = -rx * Math.sin(t);
          const ty = ry * Math.cos(t);
          const len = Math.hypot(tx, ty);
          const nx = -ty / len;
          const ny = tx / len;
          const x = cx + rx * Math.cos(t) + nx * off;
          const y = cy + ry * Math.sin(t) + ny * off;
          const angle = (Math.atan2(ty, tx) * 180) / Math.PI + 90;
          return (
            <Foot
              key={i}
              x={x}
              y={y}
              angle={angle}
              left={left}
              scale={0.62}
              style={{ "--d": `${(i / steps) * cycle}s` } as React.CSSProperties}
            />
          );
        })}
      </g>
      <Banner x={cx} y={38} label={label} sub={sub} />
    </svg>
  );
}
