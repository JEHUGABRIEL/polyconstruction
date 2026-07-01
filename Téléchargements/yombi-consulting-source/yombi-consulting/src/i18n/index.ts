import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import fr from './locales/fr/translation.json';
import en from './locales/en/translation.json';

// Initialisation d'i18next avec détection automatique de la langue du navigateur
// Le français (fr) est défini comme langue de repli si la langue détectée n'est pas supportée
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false, // React échappe déjà les valeurs XSS
    },
  });

export default i18n;
