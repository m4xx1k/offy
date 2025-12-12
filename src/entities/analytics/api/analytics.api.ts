import { api } from "@/shared/api";
import type {
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
  IngestAudit,
} from "../model/types";
import { PaginatedResult } from "@/entities/vacancy";

const BASE_PATH = "/ingest/analytics";

export const analyticsApi = {
  async getOverview(): Promise<OverviewStats> {
    const { data } = await api.get<OverviewStats>(`${BASE_PATH}/overview`);
    return data;
  },

  async getSourceStats(): Promise<SourceStats[]> {
    const { data } = await api.get<SourceStats[]>(`${BASE_PATH}/sources`);
    return data;
  },

  async getDailyStats(query?: AnalyticsQuery): Promise<DailyIngestStats[]> {
    const { data } = await api.get<DailyIngestStats[]>(`${BASE_PATH}/daily`, {
      params: query,
    });
    return data;
  },

  async getDescriptionStats(source?: string): Promise<DescriptionStats[]> {
    const { data } = await api.get<DescriptionStats[]>(
      `${BASE_PATH}/descriptions`,
      { params: source ? { source } : undefined }
    );
    return data;
  },

  async getWorkFormatStats(source?: string): Promise<WorkFormatStats[]> {
    const { data } = await api.get<WorkFormatStats[]>(
      `${BASE_PATH}/work-formats`,
      { params: source ? { source } : undefined }
    );
    return data;
  },

  async getTopCompanies(query?: AnalyticsQuery): Promise<CompanyStats[]> {
    const { data } = await api.get<CompanyStats[]>(
      `${BASE_PATH}/top-companies`,
      { params: query }
    );
    return data;
  },

  async getTopLocations(query?: AnalyticsQuery): Promise<LocationStats[]> {
    const { data } = await api.get<LocationStats[]>(
      `${BASE_PATH}/top-locations`,
      { params: query }
    );
    return data;
  },

  async getEnglishLevelStats(source?: string): Promise<EnglishLevelStats[]> {
    const { data } = await api.get<EnglishLevelStats[]>(
      `${BASE_PATH}/english-levels`,
      { params: source ? { source } : undefined }
    );
    return data;
  },

  async getExperienceStats(source?: string): Promise<ExperienceStats[]> {
    const { data } = await api.get<ExperienceStats[]>(
      `${BASE_PATH}/experience`,
      { params: source ? { source } : undefined }
    );
    return data;
  },

  async getSalaryStats(source?: string): Promise<SalaryStats[]> {
    const { data } = await api.get<SalaryStats[]>(`${BASE_PATH}/salaries`, {
      params: source ? { source } : undefined,
    });
    return data;
  },

  // Cursor-paginated audit history
  async getAuditHistory(
    cursor?: string | null,
    limit: number = 20
  ): Promise<PaginatedResult<IngestAudit>> {
    const { data } = await api.get<PaginatedResult<IngestAudit>>(
      `/audit/history`,
      {
        params: { cursor, limit },
      }
    );
    return data;
  },
};
