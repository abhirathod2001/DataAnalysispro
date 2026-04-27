'use client';

import { useMemo, useState } from 'react';

const topics = [
  { icon: '📈', title: 'Statistics & Probability', level: 'Beginner', progress: 70, questions: 17, minutes: 20, color: 'cyan', description: 'Distributions, hypothesis testing, Bayes theorem, confidence intervals and more.', skills: ['Normal distribution', 'A/B testing', 'Bayes'], practice: 'Run an A/B test and decide whether a landing page change improved conversion.' },
  { icon: '🧮', title: 'SQL & Databases', level: 'Intermediate', progress: 55, questions: 17, minutes: 20, color: 'violet', description: 'SELECT, JOINs, GROUP BY, CTEs, window functions and query optimization.', skills: ['Joins', 'CTEs', 'Windows'], practice: 'Write SQL queries for revenue, repeat customers, and cohort performance.' },
  { icon: '🐍', title: 'Python for Data Analysis', level: 'Beginner', progress: 42, questions: 17, minutes: 20, color: 'emerald', description: 'Pandas, NumPy, cleaning, EDA, Matplotlib and repeatable analysis workflows.', skills: ['Pandas', 'NumPy', 'EDA'], practice: 'Clean a messy CSV, remove duplicates, and summarize missing values.' },
  { icon: '📊', title: 'Power BI & Visualization', level: 'Intermediate', progress: 64, questions: 17, minutes: 18, color: 'amber', description: 'Dashboards, DAX, visual storytelling, stakeholder reporting and KPI tracking.', skills: ['Power BI', 'DAX', 'Dashboards'], practice: 'Create a sales dashboard with revenue, profit, region and growth metrics.' },
  { icon: '🛡️', title: 'Data Ethics & Governance', level: 'Advanced', progress: 28, questions: 16, minutes: 15, color: 'rose', description: 'Privacy, bias, governance, access control, documentation and responsible AI.', skills: ['Privacy', 'Bias', 'Governance'], practice: 'Audit a customer dataset for bias, privacy exposure, and access-control risk.' },
  { icon: '🤖', title: 'Agentic AI', level: 'Advanced', progress: 35, questions: 16, minutes: 18, color: 'orange', description: 'RAG, agents, tool use, evaluation, automation and AI-assisted analytics.', skills: ['RAG', 'Agents', 'Evaluation'], practice: 'Design an AI assistant that answers document questions with citations.' },
];

const syllabus = [
  { title: 'Data analysis foundations', detail: 'Data types, metrics, business questions, cleaning strategy and reporting basics.' },
  { title: 'Statistics and probability', detail: 'Descriptive statistics, uncertainty, distributions, hypothesis testing and confidence intervals.' },
  { title: 'SQL querying and databases', detail: 'SELECT, JOIN, GROUP BY, HAVING, CTEs, subqueries and window functions.' },
  { title: 'Python, Pandas, and NumPy', detail: 'DataFrames, missing values, transformation, EDA, plotting and automation.' },
  { title: 'Visualization and dashboards', detail: 'Chart selection, KPI design, dashboard layout and stakeholder storytelling.' },
  { title: 'Business case studies', detail: 'Sales, marketing, finance, operations, customer and product analytics scenarios.' },
  { title: 'Agentic AI workflows', detail: 'Prompting, RAG, agents, tool use, evaluation and responsible AI practices.' },
];

const tasks = ['Clean messy data', 'Write SQL queries', 'Build dashboards', 'A/B test analysis', 'Stakeholder reports', 'ETL pipelines', 'KPI tracking'];
const videos = [
  { title: 'Statistics basics for data analysis', url: 'https://www.youtube.com/results?search_query=statistics+basics+for+data+analysis' },
  { title: 'SQL full course for beginners', url: 'https://www.youtube.com/results?search_query=sql+full+course+for+beginners+data+analysis' },
  { title: 'Python for data analysis beginner course', url: 'https://www.youtube.com/results?search_query=python+for+data+analysis+beginner+course' },
  { title: 'Power BI full course for beginners', url: 'https://www.youtube.com/results?search_query=power+bi+full+course+for+beginners' },
  { title: 'Data ethics explained', url: 'https://www.youtube.com/results?search_query=data+ethics+explained+for+beginners' },
  { title: 'AI agents tutorial for beginners', url: 'https://www.youtube.com/results?search_query=ai+agents+tutorial+for+beginners' },
];

const quiz = { question: 'Which SQL clause filters aggregated/grouped results?', options: ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'], answer: 'HAVING' };
const colorMap = {
  cyan: 'border-cyan-400/60 bg-cyan-400/10 text-cyan-300',
  violet: 'border-violet-400/60 bg-violet-400/10 text-violet-300',
  emerald: 'border-emerald-400/60 bg-emerald-400/10 text-emerald-300',
  amber: 'border-amber-400/60 bg-amber-400/10 text-amber-300',
  rose: 'border-rose-400/60 bg-rose-400/10 text-rose-300',
  orange: 'border-orange-400/60 bg-orange-400/10 text-orange-300',
};

export default function DataAnalysisPro() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [answer, setAnswer] = useState('');
  const [openSyllabus, setOpenSyllabus] = useState(0);
  const [goal, setGoal] = useState(30);
  const [testClicks, setTestClicks] = useState(0);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiReply, setAiReply] = useState('');

  const filteredTopics = useMemo(() => {
    const q = query.trim().toLowerCase();
    return topics.filter((topic) => {
      const text = `${topic.title} ${topic.level} ${topic.description} ${topic.skills.join(' ')}`.toLowerCase();
      const matchesQuery = !q || text.includes(q);
      const matchesLevel = level === 'All' || topic.level === level || topic.level === 'All Levels';
      return matchesQuery && matchesLevel;
    });
  }, [query, level]);

  const avgProgress = Math.round(topics.reduce((sum, topic) => sum + topic.progress, 0) / topics.length);

  function chooseTopic(topic) {
    setSelectedTopic(topic);
    setAnswer('');
  }

  function askTutor() {
    const text = aiPrompt.trim();
    setAiReply(text ? `Tutor response: Start with ${selectedTopic.title}. Break the problem into data source, metric, method, result and business action.` : 'Type a question first.');
  }

  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-8 text-slate-100 sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-2xl">📊</div>
            <div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">DataAnalysis<span className="text-cyan-400">Pro</span></h1>
              <p className="mt-2 text-slate-400">Master data analysis from beginner to advanced</p>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          <button type="button" onClick={() => setTestClicks((c) => c + 1)} className="rounded-3xl border border-cyan-400/20 bg-slate-900/80 p-7 text-center shadow-lg shadow-cyan-950/20 hover:border-cyan-300/70"><div className="text-3xl">🎯</div><div className="mt-3 text-3xl font-black text-cyan-300">100</div><div className="text-slate-500">Total MCQs</div><div className="mt-2 text-xs text-red-300">Test clicks: {testClicks}</div></button>
          <button type="button" onClick={() => document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-3xl border border-violet-400/20 bg-slate-900/80 p-7 text-center hover:border-violet-300/70"><div className="text-3xl">📚</div><div className="mt-3 text-3xl font-black text-violet-300">{topics.length}</div><div className="text-slate-500">Topics</div></button>
          <button type="button" onClick={() => setLevel('All')} className="rounded-3xl border border-emerald-400/20 bg-slate-900/80 p-7 text-center hover:border-emerald-300/70"><div className="text-3xl">📈</div><div className="mt-3 text-3xl font-black text-emerald-300">3</div><div className="text-slate-500">Levels</div></button>
          <button type="button" onClick={() => document.getElementById('ai-tutor')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-3xl border border-orange-400/20 bg-slate-900/80 p-7 text-center hover:border-orange-300/70"><div className="text-3xl">🤖</div><div className="mt-3 text-3xl font-black text-orange-300">Live</div><div className="text-slate-500">AI Tutor</div></button>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <button type="button" onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-3xl border border-cyan-400/30 bg-slate-900/80 p-7 text-left hover:border-cyan-300/80"><div className="flex items-center justify-between"><div className="flex items-center gap-5"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-cyan-400/10 text-3xl">📚</div><div><h2 className="text-2xl font-black text-cyan-300">Syllabus</h2><p className="text-slate-500">Full roadmap • Beginner to Advanced</p></div></div><span className="text-2xl text-cyan-300">→</span></div></button>
          <button id="ai-tutor" type="button" onClick={() => setAiReply('AI Tutor is ready. Ask a question below and click Ask.')} className="rounded-3xl border border-orange-400/30 bg-slate-900/80 p-7 text-left hover:border-orange-300/80"><div className="flex items-center justify-between"><div className="flex items-center gap-5"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-orange-400/10 text-3xl">🤖</div><div><h2 className="text-2xl font-black text-orange-300">AI Tutor</h2><p className="text-slate-500">Ask doubts • Get instant answers</p></div></div><span className="text-2xl text-orange-300">→</span></div></button>
        </section>

        <section className="rounded-3xl border border-cyan-400/20 bg-slate-900/80 p-7">
          <div className="flex items-start gap-5"><div className="text-4xl">🗓️</div><div><h2 className="text-2xl font-black text-cyan-300">Everyday Data Tasks</h2><p className="mt-2 text-slate-400">Real-world tasks a data analyst does daily:</p><div className="mt-5 flex flex-wrap gap-3">{tasks.map((task) => <button key={task} type="button" onClick={() => alert(`Task selected: ${task}`)} className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300 hover:bg-cyan-400/20">{task}</button>)}</div></div></div>
        </section>

        <section id="topics" className="space-y-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><h2 className="text-2xl font-black">› Choose a topic</h2><div className="flex flex-col gap-3 sm:flex-row"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search topics..." className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" /><select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"><option>All</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div></div>
          <div className="grid gap-5 lg:grid-cols-3">
            {filteredTopics.map((topic) => {
              const selected = selectedTopic.title === topic.title;
              return <button key={topic.title} type="button" onClick={() => chooseTopic(topic)} className={`rounded-3xl border bg-slate-900/80 p-6 text-left transition hover:-translate-y-1 hover:shadow-xl ${selected ? colorMap[topic.color] : 'border-slate-700 hover:border-cyan-400/50'}`}><div className="mb-4 h-1 rounded-full bg-current opacity-70" /><div className="flex items-start gap-4"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-800 text-3xl">{topic.icon}</div><div><h3 className="text-xl font-black">{topic.title}</h3><p className="text-sm text-slate-400">{topic.questions} Questions • {topic.minutes} min</p></div></div><p className="mt-5 min-h-16 text-slate-300">{topic.description}</p><div className="mt-4 flex flex-wrap gap-2">{topic.skills.map((skill) => <span key={skill} className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-cyan-300">{skill}</span>)}</div><div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full bg-cyan-400" style={{ width: `${topic.progress}%` }} /></div></button>;
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border border-cyan-400/20 bg-slate-900/80 p-7"><h2 className="text-2xl font-black text-cyan-300">Selected: {selectedTopic.title}</h2><p className="mt-3 text-slate-300">{selectedTopic.description}</p><button type="button" onClick={() => alert(selectedTopic.practice)} className="mt-5 rounded-2xl bg-cyan-400/10 p-4 text-left font-bold text-cyan-300 hover:bg-cyan-400/20">Practice task: {selectedTopic.practice}</button><div className="mt-5"><p className="font-bold">Progress: {selectedTopic.progress}%</p><div className="mt-2 h-3 rounded-full bg-slate-800"><div className="h-full rounded-full bg-cyan-400" style={{ width: `${selectedTopic.progress}%` }} /></div></div></div>
          <div className="rounded-3xl border border-orange-400/20 bg-slate-900/80 p-7"><h2 className="text-2xl font-black text-orange-300">AI Tutor</h2><textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="Ask a data analysis question..." className="mt-4 min-h-28 w-full rounded-2xl border border-slate-700 bg-slate-950 p-4 text-slate-100 outline-none focus:border-orange-400" /><button type="button" onClick={askTutor} className="mt-3 rounded-2xl bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-400">Ask Tutor</button>{aiReply && <p className="mt-4 rounded-2xl bg-orange-400/10 p-4 text-sm text-orange-200">{aiReply}</p>}</div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div id="syllabus" className="rounded-3xl border border-cyan-400/20 bg-slate-900/80 p-6"><h2 className="text-2xl font-black">Full Syllabus</h2><div className="mt-4 space-y-3">{syllabus.map((item, index) => { const open = openSyllabus === index; return <button key={item.title} type="button" onClick={() => setOpenSyllabus(open ? -1 : index)} className="block w-full rounded-2xl border border-slate-700 bg-slate-950 p-4 text-left hover:border-cyan-400"><div className="flex justify-between gap-3 font-bold"><span>{index + 1}. {item.title}</span><span>{open ? '−' : '+'}</span></div>{open && <p className="mt-2 text-sm text-slate-400">{item.detail}</p>}</button>; })}</div></div>
          <div id="quiz" className="rounded-3xl border border-violet-400/20 bg-slate-900/80 p-6"><h2 className="text-2xl font-black">Quiz Preview</h2><p className="mt-3 font-semibold">{quiz.question}</p><div className="mt-4 space-y-2">{quiz.options.map((option) => { const selected = answer === option; const correct = option === quiz.answer; return <button key={option} type="button" onClick={() => setAnswer(option)} className={`block w-full rounded-2xl border px-4 py-3 text-left font-bold ${selected ? correct ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300' : 'border-rose-400 bg-rose-400/10 text-rose-300' : 'border-slate-700 bg-slate-950 hover:border-violet-400'}`}>{option}</button>; })}</div>{answer && <p className="mt-4 rounded-2xl bg-slate-950 p-4 font-bold">{answer === quiz.answer ? 'Correct. HAVING filters grouped results.' : 'Not quite. The correct answer is HAVING.'}</p>}</div>
          <div id="videos" className="rounded-3xl border border-emerald-400/20 bg-slate-900/80 p-6"><h2 className="text-2xl font-black">Video Library</h2><div className="mt-4 space-y-2">{videos.map((video) => <a key={video.title} href={video.url} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 font-bold text-emerald-300 hover:border-emerald-400 hover:bg-emerald-400/10">Open: {video.title}</a>)}</div></div>
        </section>

        <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6"><h2 className="text-2xl font-black">Study Planner</h2><label htmlFor="goal" className="mt-4 block font-semibold text-slate-300">Daily goal: {goal} minutes</label><input id="goal" type="range" min="15" max="120" step="15" value={goal} onChange={(e) => setGoal(Number(e.target.value))} className="mt-4 w-full" /><p className="mt-4 rounded-2xl bg-slate-950 p-4 font-bold text-cyan-300">Estimated study time: {Math.round((goal * 7) / 60)} hours/week</p></section>
      </section>
    </main>
  );
}
