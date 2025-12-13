import { cn } from "@/shared/lib/utils";
import { forwardRef } from "react";

// ============================================
// GlassCard - Базова картка з glass ефектом
// ============================================

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Варіант картки */
  variant?: "default" | "interactive" | "elevated" | "ghost";
  /** Рівень заокруглення */
  rounded?: "md" | "lg" | "xl" | "2xl" | "3xl";
  /** Розмір падінгу */
  padding?: "none" | "sm" | "md" | "lg";
  /** Чи є картка інтерактивною (hover ефекти) */
  hoverable?: boolean;
  /** Використовувати group для дочірніх hover ефектів */
  asGroup?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = "default",
      rounded = "2xl",
      padding = "md",
      hoverable = false,
      asGroup = false,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "bg-glass-bg backdrop-blur-xl border border-glass-border",
      interactive:
        "bg-glass-bg backdrop-blur-xl border border-glass-border transition-all duration-300",
      elevated:
        "bg-glass-bg backdrop-blur-xl border border-indigo-500/20 shadow-2xl shadow-indigo-500/10",
      ghost: "bg-transparent backdrop-blur-sm border border-glass-border/50",
    };

    const hoverStyles = hoverable
      ? "hover:bg-glass-hover hover:border-glass-border cursor-pointer"
      : "";

    const roundedStyles = {
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
    };

    const paddingStyles = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          variantStyles[variant],
          roundedStyles[rounded],
          paddingStyles[padding],
          hoverStyles,
          asGroup && "group",
          className
        )}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";

// ============================================
// GlassCardHeader - Заголовок картки
// ============================================

export interface GlassCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const GlassCardHeader = forwardRef<HTMLDivElement, GlassCardHeaderProps>(
  ({ className, title, subtitle, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start justify-between flex-col gap-4 md:gap-0 md:flex-row mb-6",
          className
        )}
        {...props}
      >
        <div>
          <h3 className="text-lg font-semibold text-glass-text">{title}</h3>
          {subtitle && (
            <p className="text-sm text-glass-text-muted mt-1">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    );
  }
);

GlassCardHeader.displayName = "GlassCardHeader";

// ============================================
// GlassCardContent - Контент картки
// ============================================

const GlassCardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("relative", className)} {...props} />;
});

GlassCardContent.displayName = "GlassCardContent";

// ============================================
// GlassCardDecorations - Декоративні елементи
// ============================================

export interface GlassCardDecorationsProps {
  variant?: "default" | "glow" | "gradient" | "header";
}

function GlassCardDecorations({
  variant = "default",
}: GlassCardDecorationsProps) {
  if (variant === "glow") {
    return (
      <>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-glass-accent/50 to-transparent" />
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      </>
    );
  }

  if (variant === "gradient") {
    return (
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 rounded-full blur-2xl pointer-events-none" />
    );
  }

  if (variant === "header") {
    return (
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
    );
  }

  return null;
}

// ============================================
// GlassAlert - Алерт з glass ефектом
// ============================================

export interface GlassAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Варіант алерту */
  variant?: "default" | "error" | "warning" | "success" | "info";
  /** Рівень заокруглення */
  rounded?: "md" | "lg" | "xl" | "2xl";
}

const GlassAlert = forwardRef<HTMLDivElement, GlassAlertProps>(
  ({ className, variant = "default", rounded = "2xl", ...props }, ref) => {
    const variantStyles = {
      default:
        "bg-glass-bg backdrop-blur-xl border border-glass-border text-glass-text",
      error:
        "bg-rose-500/10 backdrop-blur-xl border border-rose-500/20 text-rose-400",
      warning:
        "bg-amber-500/10 backdrop-blur-xl border border-amber-500/20 text-amber-400",
      success:
        "bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 text-emerald-400",
      info: "bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 text-blue-400",
    };

    const roundedStyles = {
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative p-6",
          variantStyles[variant],
          roundedStyles[rounded],
          className
        )}
        {...props}
      />
    );
  }
);

GlassAlert.displayName = "GlassAlert";

export {
  GlassAlert,
  GlassCard,
  GlassCardContent,
  GlassCardDecorations,
  GlassCardHeader,
};
