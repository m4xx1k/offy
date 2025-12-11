import { GlassBadge, GlassCard } from "@/shared/ui";
import type { Skill } from "@/entities/skill";

interface VacancySkillsProps {
  skills?: Array<{ skill: Skill }>;
  maxVisible?: number;
  size?: "sm" | "md" | "lg";
  asSection?: boolean;
}

export function VacancySkills({
  skills,
  maxVisible,
  size = "sm",
  asSection = false,
}: VacancySkillsProps) {
  if (!skills || skills.length === 0) return null;

  const visibleSkills = maxVisible ? skills.slice(0, maxVisible) : skills;
  const remainingCount = maxVisible ? skills.length - maxVisible : 0;

  const skillsList = (
    <div className="flex flex-wrap gap-2 mt-auto">
      {visibleSkills.map(({ skill }) => (
        <GlassBadge
          key={skill.id}
          size={size}
          className="opacity-80 group-hover:opacity-100"
        >
          {skill.name}
        </GlassBadge>
      ))}

      {remainingCount > 0 && (
        <span className="text-xs text-glass-text-subtle self-center pl-1">
          +{remainingCount}
        </span>
      )}
    </div>
  );

  if (!asSection) {
    return skillsList;
  }

  return (
    <GlassCard padding="md" rounded="2xl" className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold border-b border-glass-border pb-2 text-glass-text">
        Навички
      </h3>
      {skillsList}
    </GlassCard>
  );
}

