import { GlassBadge } from "@/shared/ui";
import { Banknote } from "lucide-react";
import { formatSalary } from "../lib/salary";

interface VacancySalaryProps {
  salaryFrom?: number;
  salaryTo?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function VacancySalary({
  salaryFrom,
  salaryTo,
  currency,
  size = "md",
  showIcon = true,
}: VacancySalaryProps) {
  if (!salaryFrom && !salaryTo) return null;

  const iconSize = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  return (
    <GlassBadge variant="success" size={size} className="gap-1.5">
      {showIcon && <Banknote className={iconSize[size]} />}
      {formatSalary(salaryFrom, salaryTo, currency)}
    </GlassBadge>
  );
}

