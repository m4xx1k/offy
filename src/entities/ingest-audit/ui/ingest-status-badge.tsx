"use client";

import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

// --- 1. Компонент бейджа ---

enum IngestStatus {
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  PARTIAL_FAILED = "PARTIAL_FAILED",
}

const STATUS_CONFIG = {
  [IngestStatus.RUNNING]: {
    label: "Виконується",
    icon: Loader2,
    className: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    iconClass: "animate-spin",
  },
  [IngestStatus.COMPLETED]: {
    label: "Успішно",
    icon: CheckCircle2,
    className: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    iconClass: "",
  },
  [IngestStatus.FAILED]: {
    label: "Помилка",
    icon: XCircle,
    className: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    iconClass: "",
  },
  [IngestStatus.PARTIAL_FAILED]: {
    label: "Частково",
    icon: AlertCircle,
    className: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    iconClass: "",
  },
};

export function IngestStatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status as IngestStatus];

  if (!config) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-slate-800 text-slate-400 border border-white/5">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>{status}</span>
      </div>
    );
  }

  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium border select-none",
        config.className
      )}
    >
      <Icon className={cn("w-3.5 h-3.5", config.iconClass)} />
      <span>{config.label}</span>
    </div>
  );
}
