"use client";

import { useEffect, useMemo, useRef } from "react";
import Compass from "@/components/map/Compass";
import { profile, rooms, spotlight } from "@/content";
import { buildPlan, sampleLoop, type Layout } from "./geometry";
import { desktop, mobile } from "./layouts";

const STEP = 14; // distance between footprints, in plan units
const STEP_MS = 400; // time between footprints
const TRAIL = 10;
const ZOOM_MS = 620;

const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`;
const u = (n: number) => `calc(var(--u) * ${n})`;

function PlanDrawing({ L, onEnter }: { L: Layout; onEnter: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void }) {
  const g = useMemo(() => buildPlan(L), [L]);
  const box = useRef<HTMLDivElement>(null);
  const feet = useRef<(SVGUseElement | null)[]>([]);
  const banner = useRef<HTMLDivElement>(null);

  // Manthan's footprints doing their rounds, with his name above them.
  useEffect(() => {
    const path = sampleLoop(L.walk, STEP);
    const N = path.length;
    let i = 0;
    let timer: number | undefined;
    let visible = false;

    const place = () => {
      for (let k = 0; k < TRAIL; k++) {
        const el = feet.current?.[k];
        if (!el) continue;
        const j = (i - k + N) % N;
        const p = path[j];
        const left = j % 2 === 0;
        const side = left ? -3.4 : 3.4;
        const x = p.x - Math.sin(p.a) * side;
        const y = p.y + Math.cos(p.a) * side;
        const deg = (p.a * 180) / Math.PI + 90;
        el.setAttribute("href", left ? "#foot-l" : "#foot-r");
        el.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${deg.toFixed(0)}) scale(0.5) translate(-5 -11)`);
        el.style.opacity = String(0.9 * (1 - k / TRAIL));
      }
      const head = path[i];
      if (banner.current) banner.current.style.transform = `translate(${u(head.x)}, ${u(head.y - 18)}) translate(-50%, -100%)`;
    };

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let best = Infinity;
    path.forEach((p, j) => {
      const dist = Math.hypot(p.x - L.walkFrom[0], p.y - L.walkFrom[1]);
      if (dist < best) {
        best = dist;
        i = j;
      }
    });
    place();
    if (reduce) return;

    const tick = () => {
      i = (i + 1) % N;
      place();
    };
    const run = () => {
      window.clearInterval(timer);
      timer = visible && !document.hidden ? window.setInterval(tick, STEP_MS) : undefined;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      run();
    });
    if (box.current) io.observe(box.current);
    document.addEventListener("visibilitychange", run);
    return () => {
      window.clearInterval(timer);
      io.disconnect();
      document.removeEventListener("visibilitychange", run);
    };
  }, [L]);

  return (
    <div
      ref={box}
      className="plan-drawing relative"
      style={{ aspectRatio: `${L.w} / ${L.h}`, "--u": `calc(100cqw / ${L.w})` } as React.CSSProperties}
    >
      {/* The hatched walls get their own layer so they can fade in on the GPU
          while the lines above them draw themselves. */}
      <svg
        viewBox={`0 0 ${L.w} ${L.h}`}
        className="plan-fill absolute inset-0 h-full w-full"
        aria-hidden="true"
        data-ink="fade"
        style={{ "--d": "1s" } as React.CSSProperties}
      >
        <defs>
          <pattern id={`hatch-${L.key}`} width="3.4" height="3.4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="3.4" stroke="var(--color-ink)" strokeWidth="1.15" strokeOpacity="0.62" />
          </pattern>
        </defs>
        <path d={g.fill} fill={`url(#hatch-${L.key})`} fillRule="evenodd" suppressHydrationWarning />
      </svg>
      <svg viewBox={`0 0 ${L.w} ${L.h}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true" data-ink="fade">
        <g fill="none" stroke="var(--ink-line)" strokeLinecap="round" strokeLinejoin="round">
          <path className="draw" pathLength={1} d={g.walls} strokeWidth="1.25" style={{ "--dur": "2.6s" } as React.CSSProperties} suppressHydrationWarning />
          <path
            className="draw"
            pathLength={1}
            d={g.swings}
            strokeWidth="0.7"
            strokeOpacity="0.7"
            style={{ "--d": "1.7s", "--dur": "1s" } as React.CSSProperties}
          />
          <path
            className="draw"
            pathLength={1}
            d={g.furniture + (L.arcs ?? "")}
            strokeWidth="0.8"
            strokeOpacity="0.8"
            style={{ "--d": "1.9s", "--dur": "1.8s" } as React.CSSProperties}
            suppressHydrationWarning
          />
          {g.dashed && (
            <path className="plan-dashed" d={g.dashed} strokeWidth="0.8" strokeDasharray="3 4" strokeOpacity="0.6" suppressHydrationWarning />
          )}
        </g>
      </svg>

      {/* Manthan on his rounds */}
      <svg viewBox={`0 0 ${L.w} ${L.h}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" data-ink="fade" style={{ "--d": "2.4s" } as React.CSSProperties}>
        <g fill="var(--color-ink)">
          {Array.from({ length: TRAIL }, (_, k) => (
            <use
              key={k}
              ref={(el) => {
                feet.current[k] = el;
              }}
              href="#foot-l"
              width="10"
              height="22"
              style={{ opacity: 0 }}
            />
          ))}
        </g>
      </svg>
      <div ref={banner} className="plan-banner" aria-hidden="true" data-ink="fade" style={{ "--d": "2.6s" } as React.CSSProperties}>
        Manthan Mehta
      </div>

      {L.rooms.map((r) => {
        if (r.shape.kind !== "ngon") return null;
        const room = rooms.find((x) => x.id === r.id)!;
        const below = r.shape.cy + r.shape.r + L.t + 7;
        return (
          <p
            key={`${r.id}-note`}
            className="plan-note"
            aria-hidden="true"
            data-ink="fade"
            style={{ left: pct(r.shape.cx, L.w), top: pct(below, L.h), "--d": "2s" } as React.CSSProperties}
          >
            {room.peek}
          </p>
        );
      })}

      {L.rooms.map((r, i) => {
        const room = rooms.find((x) => x.id === r.id)!;
        const round = r.shape.kind === "ngon";
        return (
          <a
            key={r.id}
            href={`#${r.id}`}
            onClick={(e) => onEnter(e, r.id)}
            className={`plan-room ${round ? "plan-room-round" : ""}`}
            style={
              {
                left: pct(r.label.x, L.w),
                top: pct(r.label.y, L.h),
                width: pct(r.label.w, L.w),
                height: pct(r.label.h, L.h),
                "--d": `${1.2 + i * 0.12}s`,
              } as React.CSSProperties
            }
            data-ink="fade"
          >
            <span className="plan-room-name">
              <span className="plan-room-numeral">{room.numeral}</span>
              {round ? <br /> : " · "}
              {room.name}
            </span>
            <span className="plan-room-plain">{room.plain}</span>
            {/* towers are too small to hold it; there it's written underneath */}
            <span className={round ? "sr-only" : "plan-room-peek"}>{room.peek}</span>
            {!round && (
              <span className="plan-room-enter" aria-hidden="true">
                enter →
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}

function Cartouche() {
  return (
    <header className="plan-cartouche">
      <p data-ink className="smallcaps plan-c-messrs" style={{ "--d": "0.3s" } as React.CSSProperties}>
        Messrs. Python, Gemini, Unity &amp; C++
      </p>
      <p data-ink className="plan-c-purveyors" style={{ "--d": "0.45s" } as React.CSSProperties}>
        Purveyors of Aids to Magical Engineers, are proud to present
      </p>
      <h1 className="plan-c-name">
        <span data-ink className="block" style={{ "--d": "0.6s" } as React.CSSProperties}>
          Manthan
        </span>
        <span data-ink className="block pl-[0.85em] italic" style={{ "--d": "0.8s" } as React.CSSProperties}>
          Mehta
        </span>
      </h1>
      <p data-ink className="plan-c-role" style={{ "--d": "1s" } as React.CSSProperties}>
        {profile.role}
      </p>
      <p data-ink className="plan-c-where" style={{ "--d": "1.1s" } as React.CSSProperties}>
        MS at Arizona State · graduating May 2027
      </p>
      <p data-ink className="plan-c-links" style={{ "--d": "1.25s" } as React.CSSProperties}>
        <a className="ink-link" href={profile.resume} download="Manthan_Mehta_Resume.pdf">
          Résumé
        </a>
        <a className="ink-link" href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a className="ink-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a className="ink-link" href={`mailto:${profile.email}`}>
          Email
        </a>
      </p>
    </header>
  );
}

/** The work Manthan is proudest of, pinned to the plan like a note. */
function Spotlight() {
  return (
    <a href={spotlight.href} className="plan-spotlight" data-ink style={{ "--d": "1.5s" } as React.CSSProperties}>
      <span className="plan-spotlight-tape" aria-hidden="true" />
      <span className="plan-spotlight-figure">{spotlight.figure}</span>
      <span className="plan-spotlight-text">
        <span className="smallcaps plan-spotlight-kicker">{spotlight.kicker}</span>
        <span className="plan-spotlight-role">{spotlight.role}</span>
        <span className="plan-spotlight-where">{spotlight.where}</span>
        <span className="plan-spotlight-line">
          {spotlight.line} <span className="plan-spotlight-more">Read it →</span>
        </span>
      </span>
    </a>
  );
}

function Key() {
  return (
    <div className="plan-key" data-ink style={{ "--d": "2.6s" } as React.CSSProperties}>
      <p className="smallcaps plan-key-title">Key</p>
      <p className="plan-key-row">
        <svg viewBox="0 0 22 14" aria-hidden="true">
          <rect x="1" y="1" width="20" height="12" fill="rgb(125 35 22 / 0.08)" stroke="var(--ink-line)" strokeWidth="1" />
        </svg>
        <span>
          A room. <span className="only-hover">Click</span>
          <span className="only-touch">Tap</span> to go in, or just scroll.
        </span>
      </p>
      <p className="plan-key-row">
        <svg viewBox="0 0 22 14" aria-hidden="true">
          <use href="#foot-l" width="5" height="11" transform="translate(4 1.5)" fill="var(--color-ink)" />
          <use href="#foot-r" width="5" height="11" transform="translate(13 1.5)" fill="var(--color-ink)" />
        </svg>
        <span>Manthan, on his rounds.</span>
      </p>
    </div>
  );
}

/**
 * The first thing the map shows: the whole castle as a floor plan. Each room
 * says what's inside it; clicking one zooms into it and lands on that section.
 */
export default function Plan() {
  const ref = useRef<HTMLElement>(null);
  const busy = useRef(false);

  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const target = document.getElementById(id);
    const plan = ref.current;
    if (!target || !plan) return;
    e.preventDefault();
    if (busy.current) return;

    const land = () => {
      target.scrollIntoView({ behavior: "instant", block: "start" });
      history.pushState(null, "", `#${id}`);
      // move keyboard focus with the visitor
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      land();
      return;
    }

    busy.current = true;
    const pr = plan.getBoundingClientRect();
    const rr = e.currentTarget.getBoundingClientRect();
    plan.style.transformOrigin = `${rr.left + rr.width / 2 - pr.left}px ${rr.top + rr.height / 2 - pr.top}px`;
    plan.classList.add("plan-zoom");
    // the rest of the page steps back so the growing plan doesn't collide with it
    document.documentElement.classList.add("plan-zooming");
    window.setTimeout(() => {
      land();
      document.documentElement.classList.remove("plan-zooming");
      // put the plan back without animating, now that it's off screen
      plan.style.transition = "none";
      plan.classList.remove("plan-zoom");
      void plan.offsetWidth;
      plan.style.transition = "";
      busy.current = false;
    }, ZOOM_MS);
  };

  return (
    <section ref={ref} id="plan" className="plan @container" aria-label="Plan of the map">
      <div className="plan-inner">
        <Cartouche />

        <div className="plan-tall-spotlight">
          <Spotlight />
        </div>

        <div className="plan-wide">
          <PlanDrawing L={desktop} onEnter={onEnter} />
          <div className="plan-wide-spotlight">
            <Spotlight />
          </div>
          <div className="plan-compass" data-ink style={{ "--d": "1.4s" } as React.CSSProperties}>
            <Compass className="w-full" />
            <p className="plan-compass-caption">Point Me. It follows your wand.</p>
          </div>
          <p className="plan-entrance smallcaps" data-ink style={{ "--d": "2.2s" } as React.CSSProperties}>
            Entrance
          </p>
          <Key />
        </div>

        <div className="plan-tall @container">
          <PlanDrawing L={mobile} onEnter={onEnter} />
        </div>
        <div className="plan-tall-key">
          <Key />
        </div>
      </div>
    </section>
  );
}
