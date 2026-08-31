import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as cn } from "./router-MeUbzv-g.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-B199eBpr.js
var import_jsx_runtime = require_jsx_runtime();
function Button({ className, variant = "primary", ...props }) {
	const styles = {
		primary: "bg-accent text-accent-fg hover:opacity-90",
		ghost: "bg-transparent text-fg hover:bg-raised",
		outline: "border border-border bg-transparent text-fg hover:bg-raised",
		warn: "bg-warn text-warn-fg hover:opacity-90"
	}[variant];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn("inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-medium transition-opacity duration-150 disabled:opacity-40", styles, className),
		...props
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-fg",
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted",
				children: hint
			}) : null
		]
	});
}
function Input(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: cn("h-11 w-full rounded-md border border-border bg-raised px-3 text-sm text-fg outline-none ring-accent/40 focus:ring-2", props.className)
	});
}
function FillerBadge() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex items-center rounded-full bg-filler px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-filler-fg",
		children: "Filler weight"
	});
}
function Panel({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("rounded-xl border border-border bg-surface p-5 md:p-6", className),
		children
	});
}
/** Filler Likert offsets applied on top of a statement's baseWeight. */
var DEFAULT_LIKERT_OFFSET = {
	sa: 1.4,
	a: .45,
	d: -.45,
	sd: -1.4
};
var CATEGORIES = [
	{
		id: "alcohol",
		name: "Alcohol & substances",
		blurb: "Private use, intoxication, and how friends change the line.",
		individualistic: [
			{
				id: "alc-i-0",
				text: "I would refuse any alcoholic drink in any private setting.",
				baseWeight: 8
			},
			{
				id: "alc-i-1",
				text: "I would only drink a sip of wine in a clearly religious context.",
				baseWeight: 5.5
			},
			{
				id: "alc-i-2",
				text: "I am comfortable with one drink at a formal dinner, alone or not.",
				baseWeight: 3
			},
			{
				id: "alc-i-3",
				text: "I am open to drinking by myself as long as I stay fully in control.",
				baseWeight: .5
			},
			{
				id: "alc-i-4",
				text: "I am open to going drinking by myself.",
				baseWeight: -2
			},
			{
				id: "alc-i-5",
				text: "I am comfortable getting noticeably intoxicated when I am alone.",
				baseWeight: -5
			},
			{
				id: "alc-i-6",
				text: "I would use a recreational drug if I were alone and unlikely to be caught.",
				baseWeight: -8
			}
		],
		communal: [
			{
				id: "alc-c-0",
				text: "I would refuse a drink even if every friend at the table was having one.",
				baseWeight: 8
			},
			{
				id: "alc-c-1",
				text: "I might accept a drink only if a mentor I respect offered it.",
				baseWeight: 5.5
			},
			{
				id: "alc-c-2",
				text: "I am more likely to drink if a close friend is drinking.",
				baseWeight: 2.5
			},
			{
				id: "alc-c-3",
				text: "I am open to going drinking if my friend is.",
				baseWeight: 0
			},
			{
				id: "alc-c-4",
				text: "I would match my friends drink for drink to stay part of the group.",
				baseWeight: -3
			},
			{
				id: "alc-c-5",
				text: "I would get drunk if the people I want to belong with were doing so.",
				baseWeight: -5.5
			},
			{
				id: "alc-c-6",
				text: "I would try a drug if a trusted friend insisted it was safe.",
				baseWeight: -8
			}
		]
	},
	{
		id: "character",
		name: "Character",
		blurb: "Honesty, patience, speech, and how company reshapes them.",
		individualistic: [
			{
				id: "ch-i-0",
				text: "I would tell the truth even if it cost me a grade, a job, or a friendship.",
				baseWeight: 8
			},
			{
				id: "ch-i-1",
				text: "I would not shade the truth to make myself look better.",
				baseWeight: 5.5
			},
			{
				id: "ch-i-2",
				text: "I try to speak of people as if they could hear me.",
				baseWeight: 3
			},
			{
				id: "ch-i-3",
				text: "I am usually honest, with small exceptions when it is convenient.",
				baseWeight: .5
			},
			{
				id: "ch-i-4",
				text: "I would cheat on a homework assignment if I were sure I would not be caught.",
				baseWeight: -2.5
			},
			{
				id: "ch-i-5",
				text: "I am comfortable cutting people down in private if it helps me feel ahead.",
				baseWeight: -5
			},
			{
				id: "ch-i-6",
				text: "I would lie in an official setting if it clearly benefited me.",
				baseWeight: -8
			}
		],
		communal: [
			{
				id: "ch-c-0",
				text: "I would refuse to join gossip even if my whole circle was doing it.",
				baseWeight: 8
			},
			{
				id: "ch-c-1",
				text: "I would still tell the truth if a friend asked me to cover for them.",
				baseWeight: 5
			},
			{
				id: "ch-c-2",
				text: "I am more careless with my words when I am with close friends.",
				baseWeight: 2
			},
			{
				id: "ch-c-3",
				text: "I would stretch the truth if my friends treated it as normal.",
				baseWeight: 0
			},
			{
				id: "ch-c-4",
				text: "I would cheat if the people I study with were already cheating.",
				baseWeight: -3
			},
			{
				id: "ch-c-5",
				text: "I would join in mocking someone if it made me belong.",
				baseWeight: -5.5
			},
			{
				id: "ch-c-6",
				text: "I would lie for a friend even in an official setting.",
				baseWeight: -8
			}
		]
	},
	{
		id: "practice",
		name: "Biblical practices",
		blurb: "Worship, prayer, Scripture — alone, and under social pressure.",
		individualistic: [
			{
				id: "pr-i-0",
				text: "I structure my day around prayer, Scripture, and gathered worship.",
				baseWeight: 8
			},
			{
				id: "pr-i-1",
				text: "I would not skip weekly worship for something merely optional.",
				baseWeight: 5.5
			},
			{
				id: "pr-i-2",
				text: "I read Scripture most days, even when I am busy.",
				baseWeight: 3
			},
			{
				id: "pr-i-3",
				text: "I pray when I remember, but it is not a fixed discipline.",
				baseWeight: .5
			},
			{
				id: "pr-i-4",
				text: "I am comfortable identifying as Christian without regular practice.",
				baseWeight: -2
			},
			{
				id: "pr-i-5",
				text: "I would skip worship indefinitely if it conflicted with my plans.",
				baseWeight: -5
			},
			{
				id: "pr-i-6",
				text: "Prayer and Scripture have no place in how I actually live.",
				baseWeight: -8
			}
		],
		communal: [
			{
				id: "pr-c-0",
				text: "I would keep my practices even if none of my friends shared them.",
				baseWeight: 8
			},
			{
				id: "pr-c-1",
				text: "I am more faithful when I have a friend who will go with me.",
				baseWeight: 5
			},
			{
				id: "pr-c-2",
				text: "I would skip a practice if my closest friends treated it as optional.",
				baseWeight: 2
			},
			{
				id: "pr-c-3",
				text: "I tend to match the spiritual intensity of whoever I am with.",
				baseWeight: 0
			},
			{
				id: "pr-c-4",
				text: "I would drop a public practice to avoid standing out in my group.",
				baseWeight: -3
			},
			{
				id: "pr-c-5",
				text: "I would stop attending worship if my friends stopped.",
				baseWeight: -5.5
			},
			{
				id: "pr-c-6",
				text: "I would mock religious practice if that is what my circle found funny.",
				baseWeight: -8
			}
		]
	},
	{
		id: "sex",
		name: "Sex & relationships",
		blurb: "The private line, and the line that moves when a relationship is involved.",
		individualistic: [
			{
				id: "sx-i-0",
				text: "I intend to reserve sexual intimacy for marriage, including in private thought and media.",
				baseWeight: 8
			},
			{
				id: "sx-i-1",
				text: "I would not use pornography, even when I am alone.",
				baseWeight: 5.5
			},
			{
				id: "sx-i-2",
				text: "I want dating to be directed toward a serious, exclusive commitment.",
				baseWeight: 3
			},
			{
				id: "sx-i-3",
				text: "I am open to romantic involvement without a clear path toward marriage.",
				baseWeight: .5
			},
			{
				id: "sx-i-4",
				text: "I am comfortable with sexual intimacy outside of marriage if I am in love.",
				baseWeight: -2.5
			},
			{
				id: "sx-i-5",
				text: "I treat casual sexual encounters as a private matter of preference.",
				baseWeight: -5.5
			},
			{
				id: "sx-i-6",
				text: "I would pursue sexual experience for its own sake, with no relational claim.",
				baseWeight: -8
			}
		],
		communal: [
			{
				id: "sx-c-0",
				text: "I would keep my standards even if a person I deeply liked asked me not to.",
				baseWeight: 8
			},
			{
				id: "sx-c-1",
				text: "I would not watch something sexual just because a friend group was.",
				baseWeight: 5.5
			},
			{
				id: "sx-c-2",
				text: "I am more likely to cross a line if the other person is someone I trust.",
				baseWeight: 2
			},
			{
				id: "sx-c-3",
				text: "I would revise my boundaries if a partner I cared about wanted me to.",
				baseWeight: 0
			},
			{
				id: "sx-c-4",
				text: "I would match the sexual norms of the friend group I want to belong to.",
				baseWeight: -3
			},
			{
				id: "sx-c-5",
				text: "I would sleep with someone I was dating if they made it a condition of staying.",
				baseWeight: -5.5
			},
			{
				id: "sx-c-6",
				text: "I would join a hookup culture if that is what my closest friends were doing.",
				baseWeight: -8
			}
		]
	},
	{
		id: "campus",
		name: "Campus life",
		blurb: "Time, belonging, and the activities that form a community.",
		individualistic: [
			{
				id: "ca-i-0",
				text: "I would organize my week around service and gathered worship before recreation.",
				baseWeight: 8
			},
			{
				id: "ca-i-1",
				text: "I prefer activities that build people up over ones that merely entertain me.",
				baseWeight: 5
			},
			{
				id: "ca-i-2",
				text: "I make room for rest and play, but not at the expense of my obligations.",
				baseWeight: 2.5
			},
			{
				id: "ca-i-3",
				text: "I choose extracurriculars mainly by what looks good or feels fun.",
				baseWeight: 0
			},
			{
				id: "ca-i-4",
				text: "I would skip commitments I made if a more exciting option appeared.",
				baseWeight: -3
			},
			{
				id: "ca-i-5",
				text: "I treat campus life as a stage for my own status.",
				baseWeight: -5.5
			},
			{
				id: "ca-i-6",
				text: "I would sabotage a group I belong to if it advanced me personally.",
				baseWeight: -8
			}
		],
		communal: [
			{
				id: "ca-c-0",
				text: "I would keep serving even if none of my friends joined me.",
				baseWeight: 8
			},
			{
				id: "ca-c-1",
				text: "I am more likely to show up to something good if a friend is going.",
				baseWeight: 5
			},
			{
				id: "ca-c-2",
				text: "I tend to join whatever activity my closest friends already do.",
				baseWeight: 2
			},
			{
				id: "ca-c-3",
				text: "I would drop a wholesome activity if my friends found it uncool.",
				baseWeight: 0
			},
			{
				id: "ca-c-4",
				text: "I would spend most nights wherever the loudest group is, regardless of the activity.",
				baseWeight: -3
			},
			{
				id: "ca-c-5",
				text: "I would skip work I owe others in order to stay with a popular crowd.",
				baseWeight: -5.5
			},
			{
				id: "ca-c-6",
				text: "I would help a friend group exclude someone if that is how they bond.",
				baseWeight: -8
			}
		]
	}
];
var CATEGORY_IDS = CATEGORIES.map((c) => c.id);
function mulberry32(seed) {
	let a = seed >>> 0;
	return function rand() {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function randn(rand) {
	const u = Math.max(1e-12, rand());
	const v = rand();
	return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function pickLikert(rand, piety) {
	const t = (piety + 1) / 2;
	const r = rand();
	if (r < .12 + .08 * t) return "sa";
	if (r < .45 + .2 * t) return "a";
	if (r < .78 + .1 * t) return "d";
	return "sd";
}
var FIRST = [
	"Ava",
	"Noah",
	"Mia",
	"Liam",
	"Grace",
	"Owen",
	"Hannah",
	"Caleb",
	"Ruth",
	"Eli",
	"Clara",
	"Jonah",
	"Ivy",
	"Asher",
	"Nora",
	"Levi",
	"Phoebe",
	"Silas",
	"Eden",
	"Micah",
	"Lydia",
	"Ezra",
	"June",
	"Theo",
	"Iris",
	"Simon",
	"Mae",
	"Jude",
	"Willa",
	"Paul",
	"Helen",
	"Mark",
	"Ada",
	"Peter",
	"Rose",
	"James",
	"Eve",
	"Luke",
	"Nina",
	"John"
];
function agentName(i, rand) {
	return `${FIRST[i % FIRST.length]} ${String.fromCharCode(65 + Math.floor(rand() * 26))}.`;
}
function scoreLeaf(statement, likert, offsets) {
	return statement.baseWeight + offsets[likert];
}
/** Binary-search the spectrum toward the statement the person feels nearest-neutral about. */
function nextIndex(lo, hi, mid, likert) {
	if (likert === "sa" || likert === "a") return {
		lo,
		hi: Math.max(lo, mid)
	};
	return {
		lo: Math.min(hi, mid + 1),
		hi
	};
}
function startSearch(n) {
	const lo = 0;
	const hi = n - 1;
	return {
		lo,
		hi,
		mid: Math.floor((lo + hi) / 2),
		asked: 0
	};
}
function applyAnswer(state, likert) {
	const { lo, hi } = nextIndex(state.lo, state.hi, state.mid, likert);
	const asked = state.asked + 1;
	return {
		lo,
		hi,
		mid: Math.floor((lo + hi) / 2),
		asked
	};
}
function isTreeDone(state) {
	return state.asked >= 3 || state.lo >= state.hi;
}
function finalizeLeaf(categoryId, mode, statements, state, lastLikert, asked, offsets) {
	const statement = statements[Math.min(statements.length - 1, Math.max(0, state.lo === state.hi ? state.lo : state.mid))];
	return {
		categoryId,
		mode,
		statementId: statement.id,
		statementText: statement.text,
		likert: lastLikert,
		score: scoreLeaf(statement, lastLikert, offsets),
		asked
	};
}
function treeOrder() {
	const out = [];
	for (const cat of CATEGORIES) {
		out.push({
			categoryId: cat.id,
			mode: "individualistic"
		});
		out.push({
			categoryId: cat.id,
			mode: "communal"
		});
	}
	return out;
}
function statementsFor(categoryId, mode) {
	const cat = CATEGORIES.find((c) => c.id === categoryId);
	if (!cat) return [];
	return cat[mode];
}
function walkTreeRandom(statements, rand, piety, offsets, categoryId, mode) {
	let state = startSearch(statements.length);
	const asked = [];
	let last = "a";
	while (!isTreeDone(state)) {
		const st = statements[state.mid];
		last = pickLikert(rand, piety * Math.sign(st.baseWeight || 1));
		asked.push({
			statementId: st.id,
			likert: last
		});
		state = applyAnswer(state, last);
	}
	return finalizeLeaf(categoryId, mode, statements, state, last, asked, offsets);
}
function alphaFromCommunal(score, scale) {
	const x = -score / 8;
	const s = 1 / (1 + Math.exp(-x * 1.4));
	return Math.min(.85, Math.max(.04, s * scale));
}
function clamp(n, a, b) {
	return Math.max(a, Math.min(b, n));
}
function pietyForMix(mix, i, n, rand) {
	if (mix === "homogeneous") return clamp(.55 + randn(rand) * .18, -1, 1);
	if (mix === "polarized") return i < n / 2 ? clamp(.7 + randn(rand) * .15, -1, 1) : clamp(-.55 + randn(rand) * .2, -1, 1);
	if (mix === "mixed") return clamp(randn(rand) * .45, -1, 1);
	return clamp(randn(rand) * .7, -1, 1);
}
function applyW(list, w) {
	if (!w) return list;
	return list.map((s) => ({
		...s,
		baseWeight: w[s.id] ?? s.baseWeight
	}));
}
function synthesizePopulation(params, offsets, user, statementWeights) {
	const rand = mulberry32(params.seed);
	const people = [];
	const n = Math.max(2, params.n);
	const start = user ? 1 : 0;
	if (user) people.push(user);
	for (let i = start; i < n; i++) {
		const piety = pietyForMix(params.mix, i, n, rand);
		const leaves = [];
		const v0 = [];
		const alpha = [];
		for (const cat of CATEGORIES) {
			const ind = walkTreeRandom(applyW(cat.individualistic, statementWeights), rand, piety, offsets, cat.id, "individualistic");
			const com = walkTreeRandom(applyW(cat.communal, statementWeights), rand, piety * .85, offsets, cat.id, "communal");
			leaves.push(ind, com);
			v0.push(clamp(ind.score, -12, 12));
			alpha.push(alphaFromCommunal(com.score, params.impressionabilityScale));
		}
		people.push({
			id: `a-${i}`,
			name: agentName(i, rand),
			v0,
			alpha,
			budget: Math.round(8 + rand() * 22),
			clump: .25 + rand() * .7,
			leadership: clamp(.35 + randn(rand) * .25 + piety * .1, .08, 1),
			stubbornness: clamp(.2 + rand() * .55 + Math.abs(piety) * .15, .05, .9),
			leaves
		});
	}
	return people;
}
function runSimulation(people, params) {
	const rand = mulberry32(params.seed ^ 2654435769);
	const n = people.length;
	const C = CATEGORY_IDS.length;
	const v = people.map((p) => p.v0.slice());
	const v0 = people.map((p) => p.v0.slice());
	const alpha = people.map((p) => p.alpha.slice());
	const remaining = people.map((p) => p.budget);
	const clump = people.map((p) => p.clump);
	const lead = people.map((p) => p.leadership);
	const stub = people.map((p) => p.stubbornness);
	const w = Array.from({ length: n }, () => Array(n).fill(0));
	const lastCat = Array.from({ length: n }, () => Array(n).fill(-1));
	for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (rand() < params.initDensity) {
		const ww = .15 + rand() * .5;
		w[i][j] = ww;
		w[j][i] = ww;
	}
	const history = [];
	const record = (t) => {
		const means = Array(C).fill(0);
		const stds = Array(C).fill(0);
		for (let c = 0; c < C; c++) {
			let s = 0;
			for (let i = 0; i < n; i++) s += v[i][c];
			means[c] = s / n;
			let q = 0;
			for (let i = 0; i < n; i++) {
				const d = v[i][c] - means[c];
				q += d * d;
			}
			stds[c] = Math.sqrt(q / n);
		}
		history.push({
			t,
			means,
			stds,
			overall: means.reduce((a, b) => a + b, 0) / C
		});
	};
	record(0);
	let interactions = 0;
	const clumpK = params.clumpStrength;
	for (let t = 1; t <= params.steps; t++) {
		const meetings = params.meetingsPerStep;
		for (let m = 0; m < meetings; m++) {
			const live = [];
			for (let i = 0; i < n; i++) if (remaining[i] > 0) live.push(i);
			if (live.length < 2) break;
			const i = live[Math.floor(rand() * live.length)];
			const weights = [];
			let sum = 0;
			for (const j of live) {
				if (j === i) {
					weights.push(0);
					continue;
				}
				const ww = (w[i][j] || .04) * (1 + clumpK * .5 * (clump[i] + clump[j])) * (lastCat[i][j] >= 0 ? 1 + clump[i] * clumpK : 1);
				weights.push(ww);
				sum += ww;
			}
			if (sum <= 0) continue;
			let r = rand() * sum;
			let j = live[0];
			for (let k = 0; k < live.length; k++) {
				r -= weights[k];
				if (r <= 0) {
					j = live[k];
					break;
				}
			}
			if (j === i) continue;
			let c = lastCat[i][j];
			if (c < 0 || rand() > .55 + .35 * ((clump[i] + clump[j]) / 2) * clumpK) c = Math.floor(rand() * C);
			const vi = v[i][c];
			const vj = v[j][c];
			const ai = alpha[i][c] * (1 - stub[i]) * (.45 + .55 * lead[j]);
			const aj = alpha[j][c] * (1 - stub[j]) * (.45 + .55 * lead[i]);
			v[i][c] = clamp(vi + ai * (vj - vi), -12, 12);
			v[j][c] = clamp(vj + aj * (vi - vj), -12, 12);
			const nw = Math.min(2.5, (w[i][j] || .08) + .08 * clumpK);
			w[i][j] = nw;
			w[j][i] = nw;
			lastCat[i][j] = c;
			lastCat[j][i] = c;
			remaining[i] = remaining[i] - 1;
			remaining[j] = remaining[j] - 1;
			interactions += 1;
		}
		if (t % Math.max(1, Math.floor(params.steps / 24)) === 0 || t === params.steps) record(t);
	}
	const edges = [];
	for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if ((w[i][j] || 0) > .12) edges.push({
		i,
		j,
		w: w[i][j],
		lastCategory: lastCat[i][j]
	});
	return {
		params,
		names: people.map((p) => p.name),
		isUser: people.map((p) => !!p.isUser),
		v0,
		v,
		alpha,
		history,
		edges,
		interactions,
		categoryIds: CATEGORY_IDS.slice()
	};
}
function defaultWeights() {
	const statements = {};
	for (const cat of CATEGORIES) for (const s of [...cat.individualistic, ...cat.communal]) statements[s.id] = s.baseWeight;
	return {
		statements,
		likert: { ...DEFAULT_LIKERT_OFFSET }
	};
}
var defaultParams = {
	n: 48,
	steps: 80,
	meetingsPerStep: 18,
	seed: 7,
	clumpStrength: .7,
	initDensity: .08,
	impressionabilityScale: 1,
	mix: "mixed"
};
function statementWeight(w, id, fallback) {
	return w.statements[id] ?? fallback;
}
function profileFromLeaves(name, leaves, params) {
	const v0 = [];
	const alpha = [];
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
		clump: .55,
		leadership: .5,
		stubbornness: .4,
		leaves
	};
}
var useLine = create()(persist((set, get) => ({
	weights: defaultWeights(),
	params: defaultParams,
	poll: null,
	user: null,
	snapshot: null,
	running: false,
	setWeight: (id, value) => set((s) => ({ weights: {
		...s.weights,
		statements: {
			...s.weights.statements,
			[id]: value
		}
	} })),
	setLikertOffset: (k, value) => set((s) => ({ weights: {
		...s.weights,
		likert: {
			...s.weights.likert,
			[k]: value
		}
	} })),
	resetWeights: () => set({ weights: defaultWeights() }),
	setParams: (p) => set((s) => ({ params: {
		...s.params,
		...p
	} })),
	startPoll: (name) => {
		const first = treeOrder()[0];
		set({
			poll: {
				treeIdx: 0,
				search: startSearch(statementsFor(first.categoryId, first.mode).length),
				asked: [],
				lastLikert: null,
				leaves: [],
				name
			},
			user: null
		});
	},
	answer: (likert) => {
		const { poll, weights, params } = get();
		if (!poll) return;
		const order = treeOrder();
		const cur = order[poll.treeIdx];
		if (!cur) return;
		const stmts = statementsFor(cur.categoryId, cur.mode).map((s) => ({
			...s,
			baseWeight: statementWeight(weights, s.id, s.baseWeight)
		}));
		const asked = [...poll.asked, {
			statementId: stmts[poll.search.mid].id,
			likert
		}];
		const search = applyAnswer(poll.search, likert);
		if (isTreeDone(search)) {
			const leaf = finalizeLeaf(cur.categoryId, cur.mode, stmts, search, likert, asked, weights.likert);
			const leaves = [...poll.leaves, leaf];
			const nextIdx = poll.treeIdx + 1;
			if (nextIdx >= order.length) {
				set({
					poll: null,
					user: profileFromLeaves(poll.name, leaves, params)
				});
				return;
			}
			const nxt = order[nextIdx];
			const nstmts = statementsFor(nxt.categoryId, nxt.mode);
			set({ poll: {
				...poll,
				treeIdx: nextIdx,
				search: startSearch(nstmts.length),
				asked: [],
				lastLikert: null,
				leaves
			} });
			return;
		}
		set({ poll: {
			...poll,
			search,
			asked,
			lastLikert: likert
		} });
	},
	clearUser: () => set({
		user: null,
		poll: null
	}),
	run: () => {
		const { weights, params, user } = get();
		set({ running: true });
		let seeded = user;
		if (user) seeded = {
			...user,
			v0: CATEGORIES.map((cat) => {
				const leaf = user.leaves.find((l) => l.categoryId === cat.id && l.mode === "individualistic");
				if (!leaf) return 0;
				const st = cat.individualistic.find((s) => s.id === leaf.statementId);
				return statementWeight(weights, leaf.statementId, st?.baseWeight ?? 0) + weights.likert[leaf.likert];
			}),
			alpha: CATEGORIES.map((cat) => {
				const leaf = user.leaves.find((l) => l.categoryId === cat.id && l.mode === "communal");
				if (!leaf) return .3;
				const st = cat.communal.find((s) => s.id === leaf.statementId);
				return alphaFromCommunal(statementWeight(weights, leaf.statementId, st?.baseWeight ?? 0) + weights.likert[leaf.likert], params.impressionabilityScale);
			})
		};
		set({
			snapshot: runSimulation(synthesizePopulation(params, weights.likert, seeded, weights.statements), params),
			running: false
		});
	}
}), {
	name: "line-culture-lab",
	partialize: (s) => ({
		weights: s.weights,
		params: s.params,
		user: s.user,
		snapshot: s.snapshot
	})
}));
//#endregion
export { Input as a, treeOrder as c, FillerBadge as i, useLine as l, CATEGORIES as n, Panel as o, Field as r, statementsFor as s, Button as t };
