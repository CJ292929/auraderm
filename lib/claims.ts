export const BANNED_CLAIM_PATTERNS: RegExp[] = [
  /\btreat(s|ment)?\b/i,
  /\bcure(s|d)?\b/i,
  /\bheal(s|ing)?\b/i,
  /\brepair(s)?\b/i,
  /\bclinically proven\b/i,
  /\bmedical-grade\b/i,
  /\bprescription\b/i,
  /\banti-acne\b/i,
  /\beliminates? acne\b/i,
  /\breverses? aging\b/i,
  /\bdermatologist[-\s]approved\b/i,
];

export function findClaims(text: string): string[] {
  const matches: string[] = [];
  for (const pattern of BANNED_CLAIM_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      matches.push(match[0]);
    }
  }
  return matches;
}
