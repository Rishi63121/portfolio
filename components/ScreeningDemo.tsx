"use client";

import { useId, useMemo, useState } from "react";

const roles = [
  { name: "Backend engineer", skills: ["python", "fastapi", "sql", "jwt", "docker", "postgresql"] },
  { name: "ML engineer", skills: ["python", "scikit-learn", "pandas", "model evaluation", "feature engineering"] },
  { name: "Frontend developer", skills: ["react", "typescript", "tailwind", "accessibility", "testing"] },
];

const sample =
  "Final-year CS student. Built REST APIs in Python and FastAPI with SQL databases and JWT authentication. Trained classification models with scikit-learn and pandas. Comfortable with React and Tailwind.";

const probe = (skill: string) => `Walk me through a decision you made while using ${skill}, and what you would change.`;
const gap = (skill: string) => `You haven't listed ${skill}. How would you get productive with it in two weeks?`;

export default function ScreeningDemo() {
  const id = useId();
  const [role, setRole] = useState(0);
  const [text, setText] = useState(sample);

  const result = useMemo(() => {
    const body = text.toLowerCase();
    const required = roles[role].skills;
    const matched = required.filter((s) => body.includes(s));
    const missing = required.filter((s) => !body.includes(s));
    return {
      matched,
      missing,
      score: Math.round((matched.length / required.length) * 100),
      questions: [...matched.slice(0, 2).map(probe), ...missing.slice(0, 2).map(gap)],
    };
  }, [role, text]);

  return (
    <div className="card p-5 sm:p-6" role="group" aria-labelledby={`${id}-t`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Screening demo</p>
          <h4 id={`${id}-t`} className="mt-1 text-lg font-medium">
            Match a profile to a role, then generate interview questions
          </h4>
        </div>
        <span className="chip">Sample data · keyword matcher, not the AI model</span>
      </div>

      <div role="radiogroup" aria-label="Target role" className="mt-5 flex flex-wrap gap-2">
        {roles.map((r, i) => (
          <button
            key={r.name}
            type="button"
            role="radio"
            aria-checked={role === i}
            onClick={() => setRole(i)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              role === i
                ? "border-accent bg-accent text-accent-ink"
                : "border-line bg-surface-2 text-muted hover:border-line-strong hover:text-text"
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <label htmlFor={`${id}-text`} className="text-sm text-muted">
            Candidate summary (editable)
          </label>
          <textarea
            id={`${id}-text`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            className="mt-2 w-full resize-none rounded-xl border border-line bg-surface-2 p-3.5 text-sm leading-relaxed text-text outline-none focus:border-accent"
          />
        </div>

        <div aria-live="polite">
          <div className="flex items-end justify-between">
            <span className="text-sm text-muted">Role fit</span>
            <span className="font-mono text-3xl font-medium tabular-nums">{result.score}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out motion-reduce:transition-none"
              style={{ width: `${result.score}%` }}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {result.matched.map((s) => (
              <span key={s} className="chip border-go/40 text-go">
                ✓ {s}
              </span>
            ))}
            {result.missing.map((s) => (
              <span key={s} className="chip">
                ○ {s}
              </span>
            ))}
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {result.questions.map((q) => (
              <li key={q} className="flex gap-2.5">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
