import { describe, expect, it } from "vitest";
import { blendOver, contrastRatio } from "@/lib/contrast";

const FOREST_DEEP = "#15231A";
const GOLD = "#C39E3A";
const GOLD_DEEP = "#8A6D1F";
const CREAM = "#FBF8EE";
const SAGE_MUTED = "#A8B59C";
const GLASS_SOLID = "rgba(21,35,26,0.78)";

describe("contrastRatio", () => {
  it("black on white is 21:1", () => {
    expect(contrastRatio("#FFFFFF", "#000000")).toBeCloseTo(21, 2);
  });

  it("cream on forest-deep is at least 7:1", () => {
    expect(contrastRatio(CREAM, FOREST_DEEP)).toBeGreaterThanOrEqual(7);
  });

  it("gold on forest-deep is at least 4.5:1", () => {
    expect(contrastRatio(GOLD, FOREST_DEEP)).toBeGreaterThanOrEqual(4.5);
  });

  it("gold-deep on cream is at least 4.5:1", () => {
    expect(contrastRatio(GOLD_DEEP, CREAM)).toBeGreaterThanOrEqual(4.5);
  });

  it("gold on cream is below 3:1 (never used as text on cream)", () => {
    expect(contrastRatio(GOLD, CREAM)).toBeLessThan(3);
  });

  it("sage-muted on glass-solid over forest-deep is at least 4.5:1", () => {
    const blended = blendOver(GLASS_SOLID, FOREST_DEEP);
    expect(contrastRatio(SAGE_MUTED, blended)).toBeGreaterThanOrEqual(4.5);
  });
});
