import { LinksForm, PasswordProfileForm } from "@features/profile";
import { SettingsMainForm } from "@features/profile";
import type { SettingsWrapper } from "@shared/ui/wrappers";
import { type ProfileSettingsMode } from "@entities/user";

export interface SettingsFormConfig {
  component: React.ReactNode;
  wrapperProps?: Partial<React.ComponentProps<typeof SettingsWrapper>>;
}

export const profileSettingsForms: Record<
  ProfileSettingsMode,
  SettingsFormConfig
> = {
  settings: {
    component: <SettingsMainForm />,
    wrapperProps: {
      settingsTitle: "User profile",
      settingsDescription:
        "Update your personal photo, links, and account details here.",
    },
  },
  links: {
    component: <LinksForm />,
    wrapperProps: {
      settingsTitle: "Social links",
      settingsDescription:
        "Add your social media links to connect your profiles in one place.",
    },
  },
  security: {
    component: <PasswordProfileForm />,
    wrapperProps: {
      settingsTitle: "Security",
      settingsDescription: "Manage your account security",
    },
  },
};
