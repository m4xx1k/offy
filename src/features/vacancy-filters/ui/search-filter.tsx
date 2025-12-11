"use client";

import { GlassInput } from "@/shared/ui";
import { Search } from "lucide-react";
import { useVacancyFiltersStore } from "../model/filters.store";

export function SearchFilter() {
  const search = useVacancyFiltersStore((state) => state.search);
  const setSearch = useVacancyFiltersStore((state) => state.setSearch);

  return (
    <div className="relative group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-glass-text-subtle group-focus-within:text-glass-accent transition-colors" />
      <GlassInput
        placeholder="Пошук за назвою..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}

