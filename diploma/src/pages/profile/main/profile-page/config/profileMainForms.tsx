import {
  type InventoryProfileSearchParams,
  type ProfileMode,
  type ProfileSearchParams,
  type SkillsProfileSearchParams,
  type StatisticsVolunteerResponse,
} from "@entities/user";
import type { User } from "@entities/user/profile";
import { ProfileSkillsTab } from "../../skill-tab";
import { ProfileInventoryTab } from "../../inventory-tab";
import { ProfileMainTab } from "../../main-tab/ui/ProfileMainTab";
import { ProfileStatisticsTab } from "../../statistics-tab";

interface ProfileFormProps {
  user?: User;
  statistics: StatisticsVolunteerResponse;
  search?: Omit<ProfileSearchParams, "tab">;
}

export const profileMainForms: Record<
  ProfileMode,
  (props: ProfileFormProps) => React.ReactNode
> = {
  profile: ({ user }) => <ProfileMainTab user={user} />,
  statistics: ({ statistics }) => (
    <ProfileStatisticsTab statistics={statistics} />
  ),
  skills: ({ search }) => (
    <ProfileSkillsTab search={search as SkillsProfileSearchParams} />
  ),
  inventory: ({ search }) => (
    <ProfileInventoryTab search={search as InventoryProfileSearchParams} />
  ),
};
