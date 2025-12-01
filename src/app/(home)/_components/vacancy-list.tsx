"use client";

import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { IVacancy } from "@/shared/types/vacancies.types";
import { IPaginatedResult } from "@/shared/types/pagination.types";
import { vacancyService } from "@/services/vacancies.service";
import { VacancyCard } from "./vacancy-card"; // Твоя картка
import { useIntersectionObserver } from "@/hooks/intersection-observer";

interface VacancyListProps {
  initialData: IPaginatedResult<IVacancy>;
}

export const VacancyList = ({ initialData }: VacancyListProps) => {
  // Стейт для списку вакансій
  const [vacancies, setVacancies] = useState<IVacancy[]>(initialData.items);
  // Стейт для курсора
  const [nextCursor, setNextCursor] = useState<string | null>(
    initialData.metadata.nextCursor
  );
  // Стейт завантаження
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialData.metadata.hasMore);

  const loadMore = useCallback(async () => {
    console.log({ isLoading, hasMore, nextCursor });
    if (isLoading || !hasMore || !nextCursor) return;

    setIsLoading(true);

    try {
      // Фетчимо нову порцію
      const response = await vacancyService.getPaginated({
        cursor: nextCursor,
        take: 10,
      });
      console.log("items", response.items);
      // Додаємо нові вакансії до старих
      setVacancies((prev) => [...prev, ...response.items]);

      // Оновлюємо курсор і статус
      setNextCursor(response.metadata.nextCursor);
      setHasMore(response.metadata.hasMore);
    } catch (error) {
      console.error("Error loading more vacancies:", error);
    } finally {
      setIsLoading(false);
    }
  }, [nextCursor, hasMore, isLoading]);

  // Підключаємо обсервер
  const observerRef = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: hasMore && !isLoading,
    rootMargin: "200px", // Починаємо вантажити трохи раніше
  });

  return (
    <div className="w-full space-y-4">
      {/* Рендеримо список */}
      <div className="grid grid-cols-1 gap-4">
        {vacancies.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>

      {/* Лоадер / Тригер */}
      {(hasMore || isLoading) && (
        <div ref={observerRef} className="flex justify-center py-6">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
        </div>
      )}

      {/* Кінець списку */}
      {!hasMore && vacancies.length > 0 && (
        <div className="text-center py-8 text-slate-500">
          Ви переглянули всі вакансії 🎉
        </div>
      )}
    </div>
  );
};
