'use client';

import { useState } from 'react';

const syllabus = [
  { title: 'Data Analysis Foundations', detail: 'Data analysis is the process of collecting, cleaning, transforming, and interpreting data to support better decisions. Start by defining a business question, identifying the right metrics, checking data quality, and summarizing patterns with tables, charts, and KPIs.', link: 'https://www.geeksforgeeks.org/data-analysis/data-analysis-tutorial/' },
  { title: 'Statistics for Analysts', detail: 'Statistics helps analysts understand variation, uncertainty, probability, sampling, confidence intervals, and hypothesis testing. It is useful for A/B testing, forecasting, risk analysis, and validating whether observed patterns are meaningful.', link: 'https://www.khanacademy.org/math/statistics-probability' },
  { title: 'Excel for Data Analysis', detail: 'Excel is useful for cleaning small datasets, creating pivot tables, applying formulas, building charts, and preparing business reports. Analysts use Excel for quick exploration, dashboards, summaries, and stakeholder-ready reporting.', link: 'https://support.microsoft.com/en-us/excel' },
  { title: 'SQL for Data Analysis', detail: 'SQL is used to retrieve and analyze structured data. Core skills include SELECT, WHERE, JOIN, GROUP BY, HAVING, CTEs, subqueries, window functions, and ranking queries for business reporting.', link: 'https://www.w3schools.com/sql/' },
  { title: 'Python, Pandas and NumPy', detail: 'Python supports repeatable analysis with Pandas, NumPy, Matplotlib, and automation. Use it to clean data, handle missing values, analyze DataFrames, build EDA reports, and prepare datasets for dashboards or machine learning.', link: 'https://pandas.pydata.org/docs/getting_started/index.html' },
  { title: 'Visualization and BI', detail: 'Visualization turns raw data into charts, dashboards, and stories. Good reports prioritize clarity, context, accurate scales, useful filters, and business actions. Power BI is commonly used for KPI dashboards and stakeholder reporting.', link: 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi' },
  { title: 'Gen AI for Data Work', detail: 'Generative AI helps analysts summarize data, write SQL, generate Python code, explain dashboards, and build AI assistants. Important concepts include LLMs, prompting, RAG, AI agents, evaluation, privacy, and responsible use.', link: 'https://www.cloudskillsboost.google/paths/118' },
];

const topics = [
  { title: 'Statistics & Probability', category: 'Statistics', video: 'https://www.youtube.com/results?search_query=Krish+Naik+statistics+for+data+science', theory: 'Statistics is the foundation of data analysis. It helps you describe data, measure uncertainty, compare groups, test assumptions, and make decisions from samples. Key concepts include mean, median, variance, standard deviation, probability distributions, confidence intervals, p-values, and hypothesis testing.' },
  { title: 'Excel for Data Analysis', category: 'Excel', video: 'https://www.youtube.com/results?search_query=Satish+Dhawale+Excel+data+analysis', theory: 'Excel is one of the fastest tools for practical business analysis. Analysts use formulas, filters, pivot tables, charts, conditional formatting, lookup functions, and dashboards to clean, summarize, and present data without writing code.' },
  { title: 'SQL Analysis', category: 'Database', video: 'https://www.youtube.com/results?search_query=Satish+Dhawale+SQL+full+course', theory: 'SQL is essential for working with relational databases. Analysts use SQL to select data, filter rows, join tables, group results, calculate aggregates, use CTEs, apply window functions, and prepare data for dashboards or reports.' },
  { title: 'Python EDA', category: 'Python', video: 'https://www.youtube.com/results?search_query=Krish+Naik+Python+for+data+analysis+pandas', theory: 'Python makes analysis reproducible and scalable. With Pandas and NumPy, you can clean messy data, inspect missing values, transform columns, group data, build charts, and automate repeated workflows.' },
  { title: 'Regression Analysis', category: 'Statistics', video: 'https://www.youtube.com/results?search_query=Krish+Naik+regression+analysis+machine+learning', theory: 'Regression explains relationships between a target variable and one or more predictors. Analysts use it for forecasting, pricing, risk modeling, and impact estimation.' },
  { title: 'Clustering', category: 'Machine Learning', video: 'https://www.youtube.com/results?search_query=Krish+Naik+clustering+machine+learning', theory: 'Clustering groups similar records without labels. It is useful for customer segmentation, anomaly grouping, market grouping, recommendation systems, and pattern discovery.' },
  { title: 'Time Series Forecasting', category: 'Forecasting', video: 'https://www.youtube.com/results?search_query=Krish+Naik+time+series+forecasting', theory: 'Time series forecasting predicts future values using historical patterns. Analysts look for trend, seasonality, cycles, volatility, and noise to forecast demand, sales, revenue, traffic, or operations.' },
  { title: 'Power BI Dashboards', category: 'Visualization', video: 'https://www.youtube.com/results?search_query=Power+BI+dashboard+data+analysis+Hindi', theory: 'Power BI turns raw data into interactive dashboards using data models, DAX measures, charts, slicers, and KPI cards. It is useful for business reporting and stakeholder communication.' },
  { title: 'A/B Testing', category: 'Statistics', video: 'https://www.youtube.com/results?search_query=Krish+Naik+A%2FB+testing+statistics', theory: 'A/B testing compares two or more variants using experimental design and statistical evidence. It helps decide whether a product, marketing, or website change improves a target metric.' },
  { title: 'Data Cleaning', category: 'Preparation', video: 'https://www.youtube.com/results?search_query=data+cleaning+excel+python+pandas', theory: 'Data cleaning handles missing values, duplicates, inconsistent formats, invalid entries, outliers, and incorrect data types. Clean data improves accuracy and trust in analysis.' },
  { title: 'KPI Reporting', category: 'Business', video: 'https://www.youtube.com/results?search_query=KPI+dashboard+reporting+Power+BI+Excel', theory: 'KPI reporting tracks business performance using measurable indicators such as revenue, churn, margin, conversion rate, retention, and customer acquisition cost.' },
];

const genAiTopics = [
  { title: 'Large Language Models', video: 'https://www.youtube.com/results?search_query=Krish+Naik+large+language+models+explained' },
  { title: 'Prompt Engineering', video: 'https://www.youtube.com/results?search_query=Krish+Naik+prompt+engineering' },
  { title: 'RAG Systems', video: 'https://www.youtube.com/results?search_query=Krish+Naik+RAG+retrieval+augmented+generation' },
  { title: 'AI Agents', video: 'https://www.youtube.com/results?search_query=Krish+Naik+AI+agents+tutorial' },
  { title: 'AI Ethics in Data', video: 'https://www.youtube.com/results?search_query=AI+ethics+in+data+science' },
  { title: 'Gen AI Analytics', video: 'https://www.youtube.com/results?search_query=generative+AI+for+data+analytics' },
];

const dailyTasks = ['Data Cleaning Exercise', 'Excel Pivot Table Practice', 'SQL Query Drill', 'Python EDA Practice', 'Visualization Practice', 'Statistical Analysis Drill', 'Dashboard KPI Review'];

const quizQuestions = Array.from({ length: 100 }, (_, index) => {
  const bank = [
    { q: 'Which SQL clause filters grouped results?', a: 'HAVING', o: ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'] },
    { q: 'Which Python library is commonly used for DataFrames?', a: 'Pandas', o: ['Pandas', 'React', 'Express', 'Tailwind'] },
    { q: 'Which Excel feature summarizes data quickly?', a: 'Pivot Table', o: ['Pivot Table', 'Paint Brush', 'Slide Master', 'Terminal'] },
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
  const [aiMessages, setAiMessages] = useState([{ role: 'assistant', text: 'Ask me anything about data analysis, SQL, Excel, Python, statistics, dashboards, or Gen AI.' }]);

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
        <header className="mb-8 text-center"><h1 className="text-5xl font-black tracking-tight">Data Analysis Pro</h1><p className="mt-4 text-xl text-slate-700">Your Comprehensive Study Platform for Data Analysis, Excel, SQL, Python & Gen AI</p></header>
        <section className="grid gap-5 lg:grid-cols-[1.35fr_0.75fr]"><div className="space-y-5"><div className="grid gap-5 md:grid-cols-2"><div className="rounded-xl border bg-white p-5 shadow-sm"><h2 className="text-2xl font-bold">Syllabus</h2><button type="button" onClick={() => document.getElementById('syllabus-section')?.scrollIntoView({ behavior: 'smooth' })} className="mt-5 w-full rounded-lg bg-blue-600 px-5 py-4 text-lg font-bold text-white hover:bg-blue-700">View Full Syllabus</button><a href="https://www.geeksforgeeks.org/data-analysis/data-analysis-tutorial/" target="_blank" rel="noopener noreferrer" className="mt-4 block text-center text-sm text-slate-600 hover:text-blue-700">🔗 External theory resource</a></div><div className="rounded-xl border bg-white p-5 shadow-sm"><h2 className="text-2xl font-bold">MCQ Quiz</h2><h3 className="mt-2 text-2xl font-black">100 Questions Daily</h3><p className="text-slate-600">Test your knowledge with daily quizzes</p><button type="button" onClick={startQuiz} className="mt-5 rounded-lg bg-orange-500 px-8 py-4 text-lg font-bold text-white hover:bg-orange-600">Start Quiz</button></div></div>
        {quizStarted && <div className="rounded-xl border bg-white p-5 shadow-sm"><div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"><h2 className="text-2xl font-bold">Daily MCQ Quiz</h2><p className="font-semibold text-blue-700">Score: {score}/{quizIndex + (answer ? 1 : 0)} • Question {quizIndex + 1}/100</p></div><p className="mt-4 text-lg font-semibold">{currentQuestion.question}</p><div className="mt-4 grid gap-3 md:grid-cols-2">{currentQuestion.options.map((option) => { const selected = answer === option; const correct = option === currentQuestion.answer; return <button key={option} type="button" onClick={() => chooseAnswer(option)} disabled={Boolean(answer)} className={`rounded-lg border p-4 text-left font-semibold disabled:cursor-not-allowed ${selected ? correct ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700' : 'bg-white hover:bg-blue-50'}`}>{option}</button>; })}</div>{answer && <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-100 p-4"><p className="font-bold">{answer === currentQuestion.answer ? 'Correct answer.' : `Wrong. Correct: ${currentQuestion.answer}`}</p><button type="button" onClick={nextQuestion} className="rounded-lg bg-blue-600 px-5 py-2 font-bold text-white hover:bg-blue-700">Next</button></div>}</div>}
        <div className="rounded-xl border bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Everyday Tasks</h2><span className="text-sm font-semibold text-slate-500">{completedCount}/{dailyTasks.length} complete</span></div><div className="mt-4 space-y-3">{dailyTasks.map((task) => <div key={task} className="flex items-center justify-between gap-3"><button type="button" onClick={() => toggleTask(task)} className={`text-left text-lg ${completedTasks.includes(task) ? 'text-green-700 line-through' : ''}`}>✓ {task}</button><button type="button" onClick={() => toggleTask(task)} className="rounded border px-4 py-2 hover:bg-slate-100">{completedTasks.includes(task) ? 'Undo' : 'Mark Complete'}</button></div>)}</div></div>
        <div className="rounded-xl border bg-white p-5 shadow-sm"><h2 className="text-2xl font-bold">Topics of Data Analysis</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{topics.map((topic) => <button key={topic.title} type="button" onClick={() => setSelectedTopic(topic)} className={`rounded-lg border p-4 text-left hover:border-blue-500 hover:bg-blue-50 ${selectedTopic.title === topic.title ? 'border-blue-600 bg-blue-50' : 'bg-white'}`}><h3 className="font-bold">{topic.title}</h3><p className="mt-2 text-sm text-slate-600">{topic.category}</p><a href={topic.video} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="mt-4 block font-semibold text-blue-600 hover:underline">Watch Video</a></button>)}</div></div>
        <div className="rounded-xl border bg-white p-5 shadow-sm"><h2 className="text-2xl font-bold">Theory: {selectedTopic.title}</h2><p className="mt-3 leading-7 text-slate-700">{selectedTopic.theory}</p></div></div>
        <aside className="space-y-5"><div className="rounded-xl border bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold">AI Assistant</h2><span className="text-2xl">🤖</span></div><div className="mt-4 h-64 overflow-y-auto rounded-lg border bg-slate-50 p-4">{aiMessages.map((msg, index) => <div key={index} className={`mb-3 rounded-lg p-3 ${msg.role === 'assistant' ? 'bg-white' : 'bg-blue-50 text-blue-900'}`}>{msg.text}</div>)}</div><div className="mt-3 flex gap-2"><input value={aiInput} onChange={(e) => setAiInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') sendAiMessage(); }} placeholder="Ask me anything about data analysis..." className="min-w-0 flex-1 rounded-lg border px-3 py-3 outline-none focus:border-purple-500" /><button type="button" onClick={sendAiMessage} className="rounded-lg bg-purple-600 px-5 py-3 font-bold text-white hover:bg-purple-700">Send</button></div></div><div className="rounded-xl border bg-white p-5 shadow-sm"><h2 className="text-2xl font-bold">Gen AI</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{genAiTopics.map((item) => <div key={item.title} className="rounded-lg border bg-white p-3"><h3 className="font-semibold">{item.title}</h3><a href={item.video} target="_blank" rel="noopener noreferrer" className="mt-3 block font-semibold text-blue-600 hover:underline">Watch Video</a></div>)}</div><a href="https://www.cloudskillsboost.google/paths/118" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block rounded border px-5 py-2 font-semibold hover:bg-slate-100">Learn More</a></div></aside></section>
        <section id="syllabus-section" className="mt-5 rounded-xl border bg-white p-5 shadow-sm"><h2 className="text-2xl font-bold">Clickable Full Syllabus</h2><div className="mt-4 grid gap-3 md:grid-cols-2">{syllabus.map((item, index) => { const open = openSyllabus === index; return <div key={item.title} className="rounded-lg border"><button type="button" onClick={() => setOpenSyllabus(open ? -1 : index)} className="flex w-full items-center justify-between p-4 text-left font-bold hover:bg-slate-50"><span>{index + 1}. {item.title}</span><span>{open ? '−' : '+'}</span></button>{open && <div className="border-t p-4 text-slate-700"><p>{item.detail}</p><a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-semibold text-blue-600 hover:underline">Open theory resource</a></div>}</div>; })}</div></section>
      </section>
    </main>
  );
}
