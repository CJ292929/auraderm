import { describe, expect, it } from "vitest";
import { findClaims } from "@/lib/claims";
import { site } from "@/content/site";

function collectStrings(value: unknown, acc: string[] = []): string[] {
  if (typeof value === "string") {
    acc.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, acc);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectStrings(item, acc);
  }
  return acc;
}

describe("claims guard", () => {
  it("flags a drug-style claim word", () => {
    expect(findClaims("Gently treats dryness")).toEqual(["treats"]);
  });

  it("passes cosmetic-safe language", () => {
    expect(findClaims("A calm, even-looking complexion")).toEqual([]);
  });

  it("every string in content/site.ts clears the claims guard", () => {
    const strings = collectStrings(site);
    for (const str of strings) {
      expect(findClaims(str)).toEqual([]);
    }
  });
});
