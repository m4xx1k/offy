import { IVacancy } from "@/shared/types/vacancies.types";
import { Building2, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const CompanyCard = ({ company }: { company: IVacancy["company"] }) => {
  return (
    <div className="glass-card p-6 rounded-2xl flex items-center gap-4 group hover:bg-white/5 transition-colors">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden relative">
        {company && company.logoUrl ? (
          <Image
            src={company.logoUrl}
            alt={company.name}
            height={48}
            width={48}
            className=" "
          />
        ) : (
          <Building2 className="w-8 h-8 text-slate-400" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-white truncate group-hover:text-indigo-400 transition-colors">
          {company?.name || "Галєра якась"}
        </h3>
        {company && company.website && (
          <Link
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-slate-500 flex items-center gap-1 hover:text-indigo-300 transition-colors"
          >
            Сайт компанії <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
};
