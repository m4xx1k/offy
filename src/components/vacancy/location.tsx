// src/components/vacancy/vacancy-location.tsx
import { IVacancy, WorkFormat } from "@/shared/types/vacancies.types";
import { capitalize } from "@/shared/utils/text.utils";
import { MapPin, Globe, Building2 } from "lucide-react";

export const VacancyLocation = ({ vacancy }: { vacancy: IVacancy }) => {
  const city = vacancy.location?.city;
  const format = vacancy.workFormat; // 'office' | 'remote' | 'hybrid'

  // Логіка відображення
  if (format === WorkFormat.REMOTE) {
    return (
      <div className="flex items-center gap-1.5 text-slate-400">
        <Globe className="w-3.5 h-3.5 text-indigo-400" />
        <span>Remote {city ? `(${city})` : ""}</span>
      </div>
    );
  }

  if (format === WorkFormat.HYBRID && city) {
    return (
      <div className="flex items-center gap-1.5 text-slate-400">
        <MapPin className="w-3.5 h-3.5 text-purple-400" />
        <span>
          {city} <span className="text-slate-600">•</span> Hybrid
        </span>
      </div>
    );
  }

  // Office or just location
  return (
    <div className="flex items-center gap-1.5 text-slate-400">
      {format === WorkFormat.OFFICE ? (
        <Building2 className="w-3.5 h-3.5 text-slate-400" />
      ) : (
        <MapPin className="w-3.5 h-3.5 text-slate-400" />
      )}
      <span>{city || "Location n/a"}</span>
    </div>
  );
};
