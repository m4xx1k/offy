"use client";

import { GlassCard, GlassCardDecorations } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

export interface IngestSourceStat {
  source: string;
  status?: string;
  itemsFound: number;
  itemsSaved: number;
  error?: string | null;
}

export interface IngestAudit {
  id: string;
  status: string;
  startedAt: string; // ISO
  endedAt?: string | null; // ISO
  durationMs?: number | null;
  errorMessage?: string | null;
  sourceStats: IngestSourceStat[];
}

function formatDuration(ms?: number | null) {
  if (!ms && ms !== 0) return "—";
  const seconds = Math.floor((ms ?? 0) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const rem = seconds % 60;
  return `${mins}m ${rem}s`;
}

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("uk-UA");
  } catch {
    return iso;
  }
}

export function IngestAudit({ audit }: { audit?: IngestAudit }) {
  if (!audit) {
    return (
      <GlassCard padding="md" rounded="2xl" className="min-h-[120px]">
        <div className="text-sm text-glass-text-subtle">Аудит інджеста</div>
        <div className="mt-3 text-sm text-glass-text-subtle">Немає даних</div>
      </GlassCard>
    );
  }

  const totalFound = audit.sourceStats.reduce(
    (s, it) => s + (it.itemsFound ?? 0),
    0
  );
  const totalSaved = audit.sourceStats.reduce(
    (s, it) => s + (it.itemsSaved ?? 0),
    0
  );

  return (
    <GlassCard padding="md" rounded="2xl" className={cn("overflow-hidden")}>
      <GlassCardDecorations variant="gradient" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-glass-text">
              Аудит інджеста
            </h3>
            <p className="text-xs text-glass-text-subtle mt-1">
              ID: {audit.id}
            </p>
          </div>
          <div className="text-sm text-glass-text-subtle">{audit.status}</div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <div className="text-xs text-glass-text-subtle">Початок</div>
            <div className="font-medium text-glass-text mt-1">
              {formatDate(audit.startedAt)}
            </div>
          </div>

          <div>
            <div className="text-xs text-glass-text-subtle">Кінець</div>
            <div className="font-medium text-glass-text mt-1">
              {formatDate(audit.endedAt)}
            </div>
          </div>

          <div>
            <div className="text-xs text-glass-text-subtle">Тривалість</div>
            <div className="font-medium text-glass-text mt-1">
              {formatDuration(audit.durationMs)}
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-glass-border pt-3">
          <div className="flex items-center justify-between text-xs text-glass-text-subtle mb-2">
            <span>Джерело</span>
            <div className="flex items-center gap-4">
              <span>Знайдено</span>
              <span>Збережено</span>
            </div>
          </div>

          <div className="space-y-2">
            {audit.sourceStats.map((s) => (
              <div key={s.source} className="flex items-center justify-between">
                <div className="text-sm text-glass-text">{s.source}</div>
                <div className="flex items-center gap-6 text-sm text-glass-text-subtle">
                  <div>{s.itemsFound.toLocaleString("uk-UA")}</div>
                  <div>{s.itemsSaved.toLocaleString("uk-UA")}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-glass-border text-sm text-glass-text">
            <div className="flex items-center justify-between">
              <span className="text-glass-text-subtle">Всього</span>
              <span className="font-medium">
                {totalFound.toLocaleString("uk-UA")} /{" "}
                {totalSaved.toLocaleString("uk-UA")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
