import { type ProfileMode } from "@entities/user";
import type { User } from "@entities/user/profile";
import { BadgesCarouselWidget, BadgesInventoryWidget } from "@widgets/badges";
import { ProfileMainWidget } from "@widgets/profile";

interface ProfileFormProps {
  user?: User;
}

export const profileMainForms: Record<
  ProfileMode,
  (props: ProfileFormProps) => React.ReactNode
> = {
  profile: ({ user }) => (
    <ProfileMainWidget badgesChildren={<BadgesCarouselWidget />} user={user} />
  ),
  projects: () => <></>,
  archive: () => <></>,
  inventory: () => <BadgesInventoryWidget />,
};
