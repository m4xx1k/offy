// Форматери для аналітики

/**
 * Форматує довжину тексту (1500 -> "1.5k")
 */
export function formatLength(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toLocaleString();
}

/**
 * Форматує зарплату ($1500 -> "$1,500")
 */
export function formatSalary(value: number | null): string {
  if (value === null) return "—";
  return `$${value.toLocaleString()}`;
}

/**
 * Форматує число для українського локалю
 */
export function formatNumber(value: number): string {
  return value.toLocaleString("uk-UA");
}

/**
 * Отримує колір для рівня досвіду
 */
export function getExperienceColor(years: number | null): string {
  if (years === null) return "#64748b";
  if (years === 0) return "#22c55e"; // Junior/Entry
  if (years <= 2) return "#6366f1"; // Junior+
  if (years <= 4) return "#8b5cf6"; // Middle
  if (years <= 6) return "#a855f7"; // Senior
  return "#f59e0b"; // Lead/Principal
}

/**
 * Отримує лейбл для рівня досвіду
 */
export function getExperienceLabel(years: number | null): string {
  if (years === null) return "Не вказано";
  if (years === 0) return "Без досвіду";
  return `${years} ${years === 1 ? "рік" : years < 5 ? "роки" : "років"}`;
}

