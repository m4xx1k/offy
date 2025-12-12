"use client";

import { GlassCard } from "@/shared/ui";
import { formatPublishDate } from "@/shared/lib/formatters";
import { Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { IVacancy } from "../model/types";
import { VacancyEnglishLevel } from "./vacancy-english-level";
import { VacancyExperience } from "./vacancy-experience";
import { VacancyLocation } from "./vacancy-location";
import { VacancySalary } from "./vacancy-salary";
import { VacancySource } from "./vacancy-source";
import { VacancySkills } from "./vacancy-skills";

interface VacancyCardProps {
  vacancy: IVacancy;
}

export function VacancyCard({ vacancy }: VacancyCardProps) {
  const [isImgError, setIsImgError] = useState(false);

  return (
    <Link href={`/vacancy/${vacancy.id}`} className="outline-none">
      <GlassCard
        variant="interactive"
        hoverable
        asGroup
        padding="sm"
        rounded="2xl"
        className="p-5 flex flex-col"
      >
        {/* Header: Logo + Title + Company + Date */}
        <div className="flex gap-4 mb-4">
          <div className="relative shrink-0 w-12 h-12 rounded-lg overflow-hidden">
            {vacancy.company?.logoUrl && !isImgError ? (
              <Image
                src={vacancy.company.logoUrl}
                alt={vacancy.company.name}
                onError={() => setIsImgError(true)}
                className="object-contain"
                sizes="48px"
                fill
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-glass-bg rounded-lg">
                <Building2 className="w-6 h-6 text-glass-text-subtle" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-glass-text group-hover:text-glass-accent transition-colors truncate leading-snug">
              {vacancy.title}
            </h3>
            <p className="text-sm text-glass-text-subtle font-medium truncate">
              {vacancy.company?.name}
            </p>
          </div>

          <span className="text-xs text-glass-text-subtle whitespace-nowrap shrink-0 pt-1">
            {formatPublishDate(vacancy.postedAt)}
          </span>
        </div>

        {/* Info badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <VacancySource source={vacancy.source} />
          <VacancySalary
            salaryFrom={vacancy.salaryFrom}
            salaryTo={vacancy.salaryTo}
            currency={vacancy.currency}
          />
          <VacancyLocation vacancy={vacancy} />
          <VacancyEnglishLevel level={vacancy.englishLevel} format="cefr" />
          <VacancyExperience years={vacancy.experienceYears} />
        </div>

        {/* Skills */}
        <VacancySkills skills={vacancy.skills} maxVisible={4} />
      </GlassCard>
    </Link>
  );
}
