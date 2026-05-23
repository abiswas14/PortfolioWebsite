import React from "react";

const experiences = [
  {
    role: "Software Engineering Intern",
    company: "Visa Inc.",
    location: "Atlanta, GA",
    date: "May 2026 — Present",
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
    date: "Aug 2025 — May 2026",
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
    date: "Jan 2025 — May 2026",
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
    date: "Jan 2025 — May 2025",
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
    date: "Jan 2024 — Jun 2024",
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

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-10">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 max-w-2xl text-slate-300">{subtitle}</p> : null}
    </div>
  );
}

function Chip({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur">
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/[0.07] shadow-2xl shadow-black/20 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

export default function PortfolioWebsite() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-slate-100">
      <style>{`
        @keyframes floatSlow { 0%,100% { transform: translate3d(0,0,0) rotate(0deg); } 50% { transform: translate3d(20px,-22px,0) rotate(4deg); } }
        @keyframes floatSlowReverse { 0%,100% { transform: translate3d(0,0,0) rotate(0deg); } 50% { transform: translate3d(-22px,18px,0) rotate(-5deg); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes blink { 0%, 45% { opacity: 1; } 46%, 100% { opacity: 0; } }
        .orb-a { animation: floatSlow 9s ease-in-out infinite; }
        .orb-b { animation: floatSlowReverse 12s ease-in-out infinite; }
        .marquee { animation: marquee 24s linear infinite; }
        .cursor { animation: blink 1s step-end infinite; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10rem] top-[-8rem] h-96 w-96 rounded-full bg-cyan-500/25 blur-3xl orb-a" />
        <div className="absolute right-[-8rem] top-48 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl orb-b" />
        <div className="absolute bottom-[-12rem] left-1/3 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl orb-a" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:70px_70px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.18),transparent_38%)]" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-bold tracking-tight text-white">Aalif Biswas</a>
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#experience" className="hover:text-white">Experience</a>
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#github" className="hover:text-white">GitHub</a>
            <a href="#skills" className="hover:text-white">Skills</a>
            <a href="mailto:aalifbiswas6@gmail.com" className="rounded-full bg-cyan-300 px-4 py-2 text-slate-950 hover:bg-cyan-200">Contact</a>
          </div>
        </div>
      </nav>

      <section id="top" className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm backdrop-blur">
              Atlanta, GA · Georgia Tech CS · U.S. Citizen
            </div>
            <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-white md:text-7xl">
              Hi, I’m Aalif<span className="text-cyan-300">.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-2xl font-semibold leading-snug text-slate-100 md:text-3xl">
              I build <span className="text-cyan-300">backend systems</span>, <span className="text-cyan-300">ML infrastructure</span>, and <span className="text-cyan-300">quant engineering tools</span>.
              <span className="cursor text-cyan-300"> _</span>
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Georgia Tech CS student building production-minded software across payments, research infrastructure, portfolio systems, and low-level C projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="mailto:aalifbiswas6@gmail.com" className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-200">Email Me</a>
              <a href="https://www.linkedin.com/in/aalifbiswas/" className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:border-cyan-300/60">LinkedIn</a>
              <a href="https://github.com/abiswas14" className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:border-cyan-300/60">GitHub</a>
            </div>
          </div>

          <Card className="p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Currently</p>
            <h3 className="mt-4 text-3xl font-bold text-white">Georgia Tech CS</h3>
            <p className="mt-3 text-slate-300">Information Internetworks + Artificial Intelligence</p>
            <div className="mt-8 grid gap-3">
              {[
                ["Visa Inc.", "Software Engineering Intern"],
                ["GTSF", "$2.6M portfolio platform"],
                ["Research", "Quantum + ML systems"],
                ["Systems", "C, memory, threading"]
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4">
                  <span className="text-sm font-semibold text-slate-200">{k}</span>
                  <span className="text-sm text-slate-300">{v}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-14 overflow-hidden rounded-full border border-white/10 bg-white/5 py-3 text-sm text-slate-300">
          <div className="marquee flex w-max gap-10 whitespace-nowrap px-4">
            <span>Backend Systems</span><span>ML Infrastructure</span><span>Quant Engineering</span><span>Operating Systems</span><span>Cloud Automation</span><span>Data Pipelines</span>
            <span>Backend Systems</span><span>ML Infrastructure</span><span>Quant Engineering</span><span>Operating Systems</span><span>Cloud Automation</span><span>Data Pipelines</span>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <SectionTitle eyebrow="About" title="I like building systems that make complex workflows feel reliable and simple." />
          <Card className="p-6 md:p-8">
            <p className="text-base leading-8 text-slate-300">
              I’m a Georgia Tech Computer Science student with experience across backend engineering, applied ML, infrastructure automation, and systems programming. Recently, I’ve worked on payment orchestration at Visa, quantum benchmarking pipelines, a live portfolio manager for a $2.6M endowment, and C-based OS/networking projects.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["Backend", "APIs, services, workflows"],
                ["ML/Data", "Pipelines, ranking, validation"],
                ["Systems", "C, memory, threading"]
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm text-slate-300">{desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl px-6 py-16">
        <SectionTitle eyebrow="Experience" title="Engineering work across payments, quantum systems, quant infrastructure, and ML pipelines." />
        <div className="space-y-5">
          {experiences.map((exp) => (
            <Card key={`${exp.company}-${exp.role}`} className="p-6 transition hover:-translate-y-0.5 hover:bg-white/[0.09]">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                  <p className="mt-1 text-slate-300">{exp.company} · {exp.location}</p>
                </div>
                <p className="w-fit rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-slate-300">{exp.date}</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                {exp.points.map((point) => (
                  <li key={point} className="flex gap-2"><span className="text-cyan-300">•</span><span>{point}</span></li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {exp.tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
        <SectionTitle eyebrow="Projects" title="Selected systems and ML projects." subtitle="Quantitative research infrastructure, low-level C systems work, and full-stack financial applications." />
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title} className="p-6 transition hover:-translate-y-1 hover:bg-white/[0.09]">
              <div className="mb-5 h-1 w-16 rounded-full bg-cyan-300" />
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-2 text-sm font-medium text-cyan-200">{project.stack}</p>
              <p className="mt-4 text-sm leading-6 text-slate-300">{project.description}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2"><span className="text-cyan-300">•</span><span>{bullet}</span></li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section id="github" className="mx-auto max-w-6xl px-6 py-16">
        <SectionTitle eyebrow="GitHub" title="Project repositories." subtitle="Links are centralized here so recruiters can quickly jump into the code behind each project." />
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <a key={project.title} href={project.github} target="_blank" rel="noreferrer" className="group rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.1]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Repository</p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-200 transition group-hover:border-cyan-300/60 group-hover:text-cyan-200">View →</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{project.stack}</p>
              <p className="mt-4 text-sm text-slate-400">{project.github.replace("https://github.com/", "github.com/")}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-6 py-16">
        <SectionTitle eyebrow="Skills" title="Technologies I use to build reliable software." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <Card key={group.label} className="p-6">
              <h3 className="font-semibold text-white">{group.label}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => <Chip key={item}>{item}</Chip>)}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-[2rem] border border-white/10 bg-cyan-300 p-8 text-slate-950 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-700">Contact</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Interested in backend systems, ML infrastructure, and quant engineering roles.</h2>
              <p className="mt-4 text-slate-800">Open to software engineering internships and research-heavy systems projects.</p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a href="mailto:aalifbiswas6@gmail.com" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800">aalifbiswas6@gmail.com</a>
              <a href="https://www.linkedin.com/in/aalifbiswas/" className="rounded-full border border-slate-950/20 px-5 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-slate-950/10">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Aalif Biswas</p>
          <p>Built with React and Tailwind CSS.</p>
        </div>
      </footer>
    </main>
  );
}
