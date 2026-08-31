import { CATEGORIES, CATEGORY_IDS } from "./catalog";
import { agentName, mulberry32, poisson, randn } from "./rng";
import { alphaFromCommunal, walkTreeRandom } from "./poll";
import type { LeafWeights, PersonProfile, SimParams, SimSnapshot, HistoryPoint, EdgeRec } from "./types";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function pietyForMix(mix: SimParams["mix"], i: number, n: number, rand: () => number) {
  if (mix === "homogeneous") return clamp(0.55 + randn(rand) * 0.18, -1, 1);
  if (mix === "polarized")
    return i < n / 2
      ? clamp(0.7 + randn(rand) * 0.15, -1, 1)
      : clamp(-0.55 + randn(rand) * 0.2, -1, 1);
  if (mix === "mixed") return clamp(randn(rand) * 0.45, -1, 1);
  return clamp(randn(rand) * 0.7, -1, 1);
}

export function synthesizePopulation(
  params: SimParams,
  table: Record<string, LeafWeights>,
  user?: PersonProfile | null,
): PersonProfile[] {
  const rand = mulberry32(params.seed);
  const people: PersonProfile[] = [];
  const n = Math.max(2, params.n);
  const start = user ? 1 : 0;
  if (user) people.push(user);

  for (let i = start; i < n; i++) {
    const piety = pietyForMix(params.mix, i, n, rand);
    const leaves = [];
    const v0: number[] = [];
    const alpha: number[] = [];
    for (const cat of CATEGORIES) {
      const ind = walkTreeRandom(cat.id, "individualistic", rand, piety, table);
      const com = walkTreeRandom(cat.id, "communal", rand, piety * 0.85, table);
      leaves.push(ind, com);
      v0.push(clamp(ind.score, -12, 12));
      alpha.push(alphaFromCommunal(com.score, params.impressionabilityScale));
    }
    people.push({
      id: `a-${i}`,
      name: agentName(i, rand),
      v0,
      alpha,
      budget: Math.round(8 + rand() * 22),
      clump: 0.25 + rand() * 0.7,
      leadership: clamp(0.35 + randn(rand) * 0.25 + piety * 0.1, 0.08, 1),
      stubbornness: clamp(0.2 + rand() * 0.55 + Math.abs(piety) * 0.15, 0.05, 0.9),
      extroversion: clamp(0.35 + rand() * 1.3, 0.2, 1.8),
      leaves,
    });
  }
  return people;
}

function pickPartner(
  i: number,
  live: number[],
  w: number[][],
  lastCat: number[][],
  clump: number[],
  clumpK: number,
  ext: number[],
  rand: () => number,
) {
  const weights: number[] = [];
  let sum = 0;
  for (const j of live) {
    if (j === i) {
      weights.push(0);
      continue;
    }
    const base = (w[i]![j] || 0.04) * (1 + clumpK * 0.5 * (clump[i]! + clump[j]!));
    const boost = lastCat[i]![j]! >= 0 ? 1 + clump[i]! * clumpK : 1;
    const ww = base * boost * (0.5 + 0.5 * ext[j]!);
    weights.push(ww);
    sum += ww;
  }
  if (sum <= 0) return i;
  let r = rand() * sum;
  let j = live[0]!;
  for (let k = 0; k < live.length; k++) {
    r -= weights[k]!;
    if (r <= 0) {
      j = live[k]!;
      break;
    }
  }
  return j;
}

export function runSimulation(people: PersonProfile[], params: SimParams): SimSnapshot {
  const rand = mulberry32(params.seed ^ 0x9e3779b9);
  const n = people.length;
  const C = CATEGORY_IDS.length;
  const v = people.map((p) => p.v0.slice());
  const v0 = people.map((p) => p.v0.slice());
  const alpha = people.map((p) => p.alpha.slice());
  const remaining = people.map((p) => p.budget);
  const clump = people.map((p) => p.clump);
  const lead = people.map((p) => p.leadership);
  const stub = people.map((p) => p.stubbornness);
  const ext = people.map((p) => p.extroversion);

  const w: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  const lastCat: number[][] = Array.from({ length: n }, () => Array(n).fill(-1));

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (rand() < params.initDensity) {
        const ww = 0.15 + rand() * 0.5;
        w[i]![j] = ww;
        w[j]![i] = ww;
      }
    }
  }

  const history: HistoryPoint[] = [];
  const record = (t: number) => {
    const means = Array(C).fill(0);
    const stds = Array(C).fill(0);
    for (let c = 0; c < C; c++) {
      let s = 0;
      for (let i = 0; i < n; i++) s += v[i]![c]!;
      means[c] = s / n;
      let q = 0;
      for (let i = 0; i < n; i++) {
        const d = v[i]![c]! - means[c]!;
        q += d * d;
      }
      stds[c] = Math.sqrt(q / n);
    }
    history.push({
      t,
      means,
      stds,
      overall: means.reduce((a, b) => a + b, 0) / C,
    });
  };

  record(0);
  let interactions = 0;
  const clumpK = params.clumpStrength;

  for (let t = 1; t <= params.steps; t++) {
    const order = Array.from({ length: n }, (_, i) => i);
    for (let a = n - 1; a > 0; a--) {
      const b = Math.floor(rand() * (a + 1));
      const tmp = order[a]!;
      order[a] = order[b]!;
      order[b] = tmp;
    }

    for (const i of order) {
      if (remaining[i]! <= 0) continue;
      const lambda = params.extroversion * ext[i]!;
      const want = Math.min(remaining[i]!, poisson(rand, lambda));
      for (let m = 0; m < want; m++) {
        const live: number[] = [];
        for (let k = 0; k < n; k++) if (remaining[k]! > 0 && k !== i) live.push(k);
        if (live.length < 1 || remaining[i]! <= 0) break;
        const j = pickPartner(i, live, w, lastCat, clump, clumpK, ext, rand);
        if (j === i) continue;

        let c = lastCat[i]![j]!;
        if (c < 0 || rand() > 0.55 + 0.35 * ((clump[i]! + clump[j]!) / 2) * clumpK) {
          c = Math.floor(rand() * C);
        }

        const vi = v[i]![c]!;
        const vj = v[j]![c]!;
        const ai = alpha[i]![c]! * (1 - stub[i]!) * (0.45 + 0.55 * lead[j]!);
        const aj = alpha[j]![c]! * (1 - stub[j]!) * (0.45 + 0.55 * lead[i]!);
        v[i]![c] = clamp(vi + ai * (vj - vi), -12, 12);
        v[j]![c] = clamp(vj + aj * (vi - vj), -12, 12);

        const nw = Math.min(2.5, (w[i]![j] || 0.08) + 0.08 * clumpK);
        w[i]![j] = nw;
        w[j]![i] = nw;
        lastCat[i]![j] = c;
        lastCat[j]![i] = c;
        remaining[i] = remaining[i]! - 1;
        remaining[j] = remaining[j]! - 1;
        interactions += 1;
      }
    }
    if (t % Math.max(1, Math.floor(params.steps / 24)) === 0 || t === params.steps) {
      record(t);
    }
  }

  const edges: EdgeRec[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if ((w[i]![j] || 0) > 0.12) {
        edges.push({
          i,
          j,
          w: w[i]![j]!,
          lastCategory: lastCat[i]![j]!,
        });
      }
    }
  }

  return {
    params,
    names: people.map((p) => p.name),
    isUser: people.map((p) => !!p.isUser),
    v0,
    v,
    alpha,
    history,
    edges,
    interactions,
    categoryIds: CATEGORY_IDS.slice(),
  };
}
