import { formatExperienceRequired } from "../lib/experience";

interface VacancyExperienceProps {
  years?: number;
  className?: string;
}

export function VacancyExperience({
  years,
  className = "",
}: VacancyExperienceProps) {
  if (!years || years <= 0) return null;

  return (
    <span className={`text-xs text-glass-text-subtle px-2 ${className}`}>
      {formatExperienceRequired(years)}
    </span>
  );
}

