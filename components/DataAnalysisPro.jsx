'use client';

import { useMemo, useState } from 'react';

const topics = [
  { title: 'Statistics & Probability', level: 'All Levels', progress: 70, minutes: 20, description: 'Learn probability, distributions, confidence intervals, and hypothesis testing.', skills: ['Hypothesis testing', 'Bayes', 'Distributions'], practice: 'Compare two conversion rates and decide whether a landing page change improved performance.' },
  { title: 'SQL & Databases', level: 'Intermediate', progress: 55, minutes: 20, description: 'Query, join, group, and analyze structured business data.', skills: ['Joins', 'CTEs', 'Window functions'], practice: 'Write SQL for monthly revenue, repeat customers, and regional sales.' },
  { title: 'Python for Data Analysis', level: 'Beginner', progress: 42, minutes: 20, description: 'Clean, transform, and summarize data using Python.', skills: ['Pandas', 'NumPy', 'EDA'], practice: 'Clean a messy CSV and summarize missing values and duplicates.' },
  { title: 'Power BI & Visualization', level: 'Intermediate', progress: 64, minutes: 18, description: 'Build dashboards and communicate insights visually.', skills: ['Dashboards', 'DAX', 'Storytelling'], practice: 'Create a sales dashboard with revenue, profit, and growth metrics.' },
  { title: 'Data Ethics & Governance', level: 'Advanced', progress: 28, minutes: 15, description: 'Handle privacy, fairness, documentation, and governance.', skills: ['Privacy', 'Bias', 'Governance'], practice: 'Review a customer dataset for privacy and bias risks.' },
  { title: 'Agentic AI', level: 'Advanced', progress: 35, minutes: 18, description: 'Use AI agents, retrieval, and evaluation for analysis workflows.', skills: ['RAG', 'Agents', 'Evaluation'], practice: 'Design an AI assistant that answers document questions with citations.' },
];

const syllabus = [
  { title: 'Data analysis foundations', detail: 'Data types, metrics, data quality, cleaning strategy, and business questions.' },
  { title: 'Statistics and probability', detail: 'Descriptive stats, uncertainty, hypothesis testing, confidence intervals, and Bayes.' },
  { title: 'SQL querying and databases', detail: 'SELECT, WHERE, JOIN, GROUP BY, HAVING, CTEs, subqueries, and windows.' },
  { title: 'Python, Pandas, and NumPy', detail: 'Clean CSV files, analyze DataFrames, handle missing data, and automate work.' },
  { title: 'Visualization and dashboarding', detail: 'Choose charts, build dashboards, create KPI summaries, and tell stories.' },
  { title: 'Business case studies', detail: 'Apply analysis to sales, marketing, finance, operations, and product data.' },
  { title: 'Ethics, governance, and AI workflows', detail: 'Privacy, bias, responsible AI, access control, and AI-assisted analysis.' },
];

const videos = [
  { title: 'Statistics basics for data analysis', url: 'https://www.youtube.com/results?search_query=statistics+basics+for+data+analysis' },
  { title: 'SQL full course for beginners', url: 'https://www.youtube.com/results?search_query=sql+full+course+for+beginners+data+analysis' },
  { title: 'Python for data analysis beginner course', url: 'https://www.youtube.com/results?search_query=python+for+data+analysis+beginner+course' },
  { title: 'Power BI full course for beginners', url: 'https://www.youtube.com/results?search_query=power+bi+full+course+for+beginners' },
  { title: 'Data ethics explained', url: 'https://www.youtube.com/results?search_query=data+ethics+explained+for+beginners' },
  { title: 'AI agents tutorial for beginners', url: 'https://www.youtube.com/results?search_query=ai+agents+tutorial+for+beginners' },
];

const quiz = {
  question: 'Which SQL clause filters aggregated/grouped results?',
  options: ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'],
  answer: 'HAVING',
};

export default function DataAnalysisPro() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [answer, setAnswer] = useState('');
  const [openSyllabus, setOpenSyllabus] = useState(0);
  const [goal, setGoal] = useState(30);
  const [testClicks, setTestClicks] = useState(0);

  const filteredTopics = useMemo(() => {
    const q = query.trim().toLowerCase();
    return topics.filter((topic) => {
      const searchable = `${topic.title} ${topic.level} ${topic.description} ${topic.skills.join(' ')}`.toLowerCase();
      const matchesQuery = !q || searchable.includes(q);
      const matchesLevel = level === 'All' || topic.level === level || topic.level === 'All Levels';
      return matchesQuery && matchesLevel;
    });
  }, [query, level]);

  const avgProgress = Math.round(topics.reduce((sum, topic) => sum + topic.progress, 0) / topics.length);

  function selectTopic(topic) {
    setSelectedTopic(topic);
    setAnswer('');
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50 to-slate-100 p-6 text-slate-950">
      <section className="mx-auto max-w-7xl space-y-6">
        <nav className="flex flex-col gap-4 rounded-3xl border border-white bg-white/85 p-5 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">DataAnalysis Pro</p>
            <h1 className="mt-1 text-2xl font-black">Theory, quizzes, videos, and projects</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#topics" className="rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white hover:bg-slate-800">Start learning</a>
            <a href="#videos" className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-bold hover:bg-slate-50">Videos</a>
          </div>
        </nav>

        <header className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="rounded-3xl bg-white/80 p-8 shadow-sm backdrop-blur">
            <div className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">Beginner to advanced roadmap</div>
            <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">Master data analysis with a structured learning dashboard.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Learn statistics, SQL, Python, visualization, ethics, and agentic AI through theory notes, video links, quiz practice, and project prompts.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => setTestClicks((count) => count + 1)} className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white">Test React Click: {testClicks}</button>
              <a href="#quiz" className="rounded-xl bg-slate-950 px-5 py-3 font-bold text-white hover:bg-slate-800">Try quiz</a>
            </div>
          </div>

          <div className="rounded-3xl bg-white/85 p-6 shadow-xl backdrop-blur">
            <p className="text-sm text-slate-500">Learning dashboard</p>
            <h3 className="mt-1 text-3xl font-black">{avgProgress}% overall progress</h3>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-slate-950" style={{ width: `${avgProgress}%` }} /></div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setTestClicks((c) => c + 1)} className="rounded-2xl bg-slate-100 p-4 text-center hover:bg-slate-200"><div className="text-3xl font-black">100</div><div className="text-sm text-slate-500">MCQs</div></button>
              <button type="button" onClick={() => document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-2xl bg-slate-100 p-4 text-center hover:bg-slate-200"><div className="text-3xl font-black">{topics.length}</div><div className="text-sm text-slate-500">Topics</div></button>
              <button type="button" onClick={() => document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-2xl bg-slate-100 p-4 text-center hover:bg-slate-200"><div className="text-3xl font-black">{videos.length}</div><div className="text-sm text-slate-500">Videos</div></button>
              <button type="button" onClick={() => alert('AI tutor UI is ready. Backend can be connected next.')} className="rounded-2xl bg-slate-100 p-4 text-center hover:bg-slate-200"><div className="text-3xl font-black">AI</div><div className="text-sm text-slate-500">Tutor-ready</div></button>
            </div>
          </div>
        </header>

        <section id="topics" className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-black">Choose a topic</h2>
                <p className="text-sm text-slate-500">Search, filter, and click a card.</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search SQL, Python, AI..." className="h-11 rounded-2xl border border-slate-300 px-4 text-sm outline-none focus:ring-4 focus:ring-indigo-200" />
                <select value={level} onChange={(event) => setLevel(event.target.value)} className="h-11 rounded-2xl border border-slate-300 px-4 text-sm outline-none focus:ring-4 focus:ring-indigo-200">
                  <option value="All">All</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredTopics.map((topic) => {
                const selected = selectedTopic.title === topic.title;
                return (
                  <button key={topic.title} type="button" onClick={() => selectTopic(topic)} className={`rounded-3xl border bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-200 ${selected ? 'border-indigo-600 ring-4 ring-indigo-100' : 'border-slate-200'}`}>
                    <div className="flex items-start justify-between gap-3"><h3 className="text-lg font-black">{topic.title}</h3><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{topic.level}</span></div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{topic.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">{topic.skills.map((skill) => <span key={skill} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">{skill}</span>)}</div>
                    <div className="mt-4 text-sm text-slate-500">{topic.minutes} min • {topic.progress}% complete</div>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black">Selected topic</h2>
              <p className="mt-2 text-lg font-bold text-indigo-700">{selectedTopic.title}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{selectedTopic.description}</p>
              <button type="button" onClick={() => alert(selectedTopic.practice)} className="mt-4 rounded-2xl bg-indigo-50 p-4 text-left text-sm font-semibold text-indigo-800 hover:bg-indigo-100">Practice: {selectedTopic.practice}</button>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black">Study planner</h2>
              <label htmlFor="goal" className="mt-4 block text-sm font-semibold text-slate-600">Daily goal: {goal} minutes</label>
              <input id="goal" type="range" min="15" max="120" step="15" value={goal} onChange={(event) => setGoal(Number(event.target.value))} className="mt-4 w-full" />
              <p className="mt-4 rounded-2xl bg-slate-100 p-4 font-bold">Weekly: {Math.round((goal * 7) / 60)} hours/week</p>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Full syllabus</h2>
            <div className="mt-4 space-y-2">
              {syllabus.map((item, index) => {
                const open = openSyllabus === index;
                return <button key={item.title} type="button" onClick={() => setOpenSyllabus(open ? -1 : index)} className="block w-full rounded-2xl border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"><div className="flex justify-between gap-3 font-bold"><span>{index + 1}. {item.title}</span><span>{open ? '-' : '+'}</span></div>{open && <p className="mt-2 text-sm text-slate-600">{item.detail}</p>}</button>;
              })}
            </div>
          </div>

          <div id="quiz" className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Quiz preview</h2>
            <p className="mt-3 font-semibold">{quiz.question}</p>
            <div className="mt-4 space-y-2">
              {quiz.options.map((option) => {
                const selected = answer === option;
                const correct = option === quiz.answer;
                return <button key={option} type="button" onClick={() => setAnswer(option)} className={`block w-full rounded-2xl border px-4 py-3 text-left font-bold ${selected ? correct ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-rose-600 bg-rose-50 text-rose-800' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>{option}</button>;
              })}
            </div>
            {answer && <p className="mt-4 rounded-2xl bg-slate-100 p-4 font-bold">{answer === quiz.answer ? 'Correct. HAVING filters grouped results.' : 'Not quite. The correct answer is HAVING.'}</p>}
          </div>

          <div id="videos" className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Video library</h2>
            <div className="mt-4 space-y-2">
              {videos.map((video) => <a key={video.title} href={video.url} target="_blank" rel="noopener noreferrer" className="block rounded-2xl bg-slate-100 px-4 py-3 font-bold text-slate-900 hover:bg-slate-200 hover:underline">Open: {video.title}</a>)}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
