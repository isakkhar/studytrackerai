export type SubjectColor = 'violet' | 'sky' | 'pink' | 'emerald' | 'amber' | 'indigo' | 'rose';

export interface Subject {
  id: string;
  name: string;
  detail: string;
  targetHours: number;
  completedHours: number;
  color: SubjectColor;
  icon: string;
  description?: string;
  createdAt?: string;
}

export type SubjectFilter = 'all' | 'in-progress' | 'completed' | 'behind';

export type SubjectSort = 'progress-desc' | 'progress-asc' | 'hours-desc' | 'name-asc';

export interface ColorTheme {
  name: SubjectColor;
  label: string;
  bgLight: string;
  text: string;
  barColor: string;
  borderLight: string;
  ringColor: string;
}

export const COLOR_THEMES: Record<SubjectColor, ColorTheme> = {
  violet: {
    name: 'violet',
    label: 'Purple / Violet',
    bgLight: 'bg-violet-100',
    text: 'text-violet-700',
    barColor: 'bg-violet-600',
    borderLight: 'border-violet-200',
    ringColor: 'focus:ring-violet-500',
  },
  sky: {
    name: 'sky',
    label: 'Sky Blue',
    bgLight: 'bg-sky-100',
    text: 'text-sky-700',
    barColor: 'bg-sky-500',
    borderLight: 'border-sky-200',
    ringColor: 'focus:ring-sky-500',
  },
  pink: {
    name: 'pink',
    label: 'Pink',
    bgLight: 'bg-pink-100',
    text: 'text-pink-700',
    barColor: 'bg-pink-500',
    borderLight: 'border-pink-200',
    ringColor: 'focus:ring-pink-500',
  },
  emerald: {
    name: 'emerald',
    label: 'Emerald Green',
    bgLight: 'bg-emerald-100',
    text: 'text-emerald-700',
    barColor: 'bg-emerald-500',
    borderLight: 'border-emerald-200',
    ringColor: 'focus:ring-emerald-500',
  },
  amber: {
    name: 'amber',
    label: 'Amber Gold',
    bgLight: 'bg-amber-100',
    text: 'text-amber-700',
    barColor: 'bg-amber-500',
    borderLight: 'border-amber-200',
    ringColor: 'focus:ring-amber-500',
  },
  indigo: {
    name: 'indigo',
    label: 'Deep Indigo',
    bgLight: 'bg-indigo-100',
    text: 'text-indigo-700',
    barColor: 'bg-indigo-600',
    borderLight: 'border-indigo-200',
    ringColor: 'focus:ring-indigo-500',
  },
  rose: {
    name: 'rose',
    label: 'Rose Red',
    bgLight: 'bg-rose-100',
    text: 'text-rose-700',
    barColor: 'bg-rose-500',
    borderLight: 'border-rose-200',
    ringColor: 'focus:ring-rose-500',
  },
};

export const POPULAR_ICONS = [
  '∑', '⚛', '⌬', 'A', '💻', '📐', '📚', '🧬', '🌍', '⚖️', '🎨', '🧠', '📊', '⚡', '🔬', '📝'
];

