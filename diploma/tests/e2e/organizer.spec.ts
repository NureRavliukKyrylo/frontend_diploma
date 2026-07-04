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

async function expectHealthy(page: Page) {
  await expect(page.locator("body")).not.toContainText(
    /404|not found|something went wrong|cannot navigate/i,
  );
}

async function clickFirstVisible(page: Page, name: RegExp): Promise<boolean> {
  const candidates = page.getByRole("button", { name });
  const count = await candidates.count();
  for (let i = 0; i < count; i++) {
    const candidate = candidates.nth(i);
    if (await candidate.isVisible().catch(() => false)) {
      await candidate.click();
      await page.waitForTimeout(8_000);
      return true;
    }
  }
  return false;
}

function locationMapTrigger(page: Page) {
  return page
    .locator("section", {
      has: page.getByRole("heading", { name: "Location" }),
    })
    .getByRole("button")
    .first();
}

async function closeBaseModal(page: Page) {
  const closeBlock = page.locator('[class*="closeButtonBlock"]').first();
  if (await closeBlock.isVisible().catch(() => false)) {
    await closeBlock.click();
    await page.waitForTimeout(8_000);
    return;
  }
  await page.mouse.click(5, 5);
  await page.waitForTimeout(8_000);
}

async function fillDateTimeField(
  page: Page,
  field: ReturnType<Page["locator"]>,
  digits: string,
) {
  await expect(field).toBeVisible({ timeout: 10_000 });
  await field.getByText("mm", { exact: true }).first().click();
  await page.keyboard.type(digits);
}

test.describe.serial("Organizer: full management flow", () => {
  test.slow();

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

    await expect(page.locator("body")).toContainText(
      /New project|Tell us about your project|Project title/i,
      { timeout: 15_000 },
    );

    const projectTitle = `E2E Organizer Project ${Date.now()}`;
    await page.locator("input[placeholder*='Park Cleanup']").fill(projectTitle);

    await page
      .locator("textarea[placeholder*='What will volunteers do']")
      .fill("E2E automated test project for organizer flow verification.");

    await page.getByRole("button", { name: /^continue$/i }).click();
    await waitForSkeletons(page);

    await expect(page.locator("body")).toContainText(
      /Where and when|Location|Timeline/i,
      { timeout: 10_000 },
    );
    const locationInput = page.locator(
      "input[placeholder*='city or region'], input[placeholder*='Start typing']",
    );
    await locationInput.fill("Kyiv");
    await page.waitForTimeout(8_000);

    const firstSuggestion = page
      .locator("ul li")
      .filter({ hasText: /Kyiv|Kiev|Київ/i })
      .first();
    if (
      await firstSuggestion.isVisible({ timeout: 5_000 }).catch(() => false)
    ) {
      await firstSuggestion.dispatchEvent("click");
      await page.waitForTimeout(8_000);
    }

    const startDateField = page
      .locator('[aria-label="Project start date"]')
      .first();
    if (await startDateField.isVisible().catch(() => false)) {
      await startDateField.click();
      await page.keyboard.type("07012026");
      await page.keyboard.press("Escape");
    }

    const endDateField = page
      .locator('[aria-label="Project end date"]')
      .first();
    if (await endDateField.isVisible().catch(() => false)) {
      await endDateField.click();
      await page.keyboard.type("12312026");
      await page.keyboard.press("Escape");
    }

    await page.getByRole("button", { name: /^continue$/i }).click();
    await waitForSkeletons(page);

    await expect(page.locator("body")).toContainText(/Categories/i, {
      timeout: 10_000,
    });

    await page.waitForFunction(
      () => document.querySelectorAll("button[aria-pressed]").length > 0,
      { timeout: 10_000 },
    );

    const chips = page.locator("button[aria-pressed]");
    const count = await chips.count();
    if (count >= 1) await chips.nth(0).click();
    if (count >= 2) await chips.nth(1).click();
    await page.waitForTimeout(8_000);

    await expect(
      page.locator("button[aria-pressed='true']").first(),
    ).toBeVisible({ timeout: 5_000 });

    await page.getByRole("button", { name: /^continue$/i }).click();
    await waitForSkeletons(page);

    await expect(page.locator("body")).toContainText(
      /Access policies|Join policy|Leave policy/i,
      { timeout: 10_000 },
    );

    const joinOpen = page
      .locator("button[aria-pressed]", { hasText: /^Open$/i })
      .first();
    if (await joinOpen.isVisible().catch(() => false)) {
      await joinOpen.click();
      await page.waitForTimeout(8_000);
    }

    const leaveOpen = page
      .locator("button[aria-pressed]", { hasText: /^Open$/i })
      .nth(1);
    if (await leaveOpen.isVisible().catch(() => false)) {
      await leaveOpen.click();
      await page.waitForTimeout(8_000);
    }

    await page.getByRole("button", { name: /Create project/i }).click();

    await expect(page).toHaveURL(/organizations.*projects/i, {
      timeout: 20_000,
    });
    await expect(page.locator("body")).toContainText(projectTitle, {
      timeout: 15_000,
    });
  });

  test("organizer: complete the multi-step event creation", async ({
    page,
  }) => {
    await login(page, seed.organizer);

    await gotoAndWait(
      page,
      `/organizations/${seed.ids.organization}/events/create`,
    );

    await expect(page.locator("body")).toContainText(
      /New event|Tell us about your event|Event title/i,
      { timeout: 15_000 },
    );

    const eventTitle = `E2E Organizer Event ${Date.now()}`;
    await page
      .locator("input[placeholder*='Community Cleanup Day']")
      .fill(eventTitle);

    await page
      .locator("textarea[placeholder*='What will volunteers do']")
      .fill("E2E automated test event for organizer flow verification.");

    await page.getByRole("button", { name: /^continue$/i }).click();
    await waitForSkeletons(page);

    await expect(page.locator("body")).toContainText(
      /Where and when|Location|Date.*time/i,
      { timeout: 10_000 },
    );

    const locationTrigger = locationMapTrigger(page);
    if (await locationTrigger.isVisible().catch(() => false)) {
      await locationTrigger.click();
      await page.waitForTimeout(8_000);

      const mapCanvas = page
        .locator(".leaflet-container, [class*='map']")
        .first();
      if (await mapCanvas.isVisible().catch(() => false)) {
        const box = await mapCanvas.boundingBox();
        if (box) {
          await page.mouse.click(
            box.x + box.width / 2,
            box.y + box.height / 2,
            { button: "right" },
          );
          await page.waitForTimeout(8_000);
        }
      }
      await closeBaseModal(page);
    }

    const startDt = page
      .locator('[aria-label="Event start date and time"]')
      .first();
    if (await startDt.isVisible().catch(() => false)) {
      await startDt.click();
      await page.keyboard.type("0801202610001");
      await page.keyboard.press("Escape");
    }

    const endDt = page
      .locator('[aria-label="Event end date and time"]')
      .first();
    if (await endDt.isVisible().catch(() => false)) {
      await endDt.click();
      await page.keyboard.type("0801202614001");
      await page.keyboard.press("Escape");
    }

    await page.getByRole("button", { name: /^continue$/i }).click();
    await waitForSkeletons(page);

    await expect(page.locator("body")).toContainText(
      /Set a repeat schedule|Recurring event/i,
      { timeout: 10_000 },
    );
    await page.getByRole("button", { name: /^continue$/i }).click();
    await waitForSkeletons(page);

    await expect(page.locator("body")).toContainText(/Categories/i, {
      timeout: 10_000,
    });

    await page.waitForFunction(
      () => document.querySelectorAll("button[aria-pressed]").length > 0,
      { timeout: 10_000 },
    );
    const eventChips = page.locator("button[aria-pressed]");
    const eventChipCount = await eventChips.count();
    if (eventChipCount >= 1) await eventChips.nth(0).click();
    await page.waitForTimeout(8_000);

    await page.getByRole("button", { name: /^continue$/i }).click();
    await waitForSkeletons(page);

    await expect(page.locator("body")).toContainText(
      /Access policies|Join policy|Leave policy/i,
      { timeout: 10_000 },
    );

    const leaveOpenEvent = page
      .locator("button[aria-pressed]", { hasText: /^Open$/i })
      .nth(1);
    if (await leaveOpenEvent.isVisible().catch(() => false)) {
      await leaveOpenEvent.click();
      await page.waitForTimeout(8_000);
    }

    await page.getByRole("button", { name: /Create event/i }).click();

    await expect(page).toHaveURL(/organizations.*events/i, {
      timeout: 20_000,
    });
    await expect(page.locator("body")).toContainText(eventTitle, {
      timeout: 15_000,
    });
  });

  test("organizer: complete the multi-step task creation drawer", async ({
    page,
  }) => {
    await login(page, seed.organizer);

    await gotoAndWait(page, `/organizations/${seed.ids.organization}`);

    const fabBtn = page
      .getByRole("button", { name: /organization actions/i })
      .first();
    await fabBtn.click();

    await clickFirstVisible(page, /new task/i);

    await expect(page.locator("body")).toContainText(
      /Task title|Sort recyclable/i,
      { timeout: 10_000 },
    );

    const taskTitle = `E2E Organizer Task ${Date.now()}`;
    await page.locator("input[placeholder*='Sort recyclable']").fill(taskTitle);

    await page
      .locator("textarea[placeholder*='Describe the task']")
      .fill("E2E automated test task for organizer flow verification.");

    await page.getByRole("button", { name: /^continue$/i }).click();
    await page.waitForTimeout(8_000);

    await expect(page.locator("body")).toContainText(
      /Location|Timeline|Estimated/i,
      { timeout: 10_000 },
    );

    const taskStartDt = page
      .locator('[aria-label="Task start date and time"]')
      .first();
    if ((await taskStartDt.count()) > 0) {
      await fillDateTimeField(page, taskStartDt, "080120261000");
    }
    await page.waitForTimeout(1_000);

    const taskEndDt = page
      .locator('[aria-label="Task end date and time"]')
      .first();
    if ((await taskEndDt.count()) > 0) {
      await fillDateTimeField(page, taskEndDt, "080120261200");
    }

    await page.locator("input[placeholder*='120']").fill("90");
    await page.locator("input[placeholder*='Optional']").fill("10");

    await page.getByRole("button", { name: /^continue$/i }).click();
    await page.waitForTimeout(8_000);

    await expect(page.locator("body")).toContainText(/Categories/i, {
      timeout: 10_000,
    });

    await page.waitForFunction(
      () => document.querySelectorAll("button[aria-pressed]").length > 0,
      { timeout: 10_000 },
    );
    const taskChips = page.locator("button[aria-pressed]");
    if ((await taskChips.count()) >= 1) await taskChips.nth(0).click();
    await page.waitForTimeout(8_000);

    await page.getByRole("button", { name: /^continue$/i }).click();
    await page.waitForTimeout(8_000);

    await expect(page.locator("body")).toContainText(
      /Join policy|Leave policy/i,
      { timeout: 10_000 },
    );

    const taskJoinOpen = page
      .locator("button[aria-pressed]", { hasText: /^Open$/i })
      .first();
    if (await taskJoinOpen.isVisible().catch(() => false)) {
      await taskJoinOpen.click();
      await page.waitForTimeout(8_000);
    }

    await page
      .getByRole("button", { name: "Create task", exact: true })
      .click();

    await page.waitForTimeout(8_000);
    await expectHealthy(page);
    await expect(page.locator("body")).not.toContainText(/Task title/i);
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
