import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CATEGORIES, defaultWeightsMap, treeFor } from "./catalog";
import {
  QUESTIONS_PER_TREE,
  alphaFromCommunal,
  childFor,
  startWalk,
  treeOrder,
  type WalkState,
} from "./poll";
import { runSimulation, synthesizePopulation } from "./simulate";
import type {
  LeafWeights,
  Likert,
  PersonProfile,
  PollLeaf,
  SimParams,
  SimSnapshot,
} from "./types";

export type WeightsState = {
  leaves: Record<string, LeafWeights>;
};

function defaultWeights(): WeightsState {
  return { leaves: defaultWeightsMap() };
}

const defaultParams: SimParams = {
  n: 48,
  steps: 80,
  extroversion: 1,
  seed: 7,
  clumpStrength: 0.7,
  initDensity: 0.08,
  impressionabilityScale: 1,
  mix: "mixed",
};

interface PollRuntime {
  treeIdx: number;
  walk: WalkState;
  lastLikert: Likert | null;
  leaves: PollLeaf[];
  name: string;
}

interface AppState {
  weights: WeightsState;
  params: SimParams;
  poll: PollRuntime | null;
  user: PersonProfile | null;
  snapshot: SimSnapshot | null;
  running: boolean;
  setLeafWeight: (id: string, likert: Likert, value: number) => void;
  resetWeights: () => void;
  setParams: (p: Partial<SimParams>) => void;
  startPoll: (name: string) => void;
  answer: (likert: Likert) => void;
  clearUser: () => void;
  run: () => void;
}

function scoreLeaf(table: Record<string, LeafWeights>, nodeId: string, likert: Likert) {
  const node = Object.values(table).length
    ? table[nodeId]
    : undefined;
  if (node) return node[likert];
  const found = defaultWeightsMap()[nodeId];
  return found ? found[likert] : 0;
}

function profileFromLeaves(
  name: string,
  leaves: PollLeaf[],
  params: SimParams,
): PersonProfile {
  const v0: number[] = [];
  const alpha: number[] = [];
  for (const cat of CATEGORIES) {
    const ind = leaves.find((l) => l.categoryId === cat.id && l.mode === "individualistic");
    const com = leaves.find((l) => l.categoryId === cat.id && l.mode === "communal");
    v0.push(ind?.score ?? 0);
    alpha.push(alphaFromCommunal(com?.score ?? 0, params.impressionabilityScale));
  }
  return {
    id: "user",
    name: name || "You",
    isUser: true,
    v0,
    alpha,
    budget: 18,
    clump: 0.55,
    leadership: 0.5,
    stubbornness: 0.4,
    extroversion: 1,
    leaves,
  };
}

export const useLine = create<AppState>()(
  persist(
    (set, get) => ({
      weights: defaultWeights(),
      params: defaultParams,
      poll: null,
      user: null,
      snapshot: null,
      running: false,
      setLeafWeight: (id, likert, value) =>
        set((s) => {
          const cur = s.weights.leaves[id] ?? defaultWeightsMap()[id] ?? { sa: 0, a: 0, d: 0, sd: 0 };
          return {
            weights: {
              leaves: { ...s.weights.leaves, [id]: { ...cur, [likert]: value } },
            },
          };
        }),
      resetWeights: () => set({ weights: defaultWeights() }),
      setParams: (p) => set((s) => ({ params: { ...s.params, ...p } })),
      startPoll: (name) => {
        set({
          poll: {
            treeIdx: 0,
            walk: startWalk(),
            lastLikert: null,
            leaves: [],
            name,
          },
          user: null,
        });
      },
      answer: (likert) => {
        const { poll, weights, params } = get();
        if (!poll) return;
        const order = treeOrder();
        const cur = order[poll.treeIdx];
        if (!cur) return;
        const nodes = treeFor(cur.categoryId, cur.mode);
        const node = nodes[poll.walk.nodeIndex]!;
        const asked = [...poll.walk.asked, { statementId: node.id, likert }];
        if (node.isLeaf) {
          const leaf: PollLeaf = {
            categoryId: cur.categoryId,
            mode: cur.mode,
            statementId: node.id,
            statementText: node.text,
            likert,
            score: scoreLeaf(weights.leaves, node.id, likert),
            nodeIndex: node.index,
            asked,
          };
          const leaves = [...poll.leaves, leaf];
          const nextIdx = poll.treeIdx + 1;
          if (nextIdx >= order.length) {
            set({ poll: null, user: profileFromLeaves(poll.name, leaves, params) });
            return;
          }
          set({
            poll: {
              ...poll,
              treeIdx: nextIdx,
              walk: startWalk(),
              lastLikert: null,
              leaves,
            },
          });
          return;
        }
        set({
          poll: {
            ...poll,
            walk: { nodeIndex: childFor(poll.walk.nodeIndex, likert), asked },
            lastLikert: likert,
          },
        });
      },
      clearUser: () => set({ user: null, poll: null }),
      run: () => {
        const { weights, params, user } = get();
        set({ running: true });
        let seeded = user;
        if (user) {
          seeded = {
            ...user,
            extroversion: user.extroversion ?? 1,
            v0: CATEGORIES.map((cat) => {
              const leaf = user.leaves.find(
                (l) => l.categoryId === cat.id && l.mode === "individualistic",
              );
              if (!leaf) return 0;
              return scoreLeaf(weights.leaves, leaf.statementId, leaf.likert);
            }),
            alpha: CATEGORIES.map((cat) => {
              const leaf = user.leaves.find(
                (l) => l.categoryId === cat.id && l.mode === "communal",
              );
              if (!leaf) return 0.3;
              return alphaFromCommunal(
                scoreLeaf(weights.leaves, leaf.statementId, leaf.likert),
                params.impressionabilityScale,
              );
            }),
          };
        }
        const people = synthesizePopulation(params, weights.leaves, seeded);
        const snapshot = runSimulation(people, params);
        set({ snapshot, running: false });
      },
    }),
    {
      name: "line-culture-lab-v2",
      partialize: (s) => ({
        weights: s.weights,
        params: s.params,
        user: s.user,
        snapshot: s.snapshot,
      }),
    },
  ),
);

export { QUESTIONS_PER_TREE, defaultParams };
