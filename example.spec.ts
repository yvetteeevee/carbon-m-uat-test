import { test, expect } from "@playwright/test";

test("基本網頁測試", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(/Playwright/);
  await page.click("text=Get started");
  await expect(page.locator("h1")).toContainText("Installation");
});
