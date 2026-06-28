import { test, expect } from "@playwright/test";

test.describe("Auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth");
    await page.waitForLoadState("networkidle");
  });

  test("shows sign in form by default", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("switches to sign up tab", async ({ page }) => {
    await page
      .getByRole("button", { name: /sign up/i })
      .first()
      .click();
    await expect(page.url()).toContain("signup");
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(
      page.locator(".errorMessage, [class*='error']").first(),
    ).toBeVisible();
  });

  test("fills and submits login form", async ({ page }) => {
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/password/i).fill("Password123!");
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(
      page.locator("[class*='toast'], [class*='errorMessage']").first(),
    ).toBeVisible({ timeout: 5000 });
  });

  test("forgot password link navigates", async ({ page }) => {
    await page.getByRole("link", { name: /forgot/i }).click();
    await expect(page).toHaveURL(/forgot/);
  });
});
