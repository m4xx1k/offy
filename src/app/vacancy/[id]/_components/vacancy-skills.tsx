import { GlassBadge } from "@/components/ui/glass-badge";
import { IVacancy } from "@/shared/types/vacancies.types";

export const VacancySkills = ({ vacancy }: { vacancy: IVacancy }) => {
  if (!vacancy.skills || vacancy.skills.length === 0) return null;
  return (
    <div className="glass-panel p-6 rounded-2xl">
      <h3 className="text-lg font-semibold mb-4 text-white">
        Необхідні навички
      </h3>
      <div className="flex flex-wrap gap-2">
        {vacancy.skills.map((item) => (
          <GlassBadge key={item.skill.id}>{item.skill.name}</GlassBadge>
        ))}
      </div>
    </div>
  );
};
