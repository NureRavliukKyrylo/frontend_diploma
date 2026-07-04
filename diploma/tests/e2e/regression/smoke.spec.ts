import { expect, test, type Page } from "@playwright/test";
import { execSync } from "child_process";

const seed = {
  user: {
    email: "xasygata32@gmail.com",
    password: "Test1234!",
  },
  ids: {
    category: "69865875444e0ab357536015",
    project: "69fc417fd9578c4425554979",
    joinableProject: "69fc42cbd9578c4425554981",
    event: "69fc43b0d9578c4425554993",
    organization: "69fc4150d9578c4425554978",
    offer: "6a27eb43704825d19256eb0a",
    chatId: "6a267804e611d60f73e39a5a",
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

async function loginAsSeedUser(page: Page) {
  await forceEnglish(page);
  await page.addInitScript(() => {
    localStorage.setItem(
      "auth-store",
      JSON.stringify({ state: { mode: "signin" }, version: 0 }),
    );
  });
  await page.goto("/auth", { waitUntil: "domcontentloaded" });
  await page.locator("#email").fill(seed.user.email);
  await page.locator("#password").fill(seed.user.password);
  await page.locator("button[type='submit']", { hasText: /sign in/i }).click();
  await expect(page).toHaveURL(/\/activities|\/profile|\/multi-step-form/i, {
    timeout: 20_000,
  });
}

async function openAndExpect(
  page: Page,
  url: string,
  expectedText: string | RegExp,
) {
  await page.goto(url, { waitUntil: "domcontentloaded" });

  await page.waitForFunction(
    () => {
      return document.querySelectorAll('[data-slot="skeleton"]').length === 0;
    },
    { timeout: 40_000 },
  );

  await expect(page.locator("body")).toContainText(expectedText, {
    timeout: 20_000,
  });
  await expect(page.locator("body")).not.toContainText(
    /404|not found|something went wrong/i,
  );
  await page.waitForTimeout(300);
}

test.describe("Must-have public smoke", () => {
  test.afterAll(async () => {
    execSync('mongosh "mongodb://localhost:27017" tests/seedScript.js', {
      stdio: "inherit",
    });
  });
  test.beforeEach(async ({ page }) => {
    await loginAsSeedUser(page);
  });

  test("landing page renders main CTA", async ({ page }) => {
    await openAndExpect(page, "/", /Your time.*changes.*the world/i);
    await expect(
      page.getByRole("link", { name: /start your mission/i }),
    ).toBeVisible();
  });

  test("auth page renders sign in form", async ({ page }) => {
    await openAndExpect(page, "/auth", /sign in/i);
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
  });

  test("categories page shows seeded category", async ({ page }) => {
    await openAndExpect(
      page,
      "/categories",
      /Education Projects|Animal Rescue|Environmental Aid/i,
    );
  });

  test("category detail page shows seeded category content", async ({
    page,
  }) => {
    await openAndExpect(
      page,
      `/categories/${seed.ids.category}`,
      /Education Projects|learning and educational resources/i,
    );
  });

  test("activities page shows seeded activity blocks", async ({ page }) => {
    await openAndExpect(
      page,
      "/activities",
      /River Cleanup Initiative|River Cleanup Day|Prepare cleanup equipment/i,
    );
  });

  test("project detail page shows seeded project", async ({ page }) => {
    await openAndExpect(
      page,
      `/projects/${seed.ids.project}`,
      /Animal Shelter Support Network|Coordinated river cleanup/i,
    );
  });

  test("event detail page shows seeded event", async ({ page }) => {
    await openAndExpect(
      page,
      `/events/${seed.ids.event}`,
      /River Cleanup Day|Monthly river cleanup/i,
    );
  });

  test("public map route renders activity/map shell", async ({ page }) => {
    await openAndExpect(page, "/map", /map|filter|River Cleanup|GreenPaw/i);
  });

  test("profile page shows logged-in seeded user", async ({ page }) => {
    await openAndExpect(
      page,
      "/profile",
      /Darina Suprun|xasygata32@gmail.com/i,
    );
  });

  test("organizations list shows seeded organizations", async ({ page }) => {
    await openAndExpect(
      page,
      "/organizations",
      /GreenPaw Foundation|CommunityBridge/i,
    );
  });

  test("organization detail route opens seeded organization", async ({
    page,
  }) => {
    await openAndExpect(
      page,
      `/organizations/${seed.ids.organization}`,
      /GreenPaw Foundation|animal rescue|environmental protection/i,
    );
  });

  test("time bank page shows seeded offers", async ({ page }) => {
    await openAndExpect(
      page,
      "/time-bank?tab=offers",
      /Ukrainian Language Tutoring|Dog Walking Service|Editing & Proofreading/i,
    );
  });

  test("offer detail page shows seeded offer", async ({ page }) => {
    await openAndExpect(
      page,
      `/offers/${seed.ids.offer}`,
      /Editing & Proofreading|Professional proofreading/i,
    );
  });

  test("my activities page opens for authenticated user", async ({ page }) => {
    await openAndExpect(
      page,
      "/activities/my",
      /activities|projects|events|tasks/i,
    );
  });

  test("joins a project, finds it in my activities, and leaves it", async ({
    page,
  }) => {
    const projectTitle = "Children's After-School Tutoring Program";

    await openAndExpect(
      page,
      `/projects/${seed.ids.joinableProject}`,
      projectTitle,
    );

    await page.getByRole("button", { name: /join project/i }).click();

    await expect(page.locator("body")).toContainText(
      /joined project|join request|leave project/i,
      { timeout: 20_000 },
    );

    await page.waitForTimeout(15000);

    await openAndExpect(page, "/activities/my?tab=projects", projectTitle);

    const projectCard = page.locator("body").getByText(projectTitle).first();
    await expect(projectCard).toBeVisible({ timeout: 20_000 });

    await page
      .getByRole("link", { name: /get started/i })
      .first()
      .click();

    await expect(page).toHaveURL(/\/projects\/my\//, { timeout: 20_000 });
    await expect(page.locator("body")).toContainText(projectTitle);

    await page.getByRole("button", { name: /leave project/i }).click();
    await page.getByRole("button", { name: /^leave$/i }).click();

    await page.waitForTimeout(15000);

    await expect(page.locator("body")).toContainText(
      /left project|join project|leave request/i,
      { timeout: 20_000 },
    );
  });
  test("books Editing & Proofreading from offers", async ({ page }) => {
    const offerTitle = "Editing & Proofreading";

    await openAndExpect(page, "/time-bank?tab=offers", offerTitle);

    const offerCard = page
      .locator("div", { hasText: offerTitle })
      .filter({ has: page.getByRole("button", { name: /take/i }) })
      .first();

    await expect(offerCard).toBeVisible({ timeout: 20_000 });
    await offerCard.getByRole("button", { name: /take/i }).first().click();

    await expect(page).toHaveURL(/\/offers\//, { timeout: 20_000 });
    await expect(page.locator("body")).toContainText(offerTitle);

    await page.getByRole("button", { name: /book now/i }).click();

    await page
      .locator("textarea[name='comment'], textarea")
      .fill("Smoke test booking request for proofreading.");

    await page.getByRole("button", { name: /send request/i }).click();

    await expect(page.locator("body")).toContainText(
      /pending|request sent|cancel booking|booking/i,
      { timeout: 20_000 },
    );
  });

  test("opens seeded chat, sends a message, and sees it", async ({ page }) => {
    const message = `Smoke chat message ${Date.now()}`;

    await openAndExpect(page, "/chat", /chat|loading|messages/i);

    await page.goto(`/chat?chatId=${seed.ids.chatId}`, {
      waitUntil: "domcontentloaded",
    });

    await expect(page.locator("body")).not.toContainText(
      /something went wrong|404/i,
    );
    await expect(
      page.locator("textarea#body, textarea[name='body'], textarea"),
    ).toBeVisible({
      timeout: 20_000,
    });

    const input = page
      .locator("textarea#body, textarea[name='body'], textarea")
      .first();
    await input.fill(message);
    await input.press("Enter");

    await expect(page.locator("body")).toContainText(message, {
      timeout: 20_000,
    });
  });

  test("switches language to Ukrainian and shows localized navigation", async ({
    page,
  }) => {
    await page.goto("/activities", {
      waitUntil: "domcontentloaded",
    });

    await page.getByLabel("Language").click();

    await page
      .locator('[role="menuitemradio"]', { hasText: /Українська/i })
      .click();

    await expect(page.locator("body")).toContainText(/активності/i, {
      timeout: 20_000,
    });
    await expect(page.locator("body")).toContainText(/карта/i, {
      timeout: 20_000,
    });
  });
});
