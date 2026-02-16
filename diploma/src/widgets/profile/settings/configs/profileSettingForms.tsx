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
  main: {
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
  password: {
    component: <PasswordProfileForm />,
    wrapperProps: {
      settingsTitle: "Change password",
      settingsDescription:
        "Change your password securely — a verification code will be sent to your registered email or phone to confirm the update.",
    },
  },
};
