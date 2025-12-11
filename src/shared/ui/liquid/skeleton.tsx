import { cn } from "@/shared/lib/utils";

// ============================================
// Skeleton - Базовий скелетон для завантаження
// ============================================

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse bg-glass-bg rounded-lg", className)}
      {...props}
    />
  );
}

// ============================================
// SkeletonText - Скелетон для тексту
// ============================================

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  );
}

// ============================================
// SkeletonCircle - Круглий скелетон
// ============================================

export interface SkeletonCircleProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

function SkeletonCircle({ size = "md", className }: SkeletonCircleProps) {
  const sizeStyles = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <Skeleton className={cn("rounded-full", sizeStyles[size], className)} />
  );
}

export { Skeleton, SkeletonCircle, SkeletonText };
