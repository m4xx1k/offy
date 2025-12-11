// Константи для аналітики

// === Джерела ===
export const SOURCE_LABELS: Record<string, string> = {
  dou: "DOU",
  djinni: "Djinni",
};

export const SOURCE_COLORS: Record<string, string> = {
  dou: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  djinni: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

// === Формати роботи ===
export const WORK_FORMAT_LABELS: Record<string, string> = {
  REMOTE: "Віддалено",
  OFFICE: "Офіс",
  HYBRID: "Гібрид",
  null: "Не вказано",
};

export const WORK_FORMAT_COLORS: Record<string, string> = {
  REMOTE: "#22c55e",
  OFFICE: "#6366f1",
  HYBRID: "#f59e0b",
  null: "#64748b",
};

// === Рівні англійської ===
export const ENGLISH_LEVEL_COLORS: Record<string, string> = {
  Beginner: "#94a3b8",
  Elementary: "#64748b",
  "Pre-Intermediate": "#6366f1",
  Intermediate: "#8b5cf6",
  "Upper-Intermediate": "#a855f7",
  Advanced: "#22c55e",
  Fluent: "#10b981",
  null: "#475569",
};

export const ENGLISH_LEVEL_ORDER = [
  "Beginner",
  "Elementary",
  "Pre-Intermediate",
  "Intermediate",
  "Upper-Intermediate",
  "Advanced",
  "Fluent",
  null,
] as const;

// === Періоди ===
export type Period = "7d" | "14d" | "30d" | "all";

export const PERIODS: { value: Period; label: string }[] = [
  { value: "7d", label: "7 днів" },
  { value: "14d", label: "14 днів" },
  { value: "30d", label: "30 днів" },
  { value: "all", label: "Все" },
];

