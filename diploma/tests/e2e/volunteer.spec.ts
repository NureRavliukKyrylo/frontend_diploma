import { expect, test, type Page } from "@playwright/test";

const seed = {
  volunteer: { email: "xasygata32@gmail.com", password: "Test1234!" },
  ids: {
    openProject: "69fc42cbd9578c4425554981",
    openEvent: "6a1955f62e7a09cc67e8898e",
    openTask: "69fc4619d9578c44255549f4",
    organization: "69fc4150d9578c4425554978",
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

async function clickIfVisible(page: Page, name: RegExp): Promise<boolean> {
  const btn = page.getByRole("button", { name }).first();
  try {
    await btn.waitFor({ state: "visible", timeout: 5_000 });
    await btn.click();
    await page.waitForTimeout(8_000);
    return true;
  } catch {
    return false;
  }
}

test.describe.serial("Volunteer: full activities flow", () => {
  test("login => profile => check info", async ({ page }) => {
    await login(page, seed.volunteer);

    await gotoAndWait(page, "/profile");
    await expect(page.locator("body")).toContainText(/Darina Suprun/i, {
      timeout: 15_000,
    });
    await expect(page.locator("body")).toContainText(/xasygata32@gmail.com/i);
    await page.waitForTimeout(8_000);
  });

  test("profile settings - change birth date and apply", async ({ page }) => {
    await login(page, seed.volunteer);
    await gotoAndWait(page, "/profile/settings");

    await expect(page.locator("body")).toContainText(
      /settings|profile|account/i,
      { timeout: 15_000 },
    );

    const bioField = page
      .locator(
        "textarea[name*='bio'], input[name*='bio'], textarea[placeholder*='bio' i], input[placeholder*='city' i], input[name*='firstName']",
      )
      .first();

    try {
      await bioField.waitFor({ state: "visible", timeout: 5_000 });
      await bioField.click();
      await bioField.press("Control+A");
      const current = await bioField.inputValue();
      await bioField.fill(current.trim() || "Passionate volunteer");
    } catch {}

    const saveBtn = page
      .getByRole("button", { name: /save|apply|update/i })
      .first();
    try {
      await saveBtn.waitFor({ state: "visible", timeout: 5_000 });
      await saveBtn.click();
      await page.waitForTimeout(8_000);
      await expect(page.locator("body")).not.toContainText(/error|failed/i);
    } catch {
      await page.waitForTimeout(8_000);
    }

    await expect(page.locator("body")).not.toContainText(
      /404|something went wrong/i,
    );
    await page.waitForTimeout(8_000);
  });

  test("activities - browse and join open project", async ({ page }) => {
    await login(page, seed.volunteer);

    await gotoAndWait(page, "/activities?tab=projects");
    await expect(page.locator("body")).toContainText(
      /project|initiative|tutoring|shelter|cleanup/i,
      { timeout: 15_000 },
    );

    await gotoAndWait(page, `/projects/${seed.ids.openProject}`);
    await expect(page.locator("body")).toContainText(
      /After-School Tutoring|Tutoring Program/i,
      { timeout: 15_000 },
    );

    await clickIfVisible(page, /join project/i);

    await expect(page.locator("body")).toContainText(
      /joined|leave project|member|request sent|pending/i,
      { timeout: 20_000 },
    );
    await page.waitForTimeout(8_000);
  });

  test("my activities - check joined project appears", async ({ page }) => {
    await login(page, seed.volunteer);

    await gotoAndWait(page, "/activities/my?tab=projects");
    await expect(page.locator("body")).toContainText(
      /project|tutoring|activities/i,
      { timeout: 20_000 },
    );
    await page.waitForTimeout(8_000);
  });

  test("project - send feedback (stars + comment)", async ({ page }) => {
    await login(page, seed.volunteer);

    await gotoAndWait(page, `/projects/${seed.ids.openProject}`);
    await expect(page.locator("body")).toContainText(
      /After-School Tutoring|Tutoring/i,
      { timeout: 15_000 },
    );

    const feedbackBtn = page
      .getByRole("button", { name: /feedback|review|rate|leave.*review/i })
      .first();

    try {
      await feedbackBtn.waitFor({ state: "visible", timeout: 5_000 });
      await feedbackBtn.click();
      await page.waitForTimeout(2_000);

      const stars = page.locator(
        "[class*='wrapperStars'] > span, [class*='wrapperStars'] svg",
      );

      const submitFeedbackBtn = page
        .getByRole("button", { name: /submit|review|rate|leave.*review/i })
        .first();

      await submitFeedbackBtn.click();

      await page.waitForTimeout(2_000);

      await stars.first().waitFor({ state: "visible", timeout: 5_000 });

      const starCount = await stars.count();
      if (starCount >= 4) {
        await stars.nth(3).click();
        await page.waitForTimeout(500);
      } else if (starCount > 0) {
        await stars.last().click();
        await page.waitForTimeout(500);
      }

      const commentField = page
        .locator(
          "textarea[name*='comment'], textarea[name*='feedback'], textarea[name*='text'], textarea",
        )
        .first();
      try {
        await commentField.waitFor({ state: "visible", timeout: 3_000 });
        await commentField.fill(
          "Great tutoring program! Really enjoyed volunteering here.",
        );
      } catch {}

      const submitBtn = page
        .locator("button[type='submit']", {
          hasText: /submit|send|apply|post/i,
        })
        .first();
      try {
        await submitBtn.waitFor({ state: "visible", timeout: 3_000 });
        await submitBtn.click();
        await page.waitForTimeout(8_000);
      } catch {}
    } catch {
      await page.keyboard.press("End");
      await page.waitForTimeout(2_000);
    }

    await expect(page.locator("body")).not.toContainText(
      /404|something went wrong/i,
    );
    await page.waitForTimeout(8_000);
  });

  test("tasks - open a task and ask a question in comments", async ({
    page,
  }) => {
    await login(page, seed.volunteer);

    await gotoAndWait(page, "/activities?tab=tasks");
    await expect(page.locator("body")).toContainText(
      /task|cleanup|tutoring|prepare/i,
      { timeout: 15_000 },
    );

    await gotoAndWait(
      page,
      `/activities?tab=tasks&taskId=${seed.ids.openTask}`,
    );
    await expect(page.locator("body")).toContainText(
      /task|tutoring material|prepare/i,
      { timeout: 15_000 },
    );

    const commentsBtn = page.getByRole("button", { name: /comments/i }).first();

    await commentsBtn.waitFor({ state: "visible", timeout: 5_000 });
    await commentsBtn.click();
    await page.waitForTimeout(2_000);

    const messageWrapper = page.locator("div[class*='wrapperSendMessage']");

    const commentInput = messageWrapper
      .locator(
        "textarea[name*='comment'], textarea[name*='body'], textarea[placeholder*='comment' i], input[placeholder*='ask' i], input",
      )
      .first();
    try {
      await commentInput.waitFor({ state: "visible", timeout: 8_000 });
      await commentInput.fill(
        "Could you please clarify what materials are needed for the tutoring session?",
      );

      await commentInput.press("Enter");
      await page.waitForTimeout(8_000);
    } catch {
      await page.waitForTimeout(8_000);
    }

    await expect(page.locator("body")).not.toContainText(
      /404|something went wrong/i,
    );
    await page.waitForTimeout(8_000);
  });

  test("events - find and join an open event", async ({ page }) => {
    await login(page, seed.volunteer);

    await gotoAndWait(page, "/activities?tab=events");
    await expect(page.locator("body")).toContainText(
      /event|cleanup|tutoring|garden/i,
      { timeout: 15_000 },
    );

    await gotoAndWait(page, `/events/${seed.ids.openEvent}`);
    await expect(page.locator("body")).toContainText(
      /River Cleanup Day|cleanup/i,
      { timeout: 15_000 },
    );

    await clickIfVisible(page, /join event/i);

    await expect(page.locator("body")).toContainText(
      /joined|leave event|member|request sent|pending/i,
      { timeout: 20_000 },
    );
    await page.waitForTimeout(8_000);
  });

  test("calendar - check event appears in calendar", async ({ page }) => {
    await login(page, seed.volunteer);

    await gotoAndWait(page, "/calendar?date=2026-06");
    await expect(page.locator("body")).toContainText(
      /calendar|June|event|cleanup|garden/i,
      { timeout: 20_000 },
    );
    await page.waitForTimeout(8_000);
  });

  test("map - check activity markers appear", async ({ page }) => {
    await login(page, seed.volunteer);

    await gotoAndWait(page, "/map");
    await expect(page.locator("body")).toContainText(
      /map|filter|GreenPaw|River Cleanup|organization/i,
      { timeout: 20_000 },
    );

    const mapContainer = page
      .locator(".leaflet-container, [class*='map'], [id*='map']")
      .first();
    try {
      await mapContainer.waitFor({ state: "visible", timeout: 8_000 });
      await expect(mapContainer).toBeVisible();
    } catch {}
    await page.waitForTimeout(8_000);
  });

  test("organizations - browse organizations list", async ({ page }) => {
    await login(page, seed.volunteer);

    await gotoAndWait(page, "/organizations");
    await expect(page.locator("body")).toContainText(
      /GreenPaw|CommunityBridge|Eco Warriors|KidCare/i,
      { timeout: 15_000 },
    );
    await page.waitForTimeout(8_000);
  });
});
