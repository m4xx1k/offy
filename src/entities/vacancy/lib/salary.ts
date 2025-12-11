import { DEFAULT_CURRENCY } from "@/shared/config/constants";

// ============================================
// SALARY FORMATTERS
// ============================================

export function formatSalary(
  from?: number | null,
  to?: number | null,
  currency: string = DEFAULT_CURRENCY
): string {
  if (!from && !to) return "Зарплата не вказана";
  if (from && to)
    return `${currency}${from.toLocaleString()} - ${to.toLocaleString()}`;
  if (from) return `від ${currency}${from.toLocaleString()}`;
  if (to) return `до ${currency}${to.toLocaleString()}`;
  return "Зарплата не вказана";
}

export function formatSalaryValue(
  value: number | null,
  currency = DEFAULT_CURRENCY
): string {
  if (value === null) return "—";
  return `${currency}${value.toLocaleString()}`;
}

export function formatSalaryRange(
  from?: number | null,
  to?: number | null,
  currency: string = DEFAULT_CURRENCY
): { text: string; hasValue: boolean } {
  if (!from && !to) return { text: "Зарплата не вказана", hasValue: false };
  return { text: formatSalary(from, to, currency), hasValue: true };
}

