'use client';

import { useMemo, useState } from 'react';

const topics = [
  {
    title: 'Statistics & Probability',
    level: 'All Levels',
    minutes: 20,
    progress: 70,
    skills: ['Hypothesis testing', 'Bayes', 'Distributions'],
    description:
      'Convert raw numbers into evidence with probability, confidence intervals, hypothesis testing, and experiment design.',
    practice:
      'Compare two conversion rates and decide whether a landing page change improved performance.',
  },
  {
    title: 'SQL & Databases',
    level: 'Intermediate',
    minutes: 20,
    progress: 55,
    skills: ['Joins', 'CTEs', 'Window functions'],
    description:
      'Query, join, group, and model structured business data for reporting and analysis.',
    practice:
      'Write queries for monthly revenue, top customers, repeat purchases, and region-wise performance.',
  },
  {
    title: 'Python for Data Analysis',
    level: 'Beginner',
    minutes: 20,
    progress: 42,
    skills: ['Pandas', 'NumPy', 'EDA'],
    description:
      'Clean data, automate workflows, and prepare repeatable analysis using Python.',
    practice:
      'Clean a messy CSV and summarize missing values, duplicates, and purchase trends.',
  },
  {
    title: 'Power BI & Visualization',
    level: 'Intermediate',
    minutes: 18,
    progress: 64,
    skills: ['Dashboards', 'DAX', 'Storytelling'],
    description:
      'Turn analysis into stakeholder-ready dashboards and business narratives.',
    practice:
      'Build a sales dashboard with revenue, profit, region performance, and monthly growth.',
  },
  {
    title: 'Data Ethics & Governance',
    level: 'Advanced',
    minutes: 15,
    progress: 28,
    skills: ['Privacy', 'Bias', 'Governance'],
    description:
      'Handle data responsibly with privacy, fairness, documentation, and access controls.',
    practice:
      'Review a customer dataset for privacy, bias, retention, and access-control risks.',
  },
  {
    title: 'Agentic AI',
    level: 'Advanced',
    minutes: 18,
    progress: 35,
    skills: ['RAG', 'Agents', 'Evaluation'],
    description:
      'Use LLMs, retrieval, and tools to automate reasoning-heavy analysis workflows.',
    practice:
      'Design an AI assistant that answers questions from company documents with citations.',
  },
];

const syllabus = [
  {
    title: 'Data analysis foundations',
    detail:
      'Learn data types, business metrics, data quality, cleaning strategy, reporting goals, and stakeholder questions.',
  },
  {
    title: 'Statistics and probability',
    detail:
      'Study descriptive statistics, probability, uncertainty, hypothesis testing, confidence intervals, and Bayes concepts.',
  },
  {
    title: 'SQL querying and databases',
    detail:
      'Practice SELECT, WHERE, JOIN, GROUP BY, HAVING, CTEs, subqueries, and window functions.',
  },
  {
    title: 'Python, Pandas, and NumPy',
    detail:
      'Use Python to clean CSV files, analyze DataFrames, handle missing data, and automate repetitive analysis.',
  },
  {
    title: 'Visualization and dashboarding',
    detail:
      'Choose charts, design dashboards, create KPI summaries, build executive reports, and communicate insights clearly.',
  },
  {
    title: 'Business case studies',
    detail:
      'Apply analysis to sales, marketing, finance, operations, customer behavior, and product performance scenarios.',
  },
  {
    title: 'Ethics, governance, and AI workflows',
    detail:
      'Understand privacy, bias, documentation, responsible AI, access control, and AI-assisted data workflows.',
  },
];

const videoLinks = [
  {
    title: 'Statistics basics for data analysis',
    url: 'https://www.youtube.com/results?search_query=statistics+basics+for+data+analysis',
  },
  {
    title: 'SQL full course for beginners',
    url: 'https://www.youtube.com/results?search_query=sql+full+course+for+beginners+data+analysis',
  },
  {
    title: 'Python for data analysis beginner course',
    url: 'https://www.youtube.com/results?search_query=python+for+data+analysis+beginner+course',
  },
  {
    title: 'Power BI full course for beginners',
    url: 'https://www.youtube.com/results?search_query=power+bi+full+course+for+beginners',
  },
  {
    title: 'Data ethics explained',
    url: 'https://www.youtube.com/results?search_query=data+ethics+explained+for+beginners',
  },
  {
    title: 'AI agents tutorial for beginners',
    url: 'https://www.youtube.com/results?search_query=ai+agents+tutorial+for+beginners',
  },
];

const quizQuestion = {
  question: 'Which SQL clause is used to filter aggregated results?',
  options: ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'],
  answer: 'HAVING',
};

function Card({ children, className = '', id }) {
  return (
    <div
      id={id}
      className={`rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

export default function DataAnalysisPro() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [openSyllabusIndex, setOpenSyllabusIndex] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(30);

  const filteredTopics = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return topics.filter((topic) => {
      const searchableText = [
        topic.title,
        topic.level,
        topic.description,
        topic.practice,
        topic.skills.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch =
        normalizedQuery.length === 0 ||
        searchableText.includes(normalizedQuery);

      const matchesLevel =
        level === 'All' ||
        topic.level === level ||
        topic.level === 'All Levels';

      return matchesSearch && matchesLevel;
    });
  }, [query, level]);

  const overallProgress = Math.round(
    topics.reduce((sum, topic) => sum + topic.progress, 0) / topics.length
  );

  const weeklyHours = Math.round((dailyGoal * 7) / 60);

  function handleTopicSelect(topic) {
    setSelectedTopic(topic);
    setSelectedAnswer('');
  }

  function handleQuizAnswer(option) {
    setSelectedAnswer(option);
  }

  function handleSyllabusToggle(index) {
    setOpenSyllabusIndex((currentIndex) =>
      currentIndex === index ? -1 : index
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50 px-4 py-8 text-slate-950 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-col gap-4 rounded-3xl border border-white bg-white/80 p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
              DataAnalysis Pro
            </p>
            <h1 className="mt-1 text-2xl font-black">
              Theory, quizzes, videos, and projects
            </h1>
          </div>

          <a
            href="#topics"
            className="rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white hover:bg-slate-800"
          >
            Start learning
          </a>
        </nav>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
              Beginner to advanced roadmap
            </div>

            <h2 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Master data analysis with a structured learning dashboard.
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Learn statistics, SQL, Python, visualization, ethics, and
              agentic AI through theory notes, curated video links, quiz
              practice, and project prompts.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#quiz"
                className="rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white hover:bg-slate-800"
              >
                Try quiz
              </a>

              <a
                href="#videos"
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-bold hover:bg-slate-50"
              >
                Watch videos
              </a>
            </div>
          </div>

          <Card className="shadow-xl">
            <p className="text-sm text-slate-500">Learning dashboard</p>

            <h3 className="mt-1 text-3xl font-black">
              {overallProgress}% overall progress
            </h3>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-slate-950"
                style={{ width: `${overallProgress}%` }}
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-100 p-4 text-center">
                <div className="text-3xl font-black">100</div>
                <div className="text-sm text-slate-500">MCQs</div>
              </div>

              <div className="rounded-2xl bg-slate-100 p-4 text-center">
                <div className="text-3xl font-black">{topics.length}</div>
                <div className="text-sm text-slate-500">Topics</div>
              </div>

              <div className="rounded-2xl bg-slate-100 p-4 text-center">
                <div className="text-3xl font-black">{videoLinks.length}</div>
                <div className="text-sm text-slate-500">Video links</div>
              </div>

              <div className="rounded-2xl bg-slate-100 p-4 text-center">
                <div className="text-3xl font-black">AI</div>
                <div className="text-sm text-slate-500">Tutor-ready</div>
              </div>
            </div>
          </Card>
        </section>

        <section
          id="topics"
          className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]"
        >
          <Card>
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-black">Choose a topic</h2>
                <p className="text-sm text-slate-500">
                  Click a topic card to update the selected topic panel.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search SQL, Python, AI..."
                  className="h-11 rounded-2xl border border-slate-300 px-4 text-sm outline-none focus:ring-4 focus:ring-indigo-200"
                />

                <select
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                  className="h-11 rounded-2xl border border-slate-300 px-4 text-sm outline-none focus:ring-4 focus:ring-indigo-200"
                >
                  <option value="All">All</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredTopics.map((topic) => {
                const isSelected = selectedTopic.title === topic.title;

                return (
                  <button
                    key={topic.title}
                    type="button"
                    onClick={() => handleTopicSelect(topic)}
                    aria-pressed={isSelected}
                    className={`rounded-3xl border bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-200 ${
                      isSelected
                        ? 'border-indigo-600 ring-4 ring-indigo-100'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-black">{topic.title}</h3>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {topic.level}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {topic.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {topic.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 text-sm text-slate-500">
                      {topic.minutes} min • {topic.progress}% complete
                    </div>
                  </button>
                );
              })}
            </div>

            {filteredTopics.length === 0 && (
              <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                No topics match your search.
              </div>
            )}
          </Card>

          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-black">Selected topic</h2>

              <p className="mt-2 text-lg font-bold text-indigo-700">
                {selectedTopic.title}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {selectedTopic.description}
              </p>

              <div className="mt-4 rounded-2xl bg-indigo-50 p-4 text-sm font-semibold text-indigo-800">
                Practice: {selectedTopic.practice}
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-black">Study planner</h2>

              <label
                htmlFor="daily-goal"
                className="mt-4 block text-sm text-slate-600"
              >
                Daily goal: {dailyGoal} minutes
              </label>

              <input
                id="daily-goal"
                type="range"
                min="15"
                max="120"
                step="15"
                value={dailyGoal}
                onChange={(event) => setDailyGoal(Number(event.target.value))}
                className="mt-3 w-full"
              />

              <div className="mt-4 rounded-2xl bg-slate-100 p-4">
                <div className="text-sm text-slate-500">
                  Estimated weekly time
                </div>
                <div className="text-2xl font-black">
                  {weeklyHours} hours/week
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card>
            <h2 className="text-xl font-black">Full syllabus</h2>

            <div className="mt-4 space-y-3">
              {syllabus.map((item, index) => {
                const isOpen = openSyllabusIndex === index;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleSyllabusToggle(index)}
                    aria-expanded={isOpen}
                    className="block w-full rounded-2xl border border-slate-200 bg-white p-4 text-left text-sm hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                  >
                    <div className="flex items-center justify-between gap-3 font-bold">
                      <span>
                        {index + 1}. {item.title}
                      </span>
                      <span>{isOpen ? '−' : '+'}</span>
                    </div>

                    {isOpen && (
                      <p className="mt-2 leading-6 text-slate-600">
                        {item.detail}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card id="quiz">
            <h2 className="text-xl font-black">Quiz preview</h2>

            <p className="mt-4 text-sm font-semibold">
              {quizQuestion.question}
            </p>

            <div className="mt-4 space-y-2">
              {quizQuestion.options.map((option) => {
                const selected = selectedAnswer === option;
                const correct = option === quizQuestion.answer;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleQuizAnswer(option)}
                    className={`block w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-200 ${
                      selected
                        ? correct
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                          : 'border-rose-500 bg-rose-50 text-rose-800'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {selectedAnswer && (
              <p className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm font-bold">
                {selectedAnswer === quizQuestion.answer
                  ? 'Correct. HAVING filters grouped results.'
                  : 'Not quite. Aggregated filters belong in HAVING.'}
              </p>
            )}
          </Card>

          <Card id="videos">
            <h2 className="text-xl font-black">Video library</h2>

            <div className="mt-4 space-y-2">
              {videoLinks.map((video) => (
                <a
                  key={video.title}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200 hover:underline focus:outline-none focus:ring-4 focus:ring-indigo-200"
                >
                  Open: {video.title}
                </a>
              ))}
            </div>
          </Card>
        </section>

        <footer className="mt-8 rounded-3xl bg-white/80 p-6 text-center text-sm text-slate-500">
          Built for aspiring data analysts • Theory • Videos • Quizzes •
          Projects • AI tutor-ready
        </footer>
      </div>
    </main>
  );
}
