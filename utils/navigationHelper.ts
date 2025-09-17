// util{ Page, expect } from '@playwright/test';
import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

// 導航到專案列表頁面
export async function navigateToProjectList(page: Page) {
  await page.getByTestId("project").click();
  await expect(page.getByTestId("create-project-button")).toBeVisible();
}

// 導航到建立新專案頁面
export async function navigateToCreateProjectForm(page: Page) {
  await page.getByTestId("create-project-button").click();
}
