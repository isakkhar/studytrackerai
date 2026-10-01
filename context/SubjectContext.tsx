"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Subject } from "@/types/subject";

const INITIAL_SUBJECTS: Subject[] = [
  {
    id: "sub-1",
    name: "Mathematics",
    detail: "Algebra & Calculus",
    completedHours: 39,
    targetHours: 50,
    color: "violet",
    icon: "∑",
    description: "Differential equations, integral calculus, and linear algebra matrices.",
    createdAt: "2026-09-01T08:00:00.000Z",
  },
  {
    id: "sub-2",
    name: "Physics",
    detail: "Mechanics & Dynamics",
    completedHours: 32,
    targetHours: 50,
    color: "sky",
    icon: "⚛",
    description: "Newtonian mechanics, kinematics, thermodynamics, and optics problem sets.",
    createdAt: "2026-09-02T08:00:00.000Z",
  },
  {
    id: "sub-3",
    name: "Chemistry",
    detail: "Organic Chemistry",
    completedHours: 26,
    targetHours: 50,
    color: "pink",
    icon: "⌬",
    description: "Reaction mechanisms, carbon synthesis, and stereochemistry memorization.",
    createdAt: "2026-09-03T08:00:00.000Z",
  },
  {
    id: "sub-4",
    name: "English",
    detail: "Literature & Composition",
    completedHours: 43,
    targetHours: 50,
    color: "emerald",
    icon: "A",
    description: "Critical essay analysis, 20th century novels, and rhetoric structure.",
    createdAt: "2026-09-04T08:00:00.000Z",
  },
];

const STORAGE_KEY = "studytrack_subjects_v1";

interface SubjectContextType {
  subjects: Subject[];
  addSubject: (data: Omit<Subject, "id">) => Subject;
  updateSubject: (id: string, updates: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  logHours: (id: string, deltaHours: number) => void;
  setTargetHours: (id: string, targetHours: number) => void;
  resetToDefaults: () => void;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export function SubjectProvider({ children }: { children: React.ReactNode }) {
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSubjects(parsed);
        }
      }
    } catch {
      // Fallback silently if localStorage is blocked
    } finally {
      setHydrated(true);
    }
  }, []);

  // Save to localStorage whenever subjects change after hydration
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
    } catch {
      // Ignore write errors
    }
  }, [subjects, hydrated]);

  const addSubject = (data: Omit<Subject, "id">): Subject => {
    const newSubject: Subject = {
      ...data,
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      targetHours: Math.max(1, Math.round(Number(data.targetHours) || 1)),
      completedHours: Math.max(0, parseFloat((Number(data.completedHours) || 0).toFixed(1))),
    };

    setSubjects((prev) => [newSubject, ...prev]);
    return newSubject;
  };

  const updateSubject = (id: string, updates: Partial<Subject>) => {
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== id) return sub;
        const updated = { ...sub, ...updates };
        if (updated.targetHours !== undefined) {
          updated.targetHours = Math.max(1, Math.round(Number(updated.targetHours) || 1));
        }
        if (updated.completedHours !== undefined) {
          updated.completedHours = Math.max(0, parseFloat((Number(updated.completedHours) || 0).toFixed(1)));
        }
        return updated;
      })
    );
  };

  const deleteSubject = (id: string) => {
    setSubjects((prev) => prev.filter((sub) => sub.id !== id));
  };

  const logHours = (id: string, deltaHours: number) => {
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== id) return sub;
        const newCompleted = Math.max(0, parseFloat((sub.completedHours + deltaHours).toFixed(1)));
        return { ...sub, completedHours: newCompleted };
      })
    );
  };

  const setTargetHours = (id: string, targetHours: number) => {
    const validTarget = Math.max(1, Math.round(targetHours));
    setSubjects((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, targetHours: validTarget } : sub))
    );
  };

  const resetToDefaults = () => {
    setSubjects(INITIAL_SUBJECTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        addSubject,
        updateSubject,
        deleteSubject,
        logHours,
        setTargetHours,
        resetToDefaults,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
}

export function useSubjects() {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error("useSubjects must be used within a SubjectProvider");
  }
  return context;
}

