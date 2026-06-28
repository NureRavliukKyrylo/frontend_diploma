import axios, { AxiosHeaders } from "axios";
import { API_URL, LOCALE_MAP } from "@shared/config/constants";
import { useLocaleStore } from "@shared/config/stores";

export const apiClient = axios.create({
  baseURL: `${API_URL}/api/`,
  timeout: 20000,
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
  const headers = AxiosHeaders.from(config.headers);

  if (typeof FormData !== "undefined" && config.data instanceof FormData) {
    headers.delete("Content-Type");
  }

  headers.set("Accept-Language", LOCALE_MAP[savedLocale]);
  config.headers = headers;

  return config;
});
