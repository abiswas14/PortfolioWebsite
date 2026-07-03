// All site content lives here. Components are presentation-only.
// Channel colors are semantic (see legend in the hero) — class strings
// are written out in full so Tailwind can scan them.

export const identity = {
  name: "Aalif Biswas",
  email: "aalifbiswas6@gmail.com",
  linkedin: "https://www.linkedin.com/in/aalifbiswas/",
  github: "https://github.com/abiswas14",
  linkedinLabel: "linkedin.com/in/aalifbiswas",
  githubLabel: "github.com/abiswas14"
};

export const channels = {
  pay: {
    code: "PAY",
    label: "Backend / Payments",
    dotClass: "bg-amber",
    textClass: "text-amber"
  },
  ml: {
    code: "ML",
    label: "ML / Research",
    dotClass: "bg-violet",
    textClass: "text-violet"
  },
  qnt: {
    code: "QNT",
    label: "Quant Engineering",
    dotClass: "bg-green",
    textClass: "text-green"
  },
  sys: {
    code: "SYS",
    label: "Systems / Infra",
    dotClass: "bg-blue",
    textClass: "text-blue"
  }
};

export const channelLegend = ["pay", "ml", "qnt", "sys"];

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" }
];

export const statusRows = [
  { term: "ROLE", detail: "SWE Intern — Visa Inc., Commercial & Money Movement" },
  { term: "FOCUS", detail: "Backend systems · ML infrastructure · Distributed workflows" },
  { term: "RESEARCH", detail: "Quantum benchmarking — Sandia-sponsored CRNCH Lab" },
  { term: "QUANT", detail: "$2.6M endowment platform — GT Student Foundation" },
  { term: "EDU", detail: "Georgia Tech — B.S. Computer Science" }
];

export const about = [
  "I am a Georgia Tech Computer Science student focused on software that has to keep working under real constraints: payments workflows, research infrastructure, portfolio systems, and low-level C projects.",
  "My strongest work sits where backend reliability, data-heavy modeling, and systems thinking overlap. I like owning the path from messy inputs to tested, observable, repeatable software."
];

export const experiences = [
  {
    role: "Software Engineering Intern",
    company: "Visa Inc.",
    location: "Atlanta, GA",
    date: "May 2026 — Present",
    channel: "pay",
    current: true,
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
    channel: "ml",
    stat: "85%",
    statLabel: "faster experiment turnaround",
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
    channel: "qnt",
    stat: "$2.6M",
    statLabel: "endowment under automation",
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
    channel: "ml",
    stat: "80%",
    statLabel: "pipeline throughput gain",
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
    channel: "sys",
    stat: "10M+",
    statLabel: "transactions processed daily",
    points: [
      "Deployed TensorFlow LSTM forecasting service on AWS EC2 with Kafka/Spark ETL processing 10M+ transactions/day.",
      "Built PostgreSQL/MongoDB ingestion pipelines with schema validation and indexing, improving throughput by 200%.",
      "Implemented automated data quality checks and retry logic, reducing pipeline failures by 30% across batch jobs."
    ],
    tags: ["AWS", "Kafka", "Spark", "TensorFlow"]
  }
];

export const projects = [
  {
    title: "VC2 Strategy Optimization Platform",
    stack: "Python · Scikit-Learn · Backtrader · Pandas",
    github: "https://github.com/abiswas14/ML-VC2",
    channel: "qnt",
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
    stack: "C · Linux · GDB · Make · Valgrind · Threads",
    github: "https://github.com/abiswas14/OS-Mem-Thread-Engine",
    channel: "sys",
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
    stack: "Python · React · PostgreSQL · Docker · AWS",
    github: "https://github.com/abiswas14/MoneyParce",
    channel: "pay",
    metric: "95%+ sentiment accuracy",
    description:
      "Full-stack financial platform for budgeting, bank-sync workflows, portfolio analytics, and NLP-driven financial text processing.",
    bullets: [
      "Built Flask/React financial platform with REST APIs, PostgreSQL/MongoDB storage, Docker, and AWS EC2 deployment.",
      "Developed OpenAI/spaCy/scikit-learn NLP pipelines achieving 95%+ sentiment accuracy on financial text classification."
    ]
  }
];

export const skillGroups = [
  {
    label: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "C++", "C", "SQL", "Swift", "Bash"]
  },
  {
    label: "Backend & Infra",
    items: ["AWS", "Docker", "Kubernetes", "Linux", "CI/CD", "REST APIs", "Microservices"]
  },
  {
    label: "Data & ML",
    items: ["PostgreSQL", "MongoDB", "Redis", "NumPy", "pandas", "scikit-learn", "XGBoost"]
  },
  {
    label: "Systems",
    items: ["GDB", "Make", "Valgrind", "Threads", "Kafka", "Spark", "Networking"]
  }
];
