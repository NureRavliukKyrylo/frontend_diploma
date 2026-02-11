import { type ProfileMode } from "@entities/user";
import { BadgesCarouselWidget, BadgesInventoryWidget } from "@widgets/badges";
import { ProfileMainWidget } from "@widgets/profile";

export const profileMainForms: Record<ProfileMode, React.ReactNode> = {
  profile: <ProfileMainWidget badgesChildren={<BadgesCarouselWidget />} />,
  projects: <></>,
  archive: <></>,
  inventory: <BadgesInventoryWidget />,
};
