// tests/create-project.spec.ts
import { test, expect } from "@playwright/test";
import { loginAndEnterMainPage } from "../utils/loginHelper";
import {
  navigateToProjectList,
  navigateToCreateProjectForm,
} from "../utils/navigationHelper";

// 測試資料（名稱加上時間戳）
const newProjectData = {
  name: `測試專案_${new Date().getTime()}`,
  code: `AUTOCode_${new Date().getTime()}`,
  country: "c69f5df3-6dff-4d78-8c69-6fc8e2fe4083",
  target: "專案目標",
  standard: "ISO 14064-1:2018/CNS 14064-1:2021",
  auditPurpose: "EXTERNAL",
  offsiteName: "場址外_名稱",
  offsiteAddress: "場址外_地址",
  onsiteName: "場址內_名稱",
  onsiteAddress: "場址內_地址",
  settingRule: "CONTROL_APPROACH_FIN_CONTROL",
};

test.describe("專案管理", () => {
  test("成功建立新專案", async ({ page }) => {
    // 登入並進入主頁
    await loginAndEnterMainPage(page);

    // 帶到建立新專案頁面
    await navigateToProjectList(page);
    await navigateToCreateProjectForm(page);

    // 填寫表單資訊
    await page.getByTestId("collectionPeriod").click();
    await page.getByTestId("month_dropdown").selectOption("12");
    await page
      .getByRole("option", { name: "Choose Tuesday, December 30th, 2025" })
      .click();

    await page.getByTestId("month_dropdown").waitFor({ state: "visible" });

    await page.getByTestId("year_dropdown").selectOption("2026");
    await page.getByTestId("month_dropdown").selectOption("01");
    await page
      .getByRole("option", { name: "Choose Friday, January 23rd, 2026" })
      .click();

    await page.getByTestId("projectName").fill(newProjectData.name);
    await page.getByTestId("country").selectOption(newProjectData.country);
    await page.locator("#goal").fill(newProjectData.target);
    await page.getByTestId("audit-purpose-EXTERNAL").click();
    await page.getByText(newProjectData.standard, { exact: true }).click();

    await page.getByTestId("offsiteCoverageAreas_add").click();
    await page
      .getByTestId("offsiteCoverageAreas_name_0")
      .fill(newProjectData.offsiteName);
    await page
      .getByTestId("offsiteCoverageAreas_address_0")
      .fill(newProjectData.offsiteAddress);

    await page.getByTestId("onsiteDeductionAreas_add").click();
    await page
      .getByTestId("onsiteDeductionAreas_name_0")
      .fill(newProjectData.onsiteName);
    await page
      .getByTestId("onsiteDeductionAreas_address_0")
      .fill(newProjectData.onsiteAddress);

    await page
      .getByTestId("settingRule")
      .selectOption(newProjectData.settingRule);

    const projectCode = await page.getByTestId("projectCode").inputValue();

    // 確認送出表單並確認projectCode
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.locator('[id^="chakra-modal--header-"]')).toBeVisible();
    await page.getByTestId("ok_btn").click();
    await expect(page.getByText(projectCode)).toBeVisible();

    // 驗證專案列表中的新專案
    await navigateToProjectList(page);
    const newProjectRow = page.getByRole("row", { name: newProjectData.name });
    await expect(newProjectRow).toBeVisible();
    await expect(page.getByText(projectCode)).toBeVisible();
    await expect(page.getByText(newProjectData.name)).toBeVisible();
  });
});
