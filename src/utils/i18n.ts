// src/utils/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../locales/en/common.json';
import urTranslations from '../locales/ur/common.json';

function initI18nInstance() {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        common: enTranslations,
      },
      ur: {
        common: urTranslations,
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
  return i18n;
}

// initialize immediately
initI18nInstance();

export { initI18nInstance as initI18n };
export { i18n as i18nInstance };
export default i18n;