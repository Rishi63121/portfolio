import Header from "@/components/Header";
import AuroraShader from "@/components/AuroraShader";
import MoodPicker from "@/components/MoodPicker";
import JunctionCanvas from "@/components/JunctionCanvas";
import SignalLab from "@/components/SignalLab";
import ScreeningDemo from "@/components/ScreeningDemo";
import Parallax from "@/components/Parallax";
import CountUp from "@/components/CountUp";
import Icon, { type IconName } from "@/components/Icon";
import Portrait from "@/components/Portrait";
import NeuralOrb from "@/components/NeuralOrb";
import QrCode from "@/components/QrCode";
import Waves from "@/components/Waves";
import { links, withBase } from "@/lib/site";

const ticker = ["Python", "FastAPI", "React", "Spring Boot", "PostgreSQL", "scikit-learn", "SQLAlchemy", "JWT", "Node.js", "Tailwind", "AWS", "Postman"];

const stats = [
  { v: 9.12, d: 2, l: "CGPA", icon: "cap" as IconName },
  { v: 3, d: 0, l: "Flagship systems", icon: "layers" as IconName },
  { v: 2, d: 0, l: "Hackathon podiums", icon: "trophy" as IconName },
];

const whatIDo: { icon: IconName; t: string; d: string }[] = [
  { icon: "server", t: "APIs & Backend", d: "REST APIs with FastAPI, Flask and Node.js, SQLAlchemy models and JWT authentication." },
  { icon: "chip", t: "AI & ML Services", d: "Model training and evaluation, computer vision, emotion classification with scikit-learn." },
  { icon: "layout", t: "Full-stack Apps", d: "React dashboards, Tailwind CSS and Streamlit apps wired to real backends." },
  { icon: "database", t: "Databases", d: "PostgreSQL, SQLite and SQL: schemas, queries and the data behind the dashboards." },
  { icon: "cloud", t: "Cloud & Tooling", d: "AWS, Git, GitHub and Postman for building, testing and shipping." },
];

const process: { icon: IconName; t: string; d: string }[] = [
  { icon: "search", t: "Discover", d: "Research the domain and the APIs involved before writing code." },
  { icon: "schema", t: "Define", d: "Model the data and design clean, well-named REST endpoints." },
  { icon: "code", t: "Build", d: "FastAPI and Spring Boot services with JWT auth, backed by PostgreSQL." },
  { icon: "spark", t: "Integrate ML", d: "Train and serve models behind a dedicated FastAPI service." },
  { icon: "check", t: "Test & document", d: "Validate every endpoint in Postman and document how it works." },
];

const tools = [
  { n: "Python", m: "Py" },
  { n: "FastAPI", m: "Fa" },
  { n: "React", m: "Re" },
  { n: "PostgreSQL", m: "Pg" },
  { n: "scikit-learn", m: "Sk" },
  { n: "AWS", m: "AWS" },
  { n: "Git", m: "Git" },
  { n: "Postman", m: "Pm" },
];

const alsoUse = ["Flask", "Node.js", "SQLAlchemy", "JWT", "Streamlit", "SQLite", "Java", "C++", "JavaScript", "Computer Vision", "Emotion Classification", "Data Preprocessing"];

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
  { name: "Questions ready", w: 0.6 },
];

function PanelTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="panel-title text-text">{children}</h2>;
}

function Arrow() {
  return (
    <span aria-hidden className="font-mono">
      →
    </span>
  );
}

function WorkTile({ title, kind, href, liveHref, children }: { title: string; kind: string; href?: string; liveHref?: string; children: React.ReactNode }) {
  return (
    <article className="reveal">
      <div className="tile relative aspect-[16/10] overflow-hidden rounded-[3px]">{children}</div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[0.82rem] font-semibold uppercase tracking-wide text-text">{title}</h3>
          <p className="mt-0.5 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-faint">{kind}</p>
        </div>
        {(href || liveHref) && (
          <div className="flex shrink-0 gap-4">
            {liveHref && (
              <a href={liveHref} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-accent hover:underline">
                Live demo <Arrow />
              </a>
            )}
            {href && (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-accent hover:underline">
                GitHub <Arrow />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function Lab({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="group">
      <summary className="glass inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium transition-colors hover:border-accent">
        <span aria-hidden className="plus grid size-5 place-items-center rounded-full bg-accent text-base leading-none text-accent-ink transition-transform">
          +
        </span>
        {label}
      </summary>
      <div className="mt-5">{children}</div>
    </details>
  );
}

export default function Home() {
  const giant = "PORTFOLIO".split("");

  return (
    <>
      <Header />
      {/* site-wide living background: mood-coloured flowing shader that follows the pointer.
          h-lvh (largest viewport) keeps the fixed layer a constant size while the iOS toolbars collapse and
          expand, so it never resizes (and blanks) mid-scroll. */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 -z-40 h-lvh transform-gpu bg-[radial-gradient(120%_90%_at_50%_40%,color-mix(in_srgb,var(--m2)_75%,var(--bg)),var(--bg))] opacity-[0.7]">
        <AuroraShader />
      </div>
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 -z-30 h-lvh transform-gpu bg-[radial-gradient(120%_90%_at_50%_40%,transparent_30%,rgb(10_6_6/0.55))]" />
      <main id="top">
        {/* HERO */}
        <Parallax>
          <section className="relative isolate overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 -z-30 bg-[radial-gradient(70%_55%_at_70%_30%,var(--m2),transparent_70%),radial-gradient(50%_50%_at_20%_80%,var(--m1),transparent_70%)] opacity-45"
            />
            <div aria-hidden className="grain absolute inset-0 -z-20" />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(75%_65%_at_50%_35%,transparent,rgb(10_6_6/0.78)_85%),linear-gradient(to_bottom,transparent_70%,var(--bg))]"
            />

            <div className="mx-auto max-w-6xl px-5 pb-20 pt-24 sm:pt-28">
              <div className="enter flex items-center gap-4 font-mono text-[0.64rem] uppercase tracking-[0.24em] text-faint sm:text-[0.7rem]" style={{ "--i": 0 } as React.CSSProperties}>
                <span>Portfolio 2026</span>
                <span aria-hidden className="h-px flex-1 bg-line-strong" />
                <span className="flex items-center gap-2">
                  <span className="hidden sm:inline">Computer Science ·</span> Class of 2027
                  <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                </span>
              </div>

              <h1 className="cond relative z-10 mt-5 select-none whitespace-nowrap text-center text-[min(19.6vw,17.6rem)] leading-[0.84] tracking-[-0.005em] text-text">
                <span className="sr-only">Rishi Roy, Backend and AI/ML Developer</span>
                <span aria-hidden>
                  {giant.map((c, i) => (
                    <span key={i} className="letter" style={{ "--i": i } as React.CSSProperties}>
                      {c}
                    </span>
                  ))}
                </span>
              </h1>

              <div className="relative mt-4 grid gap-10 lg:grid-cols-[1fr_1.15fr_1fr] lg:items-start lg:gap-6">
                {/* left: positioning + quote */}
                <div className="enter order-3 lg:order-1 lg:pt-14" style={{ "--i": 3 } as React.CSSProperties}>
                  <p className="cond text-[clamp(2.2rem,4vw,3.4rem)] text-text">API / ML / Web</p>
                  <ul className="mt-5 space-y-1.5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                    <li>REST APIs</li>
                    <li>ML services</li>
                    <li>Dashboards</li>
                  </ul>
                  <div aria-hidden className="mt-5 h-0.5 w-9 bg-accent" />
                  <div className="mt-9 flex gap-3">
                    <span aria-hidden className="cond text-6xl leading-[0.7] text-accent">
                      “
                    </span>
                    <p className="max-w-[15rem] text-sm uppercase leading-relaxed tracking-[0.14em] text-text/90">
                      I build backends and ML services that turn data into decisions.
                    </p>
                  </div>
                  <p aria-hidden className="sign mt-7 -rotate-3 text-3xl text-text/90">
                    Rishi Roy
                  </p>
                </div>

                {/* center: red circle + portrait slot */}
                <div className="relative order-1 mx-auto aspect-square w-[min(82vw,27rem)] lg:order-2 lg:-mt-[min(8vw,7.5rem)]">
                  <div className="enter absolute inset-0" style={{ "--i": 2 } as React.CSSProperties}>
                    <div aria-hidden className="spin-slow absolute inset-0 rounded-full border border-dashed border-line-strong" />
                    <div
                      aria-hidden
                      className="breathe absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_34%_28%,color-mix(in_srgb,var(--accent)_92%,#fff_8%),var(--m2)_78%)] shadow-[0_0_130px_-25px_var(--accent)]"
                    />
                  </div>
                  {/* live neural-network orb: turns toward the cursor and fires signals near it */}
                  <div className="enter absolute inset-0 z-20" style={{ "--i": 3 } as React.CSSProperties}>
                    <div className="relative size-full" role="img" aria-label="Animated neural network sphere that reacts to your cursor">
                      <NeuralOrb />
                    </div>
                  </div>
                </div>

                {/* right: name + stats */}
                <div className="enter relative z-20 order-2 lg:order-3" style={{ "--i": 4 } as React.CSSProperties}>
                  <div aria-hidden className="absolute right-0 top-2 hidden size-[6.6rem] text-text/90 lg:block">
                    <svg viewBox="0 0 120 120" className="spin-slow size-full">
                      <defs>
                        <path id="ring" d="M60 60 m-45 0 a45 45 0 1 1 90 0 a45 45 0 1 1 -90 0" />
                      </defs>
                      <text fontSize="9.5" fill="currentColor" className="font-mono uppercase" letterSpacing="2.4">
                        <textPath href="#ring" textLength="280">
                          Backend • AI/ML • Full-stack • Python •
                        </textPath>
                      </text>
                    </svg>
                    <svg viewBox="0 0 100 100" className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 text-accent" fill="currentColor">
                      <path d="M50 0 58 38 93 15 66 44 100 50 66 56 93 85 58 62 50 100 42 62 7 85 34 56 0 50 34 44 7 15 42 38Z" />
                    </svg>
                  </div>

                  <p className="cond text-[clamp(2.8rem,5vw,4.4rem)] text-text">
                    Rishi
                    <br />
                    Roy
                  </p>
                  <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">Backend · AI/ML · Full-stack developer</p>
                  <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-muted">
                    Computer Science student who designs REST APIs, ML services and dashboards, from the database to the screen. Hackathon winner and IEEE Xplore author.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <a href="#work" className="rounded-full bg-text px-5 py-2.5 text-[0.8rem] font-semibold text-bg transition-transform hover:-translate-y-0.5">
                      See the work →
                    </a>
                    <a href={withBase(links.resume)} className="glass rounded-full px-5 py-2.5 text-[0.8rem] font-semibold transition-colors hover:border-accent">
                      Download resume
                    </a>
                  </div>
                  <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-line pt-6">
                    {stats.map((s) => (
                      <div key={s.l}>
                        <span className="grid size-9 place-items-center rounded-full border border-line-strong text-accent">
                          <Icon name={s.icon} size={17} />
                        </span>
                        <dt className="cond mt-3 text-3xl text-text sm:text-4xl">
                          <CountUp value={s.v} decimals={s.d} />
                        </dt>
                        <dd className="mt-1 font-mono text-[0.6rem] uppercase leading-snug tracking-[0.16em] text-faint">{s.l}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="enter mt-14 flex flex-col items-center gap-3" style={{ "--i": 6 } as React.CSSProperties}>
                <MoodPicker />
                <p className="font-mono text-[0.68rem] text-faint">Pick a mood. Move your cursor through the colour.</p>
              </div>
            </div>
          </section>
        </Parallax>

        {/* TICKER */}
        <div className="marquee overflow-hidden border-y border-line py-4" aria-label="Technologies I work with">
          <div className="marquee-track" aria-hidden>
            {[0, 1].map((n) => (
              <div key={n} className="flex shrink-0 items-center">
                {ticker.map((t) => (
                  <span key={`${n}-${t}`} className="flex items-center font-mono text-xs uppercase tracking-[0.24em] text-muted">
                    <span className="px-8">{t}</span>
                    <span className="text-accent">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
          <p className="sr-only">Python, FastAPI, React, Spring Boot, PostgreSQL, scikit-learn, SQLAlchemy, JWT, Node.js, Tailwind CSS, AWS, Postman</p>
        </div>

        <div className="mx-auto max-w-6xl space-y-5 px-5 py-14 sm:py-20">
          {/* WHAT I DO */}
          <section aria-labelledby="what" className="frame reveal grid gap-6 p-6 sm:p-8 lg:grid-cols-[11rem_1fr]">
            <h2 id="what" className="panel-title text-text">
              What I do
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {whatIDo.map((w) => (
                <li key={w.t} className="mini rounded-[3px] p-4">
                  <span className="text-accent">
                    <Icon name={w.icon} size={26} />
                  </span>
                  <h3 className="mt-5 text-[0.74rem] font-semibold uppercase tracking-wide text-text">{w.t}</h3>
                  <p className="mt-2 text-[0.78rem] leading-relaxed text-muted text-justify hyphens-none">{w.d}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* PROCESS + FEATURED */}
          <section id="work" className="frame reveal grid lg:grid-cols-[0.78fr_1.5fr]">
            <div className="border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <PanelTitle>How I build</PanelTitle>
              <ol className="mt-8 space-y-6">
                {process.map((p, i) => (
                  <li key={p.t} className="flex items-start gap-4">
                    <span className="cond w-9 shrink-0 text-3xl text-accent">0{i + 1}</span>
                    <span aria-hidden className="mt-0.5 hidden size-11 shrink-0 place-items-center rounded-full border border-line-strong text-text/90 sm:grid">
                      <Icon name={p.icon} size={19} />
                    </span>
                    <div>
                      <h3 className="text-[0.78rem] font-semibold uppercase tracking-wide text-text">{p.t}</h3>
                      <p className="mt-1 text-[0.8rem] leading-relaxed text-muted text-justify hyphens-none">{p.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <PanelTitle>Featured work</PanelTitle>
                <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-accent hover:underline">
                  View more projects <Arrow />
                </a>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <WorkTile title="SAHAJ" kind="Traffic intelligence · 3-tier" href={links.sahaj}>
                  <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_80%_at_80%_10%,var(--m2),transparent_70%)] opacity-60" />
                  <JunctionCanvas />
                </WorkTile>
                <WorkTile title="TalentAI HRMS" kind="AI-powered HR platform" href={links.talentai} liveHref={links.talentaiLive}>
                  <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_80%_at_20%_100%,var(--m2),transparent_70%)] opacity-60" />
                  <div className="absolute inset-0 grid place-items-center p-4">
                    <div
                      className="grid w-full grid-cols-2 gap-2"
                      role="img"
                      aria-label="Illustrative screening pipeline: resume parsed, skills matched, fit scored, questions ready"
                    >
                      {pipeline.map((p, i) => (
                        <div key={p.name} className="stage rounded-[3px] border border-line bg-bg/60 p-2.5" style={{ "--s": i } as React.CSSProperties}>
                          <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">0{i + 1}</p>
                          <p className="mt-0.5 text-[0.7rem] font-semibold text-text">{p.name}</p>
                          <div className="mt-2 h-1 overflow-hidden rounded-full bg-text/10">
                            <div className="fillbar h-full rounded-full bg-accent" style={{ "--s": i, "--w": p.w } as React.CSSProperties} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </WorkTile>
                <WorkTile title="AC–AC Matrix Converter" kind="Research · Verilog HDL · IEEE Xplore 2025">
                  <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_0%,var(--m2),transparent_70%)] opacity-55" />
                  <div className="absolute inset-0 p-4 text-text">
                    <Waves />
                  </div>
                </WorkTile>
<WorkTile title="Federated Learning · Parkinson's" kind="Final-year project · Privacy-preserving ML" liveHref={links.krusharushiLive}>
                  <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_100%,var(--m2),transparent_70%)] opacity-60" />
                  <svg viewBox="0 0 320 200" className="absolute inset-0 size-full p-4 text-text" role="img" aria-label="Three hospital clients train locally with differential-privacy noise and send only model updates to a central FedAvg server">
                    {[40, 100, 160].map((y, i) => (
                      <g key={y}>
                        <line x1="96" y1={y} x2="214" y2="100" stroke="var(--accent)" strokeWidth="1.2" className="fl-flow" style={{ "--s": i } as React.CSSProperties} />
                        <rect x="14" y={y - 16} width="82" height="32" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.35" />
                        <text x="55" y={y - 2} textAnchor="middle" fontSize="9" fill="currentColor" fontFamily="monospace">Client {i + 1}</text>
                        <text x="55" y={y + 10} textAnchor="middle" fontSize="7.5" fill="var(--accent)" fontFamily="monospace" className="fl-noise" style={{ "--s": i } as React.CSSProperties}>DP-SGD + noise</text>
                      </g>
                    ))}
                    <rect x="214" y="72" width="92" height="56" rx="3" fill="none" stroke="var(--accent)" className="fl-server" />
                    <text x="260" y="97" textAnchor="middle" fontSize="10" fill="currentColor" fontFamily="monospace">FedAvg</text>
                    <text x="260" y="111" textAnchor="middle" fontSize="7.5" fill="currentColor" fillOpacity="0.6" fontFamily="monospace">weights only</text>
                  </svg>
                </WorkTile>
              </div>
              <p className="mt-6 text-xs text-faint">Tiles are live or animated illustrations of how each project works, not screenshots.</p>
            </div>
          </section>

          {/* PROJECT NOTES + LABS */}
          <section aria-labelledby="notes" className="frame reveal p-6 sm:p-8">
            <h2 id="notes" className="panel-title text-text">
              Project notes
            </h2>
            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              <article>
                <h3 className="cond text-3xl text-text">SAHAJ</h3>
                <p className="mt-1 text-sm text-muted">Smart Adaptive Highway &amp; Junction</p>
                <ul className="mt-5 space-y-3 text-[0.92rem] leading-relaxed text-muted text-justify hyphens-none">
                  <li>A full-stack crowd and traffic management system that predicts real-time crowd severity levels to coordinate traffic signals.</li>
                  <li>3-tier architecture: Spring Boot for backend services, FastAPI for a dedicated ML service, React.js for visualisation.</li>
                  <li>PostgreSQL-backed dashboard monitoring crowd density and traffic insights across junctions.</li>
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[0.7rem]" role="img" aria-label="Architecture: React dashboard, Spring Boot API, FastAPI ML service, PostgreSQL">
                  {["React.js", "Spring Boot", "FastAPI · ML", "PostgreSQL"].map((n, i, a) => (
                    <span key={n} className="flex items-center gap-2">
                      <span className="rounded border border-line px-2.5 py-1 text-text">{n}</span>
                      {i < a.length - 1 && <Arrow />}
                    </span>
                  ))}
                </div>
                <a href={links.sahaj} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm font-medium text-accent hover:underline">
                  View source on GitHub <Arrow />
                </a>
              </article>
              <article>
                <h3 className="cond text-3xl text-text">TalentAI HRMS</h3>
                <p className="mt-1 text-sm text-muted">AI-powered Human Resource Management System</p>
                <ul className="mt-5 space-y-3 text-[0.92rem] leading-relaxed text-muted text-justify hyphens-none">
                  <li>Covers 5 core HR functions: recruitment, employee management, attendance, payroll and performance tracking.</li>
                  <li>
                    Automates 2 recruitment workflows, AI resume screening and interview question generation. Research with 100 HR professionals and recruiters in India found AI resume screening significantly
                    associated with time-to-hire.
                  </li>
                  <li>FastAPI, SQLAlchemy, SQLite and JWT authentication on the back end; responsive React.js dashboards with role-based access and analytics.</li>
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["FastAPI", "SQLAlchemy", "SQLite", "JWT", "React.js"].map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  <a href={links.talentaiLive} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-medium text-accent hover:underline">
                    Live demo <Arrow />
                  </a>
                  <a href={links.talentai} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-medium text-accent hover:underline">
                    View source on GitHub <Arrow />
                  </a>
                </div>
              </article>
              <article>
                <h3 className="cond text-3xl text-text">Federated Learning for Parkinson&apos;s Detection</h3>
                <p className="mt-1 text-sm text-muted">Privacy-preserving voice screening · final-year project, team of four</p>
                <ul className="mt-5 space-y-3 text-[0.92rem] leading-relaxed text-muted text-justify hyphens-none">
                  <li>Detects Parkinson&apos;s from voice using 21 live-extractable acoustic features (jitter, shimmer, harmonicity) from the Istanbul University dataset (756 recordings, 252 patients).</li>
                  <li>A PyTorch MLP trained with Flower FedAvg across three simulated clients, with per-client DP-SGD via Opacus at six noise levels, evaluated on a patient-disjoint test set.</li>
                  <li>Finding: the privacy–utility trade-off is a round-by-round recoverability gradient. At moderate noise (σ 0.5–0.8) AUC recovers to about 0.68 against 0.69 without DP; at σ 1.5 (ε ≈ 1.13) it never recovers.</li>
                  <li>Federation is simulated on a single machine, as the paper states explicitly. The trained model also powers a live voice-recording demo.</li>
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["PyTorch", "Flower", "Opacus", "Differential privacy", "FedAvg"].map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  <a href={links.krusharushiLive} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-medium text-accent hover:underline">
                    Live demo <Arrow />
                  </a>
                </div>
              </article>
            </div>

            <div className="mt-10 space-y-6 border-t border-line pt-8">
              <p className="eyebrow">Live labs · illustrative models, not the production systems</p>
              <Lab label="Try the signal lab (SAHAJ)">
                <SignalLab />
              </Lab>
              <Lab label="Try the screening demo (TalentAI)">
                <ScreeningDemo />
              </Lab>
            </div>
          </section>

          {/* ABOUT + TOOLS */}
          <section id="about" className="frame reveal grid lg:grid-cols-[1.05fr_1fr]">
            <div className="border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <PanelTitle>About me</PanelTitle>
              <div className="mt-8 grid gap-6 sm:grid-cols-[10.5rem_1fr]">
                <div className="relative isolate aspect-[4/5] overflow-hidden rounded-[3px] border border-line-strong bg-[#0e0707]">
                  <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_70%_0%,var(--m2),transparent_70%)] opacity-60" />
                  <div
                    aria-hidden
                    className="breathe absolute left-1/2 top-[22%] -z-10 size-[96%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_34%_28%,color-mix(in_srgb,var(--accent)_92%,#fff_8%),var(--m2)_78%)] shadow-[0_0_70px_-18px_var(--accent)]"
                  />
                  <div aria-hidden className="grain absolute inset-0 -z-10 opacity-20" />
                  <div className="absolute inset-x-0 bottom-0 top-[6%]">
                    <Portrait variant="square" />
                  </div>
                </div>
                <div>
                  <p className="text-[0.92rem] leading-relaxed text-muted text-justify hyphens-none">
                    I&apos;m a Computer Science Engineering student focused on backend development, AI/ML and full-stack applications. I build REST APIs, AI-powered systems and authentication workflows with
                    Python, FastAPI, React, SQLAlchemy and AWS.
                  </p>
                  <ul className="mt-4 space-y-2 text-[0.85rem] text-muted">
                    {["B.E. CSE at The Oxford College of Engineering, CGPA 9.12", "API research & integration intern at DNAG Technologies", "1st place Oxy-Hack, 2nd place HackSetu", "Published on IEEE Xplore (2025)"].map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div id="stack" className="p-6 sm:p-8">
              <PanelTitle>Tools I use</PanelTitle>
              <ul className="mt-8 grid grid-cols-4 gap-3">
                {tools.map((t) => (
                  <li key={t.n} className="text-center">
                    <span className="mini mx-auto grid size-14 place-items-center rounded-[6px] font-mono text-sm font-semibold text-text">{t.m}</span>
                    <span className="mt-2 block text-[0.68rem] text-muted">{t.n}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex flex-wrap gap-1.5">
                {alsoUse.map((a) => (
                  <span key={a} className="chip">
                    {a}
                  </span>
                ))}
              </p>
              <div id="recognition" className="mt-7 rounded-[3px] border border-line bg-surface-2 p-5">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="cond text-5xl leading-[0.7] text-accent">
                    “
                  </span>
                  <p className="eyebrow !text-text/80">Recognition</p>
                </div>
                <ul className="mt-4 space-y-4">
                  {recognition.map((r) => (
                    <li key={r.title} className="text-[0.82rem] leading-snug text-muted">
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">{r.tag}</span>
                      <br />
                      <span className="text-text">{r.title}</span>
                      <span className="text-faint"> · {r.where}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* EXPERIENCE + EDUCATION */}
          <section id="experience" aria-labelledby="exp" className="frame reveal p-6 sm:p-8">
            <h2 id="exp" className="panel-title text-text">
              Experience &amp; education
            </h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <article className="mini rounded-[3px] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text">API Research &amp; Integration Intern</h3>
                    <p className="mt-1 text-muted">DNAG Technologies</p>
                  </div>
                  <span className="chip shrink-0 whitespace-nowrap">3 months</span>
                </div>
                <ul className="mt-5 space-y-3 text-[0.9rem] leading-relaxed text-muted">
                  <li>Researched Flipkart Seller APIs covering seller onboarding, product listing, shipment management and order processing.</li>
                  <li>Tested and validated REST APIs in Postman: authentication, requests, responses, parameters and endpoint behaviour.</li>
                  <li>Documented API endpoints and how they fit into business workflows.</li>
                </ul>
              </article>
              <article className="mini rounded-[3px] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text">B.E. in Computer Science &amp; Engineering</h3>
                    <p className="mt-1 text-muted">The Oxford College of Engineering</p>
                  </div>
                  <span className="chip shrink-0 whitespace-nowrap">2023 – 2027</span>
                </div>
                <p className="cond mt-7 text-7xl text-accent">
                  9.12<span className="font-sans text-xl font-normal normal-case tracking-normal text-faint"> / 10</span>
                </p>
                <p className="mt-2 text-muted">Current CGPA · expected graduation 2027</p>
              </article>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" aria-labelledby="collab" className="frame reveal grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.15fr_1fr_0.85fr] lg:items-center">
            <div>
              <h2 id="collab" className="panel-title text-text">
                Let&apos;s collaborate
              </h2>
              <p className="mt-6 max-w-sm text-[0.92rem] leading-relaxed text-muted text-justify hyphens-none">Have a backend, ML or full-stack project in mind, or just want to say hi? I&apos;d love to hear from you.</p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  { icon: "mail" as IconName, label: links.email, href: `mailto:${links.email}` },
                  { icon: "phone" as IconName, label: links.phone, href: `tel:${links.phone.replace(/\s/g, "")}` },
                  { icon: "link" as IconName, label: "github.com/Rishi63121", href: links.github },
                  { icon: "link" as IconName, label: "LinkedIn · Rishi Roy", href: links.linkedin },
                ].map((c) => (
                  <li key={c.label}>
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-3 text-muted transition-colors hover:text-text">
                      <span className="grid size-8 place-items-center rounded-full border border-line-strong text-accent transition-colors group-hover:bg-accent group-hover:text-accent-ink">
                        <Icon name={c.icon} size={15} />
                      </span>
                      <span className="break-all">{c.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href={withBase(links.resume)} className="mt-7 inline-block rounded-full bg-text px-6 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5">
                Download resume ↓
              </a>
            </div>

            <div>
              <p className="eyebrow mb-4 text-center">Scan to connect</p>
              <div className="flex justify-center gap-5">
                <QrCode url={links.linkedin} label="LinkedIn" />
                <QrCode url={links.github} label="GitHub" />
              </div>
            </div>

            <div className="text-center lg:text-right">
              <svg aria-hidden viewBox="0 0 100 100" className="spin-slow mx-auto size-14 text-accent lg:ml-auto lg:mr-0" fill="currentColor">
                <path d="M50 0 58 38 93 15 66 44 100 50 66 56 93 85 58 62 50 100 42 62 7 85 34 56 0 50 34 44 7 15 42 38Z" />
              </svg>
              <p className="mt-5 font-mono text-[0.78rem] italic uppercase leading-loose tracking-[0.26em] text-text/90">
                Engineering systems.
                <br />
                Shipping decisions.
              </p>
              <p aria-hidden className="sign mt-4 -rotate-3 text-2xl text-text/90">
                Rishi Roy
              </p>
            </div>
          </section>
        </div>
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
