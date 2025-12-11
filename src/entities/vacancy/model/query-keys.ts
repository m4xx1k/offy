import type { VacanciesQuery } from "../api/vacancy.api";

// Query keys для vacancy

export const vacancyKeys = {
  all: ["vacancies"] as const,
  lists: () => [...vacancyKeys.all, "list"] as const,
  list: (filters: Partial<VacanciesQuery>) =>
    [...vacancyKeys.lists(), filters] as const,
  details: () => [...vacancyKeys.all, "detail"] as const,
  detail: (id: string) => [...vacancyKeys.details(), id] as const,
};

