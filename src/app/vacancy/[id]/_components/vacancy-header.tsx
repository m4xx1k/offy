import { Banknote, Clock, Globe } from "lucide-react";
import { IVacancy } from "@/shared/types/vacancies.types";
import { capitalize } from "@/shared/utils/text.utils";
import { formatSalary, formatPublishDate } from "@/shared/utils/formatters";

interface VacancyHeaderProps {
  vacancy: IVacancy;
}

export const VacancyHeader = ({ vacancy }: VacancyHeaderProps) => {
  return (
    <div className="glass-panel p-8 rounded-3xl mb-8 relative overflow-hidden">
      {/* Декоративний блік */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight shadow-black/10 text-shadow-sm text-white">
            {vacancy.normalizedTitle || vacancy.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-slate-300">
            {/* Зарплата */}
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
              <Banknote className="w-5 h-5 text-green-400" />
              <span className="font-semibold text-green-100 drop-shadow-sm">
                {formatSalary(
                  vacancy.salaryFrom,
                  vacancy.salaryTo,
                  vacancy.currency
                )}
              </span>
            </div>

            {/* Формат роботи */}
            {vacancy.workFormat && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-400" />
                <span className="hover:text-white transition-colors">
                  {capitalize(vacancy.workFormat)}
                </span>
              </div>
            )}

            {/* Час публікації */}
            <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
              <Clock className="w-4 h-4 text-indigo-300" />
              <span>{formatPublishDate(vacancy.postedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
