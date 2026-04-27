'use client';

import { useState } from 'react';

const topics = ['Statistics & Probability', 'SQL & Databases', 'Python for Data Analysis', 'Power BI & Visualization', 'Data Ethics & Governance', 'Agentic AI'];
const syllabus = ['Data analysis foundations', 'Statistics and probability', 'SQL querying and databases', 'Python, Pandas, and NumPy', 'Visualization and dashboarding', 'Business case studies', 'Ethics, governance, and AI workflows'];
const videos = [
  { title: 'Statistics basics for data analysis', url: 'https://www.youtube.com/results?search_query=statistics+basics+for+data+analysis' },
  { title: 'SQL full course for beginners', url: 'https://www.youtube.com/results?search_query=sql+full+course+for+beginners+data+analysis' },
  { title: 'Python for data analysis beginner course', url: 'https://www.youtube.com/results?search_query=python+for+data+analysis+beginner+course' },
];

export default function DataAnalysisPro() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [answer, setAnswer] = useState('');
  const [openSyllabus, setOpenSyllabus] = useState(0);
  const [goal, setGoal] = useState(30);
  const [clickCount, setClickCount] = useState(0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50 to-slate-100 p-6 text-slate-950">
      <section className="mx-auto max-w-7xl space-y-6">
        <nav className="flex flex-col gap-4 rounded-3xl border border-white bg-white/85 p-5 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">DataAnalysis Pro</p>
            <h1 className="mt-1 text-2xl font-black">Theory, quizzes, videos, and projects</h1>
          </div>
          <a href="#topics" className="rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white hover:bg-slate-800">Start learning</a>
        </nav>

        <header className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="rounded-3xl bg-white/80 p-8 shadow-sm backdrop-blur">
            <div className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">Beginner to advanced roadmap</div>
            <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">Master data analysis with a structured learning dashboard.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Learn statistics, SQL, Python, visualization, ethics, and agentic AI through theory notes, video links, quiz practice, and project prompts.</p>
            <button type="button" onClick={() => setClickCount((count) => count + 1)} className="mt-6 rounded-xl bg-red-600 px-5 py-3 font-bold text-white">Test React Click: {clickCount}</button>
          </div>

          <div className="rounded-3xl bg-white/85 p-6 shadow-xl backdrop-blur">
            <p className="text-sm text-slate-500">Learning dashboard</p>
            <h3 className="mt-1 text-3xl font-black">49% overall progress</h3>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200"><div className="h-full w-[49%] rounded-full bg-slate-950" /></div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-100 p-4 text-center"><div className="text-3xl font-black">100</div><div className="text-sm text-slate-500">MCQs</div></div>
              <div className="rounded-2xl bg-slate-100 p-4 text-center"><div className="text-3xl font-black">6</div><div className="text-sm text-slate-500">Topics</div></div>
              <div className="rounded-2xl bg-slate-100 p-4 text-center"><div className="text-3xl font-black">3</div><div className="text-sm text-slate-500">Video links</div></div>
              <div className="rounded-2xl bg-slate-100 p-4 text-center"><div className="text-3xl font-black">AI</div><div className="text-sm text-slate-500">Tutor-ready</div></div>
            </div>
          </div>
        </header>

        <section id="topics" className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Clickable Topic Cards</h2>
            <p className="mt-2 text-sm text-slate-500">Selected topic: <strong>{selectedTopic}</strong></p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {topics.map((topic) => (
                <button key={topic} type="button" onClick={() => setSelectedTopic(topic)} className={`rounded-2xl border p-4 text-left font-bold ${selectedTopic === topic ? 'border-indigo-600 bg-indigo-50 text-indigo-800' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>{topic}</button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Quiz Buttons</h2>
            <p className="mt-2 font-semibold">Which SQL clause filters grouped results?</p>
            <div className="mt-4 space-y-2">
              {['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'].map((option) => (
                <button key={option} type="button" onClick={() => setAnswer(option)} className={`block w-full rounded-2xl border px-4 py-3 text-left font-bold ${answer === option ? option === 'HAVING' ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-rose-600 bg-rose-50 text-rose-800' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>{option}</button>
              ))}
            </div>
            {answer && <p className="mt-4 rounded-2xl bg-slate-100 p-4 font-bold">{answer === 'HAVING' ? 'Correct: HAVING filters grouped results.' : 'Incorrect. The correct answer is HAVING.'}</p>}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Expandable Syllabus</h2>
            <div className="mt-4 space-y-2">
              {syllabus.map((item, index) => {
                const open = openSyllabus === index;
                return <button key={item} type="button" onClick={() => setOpenSyllabus(open ? -1 : index)} className="block w-full rounded-2xl border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"><div className="flex justify-between gap-3 font-bold"><span>{index + 1}. {item}</span><span>{open ? '-' : '+'}</span></div>{open && <p className="mt-2 text-sm text-slate-600">This section opens and closes using React state.</p>}</button>;
              })}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Study Slider</h2>
            <label htmlFor="goal" className="mt-4 block font-semibold">Daily goal: {goal} minutes</label>
            <input id="goal" type="range" min="15" max="120" step="15" value={goal} onChange={(event) => setGoal(Number(event.target.value))} className="mt-4 w-full" />
            <p className="mt-4 rounded-2xl bg-slate-100 p-4 font-bold">Weekly: {Math.round((goal * 7) / 60)} hours</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Working Video Links</h2>
            <div className="mt-4 space-y-2">
              {videos.map((video) => <a key={video.title} href={video.url} target="_blank" rel="noopener noreferrer" className="block rounded-2xl bg-slate-100 px-4 py-3 font-bold text-slate-900 hover:bg-slate-200 hover:underline">Open: {video.title}</a>)}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
