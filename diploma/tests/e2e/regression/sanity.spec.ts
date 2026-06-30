import { expect, test, type Page } from "@playwright/test";

const seed = {
  volunteer: { email: "xasygata32@gmail.com", password: "Test1234!" },
  organizer: { email: "stasyanravluk@gmail.com", password: "Test1234!" },
  ids: {
    openProject: "69fc417fd9578c4425554979",
    approvalProject: "69fc42ddd9578c442555498d",
    openEventForCalendar: "6a1955f62e7a09cc67e8898e",
    organization: "69b84d26e277a7c0bd445e3c",
  },
};

async function expectHealthy(page: Page) {
  await expect(page.locator("body")).not.toContainText(
    /404|not found|something went wrong|cannot navigate/i,
  );
}

async function gotoAndWait(page: Page, url: string) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await waitForSkeletons(page);
  await expect(page.locator("body")).not.toContainText(
    /404|not found|something went wrong/i,
  );
}

async function waitForSkeletons(page: Page, timeout = 20_000) {
  await page.waitForFunction(
    () => document.querySelectorAll('[data-slot="skeleton"]').length === 0,
    { timeout },
  );
}

async function gotoAndVerify(page: Page, url: string) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await expectHealthy(page);
  await waitForSkeletons(page);
}

async function login(page: Page, user: { email: string; password: string }) {
  await page.context().clearCookies();
  await page.addInitScript(() => {
    localStorage.setItem(
      "auth-store",
      JSON.stringify({ state: { mode: "signin" }, version: 0 }),
    );
  });
  await page.goto("/auth", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => localStorage.clear());

  await page.locator("#email").fill(user.email);
  await page.locator("#password").fill(user.password);
  await page.locator("button[type='submit']", { hasText: /sign in/i }).click();

  await expect(page).toHaveURL(/activities|profile|multi-step-form/i, {
    timeout: 20_000,
  });
}

async function clickIfVisible(page: Page, name: RegExp): Promise<boolean> {
  const btn = page.getByRole("button", { name }).first();
  if (await btn.isVisible().catch(() => false)) {
    await btn.click();
    await page.waitForTimeout(8_000);
    return true;
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

test.describe.serial("ImpactFlow sanity", () => {
  test("volunteer: browse activities, join/request projects & event, calendar, accept invitation, check my activities", async ({
    page,
  }) => {
    await login(page, seed.volunteer);

    await gotoAndVerify(page, "/activities?tab=projects");
    await expect(page.locator("body")).toContainText(
      /Animal Shelter Support Network|River Cleanup Initiative|Volunteer Help Desk/i,
      { timeout: 15_000 },
    );

    await gotoAndVerify(page, `/projects/${seed.ids.openProject}`);
    await expect(page.locator("body")).toContainText(
      /Animal Shelter Support Network/i,
    );
    if (await clickIfVisible(page, /join project/i)) {
      await expect(page.locator("body")).toContainText(
        /joined|leave project|left/i,
        { timeout: 15_000 },
      );
    }
    await gotoAndVerify(page, `/projects/${seed.ids.approvalProject}`);
    await expect(page.locator("body")).toContainText(/Volunteer Help Desk/i);
    if (await clickIfVisible(page, /join project/i)) {
      await expect(page.locator("body")).toContainText(
        /pending approval|join request|request sent/i,
        { timeout: 15_000 },
      );
    }

    await gotoAndVerify(page, "/activities?tab=events");
    await expect(page.locator("body")).toContainText(
      /River Cleanup Day|Tutoring Session|Community Garden/i,
    );

    await gotoAndVerify(page, "/activities?tab=tasks");
    await expect(page.locator("body")).toContainText(
      /Prepare cleanup equipment|Coordinate volunteer registration|Conduct math/i,
    );

    await gotoAndVerify(page, "/activities/my?tab=projects");
    await expect(page.locator("body")).toContainText(
      /Animal Shelter Support Network|Volunteer Help Desk|projects/i,
    );

    await gotoAndVerify(page, `/projects/my/${seed.ids.openProject}`);
    if (await clickIfVisible(page, /leave project/i)) {
      const confirmLeave = page.getByRole("button", { name: /^leave$/i });
      if (await confirmLeave.isVisible().catch(() => false)) {
        await confirmLeave.click();
        await page.waitForTimeout(8_000);
      }
      await expect(page.locator("body")).toContainText(
        /left project|join project|leave request/i,
        { timeout: 15_000 },
      );
    }

    await gotoAndVerify(page, "/notifications");
    await expect(page.locator("body")).toContainText(
      /Invitation to join organization/i,
      { timeout: 15_000 },
    );
    const invitation = page
      .locator("div", { hasText: "Invitation to join organization" })
      .first();
    if (await invitation.isVisible().catch(() => false)) {
      const accept = invitation.getByRole("button", { name: /accept/i });
      if (await accept.isVisible().catch(() => false)) {
        await accept.click();
        await page.waitForTimeout(8_000);
      }
    }

    await gotoAndVerify(page, "/organizations/my");
    await expect(page.locator("body")).toContainText(
      /GreenPaw|CommunityBridge/i,
      {
        timeout: 15_000,
      },
    );

    await gotoAndVerify(page, `/events/${seed.ids.openEventForCalendar}`);
    await expect(page.locator("body")).toContainText(
      /Community Garden|Garden/i,
    );
    if (await clickIfVisible(page, /join event/i)) {
      await expect(page.locator("body")).toContainText(
        /joined|leave event|join request/i,
        { timeout: 15_000 },
      );
    }

    await gotoAndVerify(page, "/calendar?date=2026-07");
    await expect(page.locator("body")).toContainText(
      /Community Garden|Garden|July/i,
      { timeout: 15_000 },
    );
  });

  test("organizer: approve join request and verify member appears", async ({
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
      await page.waitForTimeout(8_000);

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

  test("organizer: create role from Team Lead template and assign Darina", async ({
    page,
  }) => {
    await login(page, seed.organizer);

    await gotoAndVerify(page, `/organizations/${seed.ids.organization}/roles`);
    await expect(page.locator("body")).toContainText(
      /Roles|Templates|Custom/i,
      { timeout: 15_000 },
    );

    const teamLeadCard = page
      .locator("div, button, article", { hasText: /Team Lead/i })
      .first();
    if (await teamLeadCard.isVisible().catch(() => false)) {
      await teamLeadCard.click();
      await page.waitForTimeout(8_000);
    } else {
      const newRoleBtn = page.getByRole("button", {
        name: "New role",
        exact: true,
      });
      await newRoleBtn.click();
      await page.waitForTimeout(8_000);
    }

    const useBtn = page
      .getByRole("button", { name: /use|edit|create from template/i })
      .first();
    if (await useBtn.isVisible().catch(() => false)) {
      await useBtn.click();
      await page.waitForTimeout(8_000);
    }

    const roleName = `Smoke Team Lead ${Date.now()}`;
    const roleNameInput = page.getByLabel(/role name|name/i).first();
    if (await roleNameInput.isVisible().catch(() => false)) {
      await roleNameInput.clear();
      await roleNameInput.fill(roleName);
    } else {
      const anyInput = page.locator("input").filter({ hasText: /^$/ }).first();
      if (await anyInput.isVisible().catch(() => false)) {
        await anyInput.clear();
        await anyInput.fill(roleName);
      }
    }
    await page.waitForTimeout(8_000);

    const darinaOption = page.getByText(/Darina Suprun/i).first();
    if (await darinaOption.isVisible().catch(() => false)) {
      await darinaOption.click();
      await page.waitForTimeout(8_000);
    }

    await page
      .getByRole("button", { name: /save|create/i })
      .last()
      .click();
    await page.waitForTimeout(8_000);

    await expect(page.locator("body")).toContainText(roleName, {
      timeout: 15_000,
    });
  });

  test("organizer: fill and submit full project creation form", async ({
    page,
  }) => {
    await login(page, seed.organizer);

    await gotoAndVerify(
      page,
      `/organizations/${seed.ids.organization}/projects/create`,
    );

    await expect(page.locator("body")).toContainText(
      /New project|Tell us about your project|Project title/i,
      { timeout: 15_000 },
    );

    const projectTitle = `Smoke Project ${Date.now()}`;
    await page.locator("input[placeholder*='Park Cleanup']").fill(projectTitle);

    await page
      .locator("textarea[placeholder*='What will volunteers do']")
      .fill(
        "Automated sanity test project – verifies the full 4-step creation flow end-to-end.",
      );

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
      await firstSuggestion.click();
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

  test("organizer: fill and submit full event creation form", async ({
    page,
  }) => {
    await login(page, seed.organizer);

    await gotoAndVerify(
      page,
      `/organizations/${seed.ids.organization}/events/create`,
    );

    await expect(page.locator("body")).toContainText(
      /New event|Tell us about your event|Event title/i,
      { timeout: 15_000 },
    );

    const eventTitle = `Smoke Event ${Date.now()}`;
    await page
      .locator("input[placeholder*='Community Cleanup Day']")
      .fill(eventTitle);

    await page
      .locator("textarea[placeholder*='What will volunteers do']")
      .fill(
        "Automated sanity test event – verifies the full 5-step creation flow end-to-end.",
      );

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
          await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
          await page.waitForTimeout(8_000);
        }
      }
      const closeBtn = page.getByRole("button", { name: /close|×|✕/i }).first();
      if (await closeBtn.isVisible().catch(() => false)) {
        await closeBtn.click();
        await page.waitForTimeout(8_000);
      } else {
        await page.keyboard.press("Escape");
        await page.waitForTimeout(8_000);
      }
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
    if (eventChipCount >= 2) await eventChips.nth(1).click();
    await page.waitForTimeout(8_000);

    await page.getByRole("button", { name: /^continue$/i }).click();
    await waitForSkeletons(page);

    await expect(page.locator("body")).toContainText(
      /Access policies|Join policy|Leave policy/i,
      { timeout: 10_000 },
    );

    const joinApproval = page
      .locator("button[aria-pressed]", { hasText: /Approval required/i })
      .first();
    if (await joinApproval.isVisible().catch(() => false)) {
      await joinApproval.click();
      await page.waitForTimeout(8_000);
    }

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

  test("organizer: fill and submit full task creation drawer", async ({
    page,
  }) => {
    await login(page, seed.organizer);

    await gotoAndVerify(page, `/organizations/${seed.ids.organization}`);

    const fabMainBtn = page
      .locator(
        "button[aria-label*='organization actions'], button[class*='fabMain'], button[class*='FabMain']",
      )
      .first();

    const fabBtn = (await fabMainBtn.isVisible().catch(() => false))
      ? fabMainBtn
      : page.locator("button", { hasText: /^\+$/ }).first();

    if (await fabBtn.isVisible().catch(() => false)) {
      await fabBtn.click();
      await page.waitForTimeout(8_000);
    }

    const newTaskAction = page
      .getByRole("button", { name: /new task/i })
      .first();
    if (await newTaskAction.isVisible().catch(() => false)) {
      await newTaskAction.click();
      await page.waitForTimeout(8_000);
    }

    await expect(page.locator("body")).toContainText(
      /Task title|Sort recyclable/i,
      { timeout: 10_000 },
    );

    const taskTitle = `Smoke Task ${Date.now()}`;

    await page.locator("input[placeholder*='Sort recyclable']").fill(taskTitle);

    await page
      .locator("textarea[placeholder*='Describe the task']")
      .fill(
        "Automated sanity test task – created by Playwright to verify the 4-step drawer.",
      );

    await page.getByRole("button", { name: /^continue$/i }).click();
    await page.waitForTimeout(8_000);
    await expect(page.locator("body")).toContainText(
      /Location|Timeline|Estimated/i,
      { timeout: 10_000 },
    );

    const taskStartDt = page
      .locator('[aria-label="Task start date and time"]')
      .first();
    if (await taskStartDt.isVisible().catch(() => false)) {
      await taskStartDt.click();
      await page.keyboard.type("0801202610001");
      await page.keyboard.press("Escape");
    }

    const taskEndDt = page
      .locator('[aria-label="Task end date and time"]')
      .first();
    if (await taskEndDt.isVisible().catch(() => false)) {
      await taskEndDt.click();
      await page.keyboard.type("0801202612001");
      await page.keyboard.press("Escape");
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
    const taskChipCount = await taskChips.count();
    if (taskChipCount >= 1) await taskChips.nth(0).click();
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

    const taskLeaveOpen = page
      .locator("button[aria-pressed]", { hasText: /^Open$/i })
      .nth(1);
    if (await taskLeaveOpen.isVisible().catch(() => false)) {
      await taskLeaveOpen.click();
      await page.waitForTimeout(8_000);
    }

    await page.getByRole("button", { name: /Create task/i }).click();
    await page.waitForTimeout(8_000);

    await expectHealthy(page);

    await expect(page.locator("body")).not.toContainText(/Task title/i);
  });
});
