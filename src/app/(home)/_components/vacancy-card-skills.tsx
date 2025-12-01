import { GlassBadge } from "@/components/ui/glass-badge";
import { IVacancy } from "@/shared/types/vacancies.types";

interface VacancySkillsProps {
  skills: IVacancy["skills"];
}

export const VacancyCardSkills = ({ skills }: VacancySkillsProps) => {
  if (!skills || skills.length === 0) return null;

  const visibleSkills = skills.slice(0, 4);
  const remainingCount = skills.length - 4;

  return (
    <div className="flex flex-wrap gap-2 mt-auto">
      {visibleSkills.map(({ skill }) => (
        <GlassBadge
          key={skill.id}
          size="sm"
          className="opacity-80 group-hover:opacity-100"
        >
          {skill.name}
        </GlassBadge>
      ))}

      {remainingCount > 0 && (
        <span className="text-xs text-slate-600 self-center pl-1">
          +{remainingCount}
        </span>
      )}
    </div>
  );
};
