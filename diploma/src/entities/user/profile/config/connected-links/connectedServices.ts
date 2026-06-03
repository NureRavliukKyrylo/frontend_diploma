import { GoogleIcon } from "@shared/assets/icons/brands";
import { GoogleCalendarIcon } from "@shared/assets/icons/info";

export type ConnectedServiceId = "google" | "googleCalendar";

export interface ConnectedServiceConfig {
  id: ConnectedServiceId;
  category: "account" | "integration";
  imageLink: string;
  title: string;
  description: string;
}

export const CONNECTED_SERVICES_CONFIG: ConnectedServiceConfig[] = [
  {
    id: "google",
    category: "account",
    imageLink: GoogleIcon,
    title: "Google account",
    description: "Stay in sync with Google",
  },
  {
    id: "googleCalendar",
    category: "integration",
    imageLink: GoogleCalendarIcon,
    title: "Google Calendar",
    description: "Sync your calendar events",
  },
] as const;
