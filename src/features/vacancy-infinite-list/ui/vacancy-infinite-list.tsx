"use client";

import type { IVacancy } from "@/entities/vacancy";
import { VacancyCard, VacancySkeleton } from "@/entities/vacancy";

interface VacancyInfiniteListProps {
  vacancies: IVacancy[];
  isLoading: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  loadMoreRef?: React.RefObject<HTMLDivElement | null>;
}

export function VacancyInfiniteList({
  vacancies,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  loadMoreRef,
}: VacancyInfiniteListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <VacancySkeleton key={i} />
        ))}
      </div>
    );
  }

  if (vacancies.length === 0) {
    return (
      <div className="text-center py-12 text-glass-text-muted">
        Вакансій не знайдено. Спробуйте змінити фільтри.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 relative">
      {vacancies.map((vacancy) => (
        <VacancyCard key={vacancy.id} vacancy={vacancy} />
      ))}

      {/* Load more trigger */}
      <div ref={loadMoreRef}>
        {hasNextPage ? <VacancySkeleton /> : <div className="h-12"></div>}
      </div>
    </div>
  );
}
