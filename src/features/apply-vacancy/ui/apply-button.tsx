import { GlassButton } from "@/shared/ui";
import { getApplyButtonText } from "@/entities/vacancy";

interface ApplyButtonProps {
  sourceUrl: string;
  source: string;
  className?: string;
}

export function ApplyButton({ sourceUrl, source, className }: ApplyButtonProps) {
  return (
    <GlassButton asChild className={className}>
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
        {getApplyButtonText(source)}
      </a>
    </GlassButton>
  );
}

