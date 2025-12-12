"use client";

import { FiltersSidebar, SearchHeader } from "@/features/vacancy-filters";
import type { PaginatedResult, IVacancy } from "@/entities/vacancy";
import { useState } from "react";
import { GlassButton } from "@/shared/ui";
import { SlidersHorizontal, X } from "lucide-react";

export const FiltersMobile = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <>
      <div className="lg:hidden mb-6 flex gap-2">
        <GlassButton
          variant="secondary"
          size="md"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center gap-2"
        >
          {mobileFiltersOpen ? (
            <>
              <X className="w-4 h-4" />
              Закрити фільтри
            </>
          ) : (
            <>
              <SlidersHorizontal className="w-4 h-4" />
              Фільтри
            </>
          )}
        </GlassButton>
      </div>

      {mobileFiltersOpen && (
        <div className="lg:hidden mb-6">
          <FiltersSidebar />
        </div>
      )}
    </>
  );
};
