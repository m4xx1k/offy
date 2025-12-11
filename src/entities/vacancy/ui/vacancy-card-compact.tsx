"use client";

import { GlassCard } from "@/shared/ui";
import { formatPublishDate } from "@/shared/lib/formatters";
import Link from "next/link";
import type { IVacancy } from "../model/types";
import { VacancySalary } from "./vacancy-salary";
import { VacancySource } from "./vacancy-source";

interface VacancyCardCompactProps {
  vacancy: IVacancy;
}

export function VacancyCardCompact({ vacancy }: VacancyCardCompactProps) {
  return (
    <Link href={`/vacancy/${vacancy.id}`} className="outline-none">
      <GlassCard
        variant="interactive"
        hoverable
        asGroup
        padding="sm"
        rounded="xl"
        className="p-3 flex items-center gap-3"
      >
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-glass-text group-hover:text-glass-accent transition-colors truncate">
            {vacancy.title}
          </h4>
          <p className="text-xs text-glass-text-subtle truncate">
            {vacancy.company?.name}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VacancySalary
            salaryFrom={vacancy.salaryFrom}
            salaryTo={vacancy.salaryTo}
            currency={vacancy.currency}
            size="sm"
            showIcon={false}
          />
          <VacancySource source={vacancy.source} size="sm" />
        </div>

        <span className="text-xs text-glass-text-subtle whitespace-nowrap">
          {formatPublishDate(vacancy.postedAt)}
        </span>
      </GlassCard>
    </Link>
  );
}

