"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils"; // Припускаю, що cn є (clsx + tailwind-merge)
import { useVacancyFiltersStrore } from "@/hooks/vacancy-filters";

export const SearchBar = () => {
  const search = useVacancyFiltersStrore((state) => state.search);
  const setSearch = useVacancyFiltersStrore((state) => state.setSearch);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8 group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-indigo-300 group-focus-within:text-indigo-400 transition-colors" />
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Пошук за назвою вакансії (напр. React Developer)..."
        className={cn(
          "w-full py-4 pl-12 pr-10 rounded-2xl text-white placeholder:text-slate-400",
          "bg-white/5 border border-white/10 backdrop-blur-md",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10",
          "transition-all duration-300 shadow-lg"
        )}
      />

      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
