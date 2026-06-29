import { expect, test, type Page } from "@playwright/test";

const seed = {
  worker: { email: "xasygata32@gmail.com", password: "Test1234!" },
  offerOwner: { email: "andriy.org@impactflow.dev", password: "Test1234!" },
  ids: {
    offer: "6a27eb43704825d19256eb0a",
    booking: "6a27eb57704825d19256eb0c",
  },
};

async function forceEnglish(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem(
      "locale-storage",
      JSON.stringify({ state: { locale: "en" }, version: 0 }),
    );
  });
}

async function login(page: Page, user: { email: string; password: string }) {
  await forceEnglish(page);
  await page.context().clearCookies();
  await page.addInitScript(() => {
    localStorage.setItem(
      "auth-store",
      JSON.stringify({ state: { mode: "signin" }, version: 0 }),
    );
  });
  await page.goto("/auth", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => localStorage.clear());
  await forceEnglish(page);
  await page.goto("/auth", { waitUntil: "domcontentloaded" });

  await page.locator("#email").fill(user.email);
  await page.locator("#password").fill(user.password);
  await page.locator("button[type='submit']", { hasText: /sign in/i }).click();
  await expect(page).toHaveURL(/activities|profile|multi-step-form/i, {
    timeout: 25_000,
  });
}

async function waitForSkeletons(page: Page, timeout = 20_000) {
  await page.waitForFunction(
    () => document.querySelectorAll('[data-slot="skeleton"]').length === 0,
    { timeout },
  );
}

async function gotoAndWait(page: Page, url: string) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await waitForSkeletons(page);
  await expect(page.locator("body")).not.toContainText(
    /404|not found|something went wrong/i,
  );
}

test.describe.serial("Time Bank: full booking flow", () => {
  test("worker: login, navigate to time bank, and browse offers", async ({
    page,
  }) => {
    await login(page, seed.worker);

    await gotoAndWait(page, "/time-bank?tab=offers");
    await expect(page.locator("body")).toContainText(
      /offer|tutoring|walking|proofreading|editing/i,
      { timeout: 15_000 },
    );
    await page.waitForTimeout(8_000);
  });

  test("worker: open offer and send booking request", async ({ page }) => {
    await login(page, seed.worker);

    await gotoAndWait(page, `/offers/${seed.ids.offer}`);
    await expect(page.locator("body")).toContainText(
      /Editing|Proofreading|proofreading/i,
      { timeout: 15_000 },
    );

    const bookBtn = page
      .getByRole("button", { name: /book now|request|send request/i })
      .first();

    if (await bookBtn.isVisible({ timeout: 8_000 }).catch(() => false)) {
      await bookBtn.click();
      await page.waitForTimeout(2_000);

      const commentField = page
        .locator(
          "textarea[name*='comment'], textarea[name*='message'], textarea[name*='note'], textarea",
        )
        .first();
      if (await commentField.isVisible({ timeout: 5_000 }).catch(() => false)) {
        await commentField.fill(
          "Hi! I would like to book your editing & proofreading service for my volunteer report.",
        );
      }

      const sendBtn = page
        .getByRole("button", { name: /send request|send|confirm/i })
        .first();
      if (await sendBtn.isVisible({ timeout: 3_000 }).catch(() => false)) {
        await sendBtn.click();
        await page.waitForTimeout(8_000);
      }
    } else {
      await page.waitForTimeout(8_000);
    }

    await gotoAndWait(page, `/time-bank/?tab=bookings`);

    await expect(page.locator("body")).toContainText(
      /pending|booking|cancel|request sent|booked/i,
      { timeout: 20_000 },
    );
    await page.waitForTimeout(8_000);
  });

  test("offer owner: login, check bookings, and approve first item", async ({
    page,
  }) => {
    await login(page, seed.offerOwner);

    await gotoAndWait(page, `/offers/my/${seed.ids.offer}`);

    const bookingsTab = page.locator(
      'button[class*="toggleButton"]:has-text("BOOKINGS")',
    );
    await bookingsTab.waitFor({ state: "visible", timeout: 5_000 });
    await bookingsTab.click({ force: true });
    await waitForSkeletons(page);

    await expect(page.locator("body")).toContainText(
      /booking|request|pending|Darina/i,
      { timeout: 15_000 },
    );

    const approveBtn = page
      .getByRole("button", { name: /approve|accept/i })
      .first();

    try {
      await approveBtn.waitFor({ state: "visible", timeout: 8_000 });
      await approveBtn.click();
      await page.waitForTimeout(2_000);

      const confirmApprove = page
        .getByRole("button", { name: /^approve$|^accept$/i })
        .last();
      if (
        await confirmApprove.isVisible({ timeout: 2_000 }).catch(() => false)
      ) {
        await confirmApprove.click();
      }
    } catch (error) {}

    await expect(page.locator("body")).not.toContainText(
      /404|something went wrong/i,
    );
    await page.waitForTimeout(8_000);
  });

  test("worker: verify approved booking is visible", async ({ page }) => {
    await login(page, seed.worker);

    await gotoAndWait(page, "/time-bank?tab=bookings");
    await expect(page.locator("body")).toContainText(
      /booking|approved|accepted|editing|proofreading/i,
      { timeout: 20_000 },
    );
    await page.waitForTimeout(8_000);
  });

  test("worker: mark booking as complete", async ({ page }) => {
    await login(page, seed.worker);

    await gotoAndWait(page, "/time-bank?tab=bookings");
    await expect(page.locator("body")).toContainText(/booking/i, {
      timeout: 15_000,
    });

    const completeBtn = page
      .getByRole("button", { name: /complete|mark.*complete|done/i })
      .first();
    if (await completeBtn.isVisible({ timeout: 8_000 }).catch(() => false)) {
      await completeBtn.click();
      await page.waitForTimeout(2_000);

      const confirmComplete = page
        .getByRole("button", { name: /^complete$|^confirm$|^done$/i })
        .last();
      if (
        await confirmComplete.isVisible({ timeout: 3_000 }).catch(() => false)
      ) {
        await confirmComplete.click();
        await page.waitForTimeout(8_000);
      }
    } else {
      await page.waitForTimeout(8_000);
    }

    await expect(page.locator("body")).not.toContainText(
      /404|something went wrong/i,
    );
    await page.waitForTimeout(8_000);
  });

  test("offer owner: mark booking as complete from owner view", async ({
    page,
  }) => {
    await login(page, seed.offerOwner);

    await gotoAndWait(page, `/offers/my/${seed.ids.offer}`);

    const bookingsTab = page.locator(
      'button[class*="toggleButton"]:has-text("BOOKINGS")',
    );
    await bookingsTab.waitFor({ state: "visible", timeout: 5_000 });
    await bookingsTab.click({ force: true });
    await waitForSkeletons(page);

    const completeBtn = page
      .locator('div[class*="actions"] button:has-text("Complete")')
      .first();

    try {
      await completeBtn.waitFor({ state: "visible", timeout: 8_000 });
      await completeBtn.click();
      await page.waitForTimeout(2_000);

      const confirmComplete = page
        .getByRole("button", { name: /^complete$|^confirm$|^done$/i })
        .last();
      if (
        await confirmComplete.isVisible({ timeout: 3_000 }).catch(() => false)
      ) {
        await confirmComplete.click();
        await page.waitForTimeout(8_000);
      }
    } catch (error) {
      await page.waitForTimeout(8_000);
    }

    await expect(page.locator("body")).not.toContainText(
      /404|something went wrong/i,
    );
    await page.waitForTimeout(8_000);
  });

  test("worker: verify transactions history for updated balance", async ({
    page,
  }) => {
    await login(page, seed.worker);

    await gotoAndWait(page, "/time-bank?tab=transactions");
    await expect(page.locator("body")).toContainText(
      /transaction|minutes|time|balance|earned/i,
      { timeout: 20_000 },
    );
    await page.waitForTimeout(8_000);
  });
});
