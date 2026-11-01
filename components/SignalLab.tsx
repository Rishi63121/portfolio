"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const CYCLE = 90;
const LOST = 10;

const severity = (n: number) =>
  n < 25 ? "Low" : n < 50 ? "Moderate" : n < 75 ? "High" : "Critical";

const tone = (n: number) =>
  n < 25 ? "text-go" : n < 50 ? "text-muted" : n < 75 ? "text-amber" : "text-stop";

const presets = [
  { label: "Quiet night", ns: 8, ew: 14 },
  { label: "Office rush", ns: 82, ew: 38 },
  { label: "Event exit", ns: 30, ew: 94 },
];

export default function SignalLab() {
  const id = useId();
  const [ns, setNs] = useState(82);
  const [ew, setEw] = useState(38);
  const reduce = useReducedMotion();

  const green = CYCLE - LOST;
  const nsGreen = Math.min(60, Math.max(15, Math.round((green * (ns + 10)) / (ns + ew + 20))));
  const ewGreen = green - nsGreen;
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 140, damping: 22 };

  return (
    <div className="card p-5 sm:p-6" role="group" aria-labelledby={`${id}-t`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Signal lab</p>
          <h4 id={`${id}-t`} className="mt-1 text-lg font-medium">
            Re-time a junction from crowd severity
          </h4>
        </div>
        <span className="chip">Illustrative model, not the production predictor</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setNs(p.ns);
              setEw(p.ew);
            }}
            className="rounded-full border border-line bg-surface-2 px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-text"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {[
          { label: "North–South crowd", v: ns, set: setNs, k: "ns" },
          { label: "East–West crowd", v: ew, set: setEw, k: "ew" },
        ].map((s) => (
          <div key={s.k}>
            <label htmlFor={`${id}-${s.k}`} className="flex items-baseline justify-between text-sm">
              <span className="text-muted">{s.label}</span>
              <span className={`font-mono text-xs ${tone(s.v)}`}>
                {severity(s.v)} · {s.v}
              </span>
            </label>
            <input
              id={`${id}-${s.k}`}
              type="range"
              min={0}
              max={100}
              value={s.v}
              onChange={(e) => s.set(Number(e.target.value))}
              className="mt-3 w-full"
            />
          </div>
        ))}
      </div>

      <div className="mt-7">
        <div className="flex items-baseline justify-between font-mono text-xs text-faint">
          <span>{CYCLE}s cycle</span>
          <span>{LOST}s clearance</span>
        </div>
        <div
          className="mt-2 flex h-11 overflow-hidden rounded-xl border border-line bg-surface-2"
          role="img"
          aria-label={`North–South green ${nsGreen} seconds, East–West green ${ewGreen} seconds`}
        >
          <motion.div
            animate={{ flexGrow: nsGreen }}
            transition={spring}
            className="grid place-items-center bg-accent font-mono text-sm font-medium text-accent-ink"
            style={{ flexBasis: 0 }}
          >
            NS {nsGreen}s
          </motion.div>
          <div className="w-1.5 bg-bg" aria-hidden />
          <motion.div
            animate={{ flexGrow: ewGreen }}
            transition={spring}
            className="grid place-items-center bg-text/85 font-mono text-sm font-medium text-bg"
            style={{ flexBasis: 0 }}
          >
            EW {ewGreen}s
          </motion.div>
        </div>
        <p className="mt-3 text-sm text-muted" aria-live="polite">
          {ns > ew + 20
            ? "North–South is heavier, so it keeps the longer green."
            : ew > ns + 20
              ? "East–West is heavier, so it keeps the longer green."
              : "Demand is balanced, so the split stays close to even."}
        </p>
      </div>
    </div>
  );
}
