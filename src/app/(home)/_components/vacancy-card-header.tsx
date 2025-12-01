import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { uk } from "date-fns/locale";
import { Building2 } from "lucide-react";
import { IVacancy } from "@/shared/types/vacancies.types";

interface VacancyCardHeaderProps {
  title: string;
  company: IVacancy["company"];
  postedAt: string;
}

export const VacancyCardHeader = ({
  title,
  company,
  postedAt,
}: VacancyCardHeaderProps) => {
  const publishDate = formatDistanceToNow(new Date(postedAt), {
    addSuffix: true,
    locale: uk,
  });

  return (
    <div className="flex gap-4 mb-4">
      {/* Logo container: Фіксований розмір, без фону/бордера */}
      <div className="relative shrink-0 w-12 h-12 rounded-lg overflow-hidden">
        {company.logoUrl ? (
          <Image
            src={company.logoUrl}
            alt={company.name}
            fill
            className="object-contain" // Або object-cover, залежно від лого
            sizes="48px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-lg">
            <Building2 className="w-6 h-6 text-slate-600" />
          </div>
        )}
      </div>

      {/* Title & Company */}
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors truncate leading-snug">
          {title}
        </h3>
        <p className="text-sm text-slate-500 font-medium truncate">
          {company.name}
        </p>
      </div>

      {/* Date */}
      <span className="text-xs text-slate-600 whitespace-nowrap shrink-0 pt-1">
        {publishDate}
      </span>
    </div>
  );
};
