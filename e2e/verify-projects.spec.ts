import { test, expect } from "@playwright/test";

test("Verify both CoMapeo projects are visible", async ({ page }) => {
  // Navigate to the correct URL with base path
  await page.goto("http://localhost:4173/awana-labs-showcase/");

  // Wait for the page to load
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);

  // Take a screenshot for verification
  await page.screenshot({ path: "verified-projects.png", fullPage: true });

  // Check that both projects are present in the page content
  const pageContent = await page.textContent("body");

  // Verify CoMapeo Documentation (Issue #3)
  expect(pageContent?.toLowerCase()).toContain("comapeo documentation");
  expect(pageContent?.toLowerCase()).toContain("documentation");

  // Verify CoMapeo Config Spreadsheet Plugin (Issue #2)
  expect(pageContent?.toLowerCase()).toContain(
    "comapeo config spreadsheet plugin",
  );
  expect(pageContent?.toLowerCase()).toContain("spreadsheet");

  // Verify both projects are displayed as cards
  expect(pageContent?.toLowerCase()).toContain("awana digital");
  expect(pageContent?.toLowerCase()).toContain("mapping");

  console.log("✅ Both CoMapeo projects are visible on the page!");
  console.log("📸 Screenshot saved as verified-projects.png");
});
