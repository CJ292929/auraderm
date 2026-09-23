import { test, expect } from "@playwright/test";

test.describe("smoke", () => {
  test("/ returns 200 and has exactly one h1", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("/styleguide returns 200", async ({ page }) => {
    const response = await page.goto("/styleguide");
    expect(response?.status()).toBe(200);
  });

  test("no horizontal overflow on /", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    );
    expect(overflow).toBe(true);
  });

  test("robots meta tag contains noindex", async ({ page }) => {
    await page.goto("/");
    const content = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    expect(content).toContain("noindex");
  });
});
