export type Mood = {
  id: string;
  label: string;
  /** shader colours, hex */
  c: [string, string, string];
  /** UI accent, hex */
  accent: string;
};

export const moods: Mood[] = [
  { id: "signal", label: "Signal", c: ["#ff9f1c", "#0ea5a4", "#4f46e5"], accent: "#ffb52e" },
  { id: "ember", label: "Ember", c: ["#ff4d2e", "#8a1fb0", "#ffb347"], accent: "#ff7a59" },
  { id: "tide", label: "Tide", c: ["#19c2d8", "#2459ff", "#7be0c3"], accent: "#4fd1e8" },
  { id: "orchid", label: "Orchid", c: ["#c04bff", "#ff4fa3", "#4a5bff"], accent: "#d98cff" },
  { id: "moss", label: "Moss", c: ["#34d399", "#0b6e4f", "#d9f99d"], accent: "#6ee7a8" },
];

export const BG_HEX = "#07080b";

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
