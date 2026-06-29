import { expect, test, type Page } from "@playwright/test";

const seed = {
  organizer: { email: "stasyanravluk@gmail.com", password: "Test1234!" },
  ids: {
    organization: "69b84d26e277a7c0bd445e3c",
    openProject: "69fc42cbd9578c4425554981",
    approvalProject: "69fc42ddd9578c442555498d",
    openEvent: "69fc43b0d9578c4425554993",
    openTask: "69fc4619d9578c44255549f4",
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

test.describe.serial("Organizer: full management flow", () => {
  test("organizer: login and browse overall activities list", async ({
    page,
  }) => {
    await login(page, seed.organizer);

    await gotoAndWait(page, "/activities?tab=projects");
    await expect(page.locator("body")).toContainText(
      /project|initiative|tutoring|shelter|cleanup/i,
      { timeout: 15_000 },
    );
    await page.waitForTimeout(8_000);
  });

  test("organizer: browse managed organizations list", async ({ page }) => {
    await login(page, seed.organizer);

    await gotoAndWait(page, "/organizations/my");
    await expect(page.locator("body")).toContainText(
      /GreenPaw|CommunityBridge|Eco Warriors|organization/i,
      { timeout: 15_000 },
    );
    await page.waitForTimeout(8_000);
  });

  test("organizer: select organization and review current members", async ({
    page,
  }) => {
    await login(page, seed.organizer);

    await gotoAndWait(page, `/organizations/${seed.ids.organization}/members`);
    await expect(page.locator("body")).toContainText(
      /member|CommunityBridge|Kyrylo|Ravliuk/i,
      { timeout: 15_000 },
    );
    await page.waitForTimeout(8_000);
  });

  test("organizer: handle and approve incoming membership requests", async ({
    page,
  }) => {
    await login(page, seed.organizer);

    await gotoAndWait(page, `/organizations/${seed.ids.organization}/members`);

    const requestsTab = page.getByRole("tab", { name: /requests/i }).first();
    if (await requestsTab.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await requestsTab.click();
      await waitForSkeletons(page);
    }

    const approveBtn = page.getByRole("button", { name: /approve/i }).first();
    if (await approveBtn.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await approveBtn.click();
      await page.waitForTimeout(2_000);

      const confirmApprove = page
        .getByRole("button", { name: /^approve$/i })
        .last();
      if (
        await confirmApprove.isVisible({ timeout: 3_000 }).catch(() => false)
      ) {
        await confirmApprove.click();
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

  test("organizer: complete the multi-step project creation", async ({
    page,
  }) => {
    await login(page, seed.organizer);

    await gotoAndWait(
      page,
      `/organizations/${seed.ids.organization}/projects/create`,
    );
    await expect(page.locator("body")).toContainText(/project|title|tell us/i, {
      timeout: 15_000,
    });

    const projectTitle = `E2E Organizer Project ${Date.now()}`;

    const titleInput = page
      .locator(
        "input[placeholder*='Park Cleanup'], input[placeholder*='project'], input[name*='title']",
      )
      .first();
    if (await titleInput.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await titleInput.fill(projectTitle);
    }

    const descField = page
      .locator(
        "textarea[placeholder*='What will volunteers do'], textarea[name*='description'], textarea",
      )
      .first();
    if (await descField.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await descField.fill(
        "E2E automated test project for organizer flow verification.",
      );
    }

    await page.getByRole("button", { name: /^continue$/i }).click();
    await waitForSkeletons(page);
    await page.waitForTimeout(2_000);

    const continueBtn2 = page
      .getByRole("button", { name: /^continue$/i })
      .first();
    if (await continueBtn2.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await continueBtn2.click();
      await waitForSkeletons(page);
      await page.waitForTimeout(2_000);
    }

    await page
      .waitForFunction(
        () => document.querySelectorAll("button[aria-pressed]").length > 0,
        { timeout: 10_000 },
      )
      .catch(() => {});

    const chips = page.locator("button[aria-pressed]");
    const chipCount = await chips.count();
    if (chipCount >= 1) await chips.nth(0).click();
    await page.waitForTimeout(500);

    const continueBtn3 = page
      .getByRole("button", { name: /^continue$/i })
      .first();
    if (await continueBtn3.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await continueBtn3.click();
      await waitForSkeletons(page);
      await page.waitForTimeout(2_000);
    }

    const createBtn = page
      .getByRole("button", { name: /create project/i })
      .first();
    if (await createBtn.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await createBtn.click();
      await page.waitForTimeout(8_000);
      await expect(page.locator("body")).toContainText(projectTitle, {
        timeout: 20_000,
      });
    } else {
      await page.waitForTimeout(8_000);
    }
    await page.waitForTimeout(8_000);
  });

  test("organizer: complete the multi-step event creation", async ({
    page,
  }) => {
    await login(page, seed.organizer);

    await gotoAndWait(
      page,
      `/organizations/${seed.ids.organization}/events/create`,
    );
    await expect(page.locator("body")).toContainText(/event|title|tell us/i, {
      timeout: 15_000,
    });

    const eventTitle = `E2E Organizer Event ${Date.now()}`;

    const titleInput = page
      .locator(
        "input[placeholder*='Community Cleanup Day'], input[placeholder*='event'], input[name*='title']",
      )
      .first();
    if (await titleInput.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await titleInput.fill(eventTitle);
    }

    const descField = page
      .locator(
        "textarea[placeholder*='What will volunteers do'], textarea[name*='description'], textarea",
      )
      .first();
    if (await descField.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await descField.fill(
        "E2E automated test event for organizer flow verification.",
      );
    }

    await page.getByRole("button", { name: /^continue$/i }).click();
    await waitForSkeletons(page);
    await page.waitForTimeout(2_000);

    const continueBtn2 = page
      .getByRole("button", { name: /^continue$/i })
      .first();
    if (await continueBtn2.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await continueBtn2.click();
      await waitForSkeletons(page);
      await page.waitForTimeout(2_000);
    }

    const continueBtn3 = page
      .getByRole("button", { name: /^continue$/i })
      .first();
    if (await continueBtn3.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await continueBtn3.click();
      await waitForSkeletons(page);
      await page.waitForTimeout(2_000);
    }

    await page
      .waitForFunction(
        () => document.querySelectorAll("button[aria-pressed]").length > 0,
        { timeout: 10_000 },
      )
      .catch(() => {});

    const chips = page.locator("button[aria-pressed]");
    const chipCount = await chips.count();
    if (chipCount >= 1) await chips.nth(0).click();
    await page.waitForTimeout(500);

    const continueBtn4 = page
      .getByRole("button", { name: /^continue$/i })
      .first();
    if (await continueBtn4.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await continueBtn4.click();
      await waitForSkeletons(page);
      await page.waitForTimeout(2_000);
    }

    const createBtn = page
      .getByRole("button", { name: /create event/i })
      .first();
    if (await createBtn.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await createBtn.click();
      await page.waitForTimeout(8_000);
      await expect(page.locator("body")).toContainText(eventTitle, {
        timeout: 20_000,
      });
    } else {
      await page.waitForTimeout(8_000);
    }
    await page.waitForTimeout(8_000);
  });

  test("organizer: generate custom structural roles from organization settings", async ({
    page,
  }) => {
    await login(page, seed.organizer);

    await gotoAndWait(page, `/organizations/${seed.ids.organization}/roles`);
    await expect(page.locator("body")).toContainText(
      /roles|templates|custom/i,
      { timeout: 15_000 },
    );

    const teamLeadCard = page
      .locator("div, button, article", { hasText: /Team Lead/i })
      .first();
    if (await teamLeadCard.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await teamLeadCard.click();
      await page.waitForTimeout(2_000);
    } else {
      const newRoleBtn = page
        .getByRole("button", { name: /new role|create/i })
        .first();
      if (await newRoleBtn.isVisible({ timeout: 5_000 }).catch(() => false)) {
        await newRoleBtn.click();
        await page.waitForTimeout(2_000);
      }
    }

    const roleName = `E2E Role ${Date.now()}`;
    const roleInput = page.getByLabel(/role name|name/i).first();
    if (await roleInput.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await roleInput.clear();
      await roleInput.fill(roleName);
    }

    await page
      .getByRole("button", { name: /save|create/i })
      .last()
      .click();
    await page.waitForTimeout(8_000);

    await expect(page.locator("body")).not.toContainText(
      /404|something went wrong/i,
    );
    await page.waitForTimeout(8_000);
  });

  test("organizer: verify scope of internal organization projects", async ({
    page,
  }) => {
    await login(page, seed.organizer);

    await gotoAndWait(page, `/organizations/${seed.ids.organization}/projects`);
    await expect(page.locator("body")).toContainText(
      /project|CommunityBridge|cleanup|tutoring/i,
      { timeout: 15_000 },
    );
    await page.waitForTimeout(8_000);
  });

  test("organizer: verify scope of internal organization events", async ({
    page,
  }) => {
    await login(page, seed.organizer);

    await gotoAndWait(page, `/organizations/${seed.ids.organization}/events`);
    await expect(page.locator("body")).toContainText(
      /event|CommunityBridge|garden|cleanup/i,
      { timeout: 15_000 },
    );
    await page.waitForTimeout(8_000);
  });
});
