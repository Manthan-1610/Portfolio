"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DOOR_HALF, DOOR_Y } from "./Room";
import { Banner, Foot } from "./Footprint";
import { roughen, wobbleAt } from "./rough";

type Pt = { x: number; y: number };
type Geometry = {
  H: number;
  start: number;
  gutter: number;
  mobile: boolean;
  topAbs: number;
  xs: Float32Array;
  ys: Float32Array;
  ls: Float32Array;
  total: number;
  walls: string;
  branches: string;
  stairs: string;
};

const HALF = 14; // half the corridor's width
const STEP_DESKTOP = 23;
const STEP_MOBILE = 17;
const TRAIL = 13;

/** Catmull-Rom through `pts`, sampled into an evenly spaced polyline. */
function sampleSpine(pts: Pt[], spacing = 4) {
  const dense: Pt[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    const n = Math.max(8, Math.ceil((p2.y - p1.y) / 3));
    for (let k = 0; k < n; k++) {
      const t = k / n;
      const u = 1 - t;
      dense.push({
        x: u * u * u * p1.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * p2.x,
        y: u * u * u * p1.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * p2.y,
      });
    }
  }
  dense.push(pts[pts.length - 1]);

  // resample at even arc length
  const xs: number[] = [dense[0].x];
  const ys: number[] = [dense[0].y];
  const ls: number[] = [0];
  let acc = 0;
  let next = spacing;
  for (let i = 1; i < dense.length; i++) {
    const a = dense[i - 1];
    const b = dense[i];
    const seg = Math.hypot(b.x - a.x, b.y - a.y);
    while (acc + seg >= next) {
      const t = (next - acc) / seg;
      xs.push(a.x + (b.x - a.x) * t);
      ys.push(a.y + (b.y - a.y) * t);
      ls.push(next);
      next += spacing;
    }
    acc += seg;
  }
  return { xs: Float32Array.from(xs), ys: Float32Array.from(ys), ls: Float32Array.from(ls), total: ls[ls.length - 1] };
}

function at(g: Geometry, l: number) {
  const spacing = g.ls[1] - g.ls[0] || 4;
  const i = Math.max(1, Math.min(g.xs.length - 2, Math.round(l / spacing)));
  const tx = g.xs[i + 1] - g.xs[i - 1];
  const ty = g.ys[i + 1] - g.ys[i - 1];
  const len = Math.hypot(tx, ty) || 1;
  return { x: g.xs[i], y: g.ys[i], tx: tx / len, ty: ty / len };
}

function lengthAtY(g: Geometry, y: number) {
  let lo = 0;
  let hi = g.ys.length - 1;
  if (y <= g.ys[0]) return 0;
  if (y >= g.ys[hi]) return g.total;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (g.ys[mid] < y) lo = mid;
    else hi = mid;
  }
  return g.ls[lo];
}

function build(container: HTMLElement): Geometry | null {
  const roomEls = Array.from(container.querySelectorAll<HTMLElement>("[data-room]"));
  if (!roomEls.length) return null;
  const crect = container.getBoundingClientRect();
  const gutter = Math.round(roomEls[0].getBoundingClientRect().left - crect.left);
  const mobile = gutter < 60;
  const c = mobile ? gutter / 2 : gutter * 0.46;
  const doors = roomEls.map((r) => r.getBoundingClientRect().top - crect.top + DOOR_Y);
  const end = doors[doors.length - 1] + 150;
  // The corridor begins just above the first room; the floor plan sits above it.
  const start = Math.max(0, doors[0] - 240);

  // Control points: straight through each door, gently wandering between them.
  const pts: Pt[] = [{ x: c, y: start }];
  const amp = mobile ? 2 : 9;
  let flip = 1;
  const anchors = [...doors, end];
  let prev = start;
  for (const a of anchors) {
    const from = prev + 46;
    const to = a - 46;
    const n = Math.max(0, Math.floor((to - from) / 300));
    for (let k = 1; k <= n; k++) {
      pts.push({ x: c + amp * flip * (0.6 + ((k * 37) % 10) / 25), y: from + ((to - from) * k) / (n + 1) });
      flip = -flip;
    }
    if (a !== end) {
      pts.push({ x: c, y: a - 46 }, { x: c, y: a }, { x: c, y: a + 46 });
    } else {
      pts.push({ x: c, y: a });
    }
    prev = a;
  }

  const s = sampleSpine(pts);
  let walls = "";
  let branches = "";
  let stairs = "";

  if (!mobile) {
    let left = "";
    let right = "";
    let rightOpen = false;
    for (let i = 0; i < s.xs.length; i++) {
      const j0 = Math.max(0, i - 1);
      const j1 = Math.min(s.xs.length - 1, i + 1);
      const tx = s.xs[j1] - s.xs[j0];
      const ty = s.ys[j1] - s.ys[j0];
      const len = Math.hypot(tx, ty) || 1;
      const nx = -ty / len;
      const ny = tx / len;
      const wl = HALF + wobbleAt(s.ls[i], 5);
      const wr = HALF + wobbleAt(s.ls[i], 17);
      const lx = s.xs[i] - nx * wl;
      const ly = s.ys[i] - ny * wl;
      const rx = s.xs[i] + nx * wr;
      const ry = s.ys[i] + ny * wr;
      left += `${i ? "L" : "M"}${lx.toFixed(1)} ${ly.toFixed(1)}`;
      const inDoor = doors.some((d) => Math.abs(ry - d) < DOOR_HALF);
      if (inDoor) {
        rightOpen = false;
      } else {
        right += `${rightOpen ? "L" : "M"}${rx.toFixed(1)} ${ry.toFixed(1)}`;
        rightOpen = true;
      }
    }
    walls = left + right;
    const roomX = gutter + 0.75;
    branches = roughen(
      doors
        .map((d) => `M${(c + HALF).toFixed(1)} ${d - DOOR_HALF} L${roomX} ${d - DOOR_HALF} M${(c + HALF).toFixed(1)} ${d + DOOR_HALF} L${roomX} ${d + DOOR_HALF}`)
        .join(""),
      29,
      0.7,
    );
    // a short flight of stairs down at the corridor's end
    const ex = s.xs[s.xs.length - 1];
    for (let k = 0; k <= 6; k++) {
      const y = end - k * 9;
      const w = HALF;
      stairs += `M${(ex - w).toFixed(1)} ${y} L${(ex + w).toFixed(1)} ${y}`;
    }
    stairs = roughen(stairs, 31, 0.6);
  }

  return {
    H: container.offsetHeight,
    start,
    gutter,
    mobile,
    topAbs: crect.top + window.scrollY,
    ...s,
    walls,
    branches,
    stairs,
  };
}

export default function Corridor() {
  const ref = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const [head, setHead] = useState({ idx: 0, dir: 1 });
  const [idle, setIdle] = useState(false);
  const geoRef = useRef<Geometry | null>(null);

  useLayoutEffect(() => {
    const container = ref.current?.parentElement;
    if (!container) return;
    let t: number | undefined;
    const measure = () => {
      const g = build(container);
      geoRef.current = g;
      setGeo(g);
    };
    measure();
    const ro = new ResizeObserver(() => {
      window.clearTimeout(t);
      t = window.setTimeout(measure, 120);
    });
    ro.observe(container);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let lastL = -1;
    let dir = 1;
    let idleTimer: number | undefined;
    const update = () => {
      frame = 0;
      const g = geoRef.current;
      if (!g) return;
      const readY = window.scrollY + window.innerHeight * 0.55 - g.topAbs;
      const l = lengthAtY(g, readY);
      const step = g.mobile ? STEP_MOBILE : STEP_DESKTOP;
      if (lastL >= 0 && Math.abs(l - lastL) > 2) dir = l > lastL ? 1 : -1;
      lastL = l;
      const idx = Math.floor(l / step);
      setHead((h) => (idx === h.idx && dir === h.dir ? h : { idx, dir }));
      setIdle(false);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setIdle(true), 1400);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      window.clearTimeout(idleTimer);
    };
  }, [geo]);

  const steps: React.ReactNode[] = [];
  let bannerAt: { x: number; y: number } | null = null;

  if (geo) {
    const step = geo.mobile ? STEP_MOBILE : STEP_DESKTOP;
    const off = geo.mobile ? 2.6 : 4.2;
    const scale = geo.mobile ? 0.52 : 0.72;
    const maxIdx = Math.floor(geo.total / step);
    for (let k = 0; k < TRAIL; k++) {
      const idx = head.idx - head.dir * k;
      if (idx < 0 || idx > maxIdx) continue;
      const p = at(geo, idx * step);
      const dx = p.tx * head.dir;
      const dy = p.ty * head.dir;
      const isLeft = idx % 2 === 0;
      // the walker's left, on a y-down screen, is (dy, -dx)
      const sx = dy * (isLeft ? off : -off);
      const sy = -dx * (isLeft ? off : -off);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      // keep the banner ahead of the walker so it never covers the trail
      if (k === 0) bannerAt = { x: p.x, y: head.dir > 0 ? p.y + 36 : p.y - 16 };
      steps.push(
        <Foot
          key={`${idx}:${head.dir}`}
          x={p.x + sx}
          y={p.y + sy}
          angle={angle}
          left={isLeft}
          scale={scale}
          className={idle && k < 2 ? (k === 0 ? "shuffle-a" : "shuffle-b") : "step"}
          style={{ opacity: 1 - (k / TRAIL) * 0.9 }}
        />,
      );
    }
  }

  return (
    <div ref={ref} className="corridor pointer-events-none absolute left-0 top-0 z-0" aria-hidden="true">
      {geo && !geo.mobile && (
        <svg
          data-ink
          width={geo.gutter + 2}
          height={geo.H}
          className="absolute left-0 top-0 overflow-visible"
          style={{
            maskImage: `linear-gradient(to bottom, transparent ${geo.start}px, #000 ${geo.start + 140}px)`,
            WebkitMaskImage: `linear-gradient(to bottom, transparent ${geo.start}px, #000 ${geo.start + 140}px)`,
          }}
        >
          <g fill="none" stroke="var(--ink-line)" strokeLinecap="round" strokeLinejoin="round">
            <path className="draw" pathLength={1} strokeWidth="1.2" d={geo.walls} style={{ "--dur": "4s" } as React.CSSProperties} />
            <path className="draw" pathLength={1} strokeWidth="1.2" d={geo.branches} style={{ "--d": "1.2s", "--dur": "1.5s" } as React.CSSProperties} />
            <path className="draw" pathLength={1} strokeWidth="0.8" d={geo.stairs} style={{ "--d": "2s", "--dur": "1s" } as React.CSSProperties} />
          </g>
        </svg>
      )}
      {geo && (
        <svg width={geo.gutter + 2} height={geo.H} className="absolute left-0 top-0 overflow-visible">
          <g fill="var(--color-ink)">{steps}</g>
          {bannerAt && !geo.mobile && (
            <g style={{ transform: `translate(${(bannerAt as Pt).x}px, ${(bannerAt as Pt).y}px)`, transition: "transform 0.45s ease-out" }}>
              <Banner x={0} y={0} label="You are here" />
            </g>
          )}
        </svg>
      )}
    </div>
  );
}
