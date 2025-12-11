"use client";

import { useQuery } from "@tanstack/react-query";
import { vacancyApi, type FiltersData } from "@/entities/vacancy";

export const filtersKeys = {
  all: ["filters"] as const,
  data: () => [...filtersKeys.all, "data"] as const,
};

export function useFiltersData() {
  return useQuery<FiltersData>({
    queryKey: filtersKeys.data(),
    queryFn: () => vacancyApi.getFiltersData(),
    staleTime: 5 * 60 * 1000, // 5 хвилин
  });
}

