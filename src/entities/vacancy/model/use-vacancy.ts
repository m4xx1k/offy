"use client";

import { useQuery } from "@tanstack/react-query";
import { vacancyApi } from "../api/vacancy.api";
import { vacancyKeys } from "./query-keys";
import type { IVacancy } from "./types";

interface UseVacancyOptions {
  initialData?: IVacancy;
}

export function useVacancy(id: string, options?: UseVacancyOptions) {
  return useQuery({
    queryKey: vacancyKeys.detail(id),
    queryFn: () => vacancyApi.getById(id),
    initialData: options?.initialData,
    staleTime: 5 * 60 * 1000, // 5 хвилин
  });
}

