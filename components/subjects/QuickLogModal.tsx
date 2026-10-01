"use client";

import React, { useState } from "react";
import { Subject, COLOR_THEMES } from "@/types/subject";
import { Icon } from "@/components/common/Icon";

interface QuickLogModalProps {
  isOpen: boolean;
  subject: Subject | null;
  onClose: () => void;
  onLogHours: (id: string, delta: number) => void;
  onSetTargetHours: (id: string, target: number) => void;
}

export function QuickLogModal({
  isOpen,
  subject,
  onClose,
  onLogHours,
  onSetTargetHours,
}: QuickLogModalProps) {
  const [customDelta, setCustomDelta] = useState<number | string>("");
  const [editingTarget, setEditingTarget] = useState(false);
  const [newTarget, setNewTarget] = useState<number | string>("");

  if (!isOpen || !subject) return null;

  const theme = COLOR_THEMES[subject.color] || COLOR_THEMES.violet;
  const currentPercentage =
    subject.targetHours > 0
      ? Math.min(100, Math.round((subject.completedHours / subject.targetHours) * 100))
      : 0;

  const handleApplyDelta = (delta: number) => {
    onLogHours(subject.id, delta);
    setCustomDelta("");
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(customDelta);
    if (!isNaN(val) && val !== 0) {
      handleApplyDelta(val);
    }
  };

  const handleSaveTarget = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(newTarget);
    if (!isNaN(val) && val > 0) {
      onSetTargetHours(subject.id, val);
      setEditingTarget(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`grid h-10 w-10 place-items-center rounded-xl font-bold ${theme.bgLight} ${theme.text}`}
            >
              {subject.icon}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">{subject.name}</h3>
              <p className="text-xs text-slate-400">Log Study Session & Target</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Current status summary */}
        <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Logged Progress</span>
            <span className="text-sm font-bold text-violet-700">
              {subject.completedHours}h / {subject.targetHours}h ({currentPercentage}%)
            </span>
          </div>

          <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-300 ${theme.barColor}`}
              style={{ width: `${currentPercentage}%` }}
            />
          </div>
        </div>

        {/* Quick Add Presets */}
        <div className="mt-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            Quick Add Hours
          </label>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {[
              { label: "+30 min", value: 0.5 },
              { label: "+1 hour", value: 1.0 },
              { label: "+2 hours", value: 2.0 },
              { label: "+3 hours", value: 3.0 },
            ].map((btn) => (
              <button
                key={btn.label}
                type="button"
                onClick={() => handleApplyDelta(btn.value)}
                className="rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 active:scale-95"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Hours adjustment form */}
        <form onSubmit={handleCustomSubmit} className="mt-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            Or Add / Subtract Specific Hours
          </label>
          <div className="mt-1.5 flex gap-2">
            <div className="relative flex-1">
              <input
                type="number"
                step="0.25"
                placeholder="e.g. 1.5 or -0.5"
                value={customDelta}
                onChange={(e) => setCustomDelta(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100"
              />
              <span className="pointer-events-none absolute right-3 top-2 text-xs font-medium text-slate-400">
                hrs
              </span>
            </div>
            <button
              type="submit"
              disabled={!customDelta || Number(customDelta) === 0}
              className="rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-violet-700 disabled:opacity-40"
            >
              Apply
            </button>
          </div>
        </form>

        {/* Target hours quick edit section */}
        <div className="mt-5 border-t border-slate-100 pt-4">
          {!editingTarget ? (
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Current target hours: </span>
                <b className="font-bold text-slate-700">{subject.targetHours} hours</b>
              </div>
              <button
                onClick={() => {
                  setNewTarget(subject.targetHours);
                  setEditingTarget(true);
                }}
                className="flex items-center gap-1 font-semibold text-violet-600 hover:text-violet-700"
              >
                <Icon name="pencil" size={13} /> Change target
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveTarget} className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Update Target Study Hours
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-1.5 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTarget(false)}
                  className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Done Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
