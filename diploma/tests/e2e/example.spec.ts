import { test, expect } from "@playwright/test";

test("home page", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(7000);
  await expect(page).toHaveScreenshot({ animations: "disabled" });
});
