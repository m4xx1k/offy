import { cn } from "@/shared/lib/utils";
import { Check } from "lucide-react";
import { forwardRef } from "react";

// ============================================
// GlassCheckbox - Чекбокс з glass ефектом
// ============================================

export interface GlassCheckboxProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onChange"> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const GlassCheckbox = forwardRef<HTMLLabelElement, GlassCheckboxProps>(
  (
    { checked, onCheckedChange, label, disabled = false, className, ...props },
    ref
  ) => {
    return (
      <label
        ref={ref}
        className={cn(
          "flex items-center space-x-3 cursor-pointer group select-none",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <div
          role="checkbox"
          aria-checked={checked}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          className={cn(
            "w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200",
            checked
              ? "bg-glass-accent border-glass-accent"
              : "bg-glass-bg border-glass-border group-hover:border-glass-accent/50",
            disabled && "pointer-events-none"
          )}
          onClick={() => !disabled && onCheckedChange(!checked)}
          onKeyDown={(e) => {
            if (!disabled && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              onCheckedChange(!checked);
            }
          }}
        >
          {checked && (
            <Check className="w-3.5 h-3.5 text-glass-text" strokeWidth={3} />
          )}
        </div>
        {label && (
          <span
            className={cn(
              "text-sm transition-colors",
              checked
                ? "text-glass-text font-medium"
                : "text-glass-text-muted group-hover:text-glass-text"
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

GlassCheckbox.displayName = "GlassCheckbox";

export { GlassCheckbox };
