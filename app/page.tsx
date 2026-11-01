import Header from "@/components/Header";
import AuroraShader from "@/components/AuroraShader";
import MoodPicker from "@/components/MoodPicker";
import JunctionCanvas from "@/components/JunctionCanvas";
import SignalLab from "@/components/SignalLab";
import ScreeningDemo from "@/components/ScreeningDemo";
import { links, withBase } from "@/lib/site";

const facts = [
  { k: "9.12", v: "CGPA, B.E. CSE (2027)" },
  { k: "1st", v: "Oxy-Hack, 18-hour hackathon" },
  { k: "2nd", v: "HackSetu at TATVA'26" },
  { k: "IEEE", v: "Xplore publication, 2025" },
];

const ticker = [
  "Python", "FastAPI", "React", "Spring Boot", "PostgreSQL", "scikit-learn",
  "SQLAlchemy", "JWT", "Node.js", "Tailwind", "AWS", "Postman",
];

const stack = [
  { group: "AI & ML", items: ["Machine Learning", "scikit-learn", "Computer Vision", "Emotion Classification", "Model Evaluation", "Data Preprocessing"] },
  { group: "Backend", items: ["Python", "FastAPI", "Flask", "Node.js", "REST APIs", "SQLAlchemy", "JWT Auth"] },
  { group: "Frontend", items: ["React.js", "Tailwind CSS", "HTML", "CSS", "Streamlit"] },
  { group: "Data", items: ["PostgreSQL", "SQLite", "SQL"] },
  { group: "Languages", items: ["Python", "Java", "C++", "JavaScript"] },
  { group: "Tools & Cloud", items: ["AWS", "Git", "GitHub", "Postman"] },
];

const recognition = [
  { tag: "1st place", title: "Oxy-Hack, 18-hour hackathon", where: "The Oxford College of Engineering" },
  { tag: "2nd place", title: "HackSetu (Theme 1)", where: "TATVA'26, BNM Institute of Technology" },
  {
    tag: "Published",
    title: "A Simplified Approach to Direct AC-AC Matrix Converter Using Verilog HDL for Real-Time Application",
    where: "IEEE Xplore, 2025",
  },
];

const pipeline = [
  { name: "Resume parsed", w: 0.9 },
  { name: "Skills matched", w: 0.72 },
  { name: "Fit scored", w: 0.85 },
  { name: "Questions generated", w: 0.6 },
];

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <div className="reveal max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display mt-4 text-3xl sm:text-5xl">{title}</h2>
      </div>
      <div className="mt-14">{children}</div>
    </section>
  );
}

function Arrow() {
  return (
    <span aria-hidden className="font-mono text-faint">
      →
    </span>
  );
}

function Demo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="group mt-8">
      <summary className="glass inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium transition-colors hover:bg-text/10">
        <span aria-hidden className="plus grid size-5 place-items-center rounded-full bg-accent text-base leading-none text-accent-ink transition-transform">
          +
        </span>
        {label}
      </summary>
      <div className="mt-6">{children}</div>
    </details>
  );
}

function Tile({ kind, title, sub, href, children }: { kind: string; title: string; sub: string; href: string; children: React.ReactNode }) {
  return (
    <div className="relative isolate aspect-[4/3] overflow-hidden rounded-[28px] border border-line bg-surface sm:aspect-[21/9]">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(70%_90%_at_85%_10%,var(--m2),transparent_70%),radial-gradient(60%_80%_at_10%_100%,var(--m1),transparent_70%)] opacity-35"
      />
      <div className="absolute inset-0 -z-10">{children}</div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,oklch(0.1_0.01_255/0.85)_6%,transparent_55%)]" />
      <div className="flex h-full flex-col justify-between p-5 sm:p-8">
        <div className="flex items-start justify-between gap-3">
          <span className="glass rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{kind}</span>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors hover:bg-text/15"
          >
            GitHub <Arrow />
          </a>
        </div>
        <div>
          <h3 className="display text-4xl sm:text-6xl">{title}</h3>
          <p className="mt-1 text-base text-muted sm:text-lg">{sub}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        {/* HERO */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-30 bg-[radial-gradient(80%_60%_at_50%_30%,var(--m2),transparent_70%),radial-gradient(60%_50%_at_20%_70%,var(--m1),transparent_70%)] opacity-40"
          />
          <div className="absolute inset-0 -z-30">
            <AuroraShader />
          </div>
          <div aria-hidden className="grain absolute inset-0 -z-20" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_44%,oklch(0.12_0.01_255/0.42),transparent_78%),linear-gradient(to_bottom,transparent_72%,var(--bg))]"
          />

          <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-5 pb-24 pt-32 text-center">
            <p className="enter glass flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted" style={{ "--i": 0 } as React.CSSProperties}>
              <span aria-hidden className="size-1.5 rounded-full bg-go" />
              Computer Science · Class of 2027
            </p>
            <h1 className="enter mt-8 max-w-4xl" style={{ "--i": 1 } as React.CSSProperties}>
              <span className="block text-lg font-medium tracking-[0.02em] text-muted sm:text-xl">Rishi Roy</span>
              <span className="display mt-4 block text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05]">
                Backend and AI systems that turn data into{" "}
                <span className="grad font-serif font-normal italic tracking-normal">decisions.</span>
              </span>
            </h1>
            <p className="enter mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={{ "--i": 2 } as React.CSSProperties}>
              Computer Science student focused on REST APIs, machine learning services and full-stack applications,
              from the database to the dashboard.
            </p>
            <div className="enter mt-10 flex flex-wrap items-center justify-center gap-3" style={{ "--i": 3 } as React.CSSProperties}>
              <a href="#work" className="rounded-full bg-text px-7 py-3.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5">
                See the work →
              </a>
              <a href={withBase(links.resume)} className="glass rounded-full px-7 py-3.5 text-sm font-medium transition-colors hover:bg-text/15">
                Download resume
              </a>
            </div>
            <div className="enter mt-14 flex flex-col items-center gap-3" style={{ "--i": 4 } as React.CSSProperties}>
              <MoodPicker />
              <p className="font-mono text-xs text-faint">Pick a mood. Move your cursor through the colour.</p>
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div className="marquee overflow-hidden border-y border-line py-5" aria-label="Technologies I work with">
          <div className="marquee-track" aria-hidden>
            {[0, 1].map((n) => (
              <div key={n} className="flex shrink-0 items-center">
                {ticker.map((t) => (
                  <span key={`${n}-${t}`} className="flex items-center font-mono text-sm uppercase tracking-[0.14em] text-muted">
                    <span className="px-8">{t}</span>
                    <span className="text-accent">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
          <p className="sr-only">Python, FastAPI, React, Spring Boot, PostgreSQL, scikit-learn, SQLAlchemy, JWT, Node.js, Tailwind CSS, AWS, Postman</p>
        </div>

        {/* FACTS */}
        <section aria-label="Highlights">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 md:grid-cols-4">
            {facts.map((f) => (
              <div key={f.k} className="reveal py-10 md:px-6 md:first:pl-0">
                <dt className="display text-5xl text-accent sm:text-6xl">{f.k}</dt>
                <dd className="mt-2 text-sm text-muted">{f.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* WORK */}
        <Section
          id="work"
          eyebrow="Selected work"
          title={
            <>
              Two systems, built end to end,
              <span className="font-serif font-normal italic tracking-normal text-muted"> and you can poke both.</span>
            </>
          }
        >
          <div className="space-y-28">
            {/* SAHAJ */}
            <article className="reveal">
              <Tile kind="Traffic intelligence · 3-tier" title="SAHAJ" sub="Smart Adaptive Highway & Junction" href={links.sahaj}>
                <JunctionCanvas />
              </Tile>
              <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
                <ul className="space-y-4 text-lg leading-relaxed text-muted">
                  <li>
                    A full-stack crowd and traffic management system that predicts real-time crowd severity levels to
                    coordinate traffic signals.
                  </li>
                  <li>
                    3-tier architecture: Spring Boot for backend services, FastAPI for a dedicated ML service, React.js
                    for visualisation.
                  </li>
                  <li>PostgreSQL-backed dashboard monitoring crowd density and traffic insights across junctions.</li>
                </ul>
                <div>
                  <p className="eyebrow">Architecture</p>
                  <div
                    className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs"
                    role="img"
                    aria-label="Architecture: React dashboard, Spring Boot API, FastAPI ML service, PostgreSQL"
                  >
                    {["React.js", "Spring Boot", "FastAPI · ML", "PostgreSQL"].map((n, i, a) => (
                      <span key={n} className="flex items-center gap-2">
                        <span className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-text">{n}</span>
                        {i < a.length - 1 && <Arrow />}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 text-sm text-faint">The tile above is a live adaptive-signal simulation. Hover it to create a crowd surge.</p>
                </div>
              </div>
              <Demo label="Try the signal lab">
                <SignalLab />
              </Demo>
            </article>

            {/* TalentAI */}
            <article className="reveal">
              <Tile kind="AI-powered HR platform" title="TalentAI HRMS" sub="Human Resource Management System" href={links.talentai}>
                <div className="grid h-full place-items-center px-5 pb-28 pt-20 sm:pb-24 sm:pt-16">
                  <div className="grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4" role="img" aria-label="Illustrative screening pipeline: resume parsed, skills matched, fit scored, questions generated">
                    {pipeline.map((p, i) => (
                      <div key={p.name} className="stage card p-4" style={{ "--s": i } as React.CSSProperties}>
                        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">0{i + 1}</p>
                        <p className="mt-1 text-sm font-medium">{p.name}</p>
                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-text/10">
                          <div className="fillbar h-full rounded-full bg-accent" style={{ "--s": i, "--w": p.w } as React.CSSProperties} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tile>
              <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
                <ul className="space-y-4 text-lg leading-relaxed text-muted">
                  <li>
                    Covers 5 core HR functions: recruitment, employee management, attendance, payroll and performance
                    tracking.
                  </li>
                  <li>
                    Automates 2 recruitment workflows, AI resume screening and interview question generation. Research
                    with 100 HR professionals and recruiters in India found AI resume screening significantly
                    associated with time-to-hire.
                  </li>
                  <li>
                    FastAPI, SQLAlchemy, SQLite and JWT authentication on the back end; responsive React.js dashboards
                    with role-based access and analytics.
                  </li>
                </ul>
                <div>
                  <p className="eyebrow">Built with</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["FastAPI", "SQLAlchemy", "SQLite", "JWT", "React.js"].map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 text-sm text-faint">The tile above is an illustrative screening pipeline.</p>
                </div>
              </div>
              <Demo label="Try the screening demo">
                <ScreeningDemo />
              </Demo>
            </article>
          </div>
        </Section>

        {/* STACK */}
        <Section id="stack" eyebrow="Toolbox" title={<>What I reach for.</>}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((g) => (
              <div key={g.group} className="card reveal p-6">
                <h3 className="font-mono text-sm text-accent">{g.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i} className="chip">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" eyebrow="Experience & education" title={<>Where I&apos;ve worked and learned.</>}>
          <div className="grid gap-4 lg:grid-cols-2">
            <article className="card reveal p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium">API Research &amp; Integration Intern</h3>
                  <p className="mt-1 text-muted">DNAG Technologies</p>
                </div>
                <span className="chip">3 months</span>
              </div>
              <ul className="mt-6 space-y-3 text-muted">
                <li>
                  Researched Flipkart Seller APIs covering seller onboarding, product listing, shipment management and
                  order processing.
                </li>
                <li>
                  Tested and validated REST APIs in Postman: authentication, requests, responses, parameters and
                  endpoint behaviour.
                </li>
                <li>Documented API endpoints and how they fit into business workflows.</li>
              </ul>
            </article>
            <article className="card reveal p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium">B.E. in Computer Science &amp; Engineering</h3>
                  <p className="mt-1 text-muted">The Oxford College of Engineering</p>
                </div>
                <span className="chip">2023 – 2027</span>
              </div>
              <p className="display mt-8 text-6xl text-accent">
                9.12<span className="font-sans text-xl font-normal tracking-normal text-faint"> / 10</span>
              </p>
              <p className="mt-2 text-muted">Current CGPA · expected graduation 2027</p>
            </article>
          </div>
        </Section>

        {/* RECOGNITION */}
        <Section id="recognition" eyebrow="Recognition" title={<>Proof it works under pressure.</>}>
          <ol className="divide-y divide-line border-y border-line">
            {recognition.map((r) => (
              <li key={r.title} className="reveal grid gap-2 py-8 sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-8">
                <span className="font-mono text-sm text-accent">{r.tag}</span>
                <span className="text-xl font-medium leading-snug sm:text-2xl">{r.title}</span>
                <span className="text-sm text-muted">{r.where}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* CONTACT */}
        <section id="contact" className="relative isolate overflow-hidden border-t border-line">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_120%,var(--m2),transparent_70%),radial-gradient(40%_60%_at_85%_110%,var(--m1),transparent_70%)] opacity-35"
          />
          <div aria-hidden className="grain absolute inset-0 -z-10 opacity-20" />
          <div className="mx-auto max-w-6xl px-5 py-28 text-center sm:py-40">
            <p className="eyebrow reveal">Contact</p>
            <h2 className="display reveal mx-auto mt-5 max-w-4xl text-[clamp(2.5rem,7vw,6rem)] leading-[0.98]">
              Have a backend or ML problem <span className="grad">worth solving?</span>
            </h2>
            <a
              href={`mailto:${links.email}`}
              className="reveal mt-12 inline-block break-all rounded-full bg-text px-8 py-4 font-mono text-base text-bg transition-transform hover:-translate-y-0.5 sm:text-xl"
            >
              {links.email}
            </a>
            <div className="reveal mt-8 flex flex-wrap justify-center gap-3">
              {[
                ["GitHub", links.github],
                ["LinkedIn", links.linkedin],
                ["LeetCode", links.leetcode],
              ].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="glass rounded-full px-5 py-2.5 text-sm transition-colors hover:bg-text/15">
                  {label}
                </a>
              ))}
              <a href={`tel:${links.phone.replace(/\s/g, "")}`} className="glass rounded-full px-5 py-2.5 text-sm transition-colors hover:bg-text/15">
                {links.phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 font-mono text-xs text-faint">
          <span>© 2026 Rishi Roy</span>
          <span>Next.js 16 · React 19 · Tailwind v4 · WebGL</span>
        </div>
      </footer>
    </>
  );
}
