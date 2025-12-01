import { api } from "@/lib/api"; // Твій аксіос інстанс або fetch враппер
import { IPaginatedResult } from "@/shared/types/pagination.types";
import { IVacancy } from "@/shared/types/vacancies.types";

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
  }): Promise<IPaginatedResult<IVacancy>> {
    try {
      const { data } = await api.get<IPaginatedResult<IVacancy>>("/vacancies", {
        params: {
          cursor: params.cursor,
          take: params.take,
        },
      });
      return data;
    } catch (error) {
      console.error("Failed to fetch vacancies:", error);
      // Повертаємо пустий результат, щоб не ламати UI
      return {
        items: [],
        metadata: { hasMore: false, nextCursor: null },
      };
    }
  },
};
