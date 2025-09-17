import type { Page } from "@playwright/test";

export async function login(page: Page) {
  await page.goto("/");
  await page.getByTestId("emailInput").fill(process.env.ID!);
  await page.getByTestId("passwordInput").fill(process.env.PASSWORD!);
  await page.getByTestId("login_btn").click();
}

export async function enterMainPage(page: Page) {
  await page.getByTestId("enter-space-company-card-0").click();
}

// 整合登入到主要頁面
export async function loginAndEnterMainPage(page: Page) {
  await login(page);
  return await enterMainPage(page);
}
