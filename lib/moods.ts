export type Mood = {
  id: string;
  label: string;
  /** shader colours, hex */
  c: [string, string, string];
  /** UI accent, hex */
  accent: string;
};

export const moods: Mood[] = [
  { id: "crimson", label: "Crimson", c: ["#d12b2b", "#6f0f18", "#ff8a4c"], accent: "#e5483d" },
  { id: "ember", label: "Ember", c: ["#ff7a1a", "#a31d1d", "#ffd166"], accent: "#ff8a3d" },
  { id: "gold", label: "Gold", c: ["#d9a13b", "#6b4a14", "#f5e3b3"], accent: "#e2b24f" },
  { id: "ocean", label: "Ocean", c: ["#1fb5c9", "#1d4ed8", "#6ee7d4"], accent: "#4fc3d9" },
  { id: "violet", label: "Violet", c: ["#a855f7", "#4c1d95", "#f472b6"], accent: "#b779f5" },
];

export const BG_HEX = "#0a0606";

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function applyMood(id: string) {
  const m = moods.find((x) => x.id === id);
  if (!m) return;
  const root = document.documentElement;
  root.setAttribute("data-mood", id);
  root.style.setProperty("--accent", m.accent);
  root.style.setProperty("--m1", m.c[0]);
  root.style.setProperty("--m2", m.c[1]);
  root.style.setProperty("--m3", m.c[2]);
  window.dispatchEvent(new CustomEvent("mood", { detail: m }));
}
