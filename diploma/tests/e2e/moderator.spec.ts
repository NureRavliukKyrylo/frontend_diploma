import { expect, test, type Page } from "@playwright/test";

const seed = {
  volunteer: { email: "xasygata32@gmail.com", password: "Test1234!" },
  moderator: { email: "moderator@impactflow.dev", password: "Test1234!" },
  bannedUser: { email: "banned.user@impactflow.dev", password: "Test1234!" },
  ids: {
    reportableProject: "69fc42cbd9578c4425554981",
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
  await page.goto("/auth", { waitUntil: "domcontentloaded", timeout: 40_000 });
  await page.evaluate(() => localStorage.clear());
  await forceEnglish(page);
  await page.goto("/auth", { waitUntil: "domcontentloaded", timeout: 40_000 });

  await page.locator("#email").fill(user.email);
  await page.locator("#password").fill(user.password);
  await page.locator("button[type='submit']", { hasText: /sign in/i }).click();
  await expect(page).toHaveURL(/activities|profile|multi-step-form|reports/i, {
    timeout: 40_000,
  });
}

async function waitForSkeletons(page: Page, timeout = 40_000) {
  await page.waitForFunction(
    () => document.querySelectorAll('[data-slot="skeleton"]').length === 0,
    { timeout },
  );
}

async function gotoAndWait(page: Page, url: string) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 40_000 });
  await waitForSkeletons(page);
  await expect(page.locator("body")).not.toContainText(
    /404|not found|something went wrong/i,
    { timeout: 30_000 },
  );
}

async function selectReportReason(page: Page, reasonLabel: string) {
  const trigger = page.getByRole("button", { name: /Reason:/i }).first();
  await trigger.click();

  const option = page.getByText(reasonLabel, { exact: true }).last();
  await option.waitFor({ state: "visible", timeout: 10_000 });
  await option.click();
}

test.describe.serial("Moderator + Reporting flow", () => {
  test("volunteer: login and report a project", async ({ page }) => {
    await login(page, seed.volunteer);

    await gotoAndWait(page, `/projects/${seed.ids.reportableProject}`);
    await expect(page.locator("body")).toContainText(
      /After-School Tutoring|Tutoring Program/i,
      { timeout: 30_000 },
    );

    const reportButton = page
      .locator("[class*='reportWrapper'] button")
      .first();
    await reportButton.click();

    await expect(page.getByText(/^Report /i)).toBeVisible({ timeout: 10_000 });

    await selectReportReason(page, "Inappropriate Content");

    await page
      .getByPlaceholder("Describe the issue...")
      .fill(
        "This project contains inappropriate content that violates community guidelines.",
      );

    await page.getByRole("button", { name: "Submit Report" }).click();
    await page.waitForTimeout(8_000);
  });

  test("volunteer: report a feedback/review on the project", async ({
    page,
  }) => {
    await login(page, seed.volunteer);

    await gotoAndWait(page, `/projects/${seed.ids.reportableProject}`);
    await expect(page.locator("body")).toContainText(
      /After-School Tutoring|Tutoring Program/i,
      { timeout: 30_000 },
    );

    await waitForSkeletons(page);

    const feedbackBtn = page
      .getByRole("button", { name: /feedback|review|rate|leave.*review/i })
      .first();

    await feedbackBtn.waitFor({ state: "visible", timeout: 5_000 });
    await feedbackBtn.click();

    const feedbackWrapper = page.locator("div[class*='feedbackBaseWrapper']");
    const feedbackReportButton = feedbackWrapper
      .locator("button[class*='feedbackReportButton']")
      .first();

    await feedbackReportButton.waitFor({ state: "visible", timeout: 5_000 });
    await feedbackReportButton.click();

    await expect(page.getByText(/^Report /i)).toBeVisible({ timeout: 10_000 });

    await selectReportReason(page, "Misinformation");

    await page
      .getByPlaceholder("Describe the issue...")
      .fill("This feedback contains misleading and harmful information.");

    await page.getByRole("button", { name: "Submit Report" }).click();
    await page.waitForTimeout(8_000);
  });

  test("moderator: login and access general reports interface list", async ({
    page,
  }) => {
    await login(page, seed.moderator);

    await gotoAndWait(page, "/reports");
    await expect(page.locator("body")).toContainText(
      /report|case|total|open|resolve/i,
      { timeout: 30_000 },
    );
  });

  test("moderator: process project report case and execute entity ban", async ({
    page,
  }) => {
    await login(page, seed.moderator);

    await gotoAndWait(page, "/reports?SubjectTypes=project");
    await expect(page.locator("body")).toContainText(/report|case/i, {
      timeout: 30_000,
    });

    const projectReportCard = page
      .locator("[class*='reportWrapper']")
      .filter({ hasText: "Project" })
      .first();
    await expect(projectReportCard).toBeVisible({ timeout: 15_000 });
    await projectReportCard.click();

    const banEntityBtn = page.getByRole("button", { name: "Ban Entity" });
    await expect(banEntityBtn).toBeVisible({ timeout: 10_000 });
    await banEntityBtn.click();

    await selectReportReason(page, "Inappropriate Content");
    await page.getByRole("button", { name: "Ban", exact: true }).click();
    await page.waitForTimeout(8_000);

    const resolveBtn = page.getByRole("button", { name: "Resolve" });
    await expect(resolveBtn).toBeVisible({ timeout: 10_000 });
    await resolveBtn.click();

    await page.getByRole("button", { name: "Approve" }).click();
    await page
      .getByPlaceholder("Describe the resolution...")
      .fill("Verified and banned the reported project entity.");
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.waitForTimeout(8_000);
  });

  test("moderator: review feedback report and obscure the content", async ({
    page,
  }) => {
    await login(page, seed.moderator);

    await gotoAndWait(page, "/reports?SubjectTypes=feedback");

    const feedbackReportCard = page
      .locator("[class*='reportWrapper']")
      .filter({ hasText: "Feedback" })
      .first();
    await expect(feedbackReportCard).toBeVisible({ timeout: 15_000 });
    await feedbackReportCard.click();

    const hideContentBtn = page.getByRole("button", { name: "Hide Content" });
    await expect(hideContentBtn).toBeVisible({ timeout: 10_000 });
    await hideContentBtn.click();

    await selectReportReason(page, "Hate Speech");
    await page
      .getByRole("button", { name: "Hide Content", exact: true })
      .and(page.locator("[type='submit']"))
      .click();
    await page.waitForTimeout(8_000);
  });

  test("volunteer: verify targeted content is no longer visible on project view", async ({
    page,
  }) => {
    await login(page, seed.volunteer);

    await gotoAndWait(page, `/projects/${seed.ids.reportableProject}`);
    await expect(page.locator("body")).toContainText(
      /After-School Tutoring|Tutoring Program/i,
      { timeout: 30_000 },
    );
    const feedbackBtn = page
      .getByRole("button", { name: /feedback|review|rate|leave.*review/i })
      .first();

    await feedbackBtn.waitFor({ state: "visible", timeout: 5_000 });
    await feedbackBtn.click();

    await waitForSkeletons(page);

    await expect(page.locator("body")).not.toContainText(
      /This feedback contains misleading/i,
      { timeout: 30_000 },
    );
  });

  test("moderator: locate feedback actor and enforce user account ban", async ({
    page,
  }) => {
    await login(page, seed.moderator);

    await gotoAndWait(page, "/reports?SubjectTypes=feedback&Status=open");

    const feedbackReportCard = page
      .locator("[class*='reportWrapper']")
      .filter({ hasText: "Feedback" })
      .first();
    await expect(feedbackReportCard).toBeVisible({ timeout: 15_000 });
    await feedbackReportCard.click();

    const banUserBtn = page.getByRole("button", { name: "Ban User" });
    await expect(banUserBtn).toBeVisible({ timeout: 10_000 });
    await banUserBtn.click();

    await selectReportReason(page, "Harassment or Bullying");

    await page.keyboard.press("Escape");

    const banModal = page
      .locator("div")
      .filter({ hasText: /^Ban User$/ })
      .locator("..");

    const monthSegment = banModal.getByRole("spinbutton", { name: /month/i });

    await monthSegment.click();

    const future = new Date();
    future.setDate(future.getDate() + 30);
    const mm = String(future.getMonth() + 1).padStart(2, "0");
    const dd = String(future.getDate()).padStart(2, "0");
    const yyyy = String(future.getFullYear());

    await page.keyboard.type(`${mm}${dd}${yyyy}`);

    await page
      .getByRole("button", { name: "Ban User", exact: true })
      .and(page.locator("[type='submit']"))
      .click({ force: true });
    await page.waitForTimeout(8_000);

    const resolveBtn = page.getByRole("button", { name: "Resolve" });
    await expect(resolveBtn).toBeVisible({ timeout: 10_000 });
    await resolveBtn.click();
    await page.getByRole("button", { name: "Approve" }).click();
    await page
      .getByPlaceholder("Describe the resolution...")
      .fill("Verified and banned the user responsible for the feedback.");
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.waitForTimeout(8_000);
  });

  test("banned user: confirm block state triggers restriction landing page upon authentication", async ({
    page,
  }) => {
    await forceEnglish(page);
    await page.context().clearCookies();
    await page.addInitScript(() => {
      localStorage.setItem(
        "locale-storage",
        JSON.stringify({ state: { locale: "en" }, version: 0 }),
      );
      localStorage.setItem(
        "auth-store",
        JSON.stringify({ state: { mode: "signin" }, version: 0 }),
      );
    });
    await page.goto("/auth", {
      waitUntil: "domcontentloaded",
      timeout: 40_000,
    });
    await page.evaluate(() => localStorage.clear());
    await forceEnglish(page);
    await page.goto("/auth", {
      waitUntil: "domcontentloaded",
      timeout: 40_000,
    });

    await page.locator("#email").fill(seed.bannedUser.email);
    await page.locator("#password").fill(seed.bannedUser.password);
    await page
      .locator("button[type='submit']", { hasText: /sign in/i })
      .click();
    await page.waitForTimeout(8_000);

    await expect(page.locator("body")).toContainText(
      /banned|suspended|restricted|access denied|violation|account/i,
      { timeout: 30_000 },
    );
  });
});
