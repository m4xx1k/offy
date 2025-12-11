// ============================================
// ENTITY: ANALYTICS - Сутність аналітики
// ============================================

// API
export { analyticsApi } from "./api/analytics.api";

// Хуки
export {
  analyticsKeys,
  useDailyStats,
  useDescriptionStats,
  useEnglishLevelStats,
  useExperienceStats,
  useOverview,
  useSalaryStats,
  useSourceStats,
  useTopCompanies,
  useTopLocations,
  useWorkFormatStats,
} from "./model/use-analytics";

// Типи
export type {
  AnalyticsQuery,
  CompanyStats,
  DailyIngestStats,
  DescriptionStats,
  EnglishLevelStats,
  ExperienceStats,
  LocationStats,
  OverviewStats,
  SalaryStats,
  SourceStats,
  WorkFormatStats,
} from "./model/types";

