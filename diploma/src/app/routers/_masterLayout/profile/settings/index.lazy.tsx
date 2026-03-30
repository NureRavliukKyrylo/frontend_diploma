import { SettingsProfilePage } from "@pages/profile";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_masterLayout/profile/settings/")({
  component: SettingsProfilePage,
});
