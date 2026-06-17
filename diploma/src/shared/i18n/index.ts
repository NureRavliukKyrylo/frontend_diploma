import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import uaCommon from "./locales/ua/common.json";
import enAuth from "./locales/en/auth.json";
import uaAuth from "./locales/ua/auth.json";
import enProfile from "./locales/en/profile.json";
import uaProfile from "./locales/ua/profile.json";
import enSkill from "./locales/en/skill.json";
import uaSkill from "./locales/ua/skill.json";
import enTimeBank from "./locales/en/time-bank.json";
import uaTimeBank from "./locales/ua/time-bank.json";
import enActivities from "./locales/en/activities.json";
import uaActivities from "./locales/ua/activities.json";
import uaProject from "./locales/ua/project.json";
import enProject from "./locales/en/project.json";
import uaFeedback from "./locales/ua/feedback.json";
import enFeedback from "./locales/en/feedback.json";
import enEvent from "./locales/en/event.json";
import uaEvent from "./locales/ua/event.json";
import enTask from "./locales/en/task.json";
import uaTask from "./locales/ua/task.json";
import enCategory from "./locales/en/category.json";
import uaCategory from "./locales/ua/category.json";
import enBadge from "./locales/en/badge.json";
import uaBadge from "./locales/ua/badge.json";
import enCalendar from "./locales/en/calendar.json";
import uaCalendar from "./locales/ua/calendar.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  resources: {
    en: {
      common: enCommon,
      auth: enAuth,
      profile: enProfile,
      skill: enSkill,
      timeBank: enTimeBank,
      activities: enActivities,
      project: enProject,
      feedback: enFeedback,
      event: enEvent,
      task: enTask,
      category: enCategory,
      badge: enBadge,
      calendar: enCalendar,
    },
    ua: {
      common: uaCommon,
      auth: uaAuth,
      profile: uaProfile,
      skill: uaSkill,
      timeBank: uaTimeBank,
      activities: uaActivities,
      project: uaProject,
      feedback: uaFeedback,
      event: uaEvent,
      task: uaTask,
      category: uaCategory,
      badge: uaBadge,
      calendar: uaCalendar,
    },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
