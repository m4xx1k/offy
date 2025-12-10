// Типи для аналітики ingest системи

export interface SourceStats {
  source: string;
  totalCount: number;
  processedCount: number;
  pendingCount: number;
}

export interface OverviewStats {
  totalRawVacancies: number;
  totalProcessedVacancies: number;
  totalPendingVacancies: number;
  totalNormalizedVacancies: number;
  totalCompanies: number;
  totalLocations: number;
  sourceBreakdown: SourceStats[];
}

export interface DailyIngestStats {
  date: string;
  source: string;
  rawCount: number;
  processedCount: number;
}

export interface DescriptionStats {
  source: string;
  avgLength: number;
  minLength: number;
  maxLength: number;
  medianLength: number;
}

export interface WorkFormatStats {
  source: string;
  workFormat: string | null;
  count: number;
  percentage: number;
}

export interface CompanyStats {
  companyName: string;
  vacancyCount: number;
  sources: string[];
}

export interface LocationStats {
  city: string;
  country: string;
  vacancyCount: number;
}

export interface EnglishLevelStats {
  level: string | null;
  count: number;
  percentage: number;
}

export interface ExperienceStats {
  years: number | null;
  count: number;
  percentage: number;
}

export interface SalaryStats {
  source: string;
  avgSalaryFrom: number | null;
  avgSalaryTo: number | null;
  minSalary: number | null;
  maxSalary: number | null;
  vacanciesWithSalary: number;
  totalVacancies: number;
}

// Query параметри
export interface AnalyticsQuery {
  source?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}

