import { IVacancy } from "@/shared/types/vacancies.types";
import { capitalize } from "@/shared/utils/text.utils";
import { formatExperience } from "@/shared/utils/formatters";
import {
  Briefcase,
  MapPin,
  GraduationCap,
  Languages,
  LucideIcon,
} from "lucide-react";

interface MetaItemProps {
  label: string;
  value: string;
  Icon: LucideIcon;
}

const MetaItem = ({ label, value, Icon }: MetaItemProps) => (
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-indigo-400">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="font-medium text-slate-200">{value}</p>
    </div>
  </div>
);

export const VacancyMeta = ({ vacancy }: { vacancy: IVacancy }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col gap-6">
      <h3 className="text-lg font-semibold border-b border-white/10 pb-2 text-white">
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
          value={vacancy.englishLevel || "Не вказано"}
          Icon={Languages}
        />
        <MetaItem
          label="Локація"
          value={vacancy.locations.at(0)?.location?.city || "Remote"}
          Icon={MapPin}
        />
        <MetaItem
          label="Формат"
          value={
            vacancy.workFormat ? capitalize(vacancy.workFormat) : "Full-time"
          }
          Icon={GraduationCap}
        />
      </div>
    </div>
  );
};
