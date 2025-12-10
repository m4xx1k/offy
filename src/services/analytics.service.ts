import { api } from "@/lib/api";
import {
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
} from "@/shared/types/analytics.types";

const BASE_PATH = "/ingest/analytics";

export const analyticsService = {
  /**
   * Загальний огляд системи
   */
  async getOverview(): Promise<OverviewStats> {
    const { data } = await api.get<OverviewStats>(`${BASE_PATH}/overview`);
    return data;
  },

  /**
   * Статистика по джерелах
   */
  async getSourceStats(): Promise<SourceStats[]> {
    const { data } = await api.get<SourceStats[]>(`${BASE_PATH}/sources`);
    return data;
  },

  /**
   * Щоденна статистика
   */
  async getDailyStats(query?: AnalyticsQuery): Promise<DailyIngestStats[]> {
    const { data } = await api.get<DailyIngestStats[]>(`${BASE_PATH}/daily`, {
      params: query,
    });
    return data;
  },

  /**
   * Статистика описів
   */
  async getDescriptionStats(source?: string): Promise<DescriptionStats[]> {
    const { data } = await api.get<DescriptionStats[]>(
      `${BASE_PATH}/descriptions`,
      {
        params: source ? { source } : undefined,
      }
    );
    return data;
  },

  /**
   * Формати роботи
   */
  async getWorkFormatStats(source?: string): Promise<WorkFormatStats[]> {
    const { data } = await api.get<WorkFormatStats[]>(
      `${BASE_PATH}/work-formats`,
      {
        params: source ? { source } : undefined,
      }
    );
    return data;
  },

  /**
   * Топ компаній
   */
  async getTopCompanies(query?: AnalyticsQuery): Promise<CompanyStats[]> {
    const { data } = await api.get<CompanyStats[]>(
      `${BASE_PATH}/top-companies`,
      {
        params: query,
      }
    );
    return data;
  },

  /**
   * Топ локацій
   */
  async getTopLocations(query?: AnalyticsQuery): Promise<LocationStats[]> {
    const { data } = await api.get<LocationStats[]>(
      `${BASE_PATH}/top-locations`,
      {
        params: query,
      }
    );
    return data;
  },

  /**
   * Рівні англійської
   */
  async getEnglishLevelStats(source?: string): Promise<EnglishLevelStats[]> {
    const { data } = await api.get<EnglishLevelStats[]>(
      `${BASE_PATH}/english-levels`,
      {
        params: source ? { source } : undefined,
      }
    );
    return data;
  },

  /**
   * Досвід роботи
   */
  async getExperienceStats(source?: string): Promise<ExperienceStats[]> {
    const { data } = await api.get<ExperienceStats[]>(
      `${BASE_PATH}/experience`,
      {
        params: source ? { source } : undefined,
      }
    );
    return data;
  },

  /**
   * Статистика зарплат
   */
  async getSalaryStats(source?: string): Promise<SalaryStats[]> {
    const { data } = await api.get<SalaryStats[]>(`${BASE_PATH}/salaries`, {
      params: source ? { source } : undefined,
    });
    return data;
  },
};

