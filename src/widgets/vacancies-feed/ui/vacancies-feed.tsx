"use client";

import {
  FiltersSidebar,
  SearchHeader,
  FiltersMobile,
} from "@/features/vacancy-filters";
import type { PaginatedResult, IVacancy } from "@/entities/vacancy";
import { useVacanciesFeed } from "../model/use-vacancies-feed";
import { VacancyInfiniteList } from "@/features/vacancy-infinite-list";

interface VacancyListWithFiltersProps {
  initialData?: PaginatedResult<IVacancy>;
}

export function VacanciesFeed({ initialData }: VacancyListWithFiltersProps) {
  const { vacancies, isLoading, hasNextPage, isFetchingNextPage, loadMoreRef } =
    useVacanciesFeed({ initialData });

  return (
    <div className="w-full space-y-8">
      <div className="flex gap-4">
        <SearchHeader className="max-w-2xl mx-auto" />
      </div>

      <div className="w-full">
        <FiltersMobile />

        <div className="flex gap-8 flex-col lg:flex-row relative">
          <div className="flex-1 min-w-0">
            <VacancyInfiniteList
              vacancies={vacancies}
              isLoading={isLoading}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              loadMoreRef={loadMoreRef}
            />
          </div>
          <div className="hidden lg:block shrink-0 ">
            <div className="sticky top-8">
              <FiltersSidebar className="w-96" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
