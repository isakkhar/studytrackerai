"use client";

import React, { useState, useEffect } from "react";
import { Subject, SubjectColor, COLOR_THEMES, POPULAR_ICONS } from "@/types/subject";
import { Icon } from "@/components/common/Icon";

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Subject, "id">) => void;
  editingSubject?: Subject | null;
}

export function SubjectModal({
  isOpen,
  onClose,
  onSave,
  editingSubject,
}: SubjectModalProps) {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [targetHours, setTargetHours] = useState<number | string>(40);
  const [completedHours, setCompletedHours] = useState<number | string>(0);
  const [color, setColor] = useState<SubjectColor>("violet");
  const [icon, setIcon] = useState("📚");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ name?: string; targetHours?: string; completedHours?: string }>({});

  useEffect(() => {
    if (editingSubject) {
      setName(editingSubject.name);
      setDetail(editingSubject.detail);
      setTargetHours(editingSubject.targetHours);
      setCompletedHours(editingSubject.completedHours);
      setColor(editingSubject.color);
      setIcon(editingSubject.icon);
      setDescription(editingSubject.description || "");
    } else {
      setName("");
      setDetail("");
      setTargetHours(40);
      setCompletedHours(0);
      setColor("violet");
      setIcon("📚");
      setDescription("");
    }
    setErrors({});
  }, [editingSubject, isOpen]);

  if (!isOpen) return null;

  const numTarget = Math.max(1, Number(targetHours) || 0);
  const numCompleted = Math.max(0, Number(completedHours) || 0);
  const previewProgress =
    numTarget > 0 ? Math.min(100, Math.round((numCompleted / numTarget) * 100)) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; targetHours?: string; completedHours?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Subject name is required.";
    }

    if (!targetHours || Number(targetHours) <= 0) {
      newErrors.targetHours = "Target hours must be at least 1.";
    }

    if (completedHours === "" || Number(completedHours) < 0) {
      newErrors.completedHours = "Completed hours cannot be negative.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      name: name.trim(),
      detail: detail.trim() || "General Studies",
      targetHours: Math.round(Number(targetHours)),
      completedHours: parseFloat(Number(completedHours).toFixed(1)),
      color,
      icon,
      description: description.trim(),
    });

    onClose();
  };

  const selectedTheme = COLOR_THEMES[color] || COLOR_THEMES.violet;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {editingSubject ? "Edit Subject" : "Add New Subject"}
            </h2>
            <p className="mt-0.5 text-xs text-slate-400">
              {editingSubject
                ? "Update your subject goals and progress"
                : "Create a subject to track study hours and progress"}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Subject Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Subject Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Advanced Calculus, World History"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm transition focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                  : "border-slate-200 focus:border-violet-500 focus:ring-violet-100"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-500">{errors.name}</p>
            )}
          </div>

          {/* Category / Sub-detail */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Category or Module
            </label>
            <input
              type="text"
              placeholder="e.g. Algebra & Trigonometry, Semester 1"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Hours Row (Target and Completed) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Target Study Hours <span className="text-rose-500">*</span>
              </label>
              <div className="relative mt-1.5">
                <input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="e.g. 50"
                  value={targetHours}
                  onChange={(e) => {
                    setTargetHours(e.target.value);
                    if (errors.targetHours) setErrors({ ...errors, targetHours: undefined });
                  }}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition focus:outline-none focus:ring-2 ${
                    errors.targetHours
                      ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                      : "border-slate-200 focus:border-violet-500 focus:ring-violet-100"
                  }`}
                />
                <span className="pointer-events-none absolute right-3 top-2.5 text-xs font-medium text-slate-400">
                  hrs
                </span>
              </div>
              {errors.targetHours && (
                <p className="mt-1 text-xs text-rose-500">{errors.targetHours}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Completed Hours
              </label>
              <div className="relative mt-1.5">
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="e.g. 15"
                  value={completedHours}
                  onChange={(e) => {
                    setCompletedHours(e.target.value);
                    if (errors.completedHours) setErrors({ ...errors, completedHours: undefined });
                  }}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition focus:outline-none focus:ring-2 ${
                    errors.completedHours
                      ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                      : "border-slate-200 focus:border-violet-500 focus:ring-violet-100"
                  }`}
                />
                <span className="pointer-events-none absolute right-3 top-2.5 text-xs font-medium text-slate-400">
                  hrs
                </span>
              </div>
              {errors.completedHours && (
                <p className="mt-1 text-xs text-rose-500">{errors.completedHours}</p>
              )}
            </div>
          </div>

          {/* Live Progress Preview */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Icon name="chart" size={14} className="text-violet-600" />
                Live Progress Preview:
              </span>
              <span className="text-violet-600 font-bold">{previewProgress}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-300 ${selectedTheme.barColor}`}
                style={{ width: `${previewProgress}%` }}
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              {numCompleted} of {numTarget} hours completed
            </p>
          </div>

          {/* Color Scheme Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Color Theme
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {(Object.keys(COLOR_THEMES) as SubjectColor[]).map((c) => {
                const item = COLOR_THEMES[c];
                const isSelected = color === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                      isSelected
                        ? "border-slate-800 bg-slate-800 text-white shadow"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className={`h-3 w-3 rounded-full ${item.barColor}`} />
                    <span>{item.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Subject Icon / Symbol
              </label>
              <span className="text-xs text-slate-400">
                Selected: <b className="text-slate-700 text-sm">{icon}</b>
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {POPULAR_ICONS.map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => setIcon(sym)}
                  className={`grid h-8 w-8 place-items-center rounded-lg border text-sm font-semibold transition ${
                    icon === sym
                      ? "border-violet-600 bg-violet-50 text-violet-700 ring-2 ring-violet-200"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>

          {/* Notes / Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Description / Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Focus topics, exam dates, or syllabus references..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
            >
              {editingSubject ? "Save Changes" : "Create Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

