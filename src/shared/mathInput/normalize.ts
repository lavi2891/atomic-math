export function normalizeMathInput(raw: string): string {
  let normalized = raw.replace(/\\/g, "/").replace(/,/g, ".").replace(/[×·]/g, "*");
  normalized = normalized.trim();
  return normalized;
}
