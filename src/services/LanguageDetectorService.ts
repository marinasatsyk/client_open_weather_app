import i18n, { Module } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import SEARCH_FR from "../config/locale/fr/search.json";

// const ressources = {
//   fr: {
//     search: SEARCH_FR,
//   },
//   en: {},
// };

// const customLanguageDetector = {
//     type: 'languageDetector',
//     async: true,
//     detect: (callback: (lng: string) => void) => {
//         const lang = store.getState().language;
//         callback(lang);
//         return lang;
//     }
//     init: NOTHING,
//     cachUserLanguage: NOTHING
// }

// i18n
//   .use(initReactI18next)
//   .use(LanguageDetector)
//   .init({
//     ressources,
//     fallbackLng: "fr",
//     interpolation: {
//       escapeValue: false,
//     },
//   });
// export default i18n;
