import { GlassBadge } from "@/shared/ui";
import type { Skill } from "../model/types";

interface SkillBadgeProps {
  skill: Skill;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SkillBadge({ skill, size = "sm", className }: SkillBadgeProps) {
  return (
    <GlassBadge size={size} className={className}>
      {skill.name}
    </GlassBadge>
  );
}

