/** Deterministic PRNG (mulberry32) so server and client render identical
 * "random" geometry — required for hydration to match. */
export function mulberry32(seed: number) {
  let a = seed;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function smooth(t: number) {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
}


export interface Point {
  x: number;
  y: number;
}

/** A jagged line from x=0 to x=width, jittered around a mid baseline —
 * used as the seam where the hero sky parts. */
export function generateTearLine(seed: number, width: number, height: number, segments = 24): Point[] {
  const rng = mulberry32(seed);
  const midY = height / 2;
  const points: Point[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = t * width;
    const edgeTaper = Math.sin(t * Math.PI) * 0.6 + 0.4;
    const jitter = (rng() - 0.5) * height * 0.16 * edgeTaper;
    points.push({ x, y: midY + jitter });
  }
  return points;
}

export function pointsToPath(points: Point[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
}
