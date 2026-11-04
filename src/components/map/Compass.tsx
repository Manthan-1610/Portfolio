"use client";

import { useEffect, useRef } from "react";

const R = 150;
const VIEW = `-6 -6 ${R * 2 + 12} ${R * 2 + 12}`;

// The needle is a damped spring: it chases the wand, overshoots a touch and
// settles, like a real compass. Stiffness and damping are per second.
const STIFFNESS = 90;
const DAMPING = 11;

function star(points: number, outer: number, inner: number, rot = 0) {
  const d: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = ((i * 180) / points + rot - 90) * (Math.PI / 180);
    d.push(`${(R + r * Math.cos(a)).toFixed(2)} ${(R + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${d.join(" L")} Z`;
}

/** Shaded half of each cardinal point, like an engraved compass rose. */
function shadedHalves(outer: number, inner: number) {
  const out: string[] = [];
  for (let i = 0; i < 4; i++) {
    const a = (i * 90 - 90) * (Math.PI / 180);
    const b = (i * 90 - 45) * (Math.PI / 180);
    out.push(
      `M${R} ${R} L${(R + outer * Math.cos(a)).toFixed(2)} ${(R + outer * Math.sin(a)).toFixed(2)} L${(R + inner * Math.cos(b)).toFixed(2)} ${(R + inner * Math.sin(b)).toFixed(2)} Z`,
    );
  }
  return out.join(" ");
}

const ticks = (() => {
  const t: string[] = [];
  for (let i = 0; i < 72; i++) {
    const a = (i * 5 * Math.PI) / 180;
    const long = i % 9 === 0;
    const r1 = R - 12;
    const r2 = R - (long ? 24 : 17);
    t.push(
      `M${(R + r1 * Math.cos(a)).toFixed(2)} ${(R + r1 * Math.sin(a)).toFixed(2)} L${(R + r2 * Math.cos(a)).toFixed(2)} ${(R + r2 * Math.sin(a)).toFixed(2)}`,
    );
  }
  return t.join(" ");
})();

export default function Compass({ className = "" }: { className?: string }) {
  const dialRef = useRef<SVGSVGElement>(null);
  const needleRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const dial = dialRef.current;
    const needle = needleRef.current;
    if (!dial || !needle) return;

    let angle = -28; // where the needle points, unwrapped (can exceed 360)
    let velocity = 0;
    let target = angle;
    let px = 0;
    let py = 0;
    let aim = false; // a new pointer position is waiting to be turned into a target
    let frame = 0;
    let last = 0;
    let visible = true;

    const tick = (now: number) => {
      const dt = Math.min(0.032, last ? (now - last) / 1000 : 0.016);
      last = now;
      if (aim) {
        aim = false;
        const r = dial.getBoundingClientRect();
        const raw = (Math.atan2(py - (r.top + r.height / 2), px - (r.left + r.width / 2)) * 180) / Math.PI + 90;
        // take the short way round
        target = angle + ((((raw - angle) % 360) + 540) % 360) - 180;
      }
      velocity += (STIFFNESS * (target - angle) - DAMPING * velocity) * dt;
      angle += velocity * dt;
      needle.style.transform = `rotate(${angle.toFixed(2)}deg)`;
      if (Math.abs(target - angle) < 0.05 && Math.abs(velocity) < 0.05) {
        frame = 0;
        last = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (!visible) return;
      px = e.clientX;
      py = e.clientY;
      aim = true;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    // Don't track the wand while the compass is off screen.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(dial);

    needle.style.transform = `rotate(${angle}deg)`;
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <svg ref={dialRef} viewBox={VIEW} className="block h-auto w-full" aria-hidden="true" data-ink>
        <g fill="none" stroke="var(--ink-line)" strokeLinecap="round" filter="url(#wobble)">
          <circle className="draw" pathLength={1} cx={R} cy={R} r={R - 2} strokeWidth="1.3" style={{ "--dur": "2.4s" } as React.CSSProperties} />
          <circle className="draw" pathLength={1} cx={R} cy={R} r={R - 8} strokeWidth="0.7" style={{ "--dur": "2.4s", "--d": "0.3s" } as React.CSSProperties} />
          <path className="draw" pathLength={1} d={ticks} strokeWidth="0.7" style={{ "--dur": "2s", "--d": "0.6s" } as React.CSSProperties} />
          <circle className="draw" pathLength={1} cx={R} cy={R} r={R - 44} strokeWidth="0.6" strokeDasharray="2 4" style={{ "--d": "0.8s" } as React.CSSProperties} />
          <path className="draw" pathLength={1} d={star(4, R - 52, 15, 45)} strokeWidth="0.8" style={{ "--d": "1s" } as React.CSSProperties} />
          <path className="draw" pathLength={1} d={star(4, R - 28, 22)} strokeWidth="1.1" style={{ "--d": "1.1s" } as React.CSSProperties} />
        </g>
        <path d={shadedHalves(R - 28, 22)} fill="var(--color-ink)" opacity="0.72" filter="url(#wobble)" />
        <g
          fill="var(--color-ink)"
          style={{ fontFamily: "var(--font-display)", fontSize: 19 }}
          textAnchor="middle"
          dominantBaseline="central"
        >
          <text x={R} y={-1}>N</text>
          <text x={R * 2 + 2} y={R}>E</text>
          <text x={R} y={R * 2 + 1}>S</text>
          <text x={-2} y={R}>W</text>
        </g>
      </svg>

      {/* The needle lives in its own layer, so turning it never repaints the
          dial (whose hand-drawn lines are expensive to redraw). */}
      <svg
        ref={needleRef}
        viewBox={VIEW}
        className="pointer-events-none absolute inset-0 h-full w-full will-change-transform"
        style={{ transform: "rotate(-28deg)" }}
        aria-hidden="true"
        data-ink
      >
        <path d={`M${R} ${R - 96} L${R + 7} ${R} L${R - 7} ${R} Z`} fill="var(--color-blood)" opacity="0.9" />
        <path d={`M${R} ${R + 70} L${R + 6} ${R} L${R - 6} ${R} Z`} fill="var(--color-paper)" stroke="var(--ink-line)" strokeWidth="0.9" />
        <circle cx={R} cy={R} r="5" fill="var(--color-paper)" stroke="var(--ink-line)" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
