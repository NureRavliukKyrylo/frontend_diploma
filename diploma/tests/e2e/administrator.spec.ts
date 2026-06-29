import { expect, test, type Page } from "@playwright/test";

const seed = {
  admin: { email: "admin@impactflow.dev", password: "Test1234!" },
  ids: {
    usersPage: "/admin/users",
    bansPage: "/admin/bans",
    skillsPage: "/admin/skills",
    categoriesPage: "/admin/categories",
    timeBankPage: "/admin/time-bank",
    requestsPage: "/admin/requests",
    statisticsPage: "/admin/statistics",
    accessPoliciesPage: "/admin/access-policies",
    overviewPage: "/admin",
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
  await expect(page).toHaveURL(/activities|profile|multi-step-form|admin/i, {
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

test.describe.serial("Administrator - admin panel actions", () => {
  test("admin: sign in and load system overview dashboard metrics", async ({
    page,
  }) => {
    await login(page, seed.admin);

    await gotoAndWait(page, seed.ids.overviewPage);
    await expect(page.locator("body")).toContainText(
      /admin|overview|dashboard|statistics/i,
      { timeout: 15_000 },
    );
  });

  test("admin: search master account record directory and inspect explicit target user profile", async ({
    page,
  }) => {
    await login(page, seed.admin);

    await gotoAndWait(page, seed.ids.usersPage);
    await expect(page.locator("body")).toContainText(/users|user directory/i, {
      timeout: 15_000,
    });

    const searchInput = page
      .locator(
        "input[type='search'], input[placeholder*='search' i], input[placeholder*='name' i]",
      )
      .first();
    await searchInput.fill("Darina");
    await waitForSkeletons(page);
    await expect(page.locator("body")).toContainText(/Darina|Suprun/i, {
      timeout: 10_000,
    });

    const userCard = page
      .locator("div, tr, article", { hasText: /Darina/i })
      .first();
    await userCard.click();

    await expect(page.locator("body")).not.toContainText(
      /404|something went wrong/i,
    );
    await expect(page.getByText(/Darina/i).first()).toBeVisible({
      timeout: 10_000,
    });
  });

  test("admin: pull global account block records view", async ({ page }) => {
    await login(page, seed.admin);

    await gotoAndWait(page, seed.ids.bansPage);
    await expect(page.locator("body")).toContainText(/ban|restrict|user/i, {
      timeout: 15_000,
    });
  });

  test("admin: create a new category", async ({ page }) => {
    await login(page, seed.admin);

    await gotoAndWait(page, seed.ids.categoriesPage);
    await expect(page.locator("body")).toContainText(
      /categor|Animal Rescue|Education|Environmental/i,
      { timeout: 15_000 },
    );

    const categoryName = `E2E Category ${Date.now()}`;

    await page
      .getByRole("button", { name: "New category", exact: true })
      .click();

    await expect(
      page.getByRole("heading", { name: "Create category", exact: true }),
    ).toBeVisible({
      timeout: 10_000,
    });

    await page.locator("input[name='name']").fill(categoryName);
    await page
      .locator("textarea[name='description']")
      .fill("Category created by an automated E2E test.");

    await page
      .getByRole("button", { name: "Create category", exact: true })
      .click();

    await expect(page.getByText(categoryName)).toBeVisible({ timeout: 15_000 });
  });

  test("admin: create a new skill and attach it to a category", async ({
    page,
  }) => {
    await login(page, seed.admin);

    await gotoAndWait(page, seed.ids.skillsPage);
    await expect(page.locator("body")).toContainText(
      /skill|First Aid|Webinar|Environmental/i,
      { timeout: 15_000 },
    );

    const skillName = `E2E Skill ${Date.now()}`;

    await page.getByRole("button", { name: "New skill", exact: true }).click();

    await expect(
      page.getByRole("heading", { name: "Create skill", exact: true }),
    ).toBeVisible({
      timeout: 10_000,
    });

    await page.locator("input[name='name']").fill(skillName);
    await page
      .locator("textarea[name='description']")
      .fill("Skill created by an automated E2E test.");

    const categoryPicker = page
      .locator(
        "input[placeholder*='categor' i], input[placeholder*='search' i]",
      )
      .last();
    if (await categoryPicker.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await categoryPicker.click();
      const firstOption = page
        .locator("[role='option'], li, div")
        .filter({
          hasText: /Animal Rescue|Education|Environmental/i,
        })
        .first();
      if (await firstOption.isVisible({ timeout: 3_000 }).catch(() => false)) {
        await firstOption.click();
      }
      await page.keyboard.press("Escape");
    }

    await page
      .getByRole("button", { name: "Create skill", exact: true })
      .click();

    await expect(page.getByText(skillName)).toBeVisible({ timeout: 15_000 });
  });

  test("admin: review time bank asset ledger records ledger entries", async ({
    page,
  }) => {
    await login(page, seed.admin);

    await gotoAndWait(page, seed.ids.timeBankPage);
    await expect(page.locator("body")).toContainText(
      /time.?bank|offer|booking/i,
      { timeout: 15_000 },
    );
  });

  test("admin: open incoming institutional submission queues", async ({
    page,
  }) => {
    await login(page, seed.admin);

    await gotoAndWait(page, seed.ids.requestsPage);
    await expect(page.locator("body")).toContainText(
      /request|pending|join|leave/i,
      { timeout: 15_000 },
    );
  });

  test("admin: retrieve high-level operational statistics visualizations", async ({
    page,
  }) => {
    await login(page, seed.admin);

    await gotoAndWait(page, seed.ids.statisticsPage);
    await expect(page.locator("body")).toContainText(
      /statistic|metric|users|total|chart/i,
      { timeout: 15_000 },
    );
  });

  test("admin: review authorization token governance rules metadata blueprints", async ({
    page,
  }) => {
    await login(page, seed.admin);

    await gotoAndWait(page, seed.ids.accessPoliciesPage);
    await expect(page.locator("body")).toContainText(
      /access.?polic|allow|permission|role/i,
      { timeout: 15_000 },
    );
  });

  test("admin: initiate identity class modifications drawer flow and safely cancel action", async ({
    page,
  }) => {
    await login(page, seed.admin);

    await gotoAndWait(page, seed.ids.usersPage);

    const searchInput = page
      .locator(
        "input[type='search'], input[placeholder*='search' i], input[placeholder*='name' i]",
      )
      .first();
    await searchInput.fill("Ivan");
    await waitForSkeletons(page);

    const userCard = page
      .locator("div, tr, article", { hasText: /Ivan|Bodoprost/i })
      .first();
    await userCard.click();

    const changeRoleBtn = page
      .getByRole("button", { name: /change role|role/i })
      .first();
    await expect(changeRoleBtn).toBeVisible({ timeout: 10_000 });
    await changeRoleBtn.click();

    const closeBtn = page
      .getByRole("button", { name: /cancel|close/i })
      .first();
    if (await closeBtn.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await closeBtn.click();
    } else {
      await page.keyboard.press("Escape");
    }

    await expect(page.locator("body")).not.toContainText(
      /404|something went wrong/i,
    );
  });
});
