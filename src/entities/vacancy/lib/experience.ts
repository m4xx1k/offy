import { EXPERIENCE_COLORS } from "@/shared/config/constants";

// ============================================
// EXPERIENCE FORMATTERS
// ============================================

export function formatExperience(years?: number | null): string {
  if (years === null || years === undefined) return "Не вказано";
  if (years === 0) return "Без досвіду";

  const lastDigit = years % 10;
  const lastTwoDigits = years % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${years} років`;
  }
  if (lastDigit === 1) {
    return `${years} рік`;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${years} роки`;
  }
  return `${years} років`;
}

export function formatExperienceRequired(years?: number | null): string {
  if (years === null || years === undefined) return "Не вказано";
  if (years === 0) return "Без досвіду";
  return `${years}+ ${years === 1 ? "рік" : years < 5 ? "роки" : "років"}`;
}

export function getExperienceColor(years: number | null): string {
  if (years === null) return EXPERIENCE_COLORS.none;
  if (years === 0) return EXPERIENCE_COLORS.junior;
  if (years <= 2) return EXPERIENCE_COLORS.junior;
  if (years <= 4) return EXPERIENCE_COLORS.middle;
  return EXPERIENCE_COLORS.senior;
}

export function getExperienceLabel(years: number | null): string {
  if (years === null) return "Не вказано";
  if (years === 0) return "Без досвіду";
  if (years === 1) return "1 рік";
  if (years >= 2 && years <= 4) return `${years} роки`;
  return `${years}+ років`;
}

