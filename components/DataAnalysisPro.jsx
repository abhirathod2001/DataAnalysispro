'use client';

import { useMemo, useState } from 'react';

const syllabus = [
  { title: 'Data Analysis Foundations', detail: 'Understand data types, business metrics, data cleaning, KPI thinking, and reporting workflow.', link: 'https://www.geeksforgeeks.org/data-analysis/data-analysis-tutorial/' },
  { title: 'Statistics for Analysts', detail: 'Mean, median, variance, probability, sampling, confidence intervals, and hypothesis testing.', link: 'https://www.khanacademy.org/math/statistics-probability' },
  { title: 'SQL for Data Analysis', detail: 'SELECT, WHERE, JOIN, GROUP BY, HAVING, CTEs, subqueries, and window functions.', link: 'https://www.w3schools.com/sql/' },
  { title: 'Python, Pandas and NumPy', detail: 'DataFrames, cleaning, transformation, missing values, EDA, plotting, and automation.', link: 'https://pandas.pydata.org/docs/getting_started/index.html' },
  { title: 'Visualization and BI', detail: 'Dashboards, charts, Power BI, storytelling, KPI cards, and stakeholder reporting.', link: 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi' },
  { title: 'Gen AI for Data Work', detail: 'Prompting, RAG, LLMs, AI assistants, responsible AI, and agentic analysis workflows.', link: 'https://www.cloudskillsboost.google/paths/118' },
];

const topics = [
  { title: 'Regression Analysis', category: 'Statistics', video: 'https://www.youtube.com/results?search_query=regression+analysis+for+data+analysis', theory: 'Regression explains relationships between a target variable and one or more predictors. Analysts use it for forecasting, pricing, risk modeling, and impact estimation.' },
  { title: 'Clustering', category: 'Machine Learning', video: 'https://www.youtube.com/results?search_query=clustering+machine+learning+data+analysis', theory: 'Clustering groups similar records without labels. It is useful for customer segmentation, anomaly grouping, and pattern discovery.' },
  { title: 'Time Series Forecasting', category: 'Forecasting', video: 'https://www.youtube.com/results?search_query=time+series+forecasting+data+analysis', theory: 'Time series forecasting predicts future values using historical trends, seasonality, cycles, and noise.' },
  { title: 'SQL Analysis', category: 'Database', video: 'https://www.youtube.com/results?search_query=sql+for+data+analysis+full+course', theory: 'SQL is used to filter, join, aggregate, and rank structured data from relational databases.' },
  { title: 'Power BI Dashboards', category: 'Visualization', video: 'https://www.youtube.com/results?search_query=power+bi+dashboard+data+analysis', theory: 'Power BI turns raw data into dashboards using data models, DAX measures, charts, filters, and KPI cards.' },
  { title: 'Python EDA', category: 'Python', video: 'https://www.youtube.com/results?search_query=python+exploratory+data+analysis+pandas', theory: 'Exploratory Data Analysis summarizes patterns, missing values, distributions, outliers, and relationships before modeling.' },
  { title: 'A/B Testing', category: 'Statistics', video: 'https://www.youtube.com/results?search_query=a+b+testing+statistics+data+analysis', theory: 'A/B testing compares variants using experiment design and statistical evidence to decide which performs better.' },
  { title: 'Data Cleaning', category: 'Preparation', video: 'https://www.youtube.com/results?search_query=data+cleaning+for+data+analysis', theory: 'Data cleaning handles duplicates, missing values, inconsistent formats, invalid entries, and outliers.' },
  { title: 'KPI Reporting', category: 'Business', video: 'https://www.youtube.com/results?search_query=kpi+reporting+dashboard+data+analysis', theory: 'KPI reporting tracks business performance through measurable indicators such as revenue, churn, margin, and conversion.' },
];

const genAiTopics = [
  { title: 'Large Language Models', video: 'https://www.youtube.com/results?search_query=large+language+models+explained' },
  { title: 'Prompt Engineering', video: 'https://www.youtube.com/results?search_query=prompt+engineering+for+beginners' },
  { title: 'RAG Systems', video: 'https://www.youtube.com/results?search_query=rag+retrieval+augmented+generation+tutorial' },
  { title: 'AI Agents', video: 'https://www.youtube.com/results?search_query=ai+agents+tutorial+for+beginners' },
  { title: 'AI Ethics in Data', video: 'https://www.youtube.com/results?search_query=ai+ethics+in+data+science' },
  { title: 'Gen AI Analytics', video: 'https://www.youtube.com/results?search_query=generative+ai+for+data+analytics' },
];

const dailyTasks = ['Data Cleaning Exercise', 'Visualization Practice', 'SQL Query Drill', 'Statistical Analysis Drill', 'Dashboard KPI Review'];

const quizQuestions = Array.from({ length: 100 }, (_, index) => {
  const bank = [
    { q: 'Which SQL clause filters grouped results?', a: 'HAVING', o: ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'] },
    { q: 'Which Python library is commonly used for DataFrames?', a: 'Pandas', o: ['Pandas', 'React', 'Express', 'Tailwind'] },
    { q: 'Which chart is useful for trends over time?', a: 'Line chart', o: ['Pie chart', 'Line chart', 'Treemap', 'Word cloud'] },
    { q: 'What does EDA stand for?', a: 'Exploratory Data Analysis', o: ['External Data API', 'Exploratory Data Analysis', 'Exact Data Audit', 'Enhanced Digital App'] },
    { q: 'What does RAG combine LLMs with?', a: 'External knowledge retrieval', o: ['CSS files', 'External knowledge retrieval', 'Only charts', 'Browser cache'] },
  ];
  const item = bank[index % bank.length];
  return { id: index + 1, question: `Q${index + 1}. ${item.q}`, answer: item.a, options: item.o };
});

export default function DataAnalysisPro() {
  const [openSyllabus, setOpenSyllabus] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([{ role: 'assistant', text: 'Ask me anything about data analysis, SQL, Python, statistics, dashboards, or Gen AI.' }]);

  const currentQuestion = quizQuestions[quizIndex];
  const completedCount = completedTasks.length;

  function toggleTask(task) {
    setCompletedTasks((current) => current.includes(task) ? current.filter((item) => item !== task) : [...current, task]);
  }

  function startQuiz() {
    setQuizStarted(true);
    setQuizIndex(0);
    setAnswer('');
    setScore(0);
  }

  function chooseAnswer(option) {
    if (answer) return;
    setAnswer(option);
    if (option === currentQuestion.answer) setScore((value) => value + 1);
  }

  function nextQuestion() {
    setQuizIndex((index) => (index + 1) % quizQuestions.length);
    setAnswer('');
  }

  function sendAiMessage() {
    const text = aiInput.trim();
    if (!text) return;
    setAiMessages((messages) => [...messages, { role: 'user', text }, { role: 'assistant', text: `AI Assistant: For "${text}", start by identifying the dataset, business question, metric, method, and final action. For ${selectedTopic.title}, focus on: ${selectedTopic.theory}` }]);
    setAiInput('');
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-950">
      <section className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-black tracking-tight">Data Analysis Pro</h1>
          <p className="mt-4 text-xl text-slate-700">Your Comprehensive Study Platform for Data Analysis & Gen AI</p>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1.35fr_0.75fr]">
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border bg-white p-5 shadow-sm">
                <h2 className="text-2xl font-bold">Syllabus</h2>
                <button type="button" onClick={() => document.getElementById('syllabus-section')?.scrollIntoView({ behavior: 'smooth' })} className="mt-5 w-full rounded-lg bg-blue-600 px-5 py-4 text-lg font-bold text-white hover:bg-blue-700">View Full Syllabus</button>
                <a href="https://www.geeksforgeeks.org/data-analysis/data-analysis-tutorial/" target="_blank" rel="noopener noreferrer" className="mt-4 block text-center text-sm text-slate-600 hover:text-blue-700">🔗 External theory resource</a>
              </div>

              <div className="rounded-xl border bg-white p-5 shadow-sm">
                <h2 className="text-2xl font-bold">MCQ Quiz</h2>
                <h3 className="mt-2 text-2xl font-black">100 Questions Daily</h3>
                <p className="text-slate-600">Test your knowledge with daily quizzes</p>
                <button type="button" onClick={startQuiz} className="mt-5 rounded-lg bg-orange-500 px-8 py-4 text-lg font-bold text-white hover:bg-orange-600">Start Quiz</button>
              </div>
            </div>

            {quizStarted && (
              <div className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <h2 className="text-2xl font-bold">Daily MCQ Quiz</h2>
                  <p className="font-semibold text-blue-700">Score: {score}/{quizIndex + (answer ? 1 : 0)} • Question {quizIndex + 1}/100</p>
                </div>
                <p className="mt-4 text-lg font-semibold">{currentQuestion.question}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {currentQuestion.options.map((option) => {
                    const selected = answer === option;
                    const correct = option === currentQuestion.answer;
                    return <button key={option} type="button" onClick={() => chooseAnswer(option)} disabled={Boolean(answer)} className={`rounded-lg border p-4 text-left font-semibold disabled:cursor-not-allowed ${selected ? correct ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700' : 'bg-white hover:bg-blue-50'}`}>{option}</button>;
                  })}
                </div>
                {answer && <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-100 p-4"><p className="font-bold">{answer === currentQuestion.answer ? 'Correct answer.' : `Wrong. Correct: ${currentQuestion.answer}`}</p><button type="button" onClick={nextQuestion} className="rounded-lg bg-blue-600 px-5 py-2 font-bold text-white hover:bg-blue-700">Next</button></div>}
              </div>
            )}

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Everyday Tasks</h2><span className="text-sm font-semibold text-slate-500">{completedCount}/{dailyTasks.length} complete</span></div>
              <div className="mt-4 space-y-3">
                {dailyTasks.map((task) => <div key={task} className="flex items-center justify-between gap-3"><button type="button" onClick={() => toggleTask(task)} className={`text-left text-lg ${completedTasks.includes(task) ? 'text-green-700 line-through' : ''}`}>✓ {task}</button><button type="button" onClick={() => toggleTask(task)} className="rounded border px-4 py-2 hover:bg-slate-100">{completedTasks.includes(task) ? 'Undo' : 'Mark Complete'}</button></div>)}
              </div>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-bold">Topics of Data Analysis</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {topics.map((topic) => <button key={topic.title} type="button" onClick={() => setSelectedTopic(topic)} className={`rounded-lg border p-4 text-left hover:border-blue-500 hover:bg-blue-50 ${selectedTopic.title === topic.title ? 'border-blue-600 bg-blue-50' : 'bg-white'}`}><h3 className="font-bold">{topic.title}</h3><p className="mt-2 text-sm text-slate-600">{topic.category}</p><a href={topic.video} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="mt-4 block font-semibold text-blue-600 hover:underline">Watch Video</a></button>)}
              </div>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-bold">Theory: {selectedTopic.title}</h2>
              <p className="mt-3 leading-7 text-slate-700">{selectedTopic.theory}</p>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between"><h2 className="text-2xl font-bold">AI Assistant</h2><span className="text-2xl">🤖</span></div>
              <div className="mt-4 h-64 overflow-y-auto rounded-lg border bg-slate-50 p-4">
                {aiMessages.map((msg, index) => <div key={index} className={`mb-3 rounded-lg p-3 ${msg.role === 'assistant' ? 'bg-white' : 'bg-blue-50 text-blue-900'}`}>{msg.text}</div>)}
              </div>
              <div className="mt-3 flex gap-2"><input value={aiInput} onChange={(e) => setAiInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') sendAiMessage(); }} placeholder="Ask me anything about data analysis..." className="min-w-0 flex-1 rounded-lg border px-3 py-3 outline-none focus:border-purple-500" /><button type="button" onClick={sendAiMessage} className="rounded-lg bg-purple-600 px-5 py-3 font-bold text-white hover:bg-purple-700">Send</button></div>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-bold">Gen AI</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {genAiTopics.map((item) => <div key={item.title} className="rounded-lg border bg-white p-3"><h3 className="font-semibold">{item.title}</h3><a href={item.video} target="_blank" rel="noopener noreferrer" className="mt-3 block font-semibold text-blue-600 hover:underline">Watch Video</a></div>)}
              </div>
              <a href="https://www.cloudskillsboost.google/paths/118" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block rounded border px-5 py-2 font-semibold hover:bg-slate-100">Learn More</a>
            </div>
          </aside>
        </section>

        <section id="syllabus-section" className="mt-5 rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold">Clickable Full Syllabus</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {syllabus.map((item, index) => {
              const open = openSyllabus === index;
              return <div key={item.title} className="rounded-lg border"><button type="button" onClick={() => setOpenSyllabus(open ? -1 : index)} className="flex w-full items-center justify-between p-4 text-left font-bold hover:bg-slate-50"><span>{index + 1}. {item.title}</span><span>{open ? '−' : '+'}</span></button>{open && <div className="border-t p-4 text-slate-700"><p>{item.detail}</p><a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-semibold text-blue-600 hover:underline">Open theory resource</a></div>}</div>;
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
