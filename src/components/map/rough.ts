/**
 * Hand-drawn wobble, baked into the geometry.
 *
 * Small drawings use the live SVG `#wobble` filter, but on the big ones (room
 * walls, the corridor) the filter has to re-run over the whole area on every
 * frame while the lines draw themselves, which made the reveal stutter. Here
 * the same effect is computed once: lines are subdivided and nudged sideways
 * by smooth, deterministic noise.
 */

const AMP = 1.1; // how far a line strays, in px
const WAVE = 38; // distance between wobbles, in px
const STEP = 6; // subdivision length, in px
const TAPER = 10; // corners stay put; the wobble fades in over this distance

function hash(i: number, seed: number) {
  let h = Math.imul(i ^ seed, 0x27d4eb2d);
  h ^= h >>> 15;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  return ((h >>> 0) / 4294967295) * 2 - 1;
}

/** Smooth 1-D value noise in [-1, 1]. */
export function noise(t: number, seed = 1) {
  const i = Math.floor(t);
  const f = t - i;
  const u = f * f * (3 - 2 * f);
  return hash(i, seed) * (1 - u) + hash(i + 1, seed) * u;
}

/** Sideways wobble for a point `s` px along a line (for already-dense polylines). */
export function wobbleAt(s: number, seed = 1, amp = AMP) {
  return amp * noise(s / WAVE, seed);
}

/**
 * Takes a path made only of absolute M/L commands and returns it with every
 * straight segment drawn by a slightly unsteady hand.
 */
export function roughen(d: string, seed = 1, amp = AMP) {
  const tokens = d.match(/[ML]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  let out = "";
  let cmd = "M";
  let px = 0;
  let py = 0;
  let along = 0; // running distance, so the noise is continuous across segments
  for (let k = 0; k < tokens.length; ) {
    const t = tokens[k];
    if (t === "M" || t === "L") {
      cmd = t;
      k++;
      continue;
    }
    const x = parseFloat(tokens[k]);
    const y = parseFloat(tokens[k + 1]);
    k += 2;
    if (cmd === "M") {
      out += `M${x.toFixed(1)} ${y.toFixed(1)}`;
      along += 97; // a fresh stroke starts somewhere else in the noise
    } else {
      const dx = x - px;
      const dy = y - py;
      const len = Math.hypot(dx, dy);
      const n = Math.max(1, Math.round(len / STEP));
      const nx = len ? -dy / len : 0;
      const ny = len ? dx / len : 0;
      for (let j = 1; j <= n; j++) {
        const u = j / n;
        const s = u * len;
        const env = Math.min(1, s / TAPER, (len - s) / TAPER);
        const o = env * amp * noise((along + s) / WAVE, seed);
        out += `L${(px + dx * u + nx * o).toFixed(1)} ${(py + dy * u + ny * o).toFixed(1)}`;
      }
      along += len;
    }
    px = x;
    py = y;
  }
  return out;
}
