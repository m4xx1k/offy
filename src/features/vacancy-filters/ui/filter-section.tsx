import { GlassButton } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClear?: () => void;
}

export function FilterSection({
  title,
  children,
  className,
  onClear,
}: FilterSectionProps) {
  return (
    <div className={cn("space-y-3 group", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-glass-text tracking-wide uppercase opacity-80">
          {title}
        </h3>
        {onClear && (
          <GlassButton
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-xs text-glass-accent hover:text-glass-accent-hover opacity-0 group-hover:opacity-100 h-auto p-0"
          >
            Скинути
          </GlassButton>
        )}
      </div>
      {children}
    </div>
  );
}

