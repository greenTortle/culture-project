import { createFileRoute, Link } from "@tanstack/react-router";
import { Results } from "@/components/results";
import { InfoTip } from "@/components/info-tip";
import { Button, Input, Panel } from "@/components/ui";
import { useLine } from "@/lib/culture/store";
import type { SimParams } from "@/lib/culture/types";

export const Route = createFileRoute("/lab")({ component: LabPage });

function LabPage() {
  const params = useLine((s) => s.params);
  const setParams = useLine((s) => s.setParams);
  const run = useLine((s) => s.run);
  const running = useLine((s) => s.running);
  const snapshot = useLine((s) => s.snapshot);
  const user = useLine((s) => s.user);

  return (
    <main className="flex flex-col gap-8">
      <header>
        <h1 className="font-display text-3xl">Lab</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Generate a student body, optionally drop your poll profile in, and let
          them interact over a season.
        </p>
      </header>

      <Panel>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-lg">Run configuration</h2>
            <p className="mt-1 text-sm text-muted">
              {user
                ? `${user.name} is seeded into the population.`
                : "No poll on file — fully synthetic."}{" "}
              <Link to="/poll" className="text-accent underline-offset-2 hover:underline">
                Poll
              </Link>
              {" · "}
              <Link to="/weights" className="text-accent underline-offset-2 hover:underline">
                Weights
              </Link>
            </p>
          </div>
          <Button onClick={run} disabled={running}>
            {running ? "Running…" : "Run simulation"}
          </Button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Num
            label="Population"
            info="How many people are in the simulated community, including you if you took the poll."
            value={params.n}
            min={8}
            max={120}
            onChange={(n) => setParams({ n })}
          />
          <Num
            label="Time steps"
            info="Length of the season. Each step is a round in which people may initiate interactions, until their lifetime budget is spent."
            value={params.steps}
            min={10}
            max={200}
            onChange={(steps) => setParams({ steps })}
          />
          <Num
            label="Extroversion"
            info="Scales the population’s average interactions per step. Each person also has a private extroversion trait; their count of interactions this step is drawn from a Poisson distribution around (this value × their trait), so individuals differ even at the same setting."
            value={params.extroversion}
            min={0.1}
            max={3}
            step={0.05}
            onChange={(extroversion) => setParams({ extroversion })}
          />
          <Num
            label="Seed"
            info="Random seed for generating people, the initial graph, Poisson draws, and partner choice. Same seed and settings replay the same run."
            value={params.seed}
            min={1}
            max={9999}
            onChange={(seed) => setParams({ seed })}
          />
          <Num
            label="Clumping"
            info="How strongly people repeat pairs and categories they have already used. Higher values grow clusters instead of mixing the whole graph."
            value={params.clumpStrength}
            min={0}
            max={2}
            step={0.05}
            onChange={(clumpStrength) => setParams({ clumpStrength })}
          />
          <Num
            label="Initial density"
            info="Probability that any two people start with a weak social edge before the season. Sparse starts rely more on clumping to form structure."
            value={params.initDensity}
            min={0.02}
            max={0.4}
            step={0.01}
            onChange={(initDensity) => setParams({ initDensity })}
          />
          <Num
            label="Impressionability"
            info="Global scale on how far communal poll scores translate into mixing. Higher means people are pulled more strongly toward whoever they meet."
            value={params.impressionabilityScale}
            min={0.2}
            max={2}
            step={0.05}
            onChange={(impressionabilityScale) => setParams({ impressionabilityScale })}
          />
          <label className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1 text-sm font-medium text-fg">
              Population mix
              <InfoTip text="How the synthetic body is drawn: devout-leaning, mixed around the middle, two opposed camps, or wide random scatter." />
            </span>
            <select
              className="h-11 w-full rounded-md border border-border bg-raised px-3 text-sm"
              value={params.mix}
              onChange={(e) => setParams({ mix: e.target.value as SimParams["mix"] })}
            >
              <option value="homogeneous">Homogeneous (devout-leaning)</option>
              <option value="mixed">Mixed</option>
              <option value="polarized">Polarized</option>
              <option value="random">Random</option>
            </select>
          </label>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h3 className="font-display text-base">How the model runs</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
            <li>
              Each person is a vector of scores, one per category. Individualistic
              leaves set the starting value. Communal leaves set how easily that
              category is pulled (impressionability).
            </li>
            <li>
              People also carry private traits: a lifetime interaction budget,
              clumping, leadership, stubbornness, and extroversion. Synthetic
              people draw these at random; yours are fixed if you took the poll.
            </li>
            <li>
              Each time step, every person with remaining budget initiates a
              Poisson-random number of interactions. The mean of that draw is
              Extroversion × their personal extroversion, so the population
              average moves with the slider while individuals stay noisy.
            </li>
            <li>
              A partner is chosen with probability proportional to existing edge
              weight, both clumping traits, and whether they have met before.
              The category of the meeting prefers the last category those two
              used.
            </li>
            <li>
              In category c, each person moves toward the other:
              new = old + α × (1 − stubbornness) × (0.45 + 0.55 × other’s leadership) × (other − old).
              α comes from the communal leaf, scaled by Impressionability.
            </li>
            <li>
              The edge between them strengthens. Each participant spends one
              unit of budget. When a budget hits zero, that person freezes.
            </li>
          </ol>
        </div>
      </Panel>

      {snapshot ? (
        <Results snap={snapshot} />
      ) : (
        <p className="text-sm text-muted">
          Run the model to see trajectories, the social graph, and extremes.
        </p>
      )}
    </main>
  );
}

function Num({
  label,
  info,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  label: string;
  info: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center gap-1 text-sm font-medium text-fg">
        {label}
        <InfoTip text={info} />
      </span>
      <Input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
