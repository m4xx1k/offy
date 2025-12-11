import { GlassBadge } from "@/shared/ui";
import { WorkFormat } from "@/shared/config/constants";
import { Building2, Globe, Laptop, MapPin } from "lucide-react";
import { formatCity, type Location } from "@/entities/location";
import { formatWorkFormat } from "../lib/work-format";

interface VacancyLocationProps {
  locations?: Location[];
  workFormat?: string;
  showIcon?: boolean;
  asBadge?: boolean;
}

export function VacancyLocation({
  locations,
  workFormat,
  showIcon = true,
  asBadge = true,
}: VacancyLocationProps) {
  const city = formatCity(locations);
  const format = workFormat;

  if (!city && !format) return null;

  const getIcon = () => {
    if (format === WorkFormat.REMOTE) return Globe;
    if (format === WorkFormat.HYBRID) return city ? MapPin : Laptop;
    if (format === WorkFormat.OFFICE) return Building2;
    if (city) return MapPin;
    return Laptop;
  };

  const getIconColor = () => {
    if (format === WorkFormat.REMOTE) return "text-indigo-400";
    if (format === WorkFormat.HYBRID) return "text-purple-400";
    return "text-glass-text-muted";
  };

  const getText = () => {
    if (format === WorkFormat.REMOTE && !city) return formatWorkFormat(format);
    if (format === WorkFormat.REMOTE && city)
      return `${formatWorkFormat(format)} (${city})`;
    if (format === WorkFormat.HYBRID && city)
      return `${city} • ${formatWorkFormat(format)}`;
    if (format === WorkFormat.HYBRID && !city) return formatWorkFormat(format);
    if (format === WorkFormat.OFFICE && city) return city;
    if (format === WorkFormat.OFFICE && !city) return formatWorkFormat(format);
    if (city && !format) return city;
    if (format && !city) return formatWorkFormat(format);
    return null;
  };

  const Icon = getIcon();
  const text = getText();

  if (!text) return null;

  const content = (
    <>
      {showIcon && <Icon className={`w-3.5 h-3.5 ${getIconColor()}`} />}
      <span>{text}</span>
    </>
  );

  if (asBadge) {
    return (
      <GlassBadge variant="default" size="md" className="gap-1.5">
        {content}
      </GlassBadge>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-glass-text-muted">
      {content}
    </div>
  );
}

