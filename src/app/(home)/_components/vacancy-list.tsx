"use client";

import { Loader2 } from "lucide-react";
import { IVacancy } from "@/shared/types/vacancies.types";
import { IPaginatedResult } from "@/shared/types/pagination.types";
import { VacancyCard } from "./vacancy-card/vacancy-card";
import { useIntersectionObserver } from "@/hooks/intersection-observer";
import { useVacancies } from "@/hooks/vacancy/use-vacancies";

interface VacancyListProps {
  initialData: IPaginatedResult<IVacancy>;
}

export const VacancyList = ({ initialData }: VacancyListProps) => {
  const {
    vacancies,
    total,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useVacancies(initialData);

  // Підключаємо обсервер
  const observerRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
    rootMargin: "200px",
  });

  return (
    <div className="w-full space-y-4">
      {!!total && (
        <p className="italic text-sm text-slate-400">
          Знайдено {total} вакансій =)
        </p>
      )}
      <div className="w-full grid grid-cols-1 gap-4">
        {vacancies.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>

      {/* <VacancyFiltersSidebar /> */}
      {(hasNextPage || isLoading) && (
        <div ref={observerRef} className="flex justify-center py-6">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
        </div>
      )}

      {!hasNextPage && vacancies.length > 0 && (
        <div className="text-center py-8 text-slate-500">
          Ви переглянули всі вакансії 🎉
        </div>
      )}
    </div>
  );
};
