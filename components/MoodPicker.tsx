"use client";

import { useEffect, useState } from "react";
import { applyMood, moods, type Mood } from "@/lib/moods";

export default function MoodPicker() {
  const [active, setActive] = useState(moods[0].id);

  useEffect(() => {
    const onMood = (e: Event) => setActive((e as CustomEvent<Mood>).detail.id);
    window.addEventListener("mood", onMood);
    return () => window.removeEventListener("mood", onMood);
  }, []);

  return (
    <div
      role="group"
      aria-label="Page mood"
      className="inline-flex items-center gap-1 rounded-full border border-line bg-bg/40 p-1.5 backdrop-blur-xl"
    >
      <span className="hidden px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint sm:inline">Mood</span>
      {moods.map((m) => {
        const on = m.id === active;
        return (
          <button
            key={m.id}
            type="button"
            aria-pressed={on}
            onClick={() => applyMood(m.id)}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors ${
              on ? "bg-text/10 text-text" : "text-muted hover:text-text"
            }`}
          >
            <span
              aria-hidden
              className="size-3 rounded-full ring-1 ring-white/30"
              style={{ background: `linear-gradient(135deg, ${m.c[0]}, ${m.c[1]})` }}
            />
            <span className={on ? "" : "hidden md:inline"}>{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}
