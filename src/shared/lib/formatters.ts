import { formatDistanceToNow } from "date-fns";
import { uk } from "date-fns/locale";

// ============================================
// ЗАГАЛЬНІ ФОРМАТЕРИ
// ============================================

// Числа
export function formatNumber(value: number): string {
  return value.toLocaleString("uk-UA");
}

export function formatLength(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toLocaleString();
}

export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

// Дати
export function formatPublishDate(dateString: string): string {
  const localDateString = dateString.endsWith("Z")
    ? dateString.slice(0, -1)
    : dateString;

  return formatDistanceToNow(new Date(localDateString), {
    addSuffix: true,
    locale: uk,
  });
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "short",
  });
}
