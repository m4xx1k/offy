import { Banknote } from "lucide-react";
import { IVacancy } from "@/shared/types/vacancies.types";
import { formatSalary } from "@/shared/utils/formatters";
import { VacancyLocation } from "@/components/vacancy/location";

interface VacancyCardInfoProps {
  vacancy: IVacancy;
}

export const VacancyCardInfo = ({ vacancy }: VacancyCardInfoProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {/* Salary Badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
        <Banknote className="w-3.5 h-3.5" />
        {formatSalary(vacancy.salaryFrom, vacancy.salaryTo, vacancy.currency)}
      </div>

      {/* Location Component */}
      <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-medium">
        <VacancyLocation vacancy={vacancy} />
      </div>

      {/* Experience Badge */}
      {(vacancy.experienceYears || 0) > 0 && (
        <div className="text-xs text-slate-500 px-2">
          {vacancy.experienceYears}+ років
        </div>
      )}
    </div>
  );
};
