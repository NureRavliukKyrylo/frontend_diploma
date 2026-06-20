import axios from "axios";
import { API_URL, LOCALE_MAP } from "@shared/config/constants";
import { useLocaleStore } from "@shared/config/stores";

export const apiClient = axios.create({
  baseURL: `${API_URL}/api/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const savedLocale =
    useLocaleStore.getState().locale ??
    (["uk", "ru"].some((lang) => navigator.language.startsWith(lang))
      ? "uk"
      : "en");
  config.headers["Accept-Language"] = LOCALE_MAP[savedLocale];
  return config;
});
