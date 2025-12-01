import { formatDistanceToNow } from "date-fns";
import { uk } from "date-fns/locale";

/**
 * Форматує зарплатну вилку.
 */
export const formatSalary = (
  from?: number | null,
  to?: number | null,
  currency: string = "$"
): string => {
  if (!from && !to) return "Зарплата не вказана";
  if (from && to) return `${currency}${from} - ${to}`;
  if (from) return `від ${currency}${from}`;
  if (to) return `до ${currency}${to}`;
  return "Зарплата не вказана";
};

/**
 * Форматує дату публікації (наприклад, "2 дні тому").
 */
export const formatPublishDate = (dateString: string): string => {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
    locale: uk,
  });
};

/**
 * Форматує досвід роботи.
 */
export const formatExperience = (years?: number | null): string => {
  return years ? `${years}+ років` : "Не вказано";
};
