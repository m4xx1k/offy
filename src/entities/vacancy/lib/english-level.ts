import {
  ENGLISH_LEVEL_COLORS,
  ENGLISH_LEVEL_LABELS_CEFR,
  ENGLISH_LEVEL_LABELS_FULL,
  ENGLISH_LEVEL_LABELS_SHORT,
  type EnglishLevelFormat,
} from "@/shared/config/constants";

// Re-export type
export type { EnglishLevelFormat };

// ============================================
// ENGLISH LEVEL FORMATTERS
// ============================================

export function formatEnglishLevel(
  level: string | null | undefined,
  format: EnglishLevelFormat = "full"
): string {
  if (!level) return "Not specified";

  const labels = {
    cefr: ENGLISH_LEVEL_LABELS_CEFR,
    short: ENGLISH_LEVEL_LABELS_SHORT,
    full: ENGLISH_LEVEL_LABELS_FULL,
  }[format];

  const normalizedLevel = level.toLowerCase();

  if (labels[level]) return labels[level];
  if (labels[normalizedLevel]) return labels[normalizedLevel];

  return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
}

export function getEnglishLevelColor(level: string | null): string {
  if (!level) return "#64748b";
  return (
    ENGLISH_LEVEL_COLORS[level] ??
    ENGLISH_LEVEL_COLORS[level.toLowerCase()] ??
    "#64748b"
  );
}
