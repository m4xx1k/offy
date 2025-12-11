import { GlassCard } from "@/shared/ui";
import { ApplyButton } from "./apply-button";

interface ApplyCardProps {
  sourceUrl: string;
  source: string;
}

export function ApplyCard({ sourceUrl, source }: ApplyCardProps) {
  return (
    <GlassCard
      padding="md"
      rounded="2xl"
      className="text-center border-indigo-500/20 shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)]"
    >
      <p className="text-sm text-glass-text-muted mb-4">
        Сподобалась вакансія? Не зволікай!
      </p>
      <ApplyButton sourceUrl={sourceUrl} source={source} className="w-full" />
    </GlassCard>
  );
}

