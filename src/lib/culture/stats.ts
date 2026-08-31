import { CATEGORIES } from "./catalog";
import type { SimSnapshot } from "./types";

export function mean(xs: number[]) {
  if (!xs.length) return 0;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

export function personDelta(snap: SimSnapshot, i: number) {
  return snap.v[i]!.map((x, c) => x - snap.v0[i]![c]!);
}

export function populationMeans(snap: SimSnapshot, which: "v" | "v0") {
  const src = snap[which];
  return CATEGORIES.map((_, c) => mean(src.map((row) => row[c]!)));
}

export function topChangers(snap: SimSnapshot, k = 8) {
  const rows = snap.names.map((name, i) => {
    const d = personDelta(snap, i);
    const mag = Math.sqrt(d.reduce((s, x) => s + x * x, 0));
    const dir = mean(d);
    return { i, name, isUser: snap.isUser[i], mag, dir, d, v0: mean(snap.v0[i]!), v: mean(snap.v[i]!) };
  });
  rows.sort((a, b) => b.mag - a.mag);
  return rows.slice(0, k);
}

export function extremes(snap: SimSnapshot) {
  const scores = snap.v.map((row, i) => ({ i, name: snap.names[i]!, s: mean(row) }));
  scores.sort((a, b) => a.s - b.s);
  return {
    lowest: scores.slice(0, 5),
    highest: scores.slice(-5).reverse(),
  };
}
