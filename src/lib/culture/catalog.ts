import type { CategoryDef, LeafWeights, Likert, Mode, TreeNode } from "./types";
import { SPECTRA } from "./spectra";

export const TREE_SIZE = 127;
export const TREE_DEPTH = 6;
export const LEAF_START = 63;
export const LEAF_COUNT = 64;

export const CATEGORIES: CategoryDef[] = [
  {
    id: "alcohol",
    name: "Alcohol & substances",
    blurb: "Private use, intoxication, and how friends change the line.",
  },
  {
    id: "character",
    name: "Character",
    blurb: "Honesty, patience, speech, and how company reshapes them.",
  },
  {
    id: "practice",
    name: "Biblical practices",
    blurb: "Worship, prayer, Scripture — alone, and under social pressure.",
  },
  {
    id: "sex",
    name: "Sex & relationships",
    blurb: "The private line, and the line that moves when a relationship is involved.",
  },
  {
    id: "campus",
    name: "Campus life",
    blurb: "Time, belonging, and the activities that form a community.",
  },
  {
    id: "academics",
    name: "Academics",
    blurb: "Integrity, diligence, and how a class or cohort moves the line.",
  },
  {
    id: "work",
    name: "Business & work",
    blurb: "Honesty in money and labor, and how a workplace culture pulls.",
  },
];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export function categoryIndex(id: string) {
  return CATEGORY_IDS.indexOf(id);
}

export function leftChild(i: number) {
  const c = 2 * i + 1;
  return c < TREE_SIZE ? c : null;
}

export function rightChild(i: number) {
  const c = 2 * i + 2;
  return c < TREE_SIZE ? c : null;
}

export function isLeafIndex(i: number) {
  return i >= LEAF_START;
}

export function leafRange(i: number): [number, number] {
  let lo = i;
  let hi = i;
  while (lo < LEAF_START) lo = 2 * lo + 1;
  while (hi < LEAF_START) hi = 2 * hi + 2;
  return [lo - LEAF_START, hi - LEAF_START];
}

function defaultLeafWeights(leafIndex: number): LeafWeights {
  const base = 10 - (leafIndex / (LEAF_COUNT - 1)) * 20;
  return {
    sa: round1(base + 1.6),
    a: round1(base + 0.5),
    d: round1(base - 0.5),
    sd: round1(base - 1.6),
  };
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

function depthOf(i: number) {
  return Math.floor(Math.log2(i + 1));
}

function pickLine(lines: string[], t: number) {
  const x = Math.min(1, Math.max(0, t));
  const idx = Math.round(x * (lines.length - 1));
  return lines[idx]!;
}

const DEPTH_FRAME: Record<number, (s: string) => string> = {
  0: (s) => s,
  1: (s) => s,
  2: (s) => s,
  3: (s) => s,
  4: (s) => s,
  5: (s) => s,
  6: (s) => s,
};

export function buildTree(categoryId: string, mode: Mode): TreeNode[] {
  const lines = SPECTRA[`${categoryId}:${mode}`];
  if (!lines) throw new Error(`Missing spectrum ${categoryId}:${mode}`);
  const nodes: TreeNode[] = [];
  for (let i = 0; i < TREE_SIZE; i++) {
    const [lo, hi] = leafRange(i);
    const mid = (lo + hi) / 2 / (LEAF_COUNT - 1);
    const depth = depthOf(i);
    const leaf = isLeafIndex(i);
    const text = DEPTH_FRAME[depth]!(pickLine(lines, mid));
    const parent = i === 0 ? null : Math.floor((i - 1) / 2);
    nodes.push({
      id: `${categoryId}:${mode}:${i}`,
      index: i,
      depth,
      isLeaf: leaf,
      text,
      left: leftChild(i),
      right: rightChild(i),
      parent,
      leafIndex: leaf ? i - LEAF_START : null,
      defaultWeights: leaf ? defaultLeafWeights(i - LEAF_START) : null,
    });
  }
  return nodes;
}

const TREE_CACHE = new Map<string, TreeNode[]>();

export function treeFor(categoryId: string, mode: Mode) {
  const k = `${categoryId}:${mode}`;
  let t = TREE_CACHE.get(k);
  if (!t) {
    t = buildTree(categoryId, mode);
    TREE_CACHE.set(k, t);
  }
  return t;
}

export function allTrees() {
  return CATEGORIES.flatMap((c) =>
    (["individualistic", "communal"] as const).map((mode) => ({
      categoryId: c.id,
      mode,
      nodes: treeFor(c.id, mode),
    })),
  );
}

export function findNode(id: string) {
  for (const cat of CATEGORIES) {
    for (const mode of ["individualistic", "communal"] as const) {
      const hit = treeFor(cat.id, mode).find((n) => n.id === id);
      if (hit) return { cat, mode, node: hit };
    }
  }
  return null;
}

export function defaultWeightsMap() {
  const out: Record<string, LeafWeights> = {};
  for (const cat of CATEGORIES) {
    for (const mode of ["individualistic", "communal"] as const) {
      for (const n of treeFor(cat.id, mode)) {
        if (n.isLeaf && n.defaultWeights) out[n.id] = { ...n.defaultWeights };
      }
    }
  }
  return out;
}

export function scoreFromWeights(
  weights: LeafWeights | null | undefined,
  likert: Likert,
  fallback: LeafWeights,
) {
  return (weights ?? fallback)[likert];
}
