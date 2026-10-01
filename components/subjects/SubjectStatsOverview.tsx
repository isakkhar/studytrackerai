"use client";

import React from "react";
import { Subject } from "@/types/subject";
import { Icon } from "@/components/common/Icon";

interface SubjectStatsOverviewProps {
  subjects: Subject[];
}

export function SubjectStatsOverview({ subjects }: SubjectStatsOverviewProps) {
  const totalSubjects = subjects.length;
  const totalTargetHours = subjects.reduce((sum, s) => sum + s.targetHours, 0);
  const totalCompletedHours = subjects.reduce((sum, s) => sum + s.completedHours, 0);
  const overallProgress =
    totalTargetHours > 0
      ? Math.min(100, Math.round((totalCompletedHours / totalTargetHours) * 100))
      : 0;
  const completedSubjectsCount = subjects.filter(
    (s) => s.targetHours > 0 && s.completedHours >= s.targetHours
  ).length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Subjects Card */}
      <article className="card p-5 transition hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-600">
            <Icon name="book" size={20} />
          </div>
          <span className="rounded-full bg-violet-50 px-2 py-0.5 text-xs font-semibold text-violet-600">
            Active
          </span>
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Enrolled Subjects
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-800">
            {totalSubjects}
          </span>
          <span className="text-xs text-slate-400">
            {completedSubjectsCount} completed
          </span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <span>Subjects tracked this term</span>
        </div>
      </article>

      {/* Target Hours Card */}
      <article className="card p-5 transition hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-100 text-sky-600">
            <Icon name="target" size={20} />
          </div>
          <span className="rounded-full bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-600">
            Goal
          </span>
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Target Study Hours
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-800">
            {totalTargetHours}h
          </span>
          <span className="text-xs text-slate-400">allocated total</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <span>Across all {totalSubjects} subjects</span>
        </div>
      </article>

      {/* Completed Hours Card */}
      <article className="card p-5 transition hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
            <Icon name="clock" size={20} />
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
            Logged
          </span>
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Completed Hours
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-emerald-600">
            {totalCompletedHours.toFixed(1)}h
          </span>
          <span className="text-xs text-slate-400">
            of {totalTargetHours}h target
          </span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <span>
            {Math.max(0, totalTargetHours - totalCompletedHours).toFixed(1)}h remaining
          </span>
        </div>
      </article>

      {/* Overall Progress Card */}
      <article className="card p-5 transition hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-600">
            <Icon name="chart" size={20} />
          </div>
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-600">
            Average
          </span>
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Total Completion
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-800">
            {overallProgress}%
          </span>
          <span className="text-xs font-medium text-emerald-500">
            {overallProgress >= 75 ? "On track" : "In progress"}
          </span>
        </div>
        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </article>
    </div>
  );
}

