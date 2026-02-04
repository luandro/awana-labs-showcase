// Type definitions for i18next translations
// This file provides type safety for translation keys

export interface TranslationResources {
  nav: {
    home: string;
    about: string;
    projects: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewProject: string;
    technologies: string;
    status: string;
  };
  footer: {
    copyright: string;
    madeWith: string;
    love: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
    close: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    search: string;
    filter: string;
    sort: string;
    noResults: string;
    viewMore: string;
  };
  status: {
    active: string;
    completed: string;
    inProgress: string;
    planned: string;
  };
}

// Recursively convert all string values to string templates for interpolation
type RecursiveInterpolation<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends Record<string, unknown>
      ? RecursiveInterpolation<T[K]>
      : never;
};

export type Translations = RecursiveInterpolation<TranslationResources>;

// Supported languages
export type SupportedLanguage = "en" | "pt" | "es";

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, string> = {
  en: "English",
  pt: "Português",
  es: "Español",
};
