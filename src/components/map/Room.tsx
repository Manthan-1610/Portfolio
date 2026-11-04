"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { roughen } from "./rough";

export const DOOR_Y = 80;
export const DOOR_HALF = 15;

type Decor = "stairs" | "windows" | "hearth";

const O = 0.75; // outer wall inset
const T = 7; // inner wall inset (wall thickness)

function walls(W: number, H: number, inset: number, gap: [number, number]) {
  const i = inset;
  return [
    `M${gap[1]} ${i} L${W - i} ${i} L${W - i} ${H - i} L${i} ${H - i} L${i} ${DOOR_Y + DOOR_HALF}`,
    `M${i} ${DOOR_Y - DOOR_HALF} L${i} ${i} L${gap[0]} ${i}`,
  ].join(" ");
}

function decorPaths(kind: Decor, W: number, H: number): string {
  if (kind === "stairs") {
    const x0 = W - T - 156;
    const y0 = H - T - 46;
    let d = `M${x0} ${H - T} L${x0} ${y0} L${W - T} ${y0}`;
    for (let x = x0 + 12; x < W - T; x += 12) d += ` M${x} ${y0} L${x} ${H - T}`;
    const ay = y0 + 23;
    d += ` M${x0 + 10} ${ay} L${W - T - 18} ${ay} M${W - T - 26} ${ay - 5} L${W - T - 18} ${ay} L${W - T - 26} ${ay + 5}`;
    return d;
  }
  if (kind === "windows") {
    const mid = W - (O + T) / 2;
    return [0.28, 0.5, 0.72]
      .map((f) => {
        const y = Math.round(H * f);
        return `M${mid} ${y - 26} L${mid} ${y + 26} M${W - T} ${y - 26} L${W - O} ${y - 26} M${W - T} ${y + 26} L${W - O} ${y + 26}`;
      })
      .join(" ");
  }
  // hearth: a fireplace set into the top wall, hatched
  const x0 = W - T - 220;
  const w = 84;
  const h = 16;
  let d = `M${x0} ${T} L${x0} ${T + h} L${x0 + w} ${T + h} L${x0 + w} ${T}`;
  for (let k = 8; k < w + h; k += 8) {
    const ax = x0 + Math.min(k, w);
    const ay = T + Math.max(0, k - w);
    const bx = x0 + Math.max(0, k - h);
    const by = T + Math.min(k, h);
    d += ` M${ax} ${ay} L${bx} ${by}`;
  }
  return d;
}

export default function Room({
  id,
  numeral,
  name,
  decor = [],
  className = "",
  children,
}: {
  id: string;
  numeral: string;
  name: string;
  decor?: Decor[];
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<{ W: number; H: number; L: number } | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const W = Math.round(el.offsetWidth);
      const H = Math.round(el.offsetHeight);
      const L = Math.round(labelRef.current?.offsetWidth ?? 160);
      setSize((s) => (s && s.W === W && s.H === H && s.L === L ? s : { W, H, L }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const gap: [number, number] | null = size ? [52, 52 + size.L + 36] : null;
  const wide = (size?.W ?? 0) > 700;

  return (
    <section ref={ref} id={id} data-room className={`relative scroll-mt-24 ${className}`}>
      {size && gap && (
        <svg
          data-ink
          className="pointer-events-none absolute inset-0 overflow-visible"
          width={size.W}
          height={size.H}
          aria-hidden="true"
          style={{ "--d": "0s" } as React.CSSProperties}
        >
          <g fill="none" stroke="var(--ink-line)" strokeLinecap="round" strokeLinejoin="round">
            <path className="draw" pathLength={1} strokeWidth="1.5" d={roughen(walls(size.W, size.H, O, gap), 3)} style={{ "--dur": "3s" } as React.CSSProperties} />
            <path className="draw" pathLength={1} strokeWidth="1" d={roughen(walls(size.W, size.H, T, gap), 11, 0.9)} style={{ "--dur": "3.2s" } as React.CSSProperties} />
            <path
              className="draw"
              pathLength={1}
              strokeWidth="1"
              d={`M${gap[0]} ${O} L${gap[0]} ${T} M${gap[1]} ${O} L${gap[1]} ${T} M${O} ${DOOR_Y - DOOR_HALF} L${T} ${DOOR_Y - DOOR_HALF} M${O} ${DOOR_Y + DOOR_HALF} L${T} ${DOOR_Y + DOOR_HALF}`}
              style={{ "--d": "1.4s", "--dur": "0.8s" } as React.CSSProperties}
            />
            {wide &&
              decor.map((k) => (
                <path
                  key={k}
                  className="draw"
                  pathLength={1}
                  strokeWidth="0.85"
                  d={roughen(decorPaths(k, size.W, size.H), 23, 0.7)}
                  style={{ "--d": "1.6s", "--dur": "2s" } as React.CSSProperties}
                />
              ))}
          </g>
        </svg>
      )}

      <p className="absolute left-[60px] top-0 m-0 -translate-y-1/2 leading-none">
        <span
          ref={labelRef}
          data-ink
          className="smallcaps inline-block whitespace-nowrap px-2 text-[11px] tracking-[0.3em] text-ink-soft sm:text-[12.5px]"
          style={{ "--d": "0.5s" } as React.CSSProperties}
        >
          {numeral} · {name}
        </span>
      </p>

      {children}
    </section>
  );
}
