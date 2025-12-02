import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from '../locales/en.json';
import csTranslations from '../locales/cs.json';


// Available languages
export const availableLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸', translations: enTranslations },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿', translations: csTranslations },
];

// Create resources object from language files
const resources = availableLanguages.reduce((acc, lang) => {
  acc[lang.code] = {
    translation: lang.translations
  };
  return acc;
}, {} as Record<string, any>);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;