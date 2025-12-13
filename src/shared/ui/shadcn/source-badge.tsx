"use client";

import React from "react";
import { SOURCE_COLORS, SOURCE_LABELS } from "@/shared/config/constants";

export interface SourceBadgeProps {
  source: string;
  className?: string;
}

export function SourceBadge({ source, className = "" }: SourceBadgeProps) {
  const classes =
    SOURCE_COLORS[source] ??
    "bg-slate-500/20 text-slate-300 border-slate-500/30";
  const label = SOURCE_LABELS[source] ?? source;

  return (
    <span
      className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded-md border ${classes} ${className}`}
    >
      {label}
    </span>
  );
}

export default SourceBadge;
