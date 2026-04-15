import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import enTranslations from "../locales/en.json";

// Only English is supported
export const availableLanguages = [
  { code: "en", name: "English", flag: "🇺🇸", translations: enTranslations },
];

const resources = {
  en: { translation: enTranslations },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  supportedLngs: ["en"],
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;