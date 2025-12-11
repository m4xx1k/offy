import { cn } from "@/shared/lib/utils";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

// ============================================
// GlassSelect - Селект з glass ефектом
// ============================================

export interface GlassSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

const GlassSelect = forwardRef<HTMLSelectElement, GlassSelectProps>(
  ({ className, options, placeholder, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "w-full bg-glass-bg border border-glass-border rounded-xl px-3 py-2 text-sm text-glass-text",
            "focus:outline-none focus:ring-2 focus:ring-glass-accent/50",
            "appearance-none cursor-pointer hover:bg-glass-hover transition-colors",
            "[&>option]:bg-slate-900 [&>option]:text-white",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" className="text-glass-text-muted">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-glass-text-subtle pointer-events-none" />
      </div>
    );
  }
);

GlassSelect.displayName = "GlassSelect";

export { GlassSelect };
