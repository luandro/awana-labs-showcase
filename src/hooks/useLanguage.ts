import { useTranslation } from "react-i18next";
import type { SupportedLanguage } from "@/types/i18n";
import { SUPPORTED_LANGUAGES } from "@/types/i18n";

/**
 * Custom hook for i18n functionality with language management
 * @returns Object containing current language, change function, t function, and supported languages
 */
export function useLanguage() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = i18n.language as SupportedLanguage;

  return {
    t,
    i18n,
    currentLanguage,
    changeLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
}
