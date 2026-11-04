import type { Layout, Pt } from "./geometry";

/* Small helpers for furniture drawn in plain M/L path data. */
const rect = (x: number, y: number, w: number, h: number) => `M${x} ${y} L${x + w} ${y} L${x + w} ${y + h} L${x} ${y + h} L${x} ${y}`;
const line = (x1: number, y1: number, x2: number, y2: number) => `M${x1} ${y1} L${x2} ${y2}`;
const circle = (cx: number, cy: number, r: number) => `M${cx - r} ${cy} A${r} ${r} 0 1 0 ${cx + r} ${cy} A${r} ${r} 0 1 0 ${cx - r} ${cy}`;

/** A long hall table with a bench either side. */
function table(x: number, y: number, w: number) {
  return rect(x, y, w, 8) + line(x + 6, y - 6, x + w - 6, y - 6) + line(x + 6, y + 14, x + w - 6, y + 14);
}

/** A bookcase seen from above, with the books' spines. */
function bookcase(x: number, y: number, w: number, h: number) {
  let d = rect(x, y, w, h);
  for (let k = y + 5; k < y + h - 2; k += 5) d += line(x, k, x + w, k);
  return d;
}

/** A workbench with a few things being built on it. */
function workbench(x: number, y: number, w: number, h: number) {
  let d = rect(x, y, w, h);
  for (let k = 0; k < 3; k++) {
    const bx = x + 10 + k * ((w - 30) / 2);
    d += rect(bx, y + h / 2 - 4, 10, 8);
  }
  return d;
}

/** A display case: a square inside a square. */
function vitrine(x: number, y: number, s: number) {
  return rect(x, y, s, s) + rect(x + 5, y + 5, s - 10, s - 10);
}

/** Perches round the inside of a round tower, skipping the doorway. */
function perches(cx: number, cy: number, r: number, skipDeg: number) {
  let d = "";
  for (let a = 15; a < 360; a += 30) {
    if (Math.abs(((a - skipDeg + 540) % 360) - 180) < 25) continue;
    const rad = (a * Math.PI) / 180;
    d += line(
      +(cx + r * Math.cos(rad)).toFixed(1),
      +(cy + r * Math.sin(rad)).toFixed(1),
      +(cx + (r - 9) * Math.cos(rad)).toFixed(1),
      +(cy + (r - 9) * Math.sin(rad)).toFixed(1),
    );
  }
  return d;
}

/** A clock face: hands go in the furniture, the rim is an arc. */
const clockHands = (cx: number, cy: number) => line(cx, cy, cx, cy - 8) + line(cx, cy, cx + 6, cy + 3);

/** Steps down from a doorway in a horizontal wall. */
function steps(cx: number, y: number, w: number, n: number) {
  let d = "";
  for (let k = 0; k < n; k++) d += line(cx - w / 2 - k * 3, y + k * 7, cx + w / 2 + k * 3, y + k * 7);
  return d;
}

/* ---------------------------------------------------------- landscape */

const D_CLOCK = { cx: 215, cy: 470, r: 92, n: 8 };
const D_OWL = { cx: 1048, cy: 520, r: 60, n: 16 };
const dApothem = (s: { r: number; n: number }) => s.r * Math.cos(Math.PI / s.n);

export const desktop: Layout = {
  key: "wide",
  w: 1120,
  h: 690,
  t: 6,
  block: [
    [420, 150],
    [960, 150],
    [960, 600],
    [330, 600],
    [330, 390],
    [420, 390],
  ],
  rooms: [
    { id: "great-hall", shape: { kind: "rect", x: 330, y: 390, w: 290, h: 210 }, label: { x: 336, y: 396, w: 278, h: 198 } },
    {
      id: "clock-tower",
      shape: { kind: "ngon", ...D_CLOCK },
      label: { x: D_CLOCK.cx - 80, y: D_CLOCK.cy - 80, w: 160, h: 160 },
      align: "center",
    },
    {
      id: "room-of-requirement",
      shape: { kind: "rect", x: 420, y: 150, w: 340, h: 240 },
      label: { x: 426, y: 156, w: 328, h: 228 },
    },
    { id: "library", shape: { kind: "rect", x: 760, y: 150, w: 200, h: 240 }, label: { x: 766, y: 156, w: 188, h: 228 } },
    { id: "trophy-room", shape: { kind: "rect", x: 620, y: 390, w: 340, h: 210 }, label: { x: 626, y: 396, w: 328, h: 198 } },
    {
      id: "owlery",
      shape: { kind: "ngon", ...D_OWL },
      label: { x: D_OWL.cx - 50, y: D_OWL.cy - 50, w: 100, h: 100 },
      align: "center",
    },
  ],
  doors: [
    { x: 475, y: 600, w: 40, axis: "h" }, // the front door
    { x: 520, y: 390, w: 32, axis: "h", into: 1 },
    { x: 760, y: 300, w: 32, axis: "v", into: 1 },
    { x: 870, y: 390, w: 32, axis: "h", into: 1 },
    { x: 620, y: 520, w: 32, axis: "v", into: -1 },
    { x: 330, y: 470, w: 26, axis: "v" },
    { x: D_CLOCK.cx + dApothem(D_CLOCK), y: 470, w: 26, axis: "v" },
    { x: 960, y: 520, w: 18, axis: "v" },
    { x: D_OWL.cx - dApothem(D_OWL), y: 520, w: 18, axis: "v" },
  ],
  passages: [
    { axis: "h", from: D_CLOCK.cx + dApothem(D_CLOCK) + 6, to: 324, at: 470, w: 26 },
    { axis: "h", from: 966, to: D_OWL.cx - dApothem(D_OWL) - 6, at: 520, w: 18 },
  ],
  furniture: [
    table(372, 520, 214),
    table(372, 556, 214),
    workbench(600, 258, 120, 24),
    workbench(600, 314, 120, 24),
    clockHands(D_CLOCK.cx, 410),
    bookcase(798, 286, 10, 84),
    bookcase(824, 286, 10, 84),
    bookcase(906, 286, 10, 84),
    bookcase(932, 286, 10, 84),
    vitrine(652, 548, 24),
    vitrine(690, 548, 24),
    vitrine(728, 548, 24),
    vitrine(766, 548, 24),
    perches(D_OWL.cx, D_OWL.cy, 54 - 6, 180),
    steps(475, 614, 46, 4),
  ].join(""),
  arcs: circle(D_CLOCK.cx, 410, 12),
  walk: [
    [475, 584],
    [400, 584],
    [352, 540],
    [352, 488],
    [330, 470],
    [292, 470],
    [252, 470],
    [215, 502],
    [176, 470],
    [215, 440],
    [252, 470],
    [330, 470],
    [420, 470],
    [500, 440],
    [520, 390],
    [530, 340],
    [600, 300],
    [700, 300],
    [760, 300],
    [810, 274],
    [869, 270],
    [869, 340],
    [870, 390],
    [880, 440],
    [930, 505],
    [960, 520],
    [990, 520],
    [1022, 520],
    [1048, 548],
    [1076, 520],
    [1048, 492],
    [1022, 520],
    [960, 520],
    [900, 545],
    [830, 586],
    [700, 588],
    [645, 540],
    [620, 520],
    [585, 540],
    [545, 584],
  ] as Pt[],
  walkFrom: [900, 545],
};

/* ----------------------------------------------------------- portrait */

const M_CLOCK = { cx: 100, cy: 690, r: 74, n: 8 };
const M_OWL = { cx: 300, cy: 688, r: 66, n: 16 };

export const mobile: Layout = {
  key: "tall",
  w: 400,
  h: 820,
  t: 5,
  block: [
    [20, 20],
    [380, 20],
    [380, 590],
    [20, 590],
  ],
  rooms: [
    { id: "great-hall", shape: { kind: "rect", x: 20, y: 200, w: 190, h: 220 }, label: { x: 25, y: 205, w: 180, h: 210 } },
    {
      id: "clock-tower",
      shape: { kind: "ngon", ...M_CLOCK },
      label: { x: M_CLOCK.cx - 63, y: M_CLOCK.cy - 63, w: 126, h: 126 },
      align: "center",
    },
    {
      id: "room-of-requirement",
      shape: { kind: "rect", x: 20, y: 20, w: 360, h: 180 },
      label: { x: 25, y: 25, w: 350, h: 170 },
    },
    { id: "library", shape: { kind: "rect", x: 210, y: 200, w: 170, h: 220 }, label: { x: 215, y: 205, w: 160, h: 210 } },
    { id: "trophy-room", shape: { kind: "rect", x: 20, y: 420, w: 360, h: 170 }, label: { x: 25, y: 425, w: 350, h: 160 } },
    {
      id: "owlery",
      shape: { kind: "ngon", ...M_OWL },
      label: { x: M_OWL.cx - 56, y: M_OWL.cy - 56, w: 112, h: 112 },
      align: "center",
    },
  ],
  doors: [
    { x: 20, y: 300, w: 30, axis: "v" }, // the front door
    { x: 110, y: 200, w: 28, axis: "h", into: 1 },
    { x: 300, y: 200, w: 28, axis: "h", into: 1 },
    { x: 210, y: 330, w: 28, axis: "v", into: 1 },
    { x: 110, y: 420, w: 28, axis: "h", into: 1 },
    { x: 300, y: 420, w: 28, axis: "h", into: 1 },
    { x: 100, y: 590, w: 22, axis: "h" },
    { x: 100, y: M_CLOCK.cy - dApothem(M_CLOCK), w: 22, axis: "h" },
    { x: 300, y: 590, w: 18, axis: "h" },
    { x: 300, y: M_OWL.cy - dApothem(M_OWL), w: 18, axis: "h" },
  ],
  passages: [
    { axis: "v", from: 595, to: M_CLOCK.cy - dApothem(M_CLOCK) - 5, at: 100, w: 22 },
    { axis: "v", from: 595, to: M_OWL.cy - dApothem(M_OWL) - 5, at: 300, w: 18 },
  ],
  furniture: [
    table(46, 344, 138),
    table(46, 380, 138),
    clockHands(M_CLOCK.cx, 643),
    bookcase(232, 334, 9, 74),
    bookcase(256, 334, 9, 74),
    bookcase(332, 334, 9, 74),
    bookcase(356, 334, 9, 74),
    workbench(236, 118, 116, 22),
    vitrine(156, 540, 22),
    vitrine(190, 540, 22),
    vitrine(224, 540, 22),
    perches(M_OWL.cx, M_OWL.cy, 60 - 5, 270),
  ].join(""),
  arcs: circle(M_CLOCK.cx, 643, 9),
  walk: [
    [115, 320],
    [112, 250],
    [110, 200],
    [112, 150],
    [190, 110],
    [258, 164],
    [300, 200],
    [298, 260],
    [296, 330],
    [298, 395],
    [300, 420],
    [300, 470],
    [300, 545],
    [300, 590],
    [300, 640],
    [324, 688],
    [300, 712],
    [276, 688],
    [300, 664],
    [300, 590],
    [250, 516],
    [150, 516],
    [100, 560],
    [100, 590],
    [100, 640],
    [124, 690],
    [100, 714],
    [76, 690],
    [100, 666],
    [100, 590],
    [108, 470],
    [110, 420],
    [196, 400],
    [196, 330],
    [160, 318],
  ] as Pt[],
  walkFrom: [300, 470],
};
