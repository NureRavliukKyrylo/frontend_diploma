import { type ProfileMode } from "@entities/user";
import type { User } from "@entities/user/profile";
import styles from "../ui/MainProfilePage.module.scss";
import { ProfileSkillsTab } from "../../skill-tab";
import { ProfileInventoryTab } from "../../inventory-tab";
import { ProfileMainTab } from "../../main-tab/ProfileMainTab";

interface ProfileFormProps {
  user?: User;
}

export const profileMainForms: Record<
  ProfileMode,
  (props: ProfileFormProps) => React.ReactNode
> = {
  profile: ({ user }) => <ProfileMainTab user={user} />,
  statistics: () => <div className={styles.projectsBlock}></div>,
  skills: () => <ProfileSkillsTab />,
  inventory: () => <ProfileInventoryTab />,
};
