import { LinksForm, PasswordProfileForm } from "@features/profile";
import { SettingsMainForm } from "@features/profile";
import type { SettingsWrapper } from "@shared/ui/wrappers";
import { type ProfileSettingsMode } from "@entities/user";
import type { TFunction } from "i18next";

export interface SettingsFormConfig {
  component: React.ReactNode;
  wrapperProps?: Partial<React.ComponentProps<typeof SettingsWrapper>>;
}

export const getProfileSettingsForms = (
  t: TFunction,
): Record<ProfileSettingsMode, SettingsFormConfig> => ({
  settings: {
    component: <SettingsMainForm />,
    wrapperProps: {
      settingsTitle: t("settings.forms.settings.title"),
      settingsDescription: t("settings.forms.settings.description"),
    },
  },
  links: {
    component: <LinksForm />,
    wrapperProps: {
      settingsTitle: t("settings.forms.links.title"),
      settingsDescription: t("settings.forms.links.description"),
    },
  },
  security: {
    component: <PasswordProfileForm />,
    wrapperProps: {
      settingsTitle: t("settings.forms.security.title"),
      settingsDescription: t("settings.forms.security.description"),
    },
  },
});
