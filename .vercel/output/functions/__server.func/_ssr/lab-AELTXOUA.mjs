import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, v as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Input, l as useLine, n as CATEGORIES, o as Panel, r as Field, t as Button } from "./store-B199eBpr.mjs";
import { a as CartesianGrid, c as Legend, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab-AELTXOUA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function mean$1(xs) {
	if (!xs.length) return 0;
	return xs.reduce((a, b) => a + b, 0) / xs.length;
}
function personDelta(snap, i) {
	return snap.v[i].map((x, c) => x - snap.v0[i][c]);
}
function populationMeans(snap, which) {
	const src = snap[which];
	return CATEGORIES.map((_, c) => mean$1(src.map((row) => row[c])));
}
function topChangers(snap, k = 8) {
	const rows = snap.names.map((name, i) => {
		const d = personDelta(snap, i);
		const mag = Math.sqrt(d.reduce((s, x) => s + x * x, 0));
		const dir = mean$1(d);
		return {
			i,
			name,
			isUser: snap.isUser[i],
			mag,
			dir,
			d,
			v0: mean$1(snap.v0[i]),
			v: mean$1(snap.v[i])
		};
	});
	rows.sort((a, b) => b.mag - a.mag);
	return rows.slice(0, k);
}
function extremes(snap) {
	const scores = snap.v.map((row, i) => ({
		i,
		name: snap.names[i],
		s: mean$1(row)
	}));
	scores.sort((a, b) => a.s - b.s);
	return {
		lowest: scores.slice(0, 5),
		highest: scores.slice(-5).reverse()
	};
}
function mean(row) {
	return row.reduce((a, b) => a + b, 0) / row.length;
}
function colorFor(score) {
	const t = Math.max(-1, Math.min(1, score / 8));
	if (t >= 0) {
		const a = t;
		return `rgba(${Math.round(143 + 11 * a)}, ${Math.round(173 + -2 * a)}, ${Math.round(122 + 16 * a)}, 0.95)`;
	}
	const a = -t;
	return `rgba(${Math.round(193)}, ${Math.round(122 - 20 * a)}, ${Math.round(98 - 10 * a)}, 0.95)`;
}
function NetworkGraph({ snap }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const n = snap.names.length;
		const pos = Array.from({ length: n }, (_, i) => {
			const ang = i / n * Math.PI * 2;
			return {
				x: Math.cos(ang),
				y: Math.sin(ang),
				vx: 0,
				vy: 0
			};
		});
		let raf = 0;
		let ticks = 0;
		const maxW = Math.max(...snap.edges.map((e) => e.w), .2);
		const step = () => {
			ticks += 1;
			const w = canvas.parentElement?.clientWidth ?? 640;
			const h = Math.max(320, Math.min(520, w * .62));
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
				canvas.width = Math.floor(w * dpr);
				canvas.height = Math.floor(h * dpr);
				canvas.style.width = `${w}px`;
				canvas.style.height = `${h}px`;
			}
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, w, h);
			if (ticks < 90) {
				for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
					const dx = pos[j].x - pos[i].x;
					const dy = pos[j].y - pos[i].y;
					const d2 = dx * dx + dy * dy + .01;
					const d = Math.sqrt(d2);
					const rep = .015 / d2;
					pos[i].vx -= dx / d * rep;
					pos[i].vy -= dy / d * rep;
					pos[j].vx += dx / d * rep;
					pos[j].vy += dy / d * rep;
				}
				for (const e of snap.edges) {
					const dx = pos[e.j].x - pos[e.i].x;
					const dy = pos[e.j].y - pos[e.i].y;
					const pull = .01 * (e.w / maxW);
					pos[e.i].vx += dx * pull;
					pos[e.i].vy += dy * pull;
					pos[e.j].vx -= dx * pull;
					pos[e.j].vy -= dy * pull;
				}
				for (const p of pos) {
					p.vx += -p.x * .01;
					p.vy += -p.y * .01;
					p.vx *= .82;
					p.vy *= .82;
					p.x += p.vx;
					p.y += p.vy;
				}
			}
			const cx = w / 2;
			const cy = h / 2;
			const sc = Math.min(w, h) * .38;
			ctx.lineWidth = 1;
			for (const e of snap.edges) {
				const a = pos[e.i];
				const b = pos[e.j];
				ctx.strokeStyle = `rgba(236,234,227,${.06 + .22 * (e.w / maxW)})`;
				ctx.beginPath();
				ctx.moveTo(cx + a.x * sc, cy + a.y * sc);
				ctx.lineTo(cx + b.x * sc, cy + b.y * sc);
				ctx.stroke();
			}
			for (let i = 0; i < n; i++) {
				const p = pos[i];
				const x = cx + p.x * sc;
				const y = cy + p.y * sc;
				const s = mean(snap.v[i]);
				ctx.fillStyle = colorFor(s);
				ctx.beginPath();
				ctx.arc(x, y, snap.isUser[i] ? 7 : 4.2, 0, Math.PI * 2);
				ctx.fill();
				if (snap.isUser[i]) {
					ctx.strokeStyle = "#eceae3";
					ctx.lineWidth = 1.5;
					ctx.stroke();
				}
			}
			raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, [snap]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-raised",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref,
			className: "block w-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "px-4 py-3 text-xs text-muted",
			children: ["Nodes colored by mean inclination after the run. Sage is more Biblical; terracotta is more permissive. Ringed node is you, if you took the poll.", CATEGORIES.length ? "" : ""]
		})]
	});
}
var PALETTE = [
	"#9aab8a",
	"#c4a574",
	"#c17a62",
	"#8fad7a",
	"#eceae3"
];
function Results({ snap }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	const means0 = populationMeans(snap, "v0");
	const means1 = populationMeans(snap, "v");
	const changers = topChangers(snap);
	const ext = extremes(snap);
	const chartData = snap.history.map((h) => {
		const row = {
			t: h.t,
			overall: Number(h.overall.toFixed(3))
		};
		CATEGORIES.forEach((c, i) => {
			row[c.id] = Number(h.means[i].toFixed(3));
		});
		return row;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "People",
						value: String(snap.names.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Meetings",
						value: String(snap.interactions)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Mean shift",
						value: `${(means1.reduce((a, b) => a + b, 0) / means1.length - means0.reduce((a, b) => a + b, 0) / means0.length).toFixed(2)}`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: "Population means over time"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 h-72 w-full",
				children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: chartData,
						margin: {
							top: 8,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "#2a2c26",
								strokeDasharray: "3 3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "t",
								stroke: "#8f8e86",
								fontSize: 11
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "#8f8e86",
								fontSize: 11,
								domain: [-8, 8]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "#151613",
								border: "1px solid #2a2c26",
								borderRadius: 8
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
							CATEGORIES.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: c.id,
								name: c.name,
								stroke: PALETTE[i % PALETTE.length],
								dot: false,
								strokeWidth: 1.6
							}, c.id))
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full rounded-md bg-raised" })
			})] }),
			ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetworkGraph, { snap }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-80 rounded-xl bg-raised" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: "Category shift"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 flex flex-col gap-3",
				children: CATEGORIES.map((c, i) => {
					const d = means1[i] - means0[i];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono tabular-nums text-muted",
							children: [
								means0[i].toFixed(2),
								" → ",
								means1[i].toFixed(2),
								" (",
								d >= 0 ? "+" : "",
								d.toFixed(2),
								")"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 h-1.5 overflow-hidden rounded-full bg-raised",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-accent",
							style: { width: `${Math.min(100, Math.abs(d) * 12)}%` }
						})
					})] }, c.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "Largest individual change"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-2",
					children: changers.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-baseline justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [r.name, r.isUser ? " (you)" : ""] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono tabular-nums text-muted",
							children: [
								r.v0.toFixed(1),
								" → ",
								r.v.toFixed(1)
							]
						})]
					}, r.i))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg",
						children: "Extremes (final)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Highest / lowest mean scores"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 flex flex-col gap-2 text-sm",
						children: [ext.highest.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono tabular-nums text-pos",
								children: r.s.toFixed(2)
							})]
						}, "h" + r.i)), ext.lowest.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono tabular-nums text-neg",
								children: r.s.toFixed(2)
							})]
						}, "l" + r.i))]
					})
				] })]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-surface px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-mono text-xl tabular-nums",
			children: value
		})]
	});
}
function LabPage() {
	const params = useLine((s) => s.params);
	const setParams = useLine((s) => s.setParams);
	const run = useLine((s) => s.run);
	const running = useLine((s) => s.running);
	const snapshot = useLine((s) => s.snapshot);
	const user = useLine((s) => s.user);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Lab"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
				children: "Generate a student body, drop your poll profile in if you have one, and let them interact. Each meeting averages one category of the two vectors, scaled by communal impressionability, stubbornness, and leadership. Budgets freeze people; clumping repeats familiar pairs and categories."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "Run configuration"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						user ? `${user.name} is seeded into the population.` : "No poll on file — fully synthetic.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/poll",
							className: "text-accent underline-offset-2 hover:underline",
							children: "Poll"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/weights",
							className: "text-accent underline-offset-2 hover:underline",
							children: "Weights"
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: run,
					disabled: running,
					children: running ? "Running…" : "Run simulation"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
						label: "Population",
						value: params.n,
						min: 8,
						max: 120,
						onChange: (n) => setParams({ n })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
						label: "Time steps",
						value: params.steps,
						min: 10,
						max: 200,
						onChange: (steps) => setParams({ steps })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
						label: "Meetings / step",
						value: params.meetingsPerStep,
						min: 2,
						max: 40,
						onChange: (meetingsPerStep) => setParams({ meetingsPerStep })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
						label: "Seed",
						value: params.seed,
						min: 1,
						max: 9999,
						onChange: (seed) => setParams({ seed })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
						label: "Clumping",
						value: params.clumpStrength,
						min: 0,
						max: 2,
						step: .05,
						onChange: (clumpStrength) => setParams({ clumpStrength })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
						label: "Initial density",
						value: params.initDensity,
						min: .02,
						max: .4,
						step: .01,
						onChange: (initDensity) => setParams({ initDensity })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
						label: "Impressionability",
						value: params.impressionabilityScale,
						min: .2,
						max: 2,
						step: .05,
						onChange: (impressionabilityScale) => setParams({ impressionabilityScale })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Population mix",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "h-11 w-full rounded-md border border-border bg-raised px-3 text-sm",
							value: params.mix,
							onChange: (e) => setParams({ mix: e.target.value }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "homogeneous",
									children: "Homogeneous (devout-leaning)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "mixed",
									children: "Mixed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "polarized",
									children: "Polarized"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "random",
									children: "Random"
								})
							]
						})
					})
				]
			})] }),
			snapshot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Results, { snap: snapshot }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Run the model to see trajectories, the social graph, and extremes."
			})
		]
	});
}
function Num({ label, value, onChange, min, max, step = 1 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "number",
			min,
			max,
			step,
			value,
			onChange: (e) => onChange(Number(e.target.value))
		})
	});
}
//#endregion
export { LabPage as component };
