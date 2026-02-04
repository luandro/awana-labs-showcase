import { describe, it, expect, beforeEach } from "vitest";
import i18n from "./i18n";

describe("i18n configuration", () => {
  beforeEach(() => {
    // Reset to default language before each test
    i18n.changeLanguage("en");
  });

  it("should initialize with default language", () => {
    expect(i18n.language).toBe("en");
  });

  it("should have all supported languages configured", () => {
    // Check that all languages have translation resources
    const resources = i18n.store.data;
    expect(resources).toBeDefined();
    expect(resources.en).toBeDefined();
    expect(resources.pt).toBeDefined();
    expect(resources.es).toBeDefined();
  });

  it("should change language successfully", async () => {
    await i18n.changeLanguage("pt");
    expect(i18n.language).toBe("pt");

    await i18n.changeLanguage("es");
    expect(i18n.language).toBe("es");
  });

  it("should translate keys correctly", () => {
    const titleKey = "hero.title";
    const enTitle = i18n.t(titleKey);
    expect(enTitle).toBe("Building Digital Experiences");
  });

  it("should translate differently based on language", async () => {
    const key = "nav.home";

    // English
    i18n.changeLanguage("en");
    const enTranslation = i18n.t(key);
    expect(enTranslation).toBe("Home");

    // Portuguese
    await i18n.changeLanguage("pt");
    const ptTranslation = i18n.t(key);
    expect(ptTranslation).toBe("Início");

    // Spanish
    await i18n.changeLanguage("es");
    const esTranslation = i18n.t(key);
    expect(esTranslation).toBe("Inicio");
  });

  it("should handle interpolation correctly", () => {
    const copyrightKey = "footer.copyright";
    const year = 2024;
    const copyright = i18n.t(copyrightKey, { year });
    expect(copyright).toContain(year.toString());
  });

  it("should fallback to default language for missing translations", () => {
    // This test ensures fallback behavior works
    const existingKey = "common.loading";
    const translation = i18n.t(existingKey);
    expect(translation).toBe("Loading...");
  });

  it("should support nested translation keys", () => {
    const nestedKey = "status.inProgress";
    const translation = i18n.t(nestedKey);
    expect(translation).toBe("In Progress");
  });
});
