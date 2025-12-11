// ============================================
// SHARED CONFIG - Всі константи
// ============================================

// === ENGLISH LEVEL ===

export type EnglishLevelFormat = "full" | "short" | "cefr";

export const ENGLISH_LEVEL_LABELS_FULL: Record<string, string> = {
  basic: "Basic",
  beginner: "Beginner",
  elementary: "Elementary",
  pre: "Pre-Intermediate",
  intermediate: "Intermediate",
  upper: "Upper-Intermediate",
  proficient: "Proficient",
  advanced: "Advanced",
  fluent: "Fluent",
};

export const ENGLISH_LEVEL_LABELS_CEFR: Record<string, string> = {
  basic: "A1",
  beginner: "A1",
  elementary: "A2",
  pre: "B1",
  intermediate: "B1+",
  upper: "B2",
  proficient: "C1",
  advanced: "C1",
  fluent: "C2",
};

export const ENGLISH_LEVEL_LABELS_SHORT: Record<string, string> = {
  basic: "Basic",
  beginner: "Beginner",
  elementary: "Elementary",
  pre: "Pre-Int",
  intermediate: "Int",
  upper: "Upper-Int",
  proficient: "Proficient",
  advanced: "Advanced",
  fluent: "Fluent",
};

export const ENGLISH_LEVEL_LABELS = ENGLISH_LEVEL_LABELS_FULL;

export const ENGLISH_LEVEL_COLORS: Record<string, string> = {
  basic: "#94a3b8",
  beginner: "#94a3b8",
  elementary: "#64748b",
  pre: "#6366f1",
  intermediate: "#8b5cf6",
  upper: "#a855f7",
  proficient: "#22c55e",
  advanced: "#22c55e",
  fluent: "#10b981",
};

export const ENGLISH_LEVEL_ORDER = [
  "basic",
  "beginner",
  "elementary",
  "pre",
  "intermediate",
  "upper",
  "proficient",
  "advanced",
  "fluent",
] as const;

// === WORK FORMAT ===

export const WorkFormat = {
  REMOTE: "REMOTE",
  OFFICE: "OFFICE",
  HYBRID: "HYBRID",
} as const;

export type WorkFormatType = keyof typeof WorkFormat;

export const WORK_FORMAT_LABELS: Record<string, string> = {
  REMOTE: "Віддалено",
  OFFICE: "Офіс",
  HYBRID: "Гібрид",
  remote: "Віддалено",
  office: "Офіс",
  hybrid: "Гібрид",
};

export const WORK_FORMAT_COLORS: Record<string, string> = {
  REMOTE: "#22c55e",
  OFFICE: "#6366f1",
  HYBRID: "#f59e0b",
  remote: "#22c55e",
  office: "#6366f1",
  hybrid: "#f59e0b",
};

export const WORK_FORMAT_OPTIONS = [
  { value: "REMOTE" as const, label: "Віддалено" },
  { value: "OFFICE" as const, label: "Офіс" },
  { value: "HYBRID" as const, label: "Гібрид" },
];

// === SOURCE ===

export const SOURCE_LABELS: Record<string, string> = {
  dou: "DOU",
  djinni: "Djinni",
};

export const SOURCE_COLORS: Record<string, string> = {
  dou: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  djinni: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

export const SOURCE_CHART_COLORS: Record<string, string> = {
  dou: "#6366f1",
  djinni: "#a855f7",
};

export const SOURCE_CONFIG: Record<
  string,
  { label: string; buttonText: string; color: string; chartColor: string }
> = {
  dou: {
    label: "DOU",
    buttonText: "Подати заявку на DOU",
    color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    chartColor: "#6366f1",
  },
  djinni: {
    label: "Djinni",
    buttonText: "Подати заявку на Djinni",
    color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    chartColor: "#a855f7",
  },
};

// === EXPERIENCE ===

export const EXPERIENCE_COLORS = {
  none: "#64748b",
  junior: "#22c55e",
  middle: "#8b5cf6",
  senior: "#f59e0b",
};

export const EXPERIENCE_LABELS: Record<string, string> = {
  "0": "Без досвіду",
  "1": "1 рік",
  "2": "2 роки",
  "3": "3 роки",
  "4": "4 роки",
  "5": "5 років",
};

// === SALARY ===

export const DEFAULT_CURRENCY = "$";

export const SALARY_RANGES = [
  { min: null, max: null, label: "Будь-яка" },
  { min: 500, max: 1500, label: "$500 - $1,500" },
  { min: 1500, max: 3000, label: "$1,500 - $3,000" },
  { min: 3000, max: 5000, label: "$3,000 - $5,000" },
  { min: 5000, max: null, label: "$5,000+" },
] as const;

// === PAGINATION ===

export const DEFAULT_PAGE_SIZE = 10;

// === ANALYTICS ===

export type Period = "7d" | "14d" | "30d" | "all";

export const PERIODS: { value: Period; label: string }[] = [
  { value: "7d", label: "7 днів" },
  { value: "14d", label: "14 днів" },
  { value: "30d", label: "30 днів" },
  { value: "all", label: "Все" },
];

