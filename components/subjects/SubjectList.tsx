"use client";

import React, { useState, useMemo } from "react";
import { Subject, SubjectFilter, SubjectSort } from "@/types/subject";
import { useSubjects } from "@/context/SubjectContext";
import { SubjectCard } from "./SubjectCard";
import { SubjectModal } from "./SubjectModal";
import { SubjectDeleteModal } from "./SubjectDeleteModal";
import { QuickLogModal } from "./QuickLogModal";
import { SubjectStatsOverview } from "./SubjectStatsOverview";
import { Icon } from "@/components/common/Icon";

export function SubjectList() {
  const {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    logHours,
    setTargetHours,
    resetToDefaults,
  } = useSubjects();

  // State for search, filter & sort
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<SubjectFilter>("all");
  const [sortBy, setSortBy] = useState<SubjectSort>("progress-desc");

  // State for modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const [deleteModalSubject, setDeleteModalSubject] = useState<Subject | null>(null);
  const [quickLogSubject, setQuickLogSubject] = useState<Subject | null>(null);

  // Filtered & sorted subjects
  const filteredSubjects = useMemo(() => {
    return subjects
      .filter((sub) => {
        // Search filter
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          sub.name.toLowerCase().includes(query) ||
          sub.detail.toLowerCase().includes(query) ||
          (sub.description && sub.description.toLowerCase().includes(query));

        if (!matchesSearch) return false;

        // Status filter
        const percentage =
          sub.targetHours > 0
            ? Math.round((sub.completedHours / sub.targetHours) * 100)
            : 0;

        if (filter === "completed") return sub.completedHours >= sub.targetHours && sub.targetHours > 0;
        if (filter === "in-progress") return sub.completedHours > 0 && sub.completedHours < sub.targetHours;
        if (filter === "behind") return percentage < 50;
        return true;
      })
      .sort((a, b) => {
        const pctA = a.targetHours > 0 ? a.completedHours / a.targetHours : 0;
        const pctB = b.targetHours > 0 ? b.completedHours / b.targetHours : 0;

        if (sortBy === "progress-desc") return pctB - pctA;
        if (sortBy === "progress-asc") return pctA - pctB;
        if (sortBy === "hours-desc") return b.completedHours - a.completedHours;
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [subjects, searchQuery, filter, sortBy]);

  // Counts for filter pills
  const counts = useMemo(() => {
    return {
      all: subjects.length,
      inProgress: subjects.filter(
        (s) => s.completedHours > 0 && s.completedHours < s.targetHours
      ).length,
      completed: subjects.filter(
        (s) => s.completedHours >= s.targetHours && s.targetHours > 0
      ).length,
      behind: subjects.filter((s) => {
        const pct = s.targetHours > 0 ? Math.round((s.completedHours / s.targetHours) * 100) : 0;
        return pct < 50;
      }).length,
    };
  }, [subjects]);

  const handleOpenAddModal = () => {
    setEditingSubject(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (subject: Subject) => {
    setEditingSubject(subject);
    setIsModalOpen(true);
  };

  const handleSaveSubject = (data: Omit<Subject, "id">) => {
    if (editingSubject) {
      updateSubject(editingSubject.id, data);
    } else {
      addSubject(data);
    }
  };

  return (
    <div className="space-y-7">
      {/* Top Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">
              Subject Management
            </h2>
            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700">
              {subjects.length} Total
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Add, edit, track study targets, and monitor your course completion rates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={resetToDefaults}
            title="Reset to default mock subjects"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-800"
          >
            <Icon name="refresh" size={14} />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
          >
            <Icon name="plus" size={17} stroke={2.5} />
            <span>Add Subject</span>
          </button>
        </div>
      </div>

      {/* Top Stats Overview */}
      <SubjectStatsOverview subjects={subjects} />

      {/* Filter and Search Bar */}
      <div className="card p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Icon name="search" size={16} />
            </div>
            <input
              type="text"
              placeholder="Search subjects by name, category, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs font-medium placeholder-slate-400 transition focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              >
                <Icon name="x" size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-100/80 p-1">
              {[
                { id: "all", label: "All", count: counts.all },
                { id: "in-progress", label: "In Progress", count: counts.inProgress },
                { id: "completed", label: "Completed", count: counts.completed },
                { id: "behind", label: "Behind (<50%)", count: counts.behind },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as SubjectFilter)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    filter === tab.id
                      ? "bg-white text-violet-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      filter === tab.id
                        ? "bg-violet-100 text-violet-700"
                        : "bg-slate-200/80 text-slate-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <label htmlFor="sort-subjects-select" className="font-medium whitespace-nowrap">Sort:</label>
              <select
                id="sort-subjects-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SubjectSort)}
                className="rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100"
              >
                <option value="progress-desc">Highest Progress</option>
                <option value="progress-asc">Lowest Progress</option>
                <option value="hours-desc">Most Study Hours</option>
                <option value="name-asc">Subject Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Cards Grid */}
      {filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onEdit={handleOpenEditModal}
              onDelete={(sub) => setDeleteModalSubject(sub)}
              onQuickLog={(sub) => setQuickLogSubject(sub)}
              onQuickAddHour={(id, delta) => logHours(id, delta)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="card flex flex-col items-center justify-center p-12 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-violet-50 text-violet-600">
            <Icon name="book" size={28} />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-800">
            {searchQuery || filter !== "all"
              ? "No subjects match your criteria"
              : "No subjects added yet"}
          </h3>
          <p className="mt-1 max-w-sm text-xs text-slate-400">
            {searchQuery || filter !== "all"
              ? "Try adjusting your search query or clear the active filter to see all subjects."
              : "Get started by adding your first subject to set target study hours and track completed time."}
          </p>

          <div className="mt-5 flex items-center gap-2">
            {searchQuery || filter !== "all" ? (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilter("all");
                }}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Clear Filters
              </button>
            ) : null}

            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
            >
              <Icon name="plus" size={15} />
              <span>Add Subject Now</span>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <SubjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSubject(null);
        }}
        onSave={handleSaveSubject}
        editingSubject={editingSubject}
      />

      <SubjectDeleteModal
        isOpen={!!deleteModalSubject}
        subject={deleteModalSubject}
        onClose={() => setDeleteModalSubject(null)}
        onConfirm={(id) => deleteSubject(id)}
      />

      <QuickLogModal
        isOpen={!!quickLogSubject}
        subject={quickLogSubject}
        onClose={() => setQuickLogSubject(null)}
        onLogHours={(id, delta) => logHours(id, delta)}
        onSetTargetHours={(id, target) => setTargetHours(id, target)}
      />
    </div>
  );
}

