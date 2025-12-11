import { GlassBadge, GlassCard, GlassCardDecorations } from "@/shared/ui";
import { formatPublishDate } from "@/shared/lib/formatters";
import { capitalize } from "@/shared/lib/utils";
import { Banknote, Clock, Globe } from "lucide-react";
import type { IVacancy } from "../model/types";
import { formatSalary } from "../lib/salary";

interface VacancyHeaderProps {
  vacancy: IVacancy;
}

export function VacancyHeader({ vacancy }: VacancyHeaderProps) {
  return (
    <GlassCard padding="lg" rounded="3xl" className="mb-8 overflow-hidden">
      <GlassCardDecorations variant="header" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight shadow-black/10 text-shadow-sm text-glass-text">
            {vacancy.normalizedTitle || vacancy.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
            <GlassBadge variant="success" size="lg" className="gap-2">
              <Banknote className="w-5 h-5" />
              <span className="font-semibold">
                {formatSalary(
                  vacancy.salaryFrom,
                  vacancy.salaryTo,
                  vacancy.currency
                )}
              </span>
            </GlassBadge>

            {vacancy.workFormat && (
              <div className="flex items-center gap-2 text-glass-text-muted">
                <Globe className="w-4 h-4 text-purple-400" />
                <span className="hover:text-glass-text transition-colors">
                  {capitalize(vacancy.workFormat)}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-glass-text-muted opacity-70 hover:opacity-100 transition-opacity">
              <Clock className="w-4 h-4 text-indigo-300" />
              <span>{formatPublishDate(vacancy.postedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

