import React, { useEffect, useState } from "react";

const experiences = [
  {
    role: "Software Engineering Intern",
    company: "Visa Inc.",
    location: "Atlanta, GA",
    date: "May 2026 - Present",
    points: [
      "Building agent-to-agent payment orchestration systems for Commercial & Money Movement B2B workflows.",
      "Developing distributed backend services for payment routing, workflow coordination, and enterprise transactions."
    ],
    tags: ["Distributed Systems", "Payments", "Backend"]
  },
  {
    role: "Software Engineering Fellow",
    company: "Sandia National Laboratories Sponsored CRNCH Lab",
    location: "Atlanta, GA",
    date: "Aug 2025 - May 2026",
    points: [
      "Built Python + Qiskit pipelines executing 100+ randomized quantum workloads across IBM backends and Aer simulators.",
      "Containerized simulation workflows with Docker/Kubernetes, reducing experiment turnaround by 85% via parallel execution.",
      "Automated real-vs-sim benchmarking with Parquet outputs, structured logging, and reproducible experiment configs."
    ],
    tags: ["Python", "Qiskit", "Docker", "Kubernetes"]
  },
  {
    role: "Quantitative Software Developer",
    company: "Georgia Tech Student Foundation",
    location: "Atlanta, GA",
    date: "Jan 2025 - May 2026",
    points: [
      "Architected a portfolio platform for a $2.6M endowment, supporting backtests, walk-forward validation, and live rebalancing.",
      "Built event-driven strategy pipeline decoupling data ingestion, alpha generation, risk controls, order netting, and execution.",
      "Deployed AWS EC2/Docker automation to rebalance 600+ equities across strategies in ~5 minutes via Interactive Brokers.",
      "Implemented 90-test regression suite with mocked broker/API dependencies validating controller, ingestion, and execution logic."
    ],
    tags: ["Backtrader", "AWS", "Docker", "Portfolio Systems"]
  },
  {
    role: "Undergraduate Software Engineering Assistant",
    company: "Georgia Tech Computational Materials Engineering Lab",
    location: "Atlanta, GA",
    date: "Jan 2025 - May 2025",
    points: [
      "Optimized Python pipelines converting CIF crystal files into structured 3D representations, increasing throughput by 80%.",
      "Built HuggingFace/TorchTune fine-tuning workflows with batched validation, modular tests, and automated preprocessing.",
      "Profiled bottlenecks and vectorized feature extraction code, reducing LLM data-prep and inference latency by 35%."
    ],
    tags: ["Python", "HuggingFace", "TorchTune", "Data Pipelines"]
  },
  {
    role: "Software Engineering Intern",
    company: "S3 Group Inc.",
    location: "Duluth, GA",
    date: "Jan 2024 - Jun 2024",
    points: [
      "Deployed TensorFlow LSTM forecasting service on AWS EC2 with Kafka/Spark ETL processing 10M+ transactions/day.",
      "Built PostgreSQL/MongoDB ingestion pipelines with schema validation and indexing, improving throughput by 200%.",
      "Implemented automated data quality checks and retry logic, reducing pipeline failures by 30% across batch jobs."
    ],
    tags: ["AWS", "Kafka", "Spark", "TensorFlow"]
  }
];

const projects = [
  {
    title: "VC2 Strategy Optimization Platform",
    stack: "Python, Scikit-Learn, Backtrader, Pandas",
    github: "https://github.com/abiswas14/ML-VC2",
    accent: "from-cyan-300 to-teal-300",
    metric: "1.2M+ observations",
    description:
      "Machine-learning research platform for evaluating factor-investing strategies over 1.2M+ stock-date observations across 500+ equities.",
    bullets: [
      "Designed leakage-safe modeling with lagged factors, walk-forward splits, regression, gradient boosting, and K-Means.",
      "Improved simulated cumulative returns from 84% to 161% using ML-based stock ranking within VC2 candidate sets."
    ]
  },
  {
    title: "OS Memory & Threading Engine",
    stack: "C, Linux, GDB, Make, Valgrind, Threads",
    github: "https://github.com/abiswas14/OS-Mem-Thread-Engine",
    accent: "from-amber-300 to-orange-300",
    metric: "MMU + transport",
    description:
      "Low-level C systems project combining virtual memory management, process isolation, and reliable transport primitives.",
    bullets: [
      "Implemented MMU translation, page tables, page faults, swap handling, FIFO/LRU eviction, and AMAT metrics.",
      "Developed thread-safe transport with packetization, checksums, ACK/NACK retransmission, and synchronized queues."
    ]
  },
  {
    title: "MoneyParce Financial Platform",
    stack: "Python, React, PostgreSQL, Docker, AWS",
    github: "https://github.com/abiswas14/MoneyParce",
    accent: "from-rose-300 to-fuchsia-300",
    metric: "95%+ sentiment",
    description:
      "Full-stack financial platform for budgeting, bank-sync workflows, portfolio analytics, and NLP-driven financial text processing.",
    bullets: [
      "Built Flask/React financial platform with REST APIs, PostgreSQL/MongoDB storage, Docker, and AWS EC2 deployment.",
      "Developed OpenAI/spaCy/scikit-learn NLP pipelines achieving 95%+ sentiment accuracy on financial text classification."
    ]
  }
];

const skillGroups = [
  { label: "Languages", items: ["Python", "Java", "JavaScript", "TypeScript", "C++", "C", "SQL", "Swift", "Bash"] },
  { label: "Backend & Infra", items: ["AWS", "Docker", "Kubernetes", "Linux", "CI/CD", "REST APIs", "Microservices"] },
  { label: "Data & ML", items: ["PostgreSQL", "MongoDB", "Redis", "NumPy", "pandas", "scikit-learn", "XGBoost"] },
  { label: "Systems", items: ["GDB", "Make", "Valgrind", "Threads", "Kafka", "Spark", "Networking"] }
];

const marqueeItems = [
  "Backend Systems",
  "ML Infrastructure",
  "Quant Engineering",
  "Operating Systems",
  "Cloud Automation",
  "Data Pipelines",
  "Distributed Workflows",
  "Research Tooling"
];

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base leading-7 text-slate-300">{subtitle}</p> : null}
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.075] shadow-2xl shadow-black/25 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100">
      {children}
    </span>
  );
}

function ExternalLink({ href, children, variant = "glass" }) {
  const styles =
    variant === "accent"
      ? "border-cyan-300 bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-200"
      : "border-white/15 bg-white/10 text-white backdrop-blur hover:border-cyan-300/60 hover:bg-white/15";

  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      className={`inline-flex min-h-11 items-center justify-center rounded-full border px-5 text-sm font-bold transition ${styles}`}
    >
      {children}
    </a>
  );
}

export default function PortfolioWebsite() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 50, y: 18 });

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    const updatePointer = (event) => {
      setPointer({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100
      });
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("mousemove", updatePointer, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("mousemove", updatePointer);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-slate-100">
      <style>{`
        @keyframes floatSlow { 0%, 100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(24px,-28px,0) scale(1.05); } }
        @keyframes floatReverse { 0%, 100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-26px,22px,0) scale(1.08); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scanLine { 0% { transform: translateX(-100%); opacity: 0; } 20%, 80% { opacity: 1; } 100% { transform: translateX(100%); opacity: 0; } }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(18px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes cursorBlink {
          0%, 44% { opacity: 1; }
          45%, 100% { opacity: 0.25; }
        }
        .orb-a { animation: floatSlow 11s ease-in-out infinite; }
        .orb-b { animation: floatReverse 14s ease-in-out infinite; }
        .marquee-track { animation: marquee 28s linear infinite; }
        .scan-line { animation: scanLine 4s ease-in-out infinite; }
        .cursor-blink { animation: cursorBlink 1s step-end infinite; }
        .fade-up { animation: fadeUp .75s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .orb-a, .orb-b, .marquee-track, .scan-line, .cursor-blink, .fade-up { animation: none; }
        }
      `}</style>

      <div className="fixed left-0 top-0 z-[60] h-1 bg-cyan-300 shadow-[0_0_24px_rgba(103,232,249,0.85)] transition-[width] duration-150" style={{ width: `${scrollProgress}%` }} />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="orb-a absolute left-[-9rem] top-[-8rem] h-96 w-96 rounded-full bg-cyan-400/25 blur-3xl" />
        <div className="orb-b absolute right-[-8rem] top-40 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/18 blur-3xl" />
        <div className="orb-a absolute bottom-[-11rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-amber-400/12 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:76px_76px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_36%)]" />
        <div
          className="absolute h-[26rem] w-[26rem] rounded-full bg-cyan-300/10 blur-3xl transition-transform duration-300"
          style={{ left: `${pointer.x}%`, top: `${pointer.y}%`, transform: "translate(-50%, -50%)" }}
        />
      </div>

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="text-sm font-black uppercase tracking-[0.18em] text-white">
            Aalif Biswas
          </a>
          <div className="hidden items-center gap-6 text-sm font-semibold text-slate-300 md:flex">
            <a href="#experience" className="hover:text-white">Experience</a>
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#skills" className="hover:text-white">Skills</a>
            <a href="mailto:aalifbiswas6@gmail.com" className="rounded-full bg-cyan-300 px-4 py-2 text-slate-950 hover:bg-cyan-200">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <section id="top" className="relative min-h-[86vh] overflow-hidden">
        <img
          src="/systems-dashboard-hero.png"
          alt="Abstract technical dashboard representing backend systems, ML infrastructure, and portfolio analytics"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,22,0.96)_0%,rgba(5,8,22,0.82)_48%,rgba(5,8,22,0.58)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050816] to-transparent" />

        <div className="relative mx-auto grid min-h-[86vh] max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1.08fr_0.92fr] md:items-center md:px-8">
          <div className="fade-up">
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-xl">
              Atlanta, GA / Georgia Tech CS / U.S. Citizen
            </p>
            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
              Aalif Biswas<span className="text-cyan-300">.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-xl font-semibold leading-8 text-slate-100 md:text-2xl">
              I build backend systems, ML infrastructure, quant engineering tools, and low-level systems projects.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Software engineer focused on backend reliability, data-heavy modeling, distributed workflows, and systems projects that are tested, observable, and repeatable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExternalLink href="mailto:aalifbiswas6@gmail.com" variant="accent">Email Me</ExternalLink>
              <ExternalLink href="https://www.linkedin.com/in/aalifbiswas/">LinkedIn</ExternalLink>
              <ExternalLink href="https://github.com/abiswas14">GitHub</ExternalLink>
            </div>
          </div>

          <GlassCard className="fade-up relative overflow-hidden p-5 md:p-6">
            <div className="scan-line absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent" />
            <div className="absolute right-5 top-5 z-10 flex items-end gap-3 rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-white" />
              <span className="cursor-blink h-1.5 w-9 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.65)]" />
            </div>
            <div className="relative rounded-xl border border-white/10 bg-slate-950/40 p-4">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-300" />
              </div>
              <img
                src="/systems-dashboard-hero.png"
                alt=""
                className="aspect-[16/10] w-full rounded-lg border border-white/10 object-cover opacity-90"
              />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ["Current", "Visa SWE Intern"],
                ["Focus", "Backend + ML infra"],
                ["Research", "Quantum systems"],
                ["Systems", "C / Linux / Threads"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="fade-up relative z-10 mx-auto -mt-10 max-w-7xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-full border border-white/10 bg-white/[0.08] py-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#050816] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#050816] to-transparent" />
          <div className="marquee-track flex w-max gap-12 whitespace-nowrap px-8 text-lg font-semibold text-slate-300">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={`${item}-${index}`} className="shrink-0">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="fade-up mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[0.8fr_1.2fr] md:px-8">
        <SectionHeader
          eyebrow="About"
          title="Production-minded engineering across systems, data, and infrastructure."
        />
        <GlassCard className="p-6 md:p-8">
          <div className="space-y-6 text-lg leading-8 text-slate-300">
            <p>
              I am a Georgia Tech Computer Science student focused on software that has to keep working under real constraints: payments workflows, research infrastructure, portfolio systems, and low-level C projects.
            </p>
            <p>
              My strongest work sits where backend reliability, data-heavy modeling, and systems thinking overlap. I like owning the path from messy inputs to tested, observable, repeatable software.
            </p>
          </div>
        </GlassCard>
      </section>

      <section id="experience" className="border-y border-white/10 bg-white/[0.035]">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <SectionHeader
            eyebrow="Experience"
            title="Engineering roles with measurable systems impact."
            subtitle="Recent work spans payment orchestration, quantum benchmarking, live portfolio automation, ML data pipelines, and large-scale transaction processing."
          />
          <div className="relative space-y-5 md:pl-8">
            <div className="absolute bottom-3 left-3 top-3 hidden w-px bg-gradient-to-b from-cyan-300 via-white/20 to-transparent md:block" />
            {experiences.map((exp, index) => (
              <div key={`${exp.company}-${exp.role}`} className="fade-up relative" style={{ animationDelay: `${index * 70}ms` }}>
                <span className="absolute left-[-2.05rem] top-7 hidden h-3 w-3 rounded-full border border-cyan-200 bg-[#050816] shadow-[0_0_18px_rgba(103,232,249,0.55)] md:block" />
                <GlassCard className="p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.1] md:p-6">
                <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <h3 className="text-xl font-bold leading-snug tracking-tight text-white">{exp.role}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-400">{exp.company} / {exp.location}</p>
                  </div>
                  <p className="w-fit rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-bold text-slate-200">{exp.date}</p>
                </div>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-300 md:grid-cols-2">
                  {exp.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}
                </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionHeader
          eyebrow="Projects"
          title="Selected builds with code behind them."
          subtitle="A mix of quantitative research infrastructure, low-level systems work, and full-stack financial tooling."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <GlassCard key={project.title} className="fade-up group relative flex flex-col overflow-hidden p-6 transition hover:-translate-y-1 hover:bg-white/[0.1]" style={{ animationDelay: `${index * 90}ms` }}>
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${project.accent} opacity-0 blur-2xl transition group-hover:opacity-15`} />
              <div className={`mb-5 h-1.5 w-20 rounded-full bg-gradient-to-r ${project.accent}`} />
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">{project.metric}</p>
              <h3 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-white">{project.title}</h3>
              <p className="mt-2 text-sm font-bold text-cyan-200">{project.stack}</p>
              <p className="mt-5 text-sm leading-6 text-slate-300">{project.description}</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 text-sm font-bold text-white transition hover:border-cyan-300/60 hover:bg-white/15"
              >
                View Repository
              </a>
            </GlassCard>
          ))}
        </div>
      </section>

      <section id="skills" className="border-y border-white/10 bg-white/[0.035]">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <SectionHeader eyebrow="Skills" title="Tools I use to build reliable software." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => (
              <GlassCard key={group.label} className="p-6">
                <h3 className="font-bold text-white">{group.label}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => <Chip key={item}>{item}</Chip>)}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-cyan-300 p-6 text-slate-950 shadow-2xl shadow-cyan-950/20 md:p-10">
          <div className="absolute right-[-7rem] top-[-7rem] h-64 w-64 rounded-full bg-white/30 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-700">Contact</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                Interested in backend systems, ML infrastructure, and quant engineering roles.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-800">
                Open to software engineering internships and research-heavy systems projects.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a href="mailto:aalifbiswas6@gmail.com" className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-slate-800">
                aalifbiswas6@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/aalifbiswas/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-950/20 px-5 text-sm font-black text-slate-950 transition hover:bg-slate-950/10">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 text-sm font-semibold text-slate-400 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Aalif Biswas</p>
          <p>React / Tailwind CSS / Vite</p>
        </div>
      </footer>
    </main>
  );
}
