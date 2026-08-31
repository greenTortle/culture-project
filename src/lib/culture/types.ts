export const LIKERTS = ["sa", "a", "d", "sd"] as const;
export type Likert = (typeof LIKERTS)[number];

export const LIKERT_LABEL: Record<Likert, string> = {
  sa: "Strongly agree",
  a: "Agree",
  d: "Disagree",
  sd: "Strongly disagree",
};

export type Mode = "individualistic" | "communal";

export type LeafWeights = Record<Likert, number>;

export interface TreeNode {
  id: string;
  index: number;
  depth: number;
  isLeaf: boolean;
  text: string;
  left: number | null;
  right: number | null;
  parent: number | null;
  leafIndex: number | null;
  defaultWeights: LeafWeights | null;
}

export interface CategoryDef {
  id: string;
  name: string;
  blurb: string;
}

export interface PollLeaf {
  categoryId: string;
  mode: Mode;
  statementId: string;
  statementText: string;
  likert: Likert;
  score: number;
  nodeIndex: number;
  asked: { statementId: string; likert: Likert }[];
}

export interface PersonProfile {
  id: string;
  name: string;
  isUser?: boolean;
  v0: number[];
  alpha: number[];
  budget: number;
  clump: number;
  leadership: number;
  stubbornness: number;
  extroversion: number;
  leaves: PollLeaf[];
}

export interface SimParams {
  n: number;
  steps: number;
  extroversion: number;
  seed: number;
  clumpStrength: number;
  initDensity: number;
  impressionabilityScale: number;
  mix: "homogeneous" | "mixed" | "polarized" | "random";
}

export interface HistoryPoint {
  t: number;
  means: number[];
  stds: number[];
  overall: number;
}

export interface EdgeRec {
  i: number;
  j: number;
  w: number;
  lastCategory: number;
}

export interface SimSnapshot {
  params: SimParams;
  names: string[];
  isUser: boolean[];
  v0: number[][];
  v: number[][];
  alpha: number[][];
  history: HistoryPoint[];
  edges: EdgeRec[];
  interactions: number;
  categoryIds: string[];
}
