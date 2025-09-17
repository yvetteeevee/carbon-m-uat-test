import { test, expect } from "@playwright/test";
import { login } from "../utils/loginHelper";

test.describe("登入功能測試", () => {
  test("正確登入", async ({ page }) => {
    await login(page);
    await expect(
      page.getByTestId("select-company-card").getByText("Hello World")
    ).toBeVisible();
  });

  test("登入後畫面檢查", async ({ page }) => {
    await login(page);
    await page.getByTestId("enter-space-company-card-0").click();
    await expect(page.getByTestId("create-org-unit-btn")).toBeVisible();
  });

  test("輸入錯誤密碼不可登入", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("emailInput").fill(process.env.ID!);
    await page.getByTestId("passwordInput").fill("WrongPassword123");
    await page.getByTestId("login_btn").click();
    await expect(page.getByTestId("login_btn")).toBeEnabled();
    await expect(page.getByTestId("select-company-card")).not.toBeVisible();
  });

  test("帳號密碼都未填，登入按鈕不可點擊", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("login_btn")).toBeDisabled();
  });

  test("只填寫帳號，登入按鈕不可點擊", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("emailInput").fill(process.env.ID!);
    await expect(page.getByTestId("login_btn")).toBeDisabled();
  });

  test("只填寫密碼，登入按鈕不可點擊", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("passwordInput").fill("HelloWorld");
    await expect(page.getByTestId("login_btn")).toBeDisabled();
  });
});
