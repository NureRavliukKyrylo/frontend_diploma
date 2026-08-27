import { GoogleIcon } from "@shared/assets/icons/brands";
import { GoogleCalendarIcon } from "@shared/assets/icons/info";
import type { TFunction } from "i18next";

export type ConnectedServiceId = "google" | "googleCalendar";

export interface ConnectedServiceConfig {
  id: ConnectedServiceId;
  category: "account" | "integration";
  imageLink: string;
  title: string;
  description: string;
}

export const getConnectedServicesConfig = (
  t: TFunction,
): ConnectedServiceConfig[] => [
  {
    id: "google",
    category: "account",
    imageLink: GoogleIcon,
    title: t("profile:connections.google.title"),
    description: t("profile:connections.google.description"),
  },
  {
    id: "googleCalendar",
    category: "integration",
    imageLink: GoogleCalendarIcon,
    title: t("profile:connections.googleCalendar.title"),
    description: t("profile:connections.googleCalendar.description"),
  },
];
