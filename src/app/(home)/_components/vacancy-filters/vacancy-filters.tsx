import { LiquidInput } from "@/components/ui/liquid/input";
import { useVacancyFiltersStrore } from "@/hooks/vacancy-filters";
import { ChevronDown, Search } from "lucide-react";
import { FilterSection } from "./vacancy-filter-section";
import { WorkFormat } from "@/shared/types/vacancies.types";
import { LiquidCheckbox } from "@/components/ui/liquid/checkbox";
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
// 1. Типи та допоміжні інтерфейси
export interface FilterOptionsState {
  skills: { id: string; name: string; normalizedName: string }[];
  locations: { id: string; city: string; country: string }[];
}

export const SearchFilter = () => {
  const search = useVacancyFiltersStrore((state) => state.search);
  const setSearch = useVacancyFiltersStrore((state) => state.setSearch);
  return (
    <div className="relative group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
      <LiquidInput
        placeholder="Пошук за назвою..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-9"
      />
    </div>
  );
};

export const SalaryFilter = () => {
  const { salaryMin, salaryMax, setSalaryMin, setSalaryMax } =
    useVacancyFiltersStrore();

  return (
    <FilterSection title="Зарплата ($)">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">
            від
          </span>
          <LiquidInput
            type="number"
            min={0}
            value={salaryMin || ""}
            onChange={(e) =>
              setSalaryMin(e.target.value ? Number(e.target.value) : null)
            }
            className="pl-8 text-right"
          />
        </div>
        <span className="text-slate-600">-</span>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">
            до
          </span>
          <LiquidInput
            type="number"
            min={0}
            value={salaryMax || ""}
            onChange={(e) =>
              setSalaryMax(e.target.value ? Number(e.target.value) : null)
            }
            className="pl-8 text-right"
          />
        </div>
      </div>
    </FilterSection>
  );
};

export const WorkFormatFilter = () => {
  const selectedFormat = useVacancyFiltersStrore((state) => state.workFormat);
  const setWorkFormat = useVacancyFiltersStrore((state) => state.setWorkFormat);

  const formats = [
    { value: WorkFormat.REMOTE, label: "Віддалено" },
    { value: WorkFormat.OFFICE, label: "Офіс" },
    { value: WorkFormat.HYBRID, label: "Гібрид" },
  ];

  return (
    <FilterSection title="Формат роботи">
      <div className="space-y-2">
        {formats.map((fmt) => (
          <LiquidCheckbox
            key={fmt.value}
            label={fmt.label}
            checked={selectedFormat === fmt.value}
            onCheckedChange={(checked) =>
              setWorkFormat(checked ? fmt.value : null)
            }
          />
        ))}
      </div>
    </FilterSection>
  );
};

export const SkillsFilter = ({
  options,
}: {
  options: FilterOptionsState["skills"];
}) => {
  const selectedSkills = useVacancyFiltersStrore((state) => state.skills);
  const toggleSkill = useVacancyFiltersStrore((state) => state.toggleSkill);

  // Локальний пошук по скілам, якщо їх багато
  const [localSearch, setLocalSearch] = useState("");

  const filteredOptions = options.filter((s) =>
    s.name.toLowerCase().includes(localSearch.toLowerCase())
  );

  return (
    <FilterSection
      title="Навички"
      className="flex flex-col h-full max-h-[200px]"
    >
      <LiquidInput
        placeholder="Фільтр навичок..."
        className="h-8 text-xs mb-2"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
      <div className="overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((skill) => (
            <LiquidCheckbox
              key={skill.id}
              label={skill.name}
              checked={selectedSkills.includes(skill.name)} // В сторі зберігаємо name або id, відповідно до логіки
              onCheckedChange={() => toggleSkill(skill.name)}
            />
          ))
        ) : (
          <p className="text-xs text-slate-500 text-center py-2">Не знайдено</p>
        )}
      </div>
    </FilterSection>
  );
};

export const LocationFilter = ({
  options,
}: {
  options: FilterOptionsState["locations"];
}) => {
  const selectedLocation = useVacancyFiltersStrore((state) => state.location);
  const setLocation = useVacancyFiltersStrore((state) => state.setLocation);

  // Групування міст (спрощено, або просто список)
  return (
    <FilterSection title="Локація">
      <div className="relative">
        <select
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
          value={selectedLocation || ""}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="" className="bg-slate-900 text-slate-400">
            Будь-яка
          </option>
          {options.map((loc) => (
            <option
              key={loc.id}
              value={loc.city}
              className="bg-slate-900 text-white"
            >
              {loc.city}, {loc.country}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
      </div>
    </FilterSection>
  );
};
