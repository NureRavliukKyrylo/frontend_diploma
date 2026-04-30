import {
  type InventoryProfileSearchParams,
  type ProfileMode,
  type ProfileSearchParams,
  type SkillsProfileSearchParams,
} from "@entities/user";
import type { User } from "@entities/user/profile";
import styles from "../ui/MainProfilePage.module.scss";
import { ProfileSkillsTab } from "../../skill-tab";
import { ProfileInventoryTab } from "../../inventory-tab";
import { ProfileMainTab } from "../../main-tab/ui/ProfileMainTab";

interface ProfileFormProps {
  user?: User;
  search?: Omit<ProfileSearchParams, "tab">;
}

export const profileMainForms: Record<
  ProfileMode,
  (props: ProfileFormProps) => React.ReactNode
> = {
  profile: ({ user }) => <ProfileMainTab user={user} />,
  statistics: () => <div className={styles.projectsBlock}></div>,
  skills: ({ search }) => (
    <ProfileSkillsTab search={search as SkillsProfileSearchParams} />
  ),
  inventory: ({ search }) => (
    <ProfileInventoryTab search={search as InventoryProfileSearchParams} />
  ),
};
