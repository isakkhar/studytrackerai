"use client";

import { useState } from "react";

type IconName = "grid" | "book" | "check" | "calendar" | "target" | "settings" | "bell" | "arrow" | "plus" | "clock" | "flame" | "more" | "chart" | "chevron";

function Icon({ name, size = 20, stroke = 1.9 }: { name: IconName; size?: number; stroke?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16"/></>,
    check: <path d="m5 12 4 4L19 6"/>, calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2M22 12h-2M12 22v-2M2 12h2"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.1 2.1-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.04 1.56v.1h-3v-.1A1.7 1.7 0 0 0 10.68 18.6a1.7 1.7 0 0 0-1.88.34l-.06.06-2.1-2.1.06-.06A1.7 1.7 0 0 0 7.04 15a1.7 1.7 0 0 0-1.56-1.04h-.1v-3h.1A1.7 1.7 0 0 0 7.04 9.92a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.1-2.1.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.04-1.56v-.1h3v.1A1.7 1.7 0 0 0 15.76 6.3a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.1 2.1-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.04h.1v3h-.1A1.7 1.7 0 0 0 19.4 15Z"/></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 22h4"/></>, arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>, plus: <><path d="M12 5v14M5 12h14"/></>, clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></>,
    flame: <path d="M12 22c4 0 7-2.8 7-7 0-2.5-1.5-4.7-3.8-6.8.1 2.5-1 3.7-2 4.5.1-3.4-1.6-6.2-4.3-8.7.2 3.2-2.2 5.2-3.4 7.4C4.4 13.5 5 22 12 22Z"/>, more: <><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></>, chart: <><path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 5-7"/></>, chevron: <path d="m9 18 6-6-6-6"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

const stats = [
  { label: "Today's study hours", value: "4h 20m", change: "+ 1h 15m", icon: "clock" as IconName, color: "bg-violet-100 text-violet-600" },
  { label: "Completed tasks", value: "12", change: "+ 3 from yesterday", icon: "check" as IconName, color: "bg-emerald-100 text-emerald-600" },
  { label: "Pending tasks", value: "5", change: "2 due today", icon: "calendar" as IconName, color: "bg-amber-100 text-amber-600" },
  { label: "Study streak", value: "16 days", change: "Personal best: 23 days", icon: "flame" as IconName, color: "bg-orange-100 text-orange-500" },
];

const subjects = [
  { name: "Mathematics", detail: "Algebra & Calculus", progress: 78, color: "bg-violet-500", icon: "∑", bg: "bg-violet-100 text-violet-600" },
  { name: "Physics", detail: "Mechanics", progress: 64, color: "bg-sky-500", icon: "⚛", bg: "bg-sky-100 text-sky-600" },
  { name: "Chemistry", detail: "Organic Chemistry", progress: 52, color: "bg-pink-500", icon: "⌬", bg: "bg-pink-100 text-pink-600" },
  { name: "English", detail: "Literature", progress: 86, color: "bg-emerald-500", icon: "A", bg: "bg-emerald-100 text-emerald-600" },
];

const initialTasks = [
  { title: "Complete calculus problem set", subject: "Mathematics", time: "10:00 AM", tag: "High priority", dot: "bg-violet-500", checked: false },
  { title: "Review Newton's laws notes", subject: "Physics", time: "1:30 PM", tag: "Study", dot: "bg-sky-500", checked: false },
  { title: "Read Chapter 6: The Great Gatsby", subject: "English", time: "4:00 PM", tag: "Reading", dot: "bg-emerald-500", checked: false },
  { title: "Organic chemistry flashcards", subject: "Chemistry", time: "6:30 PM", tag: "Practice", dot: "bg-pink-500", checked: false },
];

function NavItem({ icon, label, active }: { icon: IconName; label: string; active?: boolean }) {
  return <button className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${active ? "bg-violet-50 text-violet-600" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"}`}><Icon name={icon}/>{label}</button>;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const completed = tasks.filter((task) => task.checked).length;
  const toggleTask = (index: number) => setTasks(tasks.map((task, i) => i === index ? { ...task, checked: !task.checked } : task));

  return <main className="min-h-screen bg-[#f8f9fc] text-[#17243d]">
    <aside className="fixed inset-y-0 left-0 hidden w-[242px] flex-col border-r border-slate-100 bg-white px-5 py-7 lg:flex">
      <div className="mb-11 flex items-center gap-3 px-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-600 text-lg font-bold text-white shadow-lg shadow-violet-200">S</div><span className="text-lg font-bold tracking-tight">StudyTrack <span className="text-violet-600">AI</span></span></div>
      <nav className="space-y-1"><NavItem icon="grid" label="Dashboard" active/><NavItem icon="book" label="My Subjects"/><NavItem icon="check" label="Tasks"/><NavItem icon="calendar" label="Planner"/><NavItem icon="target" label="Goals"/></nav>
      <div className="mt-auto border-t border-slate-100 pt-4"><NavItem icon="settings" label="Settings"/><div className="mt-5 flex items-center gap-3 px-2"><div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#ffd8c5] to-[#f1a986] text-xs font-bold text-[#7b412f]">JS</div><div><p className="text-sm font-semibold">Jamie Smith</p><p className="text-xs text-slate-400">Student</p></div><Icon name="more" size={18}/></div></div>
    </aside>

    <section className="lg:ml-[242px]">
      <header className="flex h-[78px] items-center justify-between border-b border-slate-100 bg-white px-5 sm:px-8 lg:px-10"><div className="flex items-center gap-3 lg:hidden"><div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-600 font-bold text-white">S</div><b>StudyTrack AI</b></div><div className="hidden lg:block"><h1 className="text-lg font-bold">Good morning, Jamie <span>👋</span></h1><p className="text-sm text-slate-400">Here&apos;s what&apos;s happening with your studies today.</p></div><div className="flex items-center gap-4"><button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-50"><Icon name="bell"/><i className="absolute right-2 top-2 h-2 w-2 rounded-full border border-white bg-violet-500"/></button><button className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#ffd8c5] to-[#f1a986] text-xs font-bold text-[#7b412f] lg:hidden">JS</button></div></header>

      <div className="mx-auto max-w-[1460px] px-5 py-7 sm:px-8 lg:px-10 lg:py-8">
        <div className="mb-7 lg:hidden"><h1 className="text-xl font-bold">Good morning, Jamie 👋</h1><p className="mt-1 text-sm text-slate-400">Here&apos;s your study overview for today.</p></div>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-[22px] font-bold tracking-tight">Dashboard</h2><p className="mt-1 text-sm text-slate-400">Wednesday, October 1, 2026</p></div><button className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"><Icon name="plus" size={18}/> Add new task</button></div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <article key={stat.label} className="card p-5"><div className="flex items-start justify-between"><div className={`grid h-10 w-10 place-items-center rounded-xl ${stat.color}`}><Icon name={stat.icon}/></div><button className="text-slate-300"><Icon name="more" size={19}/></button></div><p className="mt-5 text-sm font-medium text-slate-400">{stat.label}</p><div className="mt-1 flex items-end gap-2"><strong className="text-[25px] leading-none">{stat.value}</strong></div><p className={`mt-3 text-xs font-medium ${stat.icon === "clock" || stat.icon === "check" ? "text-emerald-500" : "text-slate-400"}`}>{stat.change}</p></article>)}</div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(330px,.9fr)]">
          <article className="card p-5 sm:p-6"><div className="flex items-center justify-between"><div><h3 className="font-bold">Weekly progress</h3><p className="mt-1 text-sm text-slate-400">Your study activity this week</p></div><button className="flex items-center gap-1 text-sm font-semibold text-violet-600">This week <Icon name="chevron" size={16}/></button></div><div className="mt-7 flex h-[210px] items-end justify-between gap-2 sm:gap-4">{[45, 65, 52, 88, 72, 94, 35].map((height, index) => <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-3"><div className="flex h-[168px] w-full items-end rounded-t-lg bg-[#f3f1fe] px-[18%]"><div style={{ height: `${height}%` }} className={`w-full rounded-t-md ${index === 5 ? "bg-violet-600 shadow-lg shadow-violet-200" : "bg-violet-300"}`}/></div><span className={`text-xs ${index === 5 ? "font-bold text-violet-600" : "text-slate-400"}`}>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</span></div>)}</div><div className="mt-6 flex items-center justify-between rounded-xl bg-violet-50 px-4 py-3 text-sm"><span className="text-slate-500">This week&apos;s total</span><span className="font-bold text-violet-700">24h 30m <span className="ml-1 text-xs font-medium text-emerald-500">↑ 18%</span></span></div></article>
          <article className="card p-5 sm:p-6"><div className="flex items-center justify-between"><div><h3 className="font-bold">Today&apos;s focus</h3><p className="mt-1 text-sm text-slate-400">Keep it going!</p></div><button className="text-slate-300"><Icon name="more" size={19}/></button></div><div className="mt-7 flex items-center gap-7"><div className="ring grid h-[142px] w-[142px] shrink-0 place-items-center rounded-full"><div className="grid h-[112px] w-[112px] place-items-center rounded-full bg-white text-center"><strong className="text-2xl">74%</strong><span className="-mt-2 text-xs text-slate-400">completed</span></div></div><div className="space-y-4 text-sm"><div><p className="font-semibold">4h 20m <span className="font-normal text-slate-400">studied</span></p><div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[74%] rounded-full bg-violet-500"/></div></div><p className="text-slate-400">Goal: <b className="text-slate-600">6 hours</b></p><button className="flex items-center gap-1 font-semibold text-violet-600">View insights <Icon name="arrow" size={15}/></button></div></div></article>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(330px,.9fr)]"><article className="card p-5 sm:p-6"><div className="flex items-center justify-between"><div><h3 className="font-bold">Today&apos;s tasks <span className="ml-1 rounded-full bg-violet-100 px-2 py-0.5 text-xs text-violet-600">{tasks.length - completed}</span></h3><p className="mt-1 text-sm text-slate-400">Stay on track with your schedule</p></div><button className="text-sm font-semibold text-violet-600">View all</button></div><div className="mt-5 divide-y divide-slate-100">{tasks.map((task, index) => <div key={task.title} className="flex items-center gap-3 py-4 first:pt-0"><button onClick={() => toggleTask(index)} aria-label={`Mark ${task.title} complete`} className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${task.checked ? "border-violet-600 bg-violet-600 text-white" : "border-slate-300 bg-white"}`}>{task.checked && <Icon name="check" size={14} stroke={3}/>}</button><span className={`h-8 w-1 shrink-0 rounded-full ${task.dot}`}/><div className="min-w-0 flex-1"><p className={`text-sm font-semibold ${task.checked ? "text-slate-400 line-through" : ""}`}>{task.title}</p><p className="mt-1 text-xs text-slate-400">{task.subject} · {task.time}</p></div><span className="hidden rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500 sm:block">{task.tag}</span></div>)}</div></article>
          <article className="card p-5 sm:p-6"><div className="flex items-center justify-between"><div><h3 className="font-bold">Quick actions</h3><p className="mt-1 text-sm text-slate-400">Make progress, one step at a time</p></div></div><div className="mt-5 grid grid-cols-2 gap-3"><button className="rounded-xl border border-violet-100 bg-violet-50 p-4 text-left transition hover:bg-violet-100"><span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-violet-600"><Icon name="plus"/></span><p className="mt-4 text-sm font-bold">Add task</p><p className="mt-1 text-xs text-slate-400">Plan your day</p></button><button className="rounded-xl border border-sky-100 bg-sky-50 p-4 text-left transition hover:bg-sky-100"><span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-sky-600"><Icon name="clock"/></span><p className="mt-4 text-sm font-bold">Start focus</p><p className="mt-1 text-xs text-slate-400">Begin a session</p></button></div></article></div>

        <article className="card mt-6 p-5 sm:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-bold">Subject progress</h3><p className="mt-1 text-sm text-slate-400">Your learning journey at a glance</p></div><button className="flex items-center gap-1 text-sm font-semibold text-violet-600">View all subjects <Icon name="arrow" size={15}/></button></div><div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{subjects.map((subject) => <div key={subject.name} className="rounded-xl border border-slate-100 p-4"><div className="flex items-center gap-3"><div className={`grid h-10 w-10 place-items-center rounded-xl font-bold ${subject.bg}`}>{subject.icon}</div><div><p className="text-sm font-bold">{subject.name}</p><p className="text-xs text-slate-400">{subject.detail}</p></div></div><div className="mt-5 flex items-center justify-between"><span className="text-xs text-slate-400">Course progress</span><b className="text-sm">{subject.progress}%</b></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${subject.color}`} style={{ width: `${subject.progress}%` }}/></div></div>)}</div></article>
      </div>
    </section>
  </main>;
}
