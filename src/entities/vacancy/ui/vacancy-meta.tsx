import { GlassCard } from "@/shared/ui";
import { formatCity } from "@/entities/location";
import {
  Briefcase,
  GraduationCap,
  Languages,
  LucideIcon,
  MapPin,
} from "lucide-react";
import type { IVacancy } from "../model/types";
import { formatEnglishLevel } from "../lib/english-level";
import { formatExperience } from "../lib/experience";
import { formatWorkFormat } from "../lib/work-format";

interface MetaItemProps {
  label: string;
  value: string;
  Icon: LucideIcon;
}

function MetaItem({ label, value, Icon }: MetaItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-glass-bg border border-glass-border text-glass-accent">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs text-glass-text-muted">{label}</p>
        <p className="font-medium text-glass-text">{value}</p>
      </div>
    </div>
  );
}

interface VacancyMetaProps {
  vacancy: IVacancy;
}

export function VacancyMeta({ vacancy }: VacancyMetaProps) {
  const locations = vacancy.locations?.map((vacancyLoc) => vacancyLoc.location);
  const city = formatCity(locations);

  return (
    <GlassCard padding="md" rounded="2xl" className="flex flex-col gap-6">
      <h3 className="text-lg font-semibold border-b border-glass-border pb-2 text-glass-text">
        Деталі вакансії
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
        <MetaItem
          label="Досвід"
          value={formatExperience(vacancy.experienceYears)}
          Icon={Briefcase}
        />
        <MetaItem
          label="Англійська"
          value={formatEnglishLevel(vacancy.englishLevel)}
          Icon={Languages}
        />
        {city && <MetaItem label="Локація" value={city} Icon={MapPin} />}
        <MetaItem
          label="Формат"
          value={formatWorkFormat(vacancy.workFormat)}
          Icon={GraduationCap}
        />
      </div>
    </GlassCard>
  );
}
