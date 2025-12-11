// ============================================
// LOCATION FORMATTERS
// ============================================

export interface LocationData {
  city?: string | null;
  country?: string | null;
  normalizedCity?: string;
}

export function formatLocation(
  locations: LocationData[] | null | undefined
): string {
  if (!locations || locations.length === 0) return "";

  const first = locations[0];
  if (!first) return "";

  const city = first.normalizedCity || first.city;
  const parts = [city, first.country].filter(Boolean);
  if (parts.length === 0) return "";

  const formatted = parts.join(", ");

  if (locations.length > 1) {
    return `${formatted} +${locations.length - 1}`;
  }

  return formatted;
}

export function formatCity(
  locations: Array<{ city?: string | null; normalizedCity?: string }> | null | undefined
): string {
  if (!locations || locations.length === 0) return "";
  const first = locations[0];
  return first?.normalizedCity || first?.city || "";
}

export function hasLocation(
  locations: LocationData[] | null | undefined
): boolean {
  if (!locations || locations.length === 0) return false;
  const first = locations[0];
  return !!(first?.city || first?.normalizedCity);
}
