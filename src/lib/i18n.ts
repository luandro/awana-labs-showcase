import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import en from "../locales/en/common.json";
import pt from "../locales/pt/common.json";
import es from "../locales/es/common.json";

const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
  es: {
    translation: es,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false, // Disable suspense for SSR compatibility
  },
});

export default i18n;
