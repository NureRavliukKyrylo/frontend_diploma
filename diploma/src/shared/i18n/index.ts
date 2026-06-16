import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import uaCommon from "./locales/ua/common.json";
import enAuth from "./locales/en/auth.json";
import uaAuth from "./locales/ua/auth.json";
import enProfile from "./locales/en/profile.json";
import uaProfile from "./locales/ua/profile.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  resources: {
    en: { common: enCommon, auth: enAuth, profile: enProfile },
    ua: { common: uaCommon, auth: uaAuth, profile: uaProfile },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
