"use client";

import React, { useState } from "react";
import { useSubjects } from "@/context/SubjectContext";
import { COLOR_THEMES } from "@/types/subject";
import { Icon, IconName } from "@/components/common/Icon";

interface DashboardOverviewProps {
  onNavigateToSubjects: () => void;
  onOpenAddSubject: () => void;
}

const stats = [
  {
    label: "Today's study hours",
    value: "4h 20m",
    change: "+ 1h 15m",
    icon: "clock" as IconName,
    color: "bg-violet-100 text-violet-600",
  },
  {
    label: "Completed tasks",
    value: "12",
    change: "+ 3 from yesterday",
    icon: "check" as IconName,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Pending tasks",
    value: "5",
    change: "2 due today",
    icon: "calendar" as IconName,
    color: "bg-amber-100 text-amber-600",
  },
  {
    label: "Study streak",
    value: "16 days",
    change: "Personal best: 23 days",
    icon: "flame" as IconName,
    color: "bg-orange-100 text-orange-500",
  },
];

const initialTasks = [
  {
    title: "Complete calculus problem set",
    subject: "Mathematics",
    time: "10:00 AM",
    tag: "High priority",
    dot: "bg-violet-500",
    checked: false,
  },
  {
    title: "Review Newton's laws notes",
    subject: "Physics",
    time: "1:30 PM",
    tag: "Study",
    dot: "bg-sky-500",
    checked: false,
  },
  {
    title: "Read Chapter 6: The Great Gatsby",
    subject: "English",
    time: "4:00 PM",
    tag: "Reading",
    dot: "bg-emerald-500",
    checked: false,
  },
  {
    title: "Organic chemistry flashcards",
    subject: "Chemistry",
    time: "6:30 PM",
    tag: "Practice",
    dot: "bg-pink-500",
    checked: false,
  },
];

export function DashboardOverview({
  onNavigateToSubjects,
  onOpenAddSubject,
}: DashboardOverviewProps) {
  const { subjects } = useSubjects();
  const [tasks, setTasks] = useState(initialTasks);

  const completed = tasks.filter((task) => task.checked).length;
  const toggleTask = (index: number) =>
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, checked: !task.checked } : task
      )
    );

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Add */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[22px] font-bold tracking-tight text-slate-800">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-slate-400">Wednesday, October 1, 2026</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAddSubject}
            className="flex items-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-3.5 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-100"
          >
            <Icon name="plus" size={15} stroke={2.5} />
            <span>Add subject</span>
          </button>
          <button
            onClick={() => {
              const newTaskTitle = prompt("Enter new task title:");
              if (newTaskTitle) {
                setTasks([
                  {
                    title: newTaskTitle,
                    subject: subjects[0]?.name || "General",
                    time: "Next session",
                    tag: "To-do",
                    dot: "bg-violet-500",
                    checked: false,
                  },
                  ...tasks,
                ]);
              }
            }}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
          >
            <Icon name="plus" size={16} stroke={2.5} />
            <span>Add task</span>
          </button>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="card p-5 transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div
                className={`grid h-10 w-10 place-items-center rounded-xl ${stat.color}`}
              >
                <Icon name={stat.icon} />
              </div>
              <button aria-label="More details" className="text-slate-300 hover:text-slate-500">
                <Icon name="more" size={19} />
              </button>
            </div>
            <p className="mt-5 text-sm font-medium text-slate-400">{stat.label}</p>
            <div className="mt-1 flex items-end gap-2">
              <strong className="text-[25px] leading-none text-slate-800">
                {stat.value}
              </strong>
            </div>
            <p
              className={`mt-3 text-xs font-medium ${
                stat.icon === "clock" || stat.icon === "check"
                  ? "text-emerald-500"
                  : "text-slate-400"
              }`}
            >
              {stat.change}
            </p>
          </article>
        ))}
      </div>

      {/* Weekly Progress & Today's Focus */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(330px,.9fr)]">
        <article className="card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800">Weekly progress</h3>
              <p className="mt-1 text-sm text-slate-400">
                Your study activity this week
              </p>
            </div>
            <button className="flex items-center gap-1 text-sm font-semibold text-violet-600">
              This week <Icon name="chevron" size={16} />
            </button>
          </div>
          <div className="mt-7 flex h-[210px] items-end justify-between gap-2 sm:gap-4">
            {[45, 65, 52, 88, 72, 94, 35].map((height, index) => (
              <div
                key={index}
                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
              >
                <div className="flex h-[168px] w-full items-end rounded-t-lg bg-[#f3f1fe] px-[18%]">
                  <div
                    style={{ height: `${height}%` }}
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      index === 5
                        ? "bg-violet-600 shadow-lg shadow-violet-200"
                        : "bg-violet-300"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs ${
                    index === 5 ? "font-bold text-violet-600" : "text-slate-400"
                  }`}
                >
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between rounded-xl bg-violet-50 px-4 py-3 text-sm">
            <span className="text-slate-500">This week&apos;s total</span>
            <span className="font-bold text-violet-700">
              24h 30m <span className="ml-1 text-xs font-medium text-emerald-500">↑ 18%</span>
            </span>
          </div>
        </article>

        <article className="card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800">Today&apos;s focus</h3>
              <p className="mt-1 text-sm text-slate-400">Keep it going!</p>
            </div>
            <button aria-label="More info" className="text-slate-300 hover:text-slate-500">
              <Icon name="more" size={19} />
            </button>
          </div>
          <div className="mt-7 flex items-center gap-7">
            <div className="ring grid h-[142px] w-[142px] shrink-0 place-items-center rounded-full">
              <div className="grid h-[112px] w-[112px] place-items-center rounded-full bg-white text-center">
                <strong className="text-2xl text-slate-800">74%</strong>
                <span className="-mt-2 text-xs text-slate-400">completed</span>
              </div>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-slate-800">
                  4h 20m <span className="font-normal text-slate-400">studied</span>
                </p>
                <div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[74%] rounded-full bg-violet-500" />
                </div>
              </div>
              <p className="text-slate-400">
                Goal: <b className="text-slate-600">6 hours</b>
              </p>
              <button
                onClick={onNavigateToSubjects}
                className="flex items-center gap-1 font-semibold text-violet-600 hover:text-violet-700"
              >
                View subjects <Icon name="arrow" size={15} />
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* Tasks & Quick Actions */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(330px,.9fr)]">
        <article className="card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800">
                Today&apos;s tasks{" "}
                <span className="ml-1 rounded-full bg-violet-100 px-2 py-0.5 text-xs text-violet-600">
                  {tasks.length - completed}
                </span>
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Stay on track with your schedule
              </p>
            </div>
            <button className="text-sm font-semibold text-violet-600">View all</button>
          </div>
          <div className="mt-5 divide-y divide-slate-100">
            {tasks.map((task, index) => (
              <div
                key={task.title}
                className="flex items-center gap-3 py-4 first:pt-0"
              >
                <button
                  onClick={() => toggleTask(index)}
                  aria-label={`Mark ${task.title} complete`}
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${
                    task.checked
                      ? "border-violet-600 bg-violet-600 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {task.checked && <Icon name="check" size={14} stroke={3} />}
                </button>
                <span className={`h-8 w-1 shrink-0 rounded-full ${task.dot}`} />
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-semibold ${
                      task.checked ? "text-slate-400 line-through" : "text-slate-700"
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {task.subject} · {task.time}
                  </p>
                </div>
                <span className="hidden rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500 sm:block">
                  {task.tag}
                </span>
              </div>
            ))}
          </div>
        </article>

        {/* Quick Actions */}
        <article className="card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800">Quick actions</h3>
              <p className="mt-1 text-sm text-slate-400">
                Make progress, one step at a time
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              onClick={onNavigateToSubjects}
              className="rounded-xl border border-violet-100 bg-violet-50 p-4 text-left transition hover:bg-violet-100"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-violet-600">
                <Icon name="book" />
              </span>
              <p className="mt-4 text-sm font-bold text-slate-800">My Subjects</p>
              <p className="mt-1 text-xs text-slate-400">Manage & set targets</p>
            </button>

            <button
              onClick={onOpenAddSubject}
              className="rounded-xl border border-sky-100 bg-sky-50 p-4 text-left transition hover:bg-sky-100"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-sky-600">
                <Icon name="plus" />
              </span>
              <p className="mt-4 text-sm font-bold text-slate-800">New Subject</p>
              <p className="mt-1 text-xs text-slate-400">Set hours & goals</p>
            </button>
          </div>
        </article>
      </div>

      {/* Dynamic Subject Progress Section */}
      <article className="card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-800">Subject progress</h3>
            <p className="mt-1 text-sm text-slate-400">
              Live completion rates based on your target & logged hours
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAddSubject}
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              <Icon name="plus" size={13} />
              <span>Add</span>
            </button>
            <button
              onClick={onNavigateToSubjects}
              className="flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700"
            >
              <span>Manage all subjects</span>
              <Icon name="arrow" size={15} />
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {subjects.map((subject) => {
            const theme = COLOR_THEMES[subject.color] || COLOR_THEMES.violet;
            const progress =
              subject.targetHours > 0
                ? Math.min(
                    100,
                    Math.round((subject.completedHours / subject.targetHours) * 100)
                  )
                : 0;

            return (
              <div
                key={subject.id}
                onClick={onNavigateToSubjects}
                className="group cursor-pointer rounded-xl border border-slate-100 p-4 transition hover:border-violet-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-xl font-bold shadow-sm ${theme.bgLight} ${theme.text}`}
                  >
                    {subject.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {subject.name}
                    </p>
                    <p className="truncate text-xs text-slate-400">
                      {subject.detail}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    {subject.completedHours}h / {subject.targetHours}h
                  </span>
                  <b className="font-bold text-slate-700">{progress}%</b>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      progress >= 100 ? "bg-emerald-500" : theme.barColor
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </article>
    </div>
  );
}
