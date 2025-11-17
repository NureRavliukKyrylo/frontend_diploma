import { type ProfileMode } from "@entities/user";
import { ProfileMainWidget } from "@widgets/profile";

export const profileMainForms: Record<ProfileMode, React.ReactNode> = {
  profile: <ProfileMainWidget />,
  projects: <></>,
  archive: <></>,
  inventory: <></>,
};
