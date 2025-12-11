import { SOURCE_CONFIG, SOURCE_LABELS } from "@/shared/config/constants";

// ============================================
// SOURCE FORMATTERS
// ============================================

export function formatSource(source: string): string {
  return SOURCE_LABELS[source.toLowerCase()] ?? source;
}

export function getApplyButtonText(source: string): string {
  const normalizedSource = source.toLowerCase();
  return (
    SOURCE_CONFIG[normalizedSource]?.buttonText ?? `Подати заявку на ${source}`
  );
}

export function getSourceUrl(source: string, sourceUrl: string): string {
  return sourceUrl;
}

