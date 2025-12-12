"use client";

import { useCallback, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { useVacancyFiltersStore } from "@/features/vacancy-filters/model/filters.store";
import { Button } from "@/shared";
import { Search, X } from "lucide-react";

interface SearchHeaderProps {
  className?: string;
}

export function SearchHeader({ className }: SearchHeaderProps) {
  const search = useVacancyFiltersStore((state) => state.search);
  const setSearch = useVacancyFiltersStore((state) => state.setSearch);
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = useCallback(() => {
    setSearch("");
  }, [setSearch]);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative flex items-center gap-2 px-3 py-2 rounded-lg",
          "bg-white/5 border border-white/8 backdrop-blur-md",
          "transition-all duration-200",
          isFocused
            ? "bg-white/10 border-glass-accent shadow-sm"
            : "hover:bg-white/6",
          className
        )}
      >
        <Search
          className={cn(
            "w-4 h-4 shrink-0 transition-colors",
            isFocused ? "text-glass-accent" : "text-glass-text-subtle"
          )}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={"Пошук вакансій..."}
          className="flex-1 bg-transparent outline-none text-white placeholder-glass-text-muted text-sm"
        />
      </div>

      {search && (
        <div className="mt-2 flex justify-end lg:hidden">
          <Button
            onClick={handleClear}
            aria-label="Очистити пошук"
            className={cn(
              "p-1 shrink-0 rounded-md",
              "text-glass-text-muted hover:text-glass-text",
              "hover:bg-white/10 transition-all duration-200",
              className
            )}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
