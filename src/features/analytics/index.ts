// ============================================
// FEATURES/ANALYTICS - Публічний API
// ============================================

// Компоненти (основний експорт)
export {
  // Charts
  DailyStatsChart,
  EnglishLevelChart,
  ExperienceChart,
  SourceStatsChart,
  WorkFormatChart,
  // Sections
  DescriptionStats,
  OverviewSection,
  SalaryStats,
  // Tables
  TopCompaniesTable,
  TopLocationsTable,
  // UI
  ChartCardSkeleton,
  GlassChartCard,
  GlassStatCard,
  StatCardSkeleton,
  TableSkeleton,
} from "./components";

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
} from "./hooks";

// Типи
export type {
  AnalyticsQuery,
  CompanyStats,
  DailyIngestStats,
  DescriptionStats as DescriptionStatsType,
  EnglishLevelStats,
  ExperienceStats,
  LocationStats,
  OverviewStats,
  SalaryStats as SalaryStatsType,
  SourceStats,
  WorkFormatStats,
} from "./types";

