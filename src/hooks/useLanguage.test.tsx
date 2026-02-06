import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLanguage } from "./useLanguage";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

describe("useLanguage hook", () => {
  beforeEach(() => {
    // Reset to default language before each test
    i18n.changeLanguage("en");
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  );

  it("should return current language", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.currentLanguage).toBe("en");
  });

  it("should provide translation function", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(typeof result.current.t).toBe("function");
  });

  it("should translate keys correctly", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    const title = result.current.t("hero.title");
    expect(title).toBe("Building Digital Experiences");
  });

  it("should change language successfully", async () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    await act(async () => {
      result.current.changeLanguage("pt");
    });

    expect(result.current.currentLanguage).toBe("pt");

    const homeTranslation = result.current.t("nav.home");
    expect(homeTranslation).toBe("Início");
  });

  it("should return supported languages", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.supportedLanguages).toEqual({
      en: "English",
      pt: "Português",
      es: "Español",
    });
  });

  it("should provide i18n instance", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.i18n).toBeDefined();
    expect(typeof result.current.i18n.changeLanguage).toBe("function");
  });

  it("should handle interpolation in translations", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    const copyright = result.current.t("footer.copyright", { year: 2024 });
    expect(copyright).toContain("2024");
  });
});
