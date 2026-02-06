import "i18next";
import { Translations } from "./i18n";

// Extend i18next types with our custom translation resources
declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: Translations;
    };
  }
}
