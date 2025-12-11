import { cn } from "@/shared/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

// ============================================
// GlassInput - Інпут з glass ефектом
// ============================================

const glassInputVariants = cva(
  "flex w-full border bg-glass-bg text-glass-text ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-glass-text-subtle focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "border-glass-border focus-visible:ring-2 focus-visible:ring-glass-accent/50 focus-visible:border-glass-accent/50",
        ghost:
          "border-transparent bg-transparent focus-visible:bg-glass-bg focus-visible:border-glass-border",
      },
      inputSize: {
        sm: "h-8 rounded-lg px-2.5 text-xs",
        md: "h-10 rounded-xl px-3 text-sm",
        lg: "h-12 rounded-xl px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
);

export interface GlassInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof glassInputVariants> {}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, variant, inputSize, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(glassInputVariants({ variant, inputSize }), className)}
        {...props}
      />
    );
  }
);

GlassInput.displayName = "GlassInput";

export { GlassInput, glassInputVariants };
