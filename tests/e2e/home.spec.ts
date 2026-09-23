import { test, expect, request } from "@playwright/test";

test.describe("home P1-P5", () => {
  test("#actives shows 4 badges; #routine shows 3 steps in order AM, SPF REAPPLY, PM", async ({
    page,
  }) => {
    await page.goto("/");
    const actives = page.locator("#actives");
    await expect(actives).toHaveCount(1);
    await expect(actives.locator("span.rounded-full")).toHaveCount(4);

    const routine = page.locator("#routine");
    await expect(routine).toHaveCount(1);
    const slots = routine.locator("ol li span.text-gold");
    await expect(slots).toHaveCount(3);
    await expect(slots.nth(0)).toHaveText("AM");
    await expect(slots.nth(1)).toHaveText("SPF REAPPLY");
    await expect(slots.nth(2)).toHaveText("PM");
  });

  test("with site.sustainability null: no GivesBack element in the DOM", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[data-testid="gives-back"]')).toHaveCount(0);
    await expect(page.locator("#gives-back")).toHaveCount(0);
  });

  test("footer shows no Shipping & Returns link while commerce is false", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer")).toHaveCount(1);
    await expect(page.locator("footer >> text=Shipping & Returns")).toHaveCount(0);
    await expect(page.locator("footer >> text=Privacy")).toHaveCount(1);
    await expect(page.locator("footer >> text=Terms")).toHaveCount(1);
  });

  test("no horizontal overflow; exactly one h1 on / and /about", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    let overflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    );
    expect(overflow).toBe(true);

    await page.goto("/about");
    await expect(page.locator("h1")).toHaveCount(1);
    overflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    );
    expect(overflow).toBe(true);
  });

  test("link integrity: every href on / and /about resolves", async ({ page, baseURL }) => {
    const apiContext = await request.newContext({ baseURL });
    const checked: { href: string; result: string }[] = [];

    for (const path of ["/", "/about"]) {
      await page.goto(path);
      const hrefs = await page.locator("a[href]").evaluateAll((anchors) =>
        anchors.map((a) => a.getAttribute("href")).filter((h): h is string => !!h),
      );

      for (const href of hrefs) {
        if (href.startsWith("#")) {
          const id = href.slice(1);
          const count = await page.locator(`#${id}`).count();
          checked.push({ href: `${path} -> ${href}`, result: count > 0 ? "matched id" : "MISSING id" });
          expect(count, `anchor ${href} on ${path} should match an element id`).toBeGreaterThan(0);
          continue;
        }

        if (href.startsWith("/")) {
          const [routePath, hash] = href.split("#");
          const response = await apiContext.get(routePath || "/");
          const status = response.status();
          checked.push({ href: `${path} -> ${href}`, result: `${status}` });
          expect(status, `internal link ${href} on ${path} should return 200`).toBe(200);

          if (hash) {
            const targetPage = await page.context().newPage();
            await targetPage.goto(routePath || "/");
            const count = await targetPage.locator(`#${hash}`).count();
            checked.push({
              href: `${path} -> ${href}`,
              result: count > 0 ? "matched id on target route" : "MISSING id on target route",
            });
            expect(count, `anchor ${href} on ${path} should match an id on ${routePath}`).toBeGreaterThan(0);
            await targetPage.close();
          }
          continue;
        }

        checked.push({ href: `${path} -> ${href}`, result: "external, skipped" });
      }
    }

    console.log("LINK INTEGRITY", JSON.stringify(checked, null, 2));
    await apiContext.dispose();
  });
});
