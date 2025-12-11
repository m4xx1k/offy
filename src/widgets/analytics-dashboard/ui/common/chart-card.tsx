"use client";

import {
  GlassCard,
  GlassCardContent,
  GlassCardDecorations,
  GlassCardHeader,
} from "@/shared/ui";
import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  children,
  className,
  action,
}: ChartCardProps) {
  return (
    <GlassCard
      className={`overflow-hidden ${className ?? ""}`}
      padding="md"
      rounded="2xl"
    >
      <GlassCardDecorations variant="glow" />
      <div className="relative z-10">
        <GlassCardHeader title={title} subtitle={subtitle} action={action} />
        <GlassCardContent>{children}</GlassCardContent>
      </div>
    </GlassCard>
  );
}

