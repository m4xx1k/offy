"use client";

import { GlassAlert } from "@/shared/ui";
import {
  Building2,
  CheckCircle2,
  Clock,
  Database,
  FileText,
  MapPin,
} from "lucide-react";
import { useOverview } from "@/entities/analytics";
import { StatCard, StatCardSkeleton } from "../common";

export function OverviewSection() {
  const { data, isLoading, error } = useOverview();

  if (error) {
    return (
      <GlassAlert variant="error" rounded="2xl">
        Помилка завантаження даних
      </GlassAlert>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const processedPercentage =
    data.totalRawVacancies > 0
      ? Math.round(
          (data.totalProcessedVacancies / data.totalRawVacancies) * 100
        )
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard
        title="Всього Raw"
        value={data.totalRawVacancies}
        icon={Database}
        subtitle="Сирі вакансії"
      />
      <StatCard
        title="Оброблено"
        value={data.totalProcessedVacancies}
        icon={CheckCircle2}
        subtitle={`${processedPercentage}% від загального`}
        trend={{ value: processedPercentage, isPositive: true }}
      />
      <StatCard
        title="В черзі"
        value={data.totalPendingVacancies}
        icon={Clock}
        subtitle="Очікують обробки"
      />
      <StatCard
        title="Нормалізовано"
        value={data.totalNormalizedVacancies}
        icon={FileText}
        subtitle="Готові вакансії"
      />
      <StatCard
        title="Компанії"
        value={data.totalCompanies}
        icon={Building2}
        subtitle="Унікальних"
      />
      <StatCard
        title="Локації"
        value={data.totalLocations}
        icon={MapPin}
        subtitle="Унікальних міст"
      />
    </div>
  );
}

