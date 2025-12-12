import { api } from "@/shared/api";
import type { IVacancy } from "../model/types";

const BASE_PATH = "/vacancies";

// Query параметри для списку вакансій
export interface VacanciesQuery {
  take?: number;
  skip?: number;
  cursor?: string; // <--- ДОДАЄМО ЦЕ
  search?: string;
  workFormat?: string;
  salaryMin?: number;
  salaryMax?: number;
  location?: string;
  skills?: string[];
}

// Результат пагінації
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  take?: number;
  skip?: number;
  hasMore?: boolean;
  metadata?: {
    hasMore: boolean;
    nextCursor: string | null;
  };
}

// Дані для фільтрів
export interface FiltersData {
  skills: Array<{ id: string; name: string }>;
  locations: Array<{ city: string; country: string }>;
}

export const vacancyApi = {
  /**
   * Отримати список вакансій з пагінацією та фільтрами
   */
  async getList(query?: VacanciesQuery): Promise<PaginatedResult<IVacancy>> {
    try {
      const { data, config } = await api.get<PaginatedResult<IVacancy>>(
        BASE_PATH,
        {
          params: query,
        }
      );
      console.log("config", config.url);
      return {
        ...data,
        hasMore: data.metadata?.hasMore ?? false,
      };
    } catch (error) {
      console.error("Failed to fetch vacancies:", error);
      return {
        items: [],
        total: 0,
        hasMore: false,
      };
    }
  },

  /**
   * Отримати вакансію за ID
   */
  async getById(id: string): Promise<IVacancy | null> {
    try {
      const { data } = await api.get<IVacancy>(`${BASE_PATH}/${id}`);
      return data;
    } catch (error) {
      console.error(`Failed to fetch vacancy ${id}:`, error);
      return null;
    }
  },

  /**
   * Отримати схожі вакансії
   */
  async getSimilar(id: string, limit = 5): Promise<IVacancy[]> {
    try {
      const { data } = await api.get<IVacancy[]>(`${BASE_PATH}/${id}/similar`, {
        params: { limit },
      });
      return data;
    } catch (error) {
      console.error(`Failed to fetch similar vacancies for ${id}:`, error);
      return [];
    }
  },

  /**
   * Отримати дані для фільтрів
   */
  async getFiltersData(): Promise<FiltersData> {
    try {
      const { data } = await api.get<FiltersData>(`${BASE_PATH}/filters`);
      return data;
    } catch (error) {
      console.error("Failed to fetch filters data:", error);
      return { skills: [], locations: [] };
    }
  },
};
