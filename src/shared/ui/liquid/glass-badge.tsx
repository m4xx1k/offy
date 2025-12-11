import { cn } from "@/shared/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

// ============================================
// GlassBadge - Бейдж з glass ефектом
// ============================================

const glassBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium border backdrop-blur-md transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-glass-bg border-glass-border text-glass-text-muted hover:bg-glass-hover",
        success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
        accent: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
        warning: "bg-amber-500/10 border-amber-500/20 text-amber-300",
        danger: "bg-rose-500/10 border-rose-500/20 text-rose-300",
        purple: "bg-purple-500/10 border-purple-500/20 text-purple-300",
        blue: "bg-blue-500/10 border-blue-500/20 text-blue-300",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface GlassBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof glassBadgeVariants> {
  /** Іконка перед текстом */
  icon?: React.ReactNode;
}

const GlassBadge = forwardRef<HTMLSpanElement, GlassBadgeProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(glassBadgeVariants({ variant, size }), className)}
        {...props}
      >
        {icon}
        {children}
      </span>
    );
  }
);

GlassBadge.displayName = "GlassBadge";

export { GlassBadge, glassBadgeVariants };
