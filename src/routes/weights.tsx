import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui";
import { QuestionTree } from "@/components/question-tree";
import { CATEGORIES, LEAF_COUNT, TREE_DEPTH, TREE_SIZE } from "@/lib/culture/catalog";
import { useLine } from "@/lib/culture/store";

export const Route = createFileRoute("/weights")({ component: WeightsPage });

function WeightsPage() {
  const weights = useLine((s) => s.weights);
  const setLeafWeight = useLine((s) => s.setLeafWeight);
  const resetWeights = useLine((s) => s.resetWeights);

  return (
    <main className="flex flex-col gap-8">
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-warn">Filler inputs</p>
        <h1 className="mt-2 font-display text-3xl">Decision trees</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Each category has two complete binary trees ({TREE_SIZE} questions, {TREE_DEPTH}{" "}
          layers, {LEAF_COUNT} leaves). Agree walks left; disagree walks right. Only{" "}
          <span className="text-filler-fg">leaf</span> nodes carry four filler weights — one
          per response. Click a node to read its question. Expand internals to reach the
          leaves.
        </p>
        <Button variant="outline" className="mt-4" onClick={resetWeights}>
          Reset fillers
        </Button>
      </header>

      {CATEGORIES.map((cat) => (
        <section key={cat.id} className="flex flex-col gap-4">
          <div>
            <h2 className="font-display text-xl">{cat.name}</h2>
            <p className="text-sm text-muted">{cat.blurb}</p>
          </div>
          {(["individualistic", "communal"] as const).map((mode) => (
            <div key={mode}>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                {mode} · {TREE_SIZE} nodes
              </p>
              <QuestionTree
                categoryId={cat.id}
                mode={mode}
                weights={weights.leaves}
                onChange={setLeafWeight}
              />
            </div>
          ))}
        </section>
      ))}
    </main>
  );
}
