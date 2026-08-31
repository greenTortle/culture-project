import { CATEGORIES, TREE_DEPTH, treeFor } from "./catalog";
import type { LeafWeights, Likert, Mode, PollLeaf } from "./types";
import { pickLikert } from "./rng";

export const QUESTIONS_PER_TREE = TREE_DEPTH + 1;

export function treeOrder(): { categoryId: string; mode: Mode }[] {
  const out: { categoryId: string; mode: Mode }[] = [];
  for (const cat of CATEGORIES) {
    out.push({ categoryId: cat.id, mode: "individualistic" });
    out.push({ categoryId: cat.id, mode: "communal" });
  }
  return out;
}

export function childFor(index: number, likert: Likert) {
  return likert === "sa" || likert === "a" ? 2 * index + 1 : 2 * index + 2;
}

export interface WalkState {
  nodeIndex: number;
  asked: { statementId: string; likert: Likert }[];
}

export function startWalk(): WalkState {
  return { nodeIndex: 0, asked: [] };
}

export function stepWalk(state: WalkState, likert: Likert): WalkState {
  return {
    nodeIndex: childFor(state.nodeIndex, likert),
    asked: state.asked,
  };
}

export function isWalkDone(state: WalkState) {
  return state.asked.length >= QUESTIONS_PER_TREE || state.nodeIndex >= 63;
}

export function leafScore(
  nodeId: string,
  likert: Likert,
  table: Record<string, LeafWeights>,
  fallback: LeafWeights,
) {
  return (table[nodeId] ?? fallback)[likert];
}

export function walkTreeRandom(
  categoryId: string,
  mode: Mode,
  rand: () => number,
  piety: number,
  table: Record<string, LeafWeights>,
): PollLeaf {
  const nodes = treeFor(categoryId, mode);
  let idx = 0;
  const asked: { statementId: string; likert: Likert }[] = [];
  let last: Likert = "a";
  while (true) {
    const node = nodes[idx]!;
    last = pickLikert(rand, piety);
    asked.push({ statementId: node.id, likert: last });
    if (node.isLeaf) break;
    idx = childFor(idx, last);
  }
  const leaf = nodes[idx]!;
  const fb = leaf.defaultWeights ?? { sa: 0, a: 0, d: 0, sd: 0 };
  return {
    categoryId,
    mode,
    statementId: leaf.id,
    statementText: leaf.text,
    likert: last,
    score: leafScore(leaf.id, last, table, fb),
    nodeIndex: idx,
    asked,
  };
}

export function alphaFromCommunal(score: number, scale: number) {
  const x = -score / 8;
  const s = 1 / (1 + Math.exp(-x * 1.4));
  return Math.min(0.85, Math.max(0.04, s * scale));
}
