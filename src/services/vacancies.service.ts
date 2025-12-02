import { api } from "@/lib/api"; // Твій аксіос інстанс або fetch враппер
import { IPaginatedResult } from "@/shared/types/pagination.types";
import { IVacancy, WorkFormatType } from "@/shared/types/vacancies.types";

export const vacancyService = {
  async getById(id: string): Promise<IVacancy | null> {
    try {
      // Якщо це серверний компонент, тут краще використовувати fetch з опцією revalidate,
      // але якщо у тебе axios, залишаємо як є.
      const { data } = await api.get<IVacancy>(`/vacancies/${id}`);
      return data;
    } catch (error) {
      console.error(`Failed to fetch vacancy ${id}:`, error);
      return null;
    }
  },
  async getPaginated(params: {
    cursor?: string | null;
    take?: number;

    search?: string;

    skills?: string[];

    workFormat?: WorkFormatType;

    location?: string;

    salaryMin?: number;

    salaryMax?: number;
  }): Promise<IPaginatedResult<IVacancy>> {
    try {
      const { data } = await api.get<IPaginatedResult<IVacancy>>("/vacancies", {
        params,
      });
      return data;
    } catch (error) {
      console.error("Failed to fetch vacancies:", error);
      // Повертаємо пустий результат, щоб не ламати UI
      return {
        items: [],
        total: 0,
        metadata: { hasMore: false, nextCursor: null },
      };
    }
  },
  async getFiltersData() {
    return (
      await api.get<{
        skills: {
          id: string;
          name: string;
          normalizedName: string;
        }[];
        locations: {
          id: string;
          normalizedName: string;
          city: string;
          country: string;
        }[];
      }>("/vacancies/filters")
    ).data;
  },
};
