import { GlassBadge } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";

type SourceType = "dou" | "djinni";

interface VacancySourceProps {
  source: string;
  size?: "sm" | "md";
}

const SOURCE_CONFIG: Record<
  SourceType,
  { bg: string; border: string; text: string; img: string; label: string }
> = {
  dou: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-300",
    img: "/dou.png",
    label: "DOU",
  },
  djinni: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-300",
    img: "/djinni.png",
    label: "Djinni",
  },
};

export function VacancySource({ source, size = "sm" }: VacancySourceProps) {
  const normalizedSource = source.toLowerCase() as SourceType;
  const config = SOURCE_CONFIG[normalizedSource];

  const imgSizes = { sm: 16, md: 20 };

  if (!config) {
    return (
      <GlassBadge size={size} variant="default">
        {source}
      </GlassBadge>
    );
  }

  return (
    <GlassBadge
      size={size}
      className={cn("gap-1.5", config.bg, config.border, config.text)}
    >
      <Image
        src={config.img}
        alt={config.label}
        width={imgSizes[size]}
        height={imgSizes[size]}
        className={cn(
          "rounded-sm contain",
          normalizedSource === "dou" && "bg-black"
        )}
      />
      <span>{config.label}</span>
    </GlassBadge>
  );
}

