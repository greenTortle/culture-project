import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { FillerBadge } from "@/components/ui";
import { treeFor } from "@/lib/culture/catalog";
import { LIKERT_LABEL, LIKERTS, type LeafWeights, type Likert, type Mode } from "@/lib/culture/types";

export function QuestionTree({
  categoryId,
  mode,
  weights,
  onChange,
}: {
  categoryId: string;
  mode: Mode;
  weights: Record<string, LeafWeights>;
  onChange: (id: string, likert: Likert, value: number) => void;
}) {
  const nodes = treeFor(categoryId, mode);
  return (
    <div className="rounded-lg border border-border bg-bg/40 p-2">
      <TreeNodeView
        nodes={nodes}
        index={0}
        branch="Root"
        weights={weights}
        onChange={onChange}
        defaultOpen
      />
    </div>
  );
}

function TreeNodeView({
  nodes,
  index,
  branch,
  weights,
  onChange,
  defaultOpen = false,
}: {
  nodes: ReturnType<typeof treeFor>;
  index: number;
  branch: string;
  weights: Record<string, LeafWeights>;
  onChange: (id: string, likert: Likert, value: number) => void;
  defaultOpen?: boolean;
}) {
  const node = nodes[index]!;
  const [open, setOpen] = useState(defaultOpen);
  const [show, setShow] = useState(false);
  const w = node.isLeaf ? (weights[node.id] ?? node.defaultWeights) : null;

  return (
    <div className={cn("border-l border-border/80", index === 0 ? "border-l-0" : "ml-3 pl-3")}>
      <div className="flex items-start gap-2 py-1.5">
        {!node.isLeaf ? (
          <button
            type="button"
            className="mt-0.5 size-7 shrink-0 rounded-md text-muted hover:bg-raised hover:text-fg"
            aria-label={open ? "Collapse" : "Expand"}
            onClick={() => setOpen((v) => !v)}
          >
            <ChevronRight className={cn("mx-auto size-4 transition-transform duration-150", open && "rotate-90")} />
          </button>
        ) : (
          <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center font-mono text-[10px] text-warn">
            L
          </span>
        )}
        <div className="min-w-0 flex-1">
          <button
            type="button"
            className="w-full rounded-md px-2 py-1.5 text-left hover:bg-raised"
            onClick={() => setShow((v) => !v)}
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Layer {node.depth} · {branch}
              {node.isLeaf ? " · leaf" : ""}
            </p>
            {show ? (
              <p className="mt-1 text-sm leading-snug text-fg">{node.text}</p>
            ) : (
              <p className="mt-1 text-sm text-faint">Click to show question</p>
            )}
          </button>
          {show && node.isLeaf && w ? (
            <div className="mt-2 rounded-md border border-warn/40 bg-filler/40 p-3">
              <FillerBadge />
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {LIKERTS.map((k) => (
                  <label key={k} className="flex flex-col gap-1">
                    <span className="text-[11px] text-muted">{LIKERT_LABEL[k]}</span>
                    <input
                      type="number"
                      step="0.1"
                      value={w[k]}
                      onChange={(e) => onChange(node.id, k, Number(e.target.value))}
                      className="h-10 rounded-md border border-warn/50 bg-filler px-2 font-mono text-sm text-filler-fg outline-none ring-warn/30 focus:ring-2"
                    />
                  </label>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {open && !node.isLeaf && node.left != null && node.right != null ? (
        <div>
          <TreeNodeView
            nodes={nodes}
            index={node.left}
            branch="Agree"
            weights={weights}
            onChange={onChange}
          />
          <TreeNodeView
            nodes={nodes}
            index={node.right}
            branch="Disagree"
            weights={weights}
            onChange={onChange}
          />
        </div>
      ) : null}
    </div>
  );
}
