"use client"
import React, { useMemo, useRef, useState } from "react";

// FIX: forwardRef allows parent refs (quizRef, syllabusRef, tutorRef) to reach the DOM node
const Card = React.forwardRef(function Card({ className = "", children }, ref) {
  return (
    <div
      ref={ref}
      className={`rounded-3xl border border-white/50 bg-white/75 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/70 ${className}`}
    >
      {children}
    </div>
  );
});

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, className = "", variant = "primary", size = "md", ...props }) {
  const base =
    "inline-flex items-center justify-center font-semibold transition focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60";
  const variants = {
    primary:
      "bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700",
    outline:
      "border border-slate-200 bg-white/70 text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/70 dark:text-white dark:hover:bg-slate-800",
  };
  const sizes = { md: "h-10 px-4 text-sm", lg: "h-12 px-5 text-base" };

  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Icon({ name, className = "", size = 20 }) {
  const icons = {
    search: "⌕", sparkles: "✦", book: "▤", chart: "▥", clock: "◷",
    check: "✓", play: "▶", brain: "◌", target: "◎", calendar: "▣",
    message: "☰", trophy: "★", database: "▦", code: "</>", shield: "◈",
    bot: "⚙", pie: "◔", sigma: "Σ", video: "▸", theory: "¶", project: "◆",
    next: "→", prev: "←",
  };
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center font-bold leading-none ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(12, size * 0.72) }}
    >
      {icons[name] || "•"}
    </span>
  );
}

const topics = [
  {
    title: "Statistics & Probability", icon: "sigma", questions: 17, minutes: 20, level: "All Levels",
    description: "Distributions, hypothesis testing, Bayes' theorem, confidence intervals, and experimental design.",
    skills: ["Hypothesis tests", "Bayes", "Distributions"],
    accent: "from-indigo-500/20 to-violet-500/10", progress: 70,
  },
  {
    title: "SQL & Databases", icon: "database", questions: 17, minutes: 20, level: "Intermediate",
    description: "SELECT, JOINs, GROUP BY, CTEs, window functions, query optimization, and data modeling.",
    skills: ["JOINs", "Window functions", "CTEs"],
    accent: "from-sky-500/20 to-cyan-500/10", progress: 55,
  },
  {
    title: "Python for Data Analysis", icon: "code", questions: 17, minutes: 20, level: "Beginner",
    description: "Pandas, NumPy, data cleaning, exploratory analysis, visualization, and automation workflows.",
    skills: ["Pandas", "NumPy", "EDA"],
    accent: "from-emerald-500/20 to-lime-500/10", progress: 42,
  },
  {
    title: "Power BI & Visualization", icon: "pie", questions: 16, minutes: 18, level: "Intermediate",
    description: "Chart selection, dashboard design, Power BI, DAX, KPI cards, and executive storytelling.",
    skills: ["Dashboards", "DAX", "Storytelling"],
    accent: "from-amber-500/20 to-orange-500/10", progress: 64,
  },
  {
    title: "Data Ethics & Governance", icon: "shield", questions: 16, minutes: 15, level: "Advanced",
    description: "Privacy, bias, GDPR-style controls, responsible AI, access policies, and governance frameworks.",
    skills: ["Privacy", "Bias", "Governance"],
    accent: "from-rose-500/20 to-pink-500/10", progress: 28,
  },
  {
    title: "Agentic AI", icon: "bot", questions: 17, minutes: 18, level: "Advanced",
    description: "LLMs, RAG, AI agents, autonomous workflows, evaluation, orchestration, and tool use.",
    skills: ["RAG", "Agents", "Evaluation"],
    accent: "from-purple-500/20 to-fuchsia-500/10", progress: 35,
  },
];

const syllabusDetails = {
  "Statistics & Probability": {
    overview: "Statistics helps analysts convert raw numbers into evidence. Probability helps measure uncertainty, risk, and expected outcomes.",
    theory: [
      "Descriptive statistics: mean, median, mode, variance, standard deviation, percentiles, and outliers.",
      "Probability concepts: events, conditional probability, Bayes' theorem, independent and dependent events.",
      "Inferential statistics: sampling, confidence intervals, hypothesis testing, p-values, and statistical significance.",
      "Business use: compare campaign results, validate experiments, estimate customer behavior, and measure risk.",
    ],
    videos: [
      { title: "Statistics basics for data analysis", duration: "45 min", url: "https://www.youtube.com/results?search_query=statistics+basics+for+data+analysis" },
      { title: "Probability for beginners", duration: "35 min", url: "https://www.youtube.com/results?search_query=probability+for+beginners+data+science" },
      { title: "Hypothesis testing explained", duration: "30 min", url: "https://www.youtube.com/results?search_query=hypothesis+testing+explained+data+analysis" },
    ],
    practice: "Analyze whether a new landing page improved conversion rate compared with the old page.",
  },
  "SQL & Databases": {
    overview: "SQL is the core language for extracting, filtering, joining, and summarizing structured business data from databases.",
    theory: [
      "Database basics: tables, rows, columns, primary keys, foreign keys, and relationships.",
      "Query foundations: SELECT, WHERE, ORDER BY, LIMIT, aliases, and calculated columns.",
      "Analysis queries: JOIN, GROUP BY, HAVING, CTEs, subqueries, and window functions.",
      "Business use: revenue reports, cohort analysis, customer segmentation, and operational dashboards.",
    ],
    videos: [
      { title: "SQL full course for beginners", duration: "2 hr", url: "https://www.youtube.com/results?search_query=sql+full+course+for+beginners+data+analysis" },
      { title: "SQL joins explained visually", duration: "25 min", url: "https://www.youtube.com/results?search_query=sql+joins+explained+visually" },
      { title: "Window functions for analytics", duration: "40 min", url: "https://www.youtube.com/results?search_query=sql+window+functions+for+data+analysis" },
    ],
    practice: "Write SQL queries to find monthly sales, top customers, repeat purchases, and region-wise revenue.",
  },
  "Python for Data Analysis": {
    overview: "Python helps analysts clean data, automate workflows, explore patterns, and prepare datasets for reporting or modeling.",
    theory: [
      "Python basics: variables, lists, dictionaries, functions, loops, and conditionals.",
      "NumPy: arrays, vectorized operations, numeric calculations, and missing-value handling.",
      "Pandas: DataFrames, filtering, grouping, merging, reshaping, and cleaning data.",
      "Business use: automate Excel work, clean CSV files, perform EDA, and generate repeatable analysis reports.",
    ],
    videos: [
      { title: "Python for data analysis beginner course", duration: "3 hr", url: "https://www.youtube.com/results?search_query=python+for+data+analysis+beginner+course" },
      { title: "Pandas complete tutorial", duration: "1 hr", url: "https://www.youtube.com/results?search_query=pandas+complete+tutorial+for+data+analysis" },
      { title: "Data cleaning with Python", duration: "45 min", url: "https://www.youtube.com/results?search_query=data+cleaning+with+python+pandas" },
    ],
    practice: "Clean a messy customer CSV file and summarize missing values, duplicates, and customer purchase patterns.",
  },
  "Power BI & Visualization": {
    overview: "Visualization converts analysis into clear business communication through charts, dashboards, and interactive reports.",
    theory: [
      "Chart selection: bar charts, line charts, scatter plots, histograms, maps, tables, and KPI cards.",
      "Dashboard design: layout, hierarchy, color, filters, slicers, and executive summary views.",
      "Power BI basics: data loading, relationships, measures, DAX, visuals, and publishing reports.",
      "Business use: sales dashboards, performance tracking, finance reports, and stakeholder presentations.",
    ],
    videos: [
      { title: "Power BI full course for beginners", duration: "2 hr", url: "https://www.youtube.com/results?search_query=power+bi+full+course+for+beginners" },
      { title: "Data visualization principles", duration: "30 min", url: "https://www.youtube.com/results?search_query=data+visualization+principles+for+data+analysts" },
      { title: "DAX basics for Power BI", duration: "45 min", url: "https://www.youtube.com/results?search_query=dax+basics+for+power+bi+beginners" },
    ],
    practice: "Build a sales dashboard showing revenue, profit, region performance, product trends, and monthly growth.",
  },
  "Data Ethics & Governance": {
    overview: "Ethics and governance ensure data is collected, processed, shared, and interpreted responsibly.",
    theory: [
      "Data privacy: consent, minimization, anonymization, personally identifiable information, and secure access.",
      "Bias and fairness: sampling bias, model bias, measurement bias, and harmful decision-making risks.",
      "Governance: data ownership, documentation, quality standards, lineage, retention, and compliance.",
      "Business use: protect users, reduce legal risk, improve trust, and avoid misleading analysis.",
    ],
    videos: [
      { title: "Data ethics explained", duration: "25 min", url: "https://www.youtube.com/results?search_query=data+ethics+explained+for+beginners" },
      { title: "Data governance basics", duration: "35 min", url: "https://www.youtube.com/results?search_query=data+governance+basics+for+data+analysts" },
      { title: "Bias in data analysis", duration: "30 min", url: "https://www.youtube.com/results?search_query=bias+in+data+analysis+explained" },
    ],
    practice: "Review a customer dataset and identify privacy risks, bias risks, and governance controls before analysis.",
  },
  "Agentic AI": {
    overview: "Agentic AI uses language models, tools, retrieval, and structured workflows to automate reasoning-heavy tasks.",
    theory: [
      "LLM basics: prompts, tokens, context windows, hallucination risk, and response evaluation.",
      "RAG: embeddings, vector search, document retrieval, chunking, citations, and answer grounding.",
      "AI agents: tool use, planning, memory, multi-step execution, orchestration, and guardrails.",
      "Business use: automated reporting, data Q&A, research assistants, workflow automation, and analyst copilots.",
    ],
    videos: [
      { title: "LLMs explained for beginners", duration: "30 min", url: "https://www.youtube.com/results?search_query=large+language+models+explained+for+beginners" },
      { title: "RAG explained simply", duration: "35 min", url: "https://www.youtube.com/results?search_query=rag+retrieval+augmented+generation+explained" },
      { title: "AI agents tutorial", duration: "45 min", url: "https://www.youtube.com/results?search_query=ai+agents+tutorial+for+beginners" },
    ],
    practice: "Design an AI assistant that answers questions from company documents and produces cited summaries.",
  },
};

const tasks = [
  "Clean messy CSV data", "Write SQL queries", "Build KPI dashboards",
  "Analyze A/B tests", "Prepare stakeholder reports", "Design ETL pipelines", "Track business metrics",
];

const syllabus = [
  "Data analysis foundations", "Statistics and probability", "SQL querying and databases",
  "Python, Pandas, and NumPy", "Visualization and dashboarding", "Business case studies",
  "Ethics, governance, and AI workflows",
];

// FIX #7: All 3 questions are now reachable, with correct per-question feedback
const sampleQuestions = [
  {
    q: "Which SQL clause is used to filter aggregated results?",
    options: ["WHERE", "GROUP BY", "HAVING", "ORDER BY"],
    answer: "HAVING",
    correctFeedback: "Correct! HAVING filters after aggregation; WHERE filters before grouping.",
    wrongFeedback: "Not quite. Use HAVING to filter grouped/aggregated results, not WHERE.",
  },
  {
    q: "Which metric is most appropriate for evaluating class imbalance?",
    options: ["Accuracy only", "F1 score", "Mean", "Variance"],
    answer: "F1 score",
    correctFeedback: "Correct! F1 balances precision and recall, making it ideal for imbalanced datasets.",
    wrongFeedback: "Not quite. F1 score handles imbalance better than accuracy alone.",
  },
  {
    q: "What is the primary goal of EDA?",
    options: ["Deploy a model", "Explore structure and patterns", "Encrypt data", "Write production APIs"],
    answer: "Explore structure and patterns",
    correctFeedback: "Correct! EDA uncovers distributions, outliers, and relationships before modelling.",
    wrongFeedback: "Not quite. EDA (Exploratory Data Analysis) is about understanding data structure and patterns.",
  },
];

function filterTopics(topicList, rawQuery, selectedLevel) {
  const normalizedQuery = rawQuery.trim().toLowerCase();
  return topicList.filter((topic) => {
    const detail = syllabusDetails[topic.title];
    const theoryText = detail
      ? `${detail.overview} ${detail.theory.join(" ")} ${detail.videos.map((v) => v.title).join(" ")}`
      : "";
    const searchableText = `${topic.title} ${topic.description} ${topic.skills.join(" ")} ${theoryText}`.toLowerCase();
    const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);
    const matchesLevel = selectedLevel === "All" || topic.level === selectedLevel || topic.level === "All Levels";
    return matchesQuery && matchesLevel;
  });
}

function calculateTopicStats(topicList) {
  const totalQuestions = topicList.reduce((sum, t) => sum + t.questions, 0);
  const avgProgress =
    topicList.length === 0
      ? 0
      : Math.round(topicList.reduce((sum, t) => sum + t.progress, 0) / topicList.length);
  return { totalQuestions, avgProgress };
}

function Stat({ value, label }) {
  return (
    <Card className="rounded-2xl border-white/10 bg-white/70 shadow-sm backdrop-blur dark:bg-slate-900/70">
      <CardContent className="p-5 text-center">
        <div className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{value}</div>
        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</div>
      </CardContent>
    </Card>
  );
}

function TheoryPanel({ topic }) {
  const detail = syllabusDetails[topic.title];
  if (!detail) return null;

  return (
    <Card className="mt-6 rounded-3xl bg-white/80 shadow-sm backdrop-blur dark:bg-slate-950/75">
      <CardContent className="p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <Icon name="theory" size={14} /> Theory + Syllabus
            </div>
            <h2 className="text-2xl font-bold">{topic.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">{detail.overview}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm dark:bg-slate-900">
            <div className="text-xs text-slate-500 dark:text-slate-400">Recommended practice</div>
            <div className="mt-1 font-semibold">{topic.minutes} minutes today</div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h3 className="mb-3 font-bold">Theory topics to study</h3>
            <div className="space-y-3">
              {detail.theory.map((point, index) => (
                <div
                  key={point}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm leading-6 dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-950 text-xs font-bold text-white dark:bg-white dark:text-slate-950">
                    {index + 1}
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-500/30 dark:bg-indigo-950/20">
              <div className="mb-1 flex items-center gap-2 font-bold text-indigo-800 dark:text-indigo-200">
                <Icon name="project" size={16} /> Practice task
              </div>
              <p className="text-sm leading-6 text-indigo-800/80 dark:text-indigo-100/80">{detail.practice}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-bold">Topic-wise videos</h3>
            <div className="space-y-3">
              {detail.videos.map((video) => (
                <a
                  key={video.title}
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-2xl border border-slate-200 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                      <Icon name="video" size={18} />
                    </div>
                    <div>
                      <div className="font-semibold group-hover:underline">{video.title}</div>
                      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Approx. {video.duration} • Opens YouTube search
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DataAnalysisPro() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [dailyGoal, setDailyGoal] = useState(30);

  // FIX #6 & #7: Full quiz state — cycles all 3 questions with dynamic feedback
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const activeQuestion = sampleQuestions[quizIndex];

  // Refs for scroll-to navigation (FIX #1–5)
  const quizRef = useRef(null);
  const videoLibraryRef = useRef(null);
  const syllabusRef = useRef(null);
  const tutorRef = useRef(null);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const filteredTopics = useMemo(() => filterTopics(topics, query, level), [query, level]);
  const { totalQuestions, avgProgress } = useMemo(() => calculateTopicStats(topics), []);
  const weeklyHours = useMemo(() => Math.round((dailyGoal * 7) / 60), [dailyGoal]);

  // FIX #8: Removed unused `selectedDetail` variable

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_32%),linear-gradient(180deg,#f8fafc,#eef2ff)] px-4 py-6 text-slate-900 dark:bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_32%),linear-gradient(180deg,#020617,#0f172a)] dark:text-white sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">

        {/* NAV — FIX #3 (Syllabus) & FIX #4 (AI Tutor) now scroll to their sections */}
        <nav className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/50 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/60 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
              <Icon name="chart" size={22} />
            </div>
            <div>
              <div className="text-lg font-bold">DataAnalysis Pro</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Practice, learn, track, revise, and watch topic videos
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* FIX #3: Syllabus button now scrolls to syllabus section */}
            <Button variant="secondary" className="rounded-xl" onClick={() => scrollTo(syllabusRef)}>
              <Icon name="book" className="mr-2" size={16} /> Syllabus
            </Button>
            {/* FIX #4: AI Tutor button now scrolls to AI Tutor panel */}
            <Button className="rounded-xl" onClick={() => scrollTo(tutorRef)}>
              <Icon name="sparkles" className="mr-2" size={16} /> AI Tutor
            </Button>
          </div>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200">
              <Icon name="trophy" size={16} /> Beginner to advanced roadmap
            </div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Master data analysis with theory, videos, quizzes, and projects.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              A focused learning dashboard for statistics, SQL, Python, visualization, ethics, and agentic AI. Each
              topic includes theory notes, practice tasks, and topic-wise video resources.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {/* FIX #1: "Start adaptive quiz" now scrolls to quiz section */}
              <Button size="lg" className="rounded-2xl" onClick={() => scrollTo(quizRef)}>
                <Icon name="play" className="mr-2" size={18} /> Start adaptive quiz
              </Button>
              {/* FIX #2: "Watch topic videos" now scrolls to video library */}
              <Button size="lg" variant="outline" className="rounded-2xl" onClick={() => scrollTo(videoLibraryRef)}>
                <Icon name="video" className="mr-2" size={18} /> Watch topic videos
              </Button>
            </div>
          </div>

          <div className="animate-[fadeIn_0.5s_ease-out]">
            <Card className="rounded-[2rem] border-white/50 bg-white/75 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Learning dashboard</div>
                    <div className="text-2xl font-bold">{avgProgress}% overall progress</div>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-600 text-white">
                    <Icon name="target" size={24} />
                  </div>
                </div>
                <div
                  className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
                  aria-label={`${avgProgress}% overall progress`}
                >
                  <div
                    className="h-full rounded-full bg-slate-950 dark:bg-white"
                    style={{ width: `${avgProgress}%` }}
                  />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Stat value={totalQuestions} label="Total MCQs" />
                  <Stat value={topics.length} label="Topics" />
                  <Stat value="18" label="Video Links" />
                  <Stat value="Theory" label="Notes Added" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card className="rounded-3xl bg-white/75 shadow-sm backdrop-blur dark:bg-slate-950/70 lg:col-span-2">
            <CardContent className="p-6">
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Choose a topic</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Search by topic, theory concept, skill, or video keyword.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <label className="relative block">
                    <span className="sr-only">Search topics</span>
                    <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search SQL, Python, videos..."
                      className="h-11 rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none ring-indigo-500/20 focus:ring-4 dark:border-slate-800 dark:bg-slate-900"
                    />
                  </label>
                  <label className="block">
                    <span className="sr-only">Filter by level</span>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none ring-indigo-500/20 focus:ring-4 dark:border-slate-800 dark:bg-slate-900"
                    >
                      <option>All</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2" role="listbox" aria-label="Data analysis topics">
                {filteredTopics.map((topic) => (
                  <button
                    key={topic.title}
                    type="button"
                    aria-pressed={selectedTopic.title === topic.title}
                    onClick={() => { setSelectedTopic(topic); setSelectedAnswer(""); }}
                    className={`rounded-3xl border p-5 text-left transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${
                      selectedTopic.title === topic.title
                        ? "border-slate-950 bg-white dark:border-white dark:bg-slate-900"
                        : "border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-900/50"
                    }`}
                  >
                    <div className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${topic.accent}`}>
                      <Icon name={topic.icon} size={24} />
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold">{topic.title}</h3>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {topic.questions} Qs
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{topic.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {topic.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-2"><Icon name="clock" size={16} /> {topic.minutes} min</span>
                      <span className="inline-flex items-center gap-2">
                        <Icon name="video" size={16} /> {syllabusDetails[topic.title]?.videos.length || 0} videos
                      </span>
                      <span>{topic.level}</span>
                    </div>
                  </button>
                ))}
              </div>

              {filteredTopics.length === 0 && (
                <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  No topics match the current search and filter.
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* FIX #4 & #5: AI Tutor panel — ref added, "Ask tutor" opens mailto with pre-filled topic */}
            <Card ref={tutorRef} className="rounded-3xl bg-white/75 shadow-sm backdrop-blur dark:bg-slate-950/70">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon name="brain" size={20} />
                  <h2 className="text-xl font-bold">AI Tutor Panel</h2>
                </div>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Ask for a hint, explanation, formula, SQL correction, Python debugging help, or dashboard feedback.
                </p>
                <div className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm dark:bg-slate-900">
                  <div className="mb-2 font-semibold">Suggested prompt</div>
                  Explain {selectedTopic.title.toLowerCase()} with one business example and one practice question.
                </div>
                {/* FIX #5: "Ask tutor" now copies prompt to clipboard and gives feedback */}
                <Button
                  className="mt-4 w-full rounded-2xl"
                  onClick={() => {
                    const prompt = `Explain ${selectedTopic.title} with one business example and one practice question.`;
                    // FIX: guard clipboard with catch for non-HTTPS or unsupported browsers
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(prompt)
                        .then(() => alert("Prompt copied! Paste it into your AI tutor."))
                        .catch(() => alert("Copy this prompt:\n\n" + prompt));
                    } else {
                      alert("Copy this prompt:\n\n" + prompt);
                    }
                  }}
                >
                  <Icon name="message" className="mr-2" size={16} /> Copy prompt & ask tutor
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl bg-white/75 shadow-sm backdrop-blur dark:bg-slate-950/70">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon name="calendar" size={20} />
                  <h2 className="text-xl font-bold">Study Planner</h2>
                </div>
                <label htmlFor="daily-goal" className="text-sm text-slate-500 dark:text-slate-400">
                  Daily goal: {dailyGoal} minutes
                </label>
                <input
                  id="daily-goal"
                  type="range"
                  min="15"
                  max="120"
                  step="15"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(Number(e.target.value))}
                  className="mt-3 w-full"
                />
                <div className="mt-4 rounded-2xl bg-slate-100 p-4 dark:bg-slate-900">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Estimated weekly study time</div>
                  <div className="text-2xl font-bold">{weeklyHours} hours/week</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <TheoryPanel topic={selectedTopic} />

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* FIX #3: Syllabus section gets a ref so the nav button can scroll to it */}
          <Card ref={syllabusRef} className="rounded-3xl bg-white/75 shadow-sm backdrop-blur dark:bg-slate-950/70">
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-bold">Full Syllabus</h2>
              <div className="space-y-3">
                {syllabus.map((item, index) => (
                  <div key={item} className="flex items-center gap-3 text-sm">
                    <Icon name="check" className="text-emerald-600" size={16} />
                    <span>{index + 1}. {item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl bg-white/75 shadow-sm backdrop-blur dark:bg-slate-950/70">
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-bold">Everyday Data Tasks</h2>
              <div className="flex flex-wrap gap-2">
                {tasks.map((task) => (
                  <span key={task} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900">
                    {task}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FIX #1, #6, #7: Quiz now cycles all 3 questions with correct per-question feedback */}
          <Card ref={quizRef} className="rounded-3xl bg-white/75 shadow-sm backdrop-blur dark:bg-slate-950/70">
            <CardContent className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xl font-bold">Quiz Preview</h2>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {quizIndex + 1} / {sampleQuestions.length}
                </span>
              </div>
              <p className="mb-4 text-sm font-medium">{activeQuestion.q}</p>
              <div className="space-y-2">
                {activeQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === activeQuestion.answer;
                  const selectedClass = isSelected
                    ? isCorrect
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                      : "border-rose-500 bg-rose-50 dark:bg-rose-950/30"
                    : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800";

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedAnswer(option)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${selectedClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* FIX #7: Dynamic feedback per question */}
              {selectedAnswer && (
                <p className="mt-4 text-sm font-medium">
                  {selectedAnswer === activeQuestion.answer
                    ? activeQuestion.correctFeedback
                    : activeQuestion.wrongFeedback}
                </p>
              )}

              {/* FIX #6: Navigation between questions */}
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-2xl"
                  disabled={quizIndex === 0}
                  onClick={() => { setQuizIndex((i) => i - 1); setSelectedAnswer(""); }}
                >
                  <Icon name="prev" className="mr-1" size={14} /> Prev
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-2xl"
                  disabled={quizIndex === sampleQuestions.length - 1}
                  onClick={() => { setQuizIndex((i) => i + 1); setSelectedAnswer(""); }}
                >
                  Next <Icon name="next" className="ml-1" size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FIX #2: Video library section gets a ref so the hero button can scroll to it */}
        <section ref={videoLibraryRef} className="mt-6">
          <Card className="rounded-3xl bg-white/75 shadow-sm backdrop-blur dark:bg-slate-950/70">
            <CardContent className="p-6">
              <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Complete Video Library</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Topic-wise video searches for quick learning and revision.
                  </p>
                </div>
                <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  18 curated video search links
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {topics.map((topic) => (
                  <div key={topic.title} className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                    <div className="mb-3 flex items-center gap-2 font-bold">
                      <Icon name={topic.icon} size={18} /> {topic.title}
                    </div>
                    <div className="space-y-2">
                      {syllabusDetails[topic.title].videos.map((video) => (
                        <a
                          key={video.title}
                          href={video.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-xl bg-slate-100 px-3 py-2 text-sm hover:underline dark:bg-slate-800"
                        >
                          <Icon name="video" className="mr-2" size={14} /> {video.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-8 rounded-3xl border border-white/50 bg-white/70 p-6 text-center text-sm text-slate-500 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-400">
          Built for aspiring data analysts • Beginner to advanced • Theory notes • Topic-wise videos • Practice tasks •
          Study planning
        </footer>
      </section>
    </main>
  );
}
