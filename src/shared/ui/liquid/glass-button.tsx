import { cn } from "@/shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

// ============================================
// GlassButton - Кнопка з glass ефектом
// ============================================

const glassButtonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium backdrop-blur-md border transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-glass-accent/50",
  {
    variants: {
      variant: {
        default:
          "bg-glass-accent hover:bg-glass-accent-hover border-white/20 shadow-lg shadow-indigo-500/20 text-glass-text",
        secondary:
          "bg-glass-bg hover:bg-glass-hover border-glass-border text-glass-text",
        ghost:
          "bg-transparent hover:bg-glass-bg border-transparent text-glass-text-muted hover:text-glass-text",
        outline:
          "bg-transparent hover:bg-glass-bg border-glass-border hover:border-white/30 text-glass-text",
        danger:
          "bg-rose-600/80 hover:bg-rose-500 border-white/20 shadow-lg shadow-rose-500/20 text-glass-text",
        success:
          "bg-emerald-600/80 hover:bg-emerald-500 border-white/20 shadow-lg shadow-emerald-500/20 text-glass-text",
      },
      size: {
        sm: "h-8 rounded-lg px-3 text-xs",
        md: "h-10 rounded-xl px-4 text-sm",
        lg: "h-12 rounded-xl px-6 text-base",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  asChild?: boolean;
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(glassButtonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

GlassButton.displayName = "GlassButton";

export { GlassButton, glassButtonVariants };
