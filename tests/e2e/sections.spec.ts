import { test, expect } from "@playwright/test";

test.describe("sections 3-5", () => {
  test("#ingredients shows 5 items; benefits section shows 3 cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#ingredients")).toHaveCount(1);
    const ingredientNames = page.locator("#ingredients .font-display.text-lg");
    await expect(ingredientNames).toHaveCount(5);
    await expect(page.locator("#benefits h3")).toHaveCount(3);
  });

  test("exactly one h1 on /; section headings are h2", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    const h2Count = await page.locator("h2").count();
    expect(h2Count).toBeGreaterThanOrEqual(2);
  });

  test("reduced motion: every [data-reveal] element has opacity 1 without scrolling", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    const reveals = page.locator("[data-reveal]");
    const count = await reveals.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(reveals.nth(i)).toHaveCSS("opacity", "1");
    }
    await context.close();
  });

  test("with JavaScript disabled: section content is visible", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("#ingredients")).toBeVisible();
    const reveals = page.locator("[data-reveal]");
    const count = await reveals.count();
    for (let i = 0; i < count; i++) {
      await expect(reveals.nth(i)).toHaveCSS("opacity", "1");
    }
    await context.close();
  });

  test("no horizontal overflow", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    );
    expect(overflow).toBe(true);
  });

  test("the P1-P3 spacer no longer exists", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#stage-test")).toHaveCount(0);
  });
});
