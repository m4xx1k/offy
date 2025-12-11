import { WORK_FORMAT_COLORS, WORK_FORMAT_LABELS } from "@/shared/config/constants";

// ============================================
// WORK FORMAT FORMATTERS
// ============================================

export function formatWorkFormat(format: string | null | undefined): string {
  if (!format) return "Не вказано";
  return (
    WORK_FORMAT_LABELS[format] ??
    WORK_FORMAT_LABELS[format.toUpperCase()] ??
    format
  );
}

export function getWorkFormatColor(format: string | null): string {
  if (!format) return "#64748b";
  return (
    WORK_FORMAT_COLORS[format] ??
    WORK_FORMAT_COLORS[format.toUpperCase()] ??
    "#64748b"
  );
}

