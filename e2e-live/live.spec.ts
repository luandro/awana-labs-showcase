import { test, expect } from "@playwright/test";

/**
 * Live site tests - run against the deployed GitHub Pages site
 * These tests verify the actual deployed site is working
 */

const BASE_URL =
  process.env.BASE_URL || "https://luandro.github.io/awana-labs-showcase/";

test.use({
  baseURL: BASE_URL,
});

test.describe("Live Site Tests", () => {
  test("homepage loads and is accessible", async ({ page }) => {
    const response = await page.goto("/");

    // Should return 200 OK
    expect(response?.status()).toBe(200);

    // Check page title
    await expect(page).toHaveTitle(/Lovable App|Awana/);

    // React root should exist
    const root = page.locator("#root");
    await expect(root).toBeVisible();

    // Should have content
    const bodyText = await page.locator("body").textContent();
    expect(bodyText?.trim().length).toBeGreaterThan(50);
  });

  test("404 redirect works on live site", async ({ page }) => {
    // Navigate to a non-existent route
    const response = await page.goto("/this-route-does-not-exist");

    // Should get 200 because 404.html redirects to index.html
    expect(response?.status()).toBe(200);

    // React root should be visible
    await expect(page.locator("#root")).toBeVisible();
  });

  test("no critical console errors", async ({ page }) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForTimeout(3000);

    // Filter for critical errors only
    const criticalErrors = errors.filter(
      (e) =>
        e.includes("Uncaught") ||
        e.includes("TypeError") ||
        e.includes("ReferenceError") ||
        e.includes("Failed to fetch"),
    );

    if (criticalErrors.length > 0) {
      console.error("Critical errors found:", criticalErrors);
    }

    expect(criticalErrors).toHaveLength(0);
  });

  test("page loads within reasonable time", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(15000);
  });

  test("assets are loading correctly", async ({ page }) => {
    const failedRequests: string[] = [];

    page.on("response", (response) => {
      if (response.status() >= 400) {
        failedRequests.push(`${response.url()} - ${response.status()}`);
      }
    });

    await page.goto("/");
    await page.waitForTimeout(3000);

    expect(failedRequests).toHaveLength(0);
  });

  test("404.html exists and is accessible", async ({ page }) => {
    const response = await page.goto("/404.html");

    expect(response?.status()).toBe(200);

    const content = await page.content();
    expect(content).toContain("l.replace");
  });
});
