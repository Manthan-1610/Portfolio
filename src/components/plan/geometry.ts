/**
 * The castle's floor plan, drawn the way an architect would: walls are solid
 * hatched bands with openings for doors, each internal door has its swing
 * drawn, towers hang off the main block on short passages.
 *
 * Everything is generated from room shapes so the two layouts (landscape for
 * desktop, portrait for phones) only need coordinates.
 */

import { roughen } from "@/components/map/rough";

export type Pt = [number, number];

export type Shape =
  | { kind: "rect"; x: number; y: number; w: number; h: number }
  /** Regular n-gon with flat sides facing the four compass points. */
  | { kind: "ngon"; cx: number; cy: number; r: number; n: number };

/** A door through a straight wall. `axis` is the wall's direction. */
export type Door = { x: number; y: number; w: number; axis: "h" | "v"; into?: 1 | -1 };

/** A short covered passage between two walls. */
export type Passage = { axis: "h" | "v"; from: number; to: number; at: number; w: number };

export type PlanRoom = { id: string; shape: Shape; label: Rect; align?: "center" };
export type Rect = { x: number; y: number; w: number; h: number };

export type Layout = {
  key: string;
  w: number;
  h: number;
  t: number; // half the wall thickness
  block: Pt[]; // outline of the main block, along the wall centre line
  rooms: PlanRoom[];
  doors: Door[];
  passages: Passage[];
  furniture: string; // plain M/L path data
  dashed?: string; // path data drawn dashed (the Room of Requirement shifting about)
  arcs?: string; // extra curved path data, not roughened
  walk: Pt[]; // closed loop for Manthan's footprints
  walkFrom: Pt; // where the walk starts: somewhere its first stretch crosses no lettering
};

/* ------------------------------------------------------------ polygons */

function signedArea(v: Pt[]) {
  let a = 0;
  for (let i = 0; i < v.length; i++) {
    const [x1, y1] = v[i];
    const [x2, y2] = v[(i + 1) % v.length];
    a += x1 * y2 - x2 * y1;
  }
  return a / 2;
}

/** Offsets a polygon outward by `d` (negative = inward), mitring the corners. */
export function offsetPoly(v: Pt[], d: number): Pt[] {
  const s = signedArea(v) > 0 ? 1 : -1;
  const normal = (a: Pt, b: Pt): Pt => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    return [(s * dy) / len, (-s * dx) / len];
  };
  return v.map((p, i) => {
    const prev = v[(i - 1 + v.length) % v.length];
    const next = v[(i + 1) % v.length];
    const n1 = normal(prev, p);
    const n2 = normal(p, next);
    const k = 1 + n1[0] * n2[0] + n1[1] * n2[1];
    return [p[0] + (d * (n1[0] + n2[0])) / k, p[1] + (d * (n1[1] + n2[1])) / k];
  });
}

export function shapeVerts(s: Shape): Pt[] {
  if (s.kind === "rect") {
    return [
      [s.x, s.y],
      [s.x + s.w, s.y],
      [s.x + s.w, s.y + s.h],
      [s.x, s.y + s.h],
    ];
  }
  const out: Pt[] = [];
  for (let k = 0; k < s.n; k++) {
    const a = Math.PI / s.n + (2 * Math.PI * k) / s.n;
    out.push([s.cx + s.r * Math.cos(a), s.cy + s.r * Math.sin(a)]);
  }
  return out;
}

export function shapeBox(s: Shape): Rect {
  if (s.kind === "rect") return { x: s.x, y: s.y, w: s.w, h: s.h };
  return { x: s.cx - s.r, y: s.cy - s.r, w: s.r * 2, h: s.r * 2 };
}

/* ---------------------------------------------------------------- walls */

const f = (n: number) => (Math.abs(n) < 1e-9 ? "0" : n.toFixed(1));

function closedPath(v: Pt[]) {
  return `M${v.map((p) => `${f(p[0])} ${f(p[1])}`).join(" L")} Z`;
}

function rectPath(x0: number, y0: number, x1: number, y1: number) {
  return closedPath([
    [x0, y0],
    [x1, y0],
    [x1, y1],
    [x0, y1],
  ]);
}

type Gap = [number, number]; // an interval along a straight edge

/** Openings that cut a given straight edge, in that edge's coordinate. */
function gapsFor(a: Pt, b: Pt, doors: Door[], t: number): Gap[] {
  const horizontal = Math.abs(a[1] - b[1]) < 0.01;
  const vertical = Math.abs(a[0] - b[0]) < 0.01;
  const out: Gap[] = [];
  for (const d of doors) {
    if (d.axis === "h" && horizontal && Math.abs(Math.abs(a[1] - d.y) - t) < 0.6) {
      const lo = Math.min(a[0], b[0]);
      const hi = Math.max(a[0], b[0]);
      if (d.x + d.w / 2 > lo && d.x - d.w / 2 < hi) out.push([d.x - d.w / 2, d.x + d.w / 2]);
    }
    if (d.axis === "v" && vertical && Math.abs(Math.abs(a[0] - d.x) - t) < 0.6) {
      const lo = Math.min(a[1], b[1]);
      const hi = Math.max(a[1], b[1]);
      if (d.y + d.w / 2 > lo && d.y - d.w / 2 < hi) out.push([d.y - d.w / 2, d.y + d.w / 2]);
    }
  }
  return out;
}

/** Strokes a closed polygon, leaving openings where doors cut it. */
function strokeWithGaps(v: Pt[], doors: Door[], t: number) {
  let d = "";
  for (let i = 0; i < v.length; i++) {
    const a = v[i];
    const b = v[(i + 1) % v.length];
    const gaps = gapsFor(a, b, doors, t);
    if (!gaps.length) {
      d += `M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}`;
      continue;
    }
    const horizontal = Math.abs(a[1] - b[1]) < 0.01;
    const axis = horizontal ? 0 : 1;
    const dir = Math.sign(b[axis] - a[axis]);
    // walk from a to b, skipping each gap
    const sorted = gaps.map((g) => (dir > 0 ? g : ([g[1], g[0]] as Gap))).sort((g1, g2) => dir * (g1[0] - g2[0]));
    let cur = a[axis];
    const pt = (c: number): Pt => (horizontal ? [c, a[1]] : [a[0], c]);
    for (const [g0, g1] of sorted) {
      if (dir * (g0 - cur) > 0.5) d += `M${f(pt(cur)[0])} ${f(pt(cur)[1])} L${f(pt(g0)[0])} ${f(pt(g0)[1])}`;
      cur = g1;
    }
    if (dir * (b[axis] - cur) > 0.5) d += `M${f(pt(cur)[0])} ${f(pt(cur)[1])} L${f(b[0])} ${f(b[1])}`;
  }
  return d;
}

export function buildPlan(L: Layout) {
  const { t } = L;
  const outer = offsetPoly(L.block, t);
  const polys: Pt[][] = [outer];
  for (const r of L.rooms) {
    const v = shapeVerts(r.shape);
    if (r.shape.kind === "ngon") polys.push(offsetPoly(v, t)); // towers have their own outer wall
    polys.push(offsetPoly(v, -t));
  }

  // Walls: everything between the outlines, minus the door openings.
  let fill = polys.map(closedPath).join("");
  let strokes = polys.map((v) => strokeWithGaps(v, L.doors, t)).join("");
  let jambs = "";
  for (const d of L.doors) {
    if (d.axis === "h") {
      fill += rectPath(d.x - d.w / 2, d.y - t, d.x + d.w / 2, d.y + t);
      jambs += `M${f(d.x - d.w / 2)} ${f(d.y - t)} L${f(d.x - d.w / 2)} ${f(d.y + t)} M${f(d.x + d.w / 2)} ${f(d.y - t)} L${f(d.x + d.w / 2)} ${f(d.y + t)}`;
    } else {
      fill += rectPath(d.x - t, d.y - d.w / 2, d.x + t, d.y + d.w / 2);
      jambs += `M${f(d.x - t)} ${f(d.y - d.w / 2)} L${f(d.x + t)} ${f(d.y - d.w / 2)} M${f(d.x - t)} ${f(d.y + d.w / 2)} L${f(d.x + t)} ${f(d.y + d.w / 2)}`;
    }
  }
  const th = t * 1.3; // passage walls are a little thinner
  for (const p of L.passages) {
    const lo = p.at - p.w / 2;
    const hi = p.at + p.w / 2;
    if (p.axis === "h") {
      fill += rectPath(p.from, lo - th, p.to, lo) + rectPath(p.from, hi, p.to, hi + th);
      strokes += [lo - th, lo, hi, hi + th].map((y) => `M${f(p.from)} ${f(y)} L${f(p.to)} ${f(y)}`).join("");
    } else {
      fill += rectPath(lo - th, p.from, lo, p.to) + rectPath(hi, p.from, hi + th, p.to);
      strokes += [lo - th, lo, hi, hi + th].map((x) => `M${f(x)} ${f(p.from)} L${f(x)} ${f(p.to)}`).join("");
    }
  }

  // Door swings: a leaf and a quarter circle, on internal doors only.
  let swings = "";
  for (const d of L.doors) {
    if (!d.into) continue;
    const s = d.into;
    if (d.axis === "h") {
      const hx = d.x - d.w / 2;
      const hy = d.y + s * t;
      swings += `M${f(hx)} ${f(hy)} L${f(hx)} ${f(hy + s * d.w)} A${d.w} ${d.w} 0 0 ${s > 0 ? 0 : 1} ${f(hx + d.w)} ${f(hy)}`;
    } else {
      const hx = d.x + s * t;
      const hy = d.y - d.w / 2;
      swings += `M${f(hx)} ${f(hy)} L${f(hx + s * d.w)} ${f(hy)} A${d.w} ${d.w} 0 0 ${s > 0 ? 1 : 0} ${f(hx)} ${f(hy + d.w)}`;
    }
  }

  return {
    fill,
    walls: roughen(strokes + jambs, 41, 0.55),
    swings,
    furniture: roughen(L.furniture, 43, 0.5),
    dashed: L.dashed ? roughen(L.dashed, 47, 0.4) : "",
  };
}

/* ----------------------------------------------------------------- walk */

/** Closed Catmull-Rom through `pts`, resampled every `step` units. */
export function sampleLoop(pts: Pt[], step: number) {
  const dense: Pt[] = [];
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const segs = Math.max(6, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / 3));
    for (let k = 0; k < segs; k++) {
      const u = k / segs;
      const u2 = u * u;
      const u3 = u2 * u;
      dense.push([
        0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * u + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * u2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * u3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * u + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * u2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * u3),
      ]);
    }
  }
  dense.push(dense[0]);

  const out: { x: number; y: number; a: number }[] = [];
  let acc = 0;
  let next = 0;
  for (let i = 1; i < dense.length; i++) {
    const [ax, ay] = dense[i - 1];
    const [bx, by] = dense[i];
    const seg = Math.hypot(bx - ax, by - ay);
    while (seg > 0 && acc + seg >= next) {
      const u = (next - acc) / seg;
      out.push({ x: ax + (bx - ax) * u, y: ay + (by - ay) * u, a: Math.atan2(by - ay, bx - ax) });
      next += step;
    }
    acc += seg;
  }
  return out;
}
