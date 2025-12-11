import { GlassBadge, GlassCard } from "@/shared/ui";
import type { Skill } from "../model/types";

interface SkillListProps {
  skills: Array<{ skill: Skill }>;
  title?: string;
  withCard?: boolean;
}

export function SkillList({
  skills,
  title = "Необхідні навички",
  withCard = true,
}: SkillListProps) {
  if (!skills || skills.length === 0) return null;

  const content = (
    <>
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-glass-text">{title}</h3>
      )}
      <div className="flex flex-wrap gap-2">
        {skills.map(({ skill }) => (
          <GlassBadge key={skill.id} size="lg">
            {skill.name}
          </GlassBadge>
        ))}
      </div>
    </>
  );

  if (withCard) {
    return (
      <GlassCard padding="md" rounded="2xl">
        {content}
      </GlassCard>
    );
  }

  return <div>{content}</div>;
}

