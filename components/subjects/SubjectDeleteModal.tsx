"use client";

import React from "react";
import { Subject } from "@/types/subject";
import { Icon } from "@/components/common/Icon";

interface SubjectDeleteModalProps {
  isOpen: boolean;
  subject: Subject | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export function SubjectDeleteModal({
  isOpen,
  subject,
  onClose,
  onConfirm,
}: SubjectDeleteModalProps) {
  if (!isOpen || !subject) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-rose-100 text-rose-600">
            <Icon name="trash" size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Delete Subject</h3>
            <p className="text-xs text-slate-400">This action cannot be undone</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-slate-50 p-3.5 text-xs text-slate-600">
          <p>
            Are you sure you want to delete <b className="text-slate-800">&quot;{subject.name}&quot;</b>?
          </p>
          <div className="mt-2 flex items-center gap-3 text-slate-400">
            <span>Target: <b>{subject.targetHours}h</b></span>
            <span>•</span>
            <span>Completed: <b>{subject.completedHours}h</b></span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(subject.id);
              onClose();
            }}
            className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-rose-200 transition hover:bg-rose-700"
          >
            <Icon name="trash" size={15} />
            <span>Delete Subject</span>
          </button>
        </div>
      </div>
    </div>
  );
}
