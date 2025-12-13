// ============================================
// SHARED UI - Базовий UI Kit
// ============================================

// === Glass Components (Liquid Glass UI) ===
export {
  // Alert
  GlassAlert,
  // Badge
  GlassBadge,
  glassBadgeVariants,
  // Button
  GlassButton,
  glassButtonVariants,
  // Card
  GlassCard,
  GlassCardContent,
  GlassCardDecorations,
  GlassCardHeader,
  // Checkbox
  GlassCheckbox,
  // Input
  GlassInput,
  glassInputVariants,
  // Select
  GlassSelect,
  // Tooltip
  ChartTooltip,
  GlassTooltip,
  SimpleChartTooltip,
  // Skeleton
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "./liquid";

// Types
export type {
  ChartTooltipProps,
  GlassAlertProps,
  GlassBadgeProps,
  GlassButtonProps,
  GlassCardDecorationsProps,
  GlassCardHeaderProps,
  GlassCardProps,
  GlassCheckboxProps,
  GlassInputProps,
  GlassSelectProps,
  GlassTooltipProps,
  SimpleChartTooltipProps,
  SkeletonCircleProps,
  SkeletonProps,
  SkeletonTextProps,
} from "./liquid";

// === Shadcn Components ===
export { Avatar, AvatarFallback, AvatarImage } from "./shadcn/avatar";
export { Badge, badgeVariants } from "./shadcn/badge";
export { Button, buttonVariants } from "./shadcn/button";
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcn/card";
export { Input } from "./shadcn/input";
export { ScrollArea, ScrollBar } from "./shadcn/scroll-area";
export { Separator } from "./shadcn/separator";
export { SourceBadge } from "./shadcn/source-badge";
//Table
export { DataTable } from "./table/table";
export * from "./shadcn";
