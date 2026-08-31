export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randn(rand: () => number) {
  const u = Math.max(1e-12, rand());
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function poisson(rand: () => number, lambda: number) {
  if (lambda <= 0) return 0;
  if (lambda > 30) {
    return Math.max(0, Math.round(lambda + randn(rand) * Math.sqrt(lambda)));
  }
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k += 1;
    p *= rand();
  } while (p > L);
  return k - 1;
}

export function pickLikert(rand: () => number, piety: number): "sa" | "a" | "d" | "sd" {
  const t = (piety + 1) / 2;
  const r = rand();
  if (r < 0.12 + 0.08 * t) return "sa";
  if (r < 0.45 + 0.2 * t) return "a";
  if (r < 0.78 + 0.1 * t) return "d";
  return "sd";
}

const FIRST = [
  "Ava", "Noah", "Mia", "Liam", "Grace", "Owen", "Hannah", "Caleb", "Ruth", "Eli",
  "Clara", "Jonah", "Ivy", "Asher", "Nora", "Levi", "Phoebe", "Silas", "Eden", "Micah",
  "Lydia", "Ezra", "June", "Theo", "Iris", "Simon", "Mae", "Jude", "Willa", "Paul",
  "Helen", "Mark", "Ada", "Peter", "Rose", "James", "Eve", "Luke", "Nina", "John",
];

export function agentName(i: number, rand: () => number) {
  return `${FIRST[i % FIRST.length]} ${String.fromCharCode(65 + Math.floor(rand() * 26))}.`;
}
