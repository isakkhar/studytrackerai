"use client";

import React, { useState } from "react";
import { Subject, COLOR_THEMES } from "@/types/subject";
import { Icon } from "@/components/common/Icon";

interface SubjectCardProps {
  subject: Subject;
  onEdit: (subject: Subject) => void;
  onDelete: (subject: Subject) => void;
  onQuickLog: (subject: Subject) => void;
  onQuickAddHour: (subjectId: string, delta: number) => void;
}

export function SubjectCard({
  subject,
  onEdit,
  onDelete,
  onQuickLog,
  onQuickAddHour,
}: SubjectCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const theme = COLOR_THEMES[subject.color] || COLOR_THEMES.violet;

  const percentage =
    subject.targetHours > 0
      ? Math.min(100, Math.round((subject.completedHours / subject.targetHours) * 100))
      : 0;

  const isCompleted = subject.completedHours >= subject.targetHours && subject.targetHours > 0;
  const isStarted = subject.completedHours > 0;

  return (
    <article className="card group relative flex flex-col justify-between p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl font-bold transition shadow-sm ${theme.bgLight} ${theme.text}`}
            >
              {subject.icon}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-base font-bold text-slate-800" title={subject.name}>
                {subject.name}
              </h3>
              <p className="truncate text-xs font-medium text-slate-400" title={subject.detail}>
                {subject.detail}
              </p>
            </div>
          </div>

          {/* Action Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              aria-label="Subject actions"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none"
            >
              <Icon name="more" size={18} />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-8 z-30 w-36 rounded-xl border border-slate-100 bg-white py-1.5 shadow-xl">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onQuickLog(subject);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-600"
                  >
                    <Icon name="clock" size={15} /> Log hours
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onEdit(subject);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Icon name="pencil" size={15} /> Edit subject
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDelete(subject);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50"
                  >
                    <Icon name="trash" size={15} /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Optional Description / Topic */}
        {subject.description && (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {subject.description}
          </p>
        )}

        {/* Target and Completed Hours Details */}
        <div className="mt-5 rounded-xl bg-slate-50/80 p-3">
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400">Completed: </span>
              <strong className="font-semibold text-slate-700">
                {subject.completedHours}h
              </strong>
            </div>
            <div className="text-right">
              <span className="text-slate-400">Target: </span>
              <strong className="font-semibold text-slate-700">
                {subject.targetHours}h
              </strong>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500">Progress</span>
              <span
                className={`font-bold ${
                  isCompleted ? "text-emerald-600" : "text-slate-800"
                }`}
              >
                {percentage}%
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isCompleted ? "bg-emerald-500" : theme.barColor
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Quick Controls */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        {/* Status chip */}
        <div>
          {isCompleted ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
              <Icon name="check" size={12} stroke={2.5} /> Goal reached
            </span>
          ) : isStarted ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              In progress
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-400">
              Not started
            </span>
          )}
        </div>

        {/* Quick Add Hour button */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onQuickAddHour(subject.id, 1)}
            title="Add 1 study hour"
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
          >
            <Icon name="plus" size={13} />
            <span>1h</span>
          </button>
          <button
            onClick={() => onEdit(subject)}
            title="Edit subject settings"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <Icon name="pencil" size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
