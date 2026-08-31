import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, v as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Input, c as treeOrder, l as useLine, n as CATEGORIES, o as Panel, r as Field, s as statementsFor, t as Button } from "./store-B199eBpr.mjs";
import { n as LIKERT_LABEL, t as LIKERTS } from "./types-Cs5xp3Zp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/poll-B-JQTNZM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PollPage() {
	const poll = useLine((s) => s.poll);
	const user = useLine((s) => s.user);
	const startPoll = useLine((s) => s.startPoll);
	const answer = useLine((s) => s.answer);
	const clearUser = useLine((s) => s.clearUser);
	const [name, setName] = (0, import_react.useState)(user?.name ?? "You");
	if (user && !poll) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Your lines"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Final leaves only — the closest statement to neutral in each tree."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 flex flex-col gap-3",
				children: user.leaves.map((leaf) => {
					const cat = CATEGORIES.find((c) => c.id === leaf.categoryId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[10px] uppercase tracking-wider text-muted",
								children: [
									cat?.name,
									" · ",
									leaf.mode
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: leaf.statementText
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-mono text-xs text-accent",
								children: [
									LIKERT_LABEL[leaf.likert],
									" · score ",
									leaf.score.toFixed(2)
								]
							})
						]
					}, leaf.categoryId + leaf.mode);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/lab",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Run the lab with me in it" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: clearUser,
					children: "Clear and retake"
				})]
			})
		]
	});
	if (!poll) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Take the poll"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: "Ten short trees — individualistic then communal in each category. Three questions each. Agree moves toward a stricter line; disagree toward a more permissive one."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Display name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-5 w-full",
					onClick: () => startPoll(name.trim() || "You"),
					children: "Begin"
				})]
			})
		]
	});
	const order = treeOrder();
	const cur = order[poll.treeIdx];
	const cat = CATEGORIES.find((c) => c.id === cur.categoryId);
	const statement = statementsFor(cur.categoryId, cur.mode)[poll.search.mid];
	const totalTrees = order.length;
	const progress = (poll.treeIdx + poll.search.asked / 3) / totalTrees;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 h-1 overflow-hidden rounded-full bg-raised",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-accent transition-[width] duration-200",
					style: { width: `${Math.round(progress * 100)}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[10px] uppercase tracking-[0.16em] text-muted",
				children: [
					cat.name,
					" · ",
					cur.mode,
					" · question ",
					poll.search.asked + 1,
					" of ",
					3
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-2xl leading-snug md:text-3xl",
				children: statement.text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: cat.blurb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2",
				children: LIKERTS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: k === "sa" || k === "a" ? "primary" : "outline",
					className: "h-12",
					onClick: () => answer(k),
					children: LIKERT_LABEL[k]
				}, k))
			})
		]
	});
}
//#endregion
export { PollPage as component };
