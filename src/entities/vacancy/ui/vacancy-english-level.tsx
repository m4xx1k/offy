import { GlassBadge } from "@/shared/ui";
import { Languages } from "lucide-react";
import {
  formatEnglishLevel,
  getEnglishLevelColor,
  type EnglishLevelFormat,
} from "../lib/english-level";

interface VacancyEnglishLevelProps {
  level?: string;
  format?: EnglishLevelFormat;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function VacancyEnglishLevel({
  level,
  format = "cefr",
  size = "md",
  showIcon = true,
}: VacancyEnglishLevelProps) {
  if (!level) return null;

  const color = getEnglishLevelColor(level);
  const iconSize = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  return (
    <GlassBadge
      size={size}
      className="gap-1.5"
      style={{
        backgroundColor: `${color}15`,
        borderColor: `${color}30`,
        color: color,
      }}
    >
      {showIcon && <Languages className={iconSize[size]} />}
      {formatEnglishLevel(level, format)}
    </GlassBadge>
  );
}

