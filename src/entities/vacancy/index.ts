// ============================================
// ENTITY: VACANCY - Сутність вакансії
// ============================================

// UI компоненти
export { VacancyCard } from "./ui/vacancy-card";
export { VacancyCardCompact } from "./ui/vacancy-card-compact";
export { VacancyHeader } from "./ui/vacancy-header";
export { VacancyDescription } from "./ui/vacancy-description";
export { VacancyMeta } from "./ui/vacancy-meta";
export { VacancySalary } from "./ui/vacancy-salary";
export { VacancyLocation } from "./ui/vacancy-location";
export { VacancyEnglishLevel } from "./ui/vacancy-english-level";
export { VacancyExperience } from "./ui/vacancy-experience";
export { VacancySource } from "./ui/vacancy-source";
export { VacancySkills } from "./ui/vacancy-skills";
export { VacancySkeleton, VacancyPageSkeleton } from "./ui/vacancy-skeleton";

// API
export { vacancyApi } from "./api/vacancy.api";
export type {
  FiltersData,
  PaginatedResult,
  VacanciesQuery,
} from "./api/vacancy.api";

// Хуки
export { useVacancy } from "./model/use-vacancy";
export { useVacancies } from "./model/use-vacancies";
export { vacancyKeys } from "./model/query-keys";

// Типи
export type { IVacancy, VacancyListItem } from "./model/types";

// Форматери та утиліти
export {
  // Salary
  formatSalary,
  formatSalaryValue,
  formatSalaryRange,
  // Experience
  formatExperience,
  formatExperienceRequired,
  getExperienceColor,
  getExperienceLabel,
  // English Level
  formatEnglishLevel,
  getEnglishLevelColor,
  type EnglishLevelFormat,
  // Work Format
  formatWorkFormat,
  getWorkFormatColor,
  // Source
  formatSource,
  getApplyButtonText,
  getSourceUrl,
  // Skills
  formatSkillsCount,
} from "./lib";
