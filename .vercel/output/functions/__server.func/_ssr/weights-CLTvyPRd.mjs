import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as FillerBadge, l as useLine, n as CATEGORIES, o as Panel, t as Button } from "./store-B199eBpr.mjs";
import { n as LIKERT_LABEL, t as LIKERTS } from "./types-Cs5xp3Zp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/weights-CLTvyPRd.js
var import_jsx_runtime = require_jsx_runtime();
function WeightsPage() {
	const weights = useLine((s) => s.weights);
	const setWeight = useLine((s) => s.setWeight);
	const setLikertOffset = useLine((s) => s.setLikertOffset);
	const resetWeights = useLine((s) => s.resetWeights);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-[0.16em] text-warn",
						children: "Filler inputs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl",
						children: "Weight table"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: "These numbers are placeholders. Positive is more Biblical; negative is more permissive. Magnitude is meant to stand in for severity — and is not yet grounded in a psychological scale. Highlighted fields are the ones the model actually reads."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "mt-4",
						onClick: resetWeights,
						children: "Reset fillers"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "bg-filler/40 ring-1 ring-warn/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FillerBadge, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg",
							children: "Likert offsets"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Added to the statement weight of the final leaf."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: LIKERTS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: LIKERT_LABEL[k]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								step: "0.1",
								value: weights.likert[k],
								onChange: (e) => setLikertOffset(k, Number(e.target.value)),
								className: "h-11 rounded-md border border-warn/50 bg-filler px-3 font-mono text-sm text-filler-fg outline-none ring-warn/30 focus:ring-2"
							})]
						}, k))
					})
				]
			}),
			CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl",
				children: cat.name
			}), ["individualistic", "communal"].map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-wider text-muted",
					children: mode
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 flex flex-col gap-2",
					children: cat[mode].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-1 items-center gap-3 rounded-lg border border-warn/30 bg-filler/30 p-3 sm:grid-cols-[1fr_7rem]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-snug",
							children: s.text
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FillerBadge, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								step: "0.5",
								value: weights.statements[s.id] ?? s.baseWeight,
								onChange: (e) => setWeight(s.id, Number(e.target.value)),
								className: "h-11 rounded-md border border-warn/50 bg-filler px-3 font-mono text-sm text-filler-fg outline-none ring-warn/30 focus:ring-2"
							})]
						})]
					}, s.id))
				})]
			}, mode))] }, cat.id))
		]
	});
}
//#endregion
export { WeightsPage as component };
