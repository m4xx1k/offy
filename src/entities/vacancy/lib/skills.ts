// ============================================
// SKILLS FORMATTERS
// ============================================

export function formatSkillsCount(count: number, maxVisible: number): string {
  const remaining = count - maxVisible;
  if (remaining <= 0) return "";
  return `+${remaining}`;
}

