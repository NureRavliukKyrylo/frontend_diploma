import { BadgeCardDetailed, type Badge, type Tier } from "@entities/badge";
import { SkillCard } from "@entities/skill";
import { type ProfileMode } from "@entities/user";
import type { User } from "@entities/user/profile";
import { BadgesCarouselWidget, BadgesListWidget } from "@widgets/badges";
import { ProfileMainWidget } from "@widgets/profile";
import { SkillsListWidget } from "@widgets/skills";

interface ProfileFormProps {
  user?: User;
}

const demoBadges: Badge[] = [
  {
    id: "asdasdsd",
    image: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=400",
    tier: "S" as Tier,
    name: "",
    description: "",
  },
  {
    id: "asdasdsds",
    image: "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=400",
    tier: "A" as Tier,
    name: "",
    description: "",
  },
  {
    id: "asdasdsdd",
    image: "https://images.unsplash.com/photo-1614288533766-ba18c1ea0685?w=400",
    tier: "S" as Tier,
    name: "",
    description: "",
  },
  {
    id: "asdasdsdd",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    tier: "B" as Tier,
    name: "",
    description: "",
  },
  {
    id: "asdasdssd",
    image: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400",
    tier: "A" as Tier,
    name: "",
    description: "",
  },
  {
    id: "asdasdsassd",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400",
    tier: "C" as Tier,
    name: "",
    description: "",
  },
];

export const profileMainForms: Record<
  ProfileMode,
  (props: ProfileFormProps) => React.ReactNode
> = {
  profile: ({ user }) => (
    <ProfileMainWidget
      badgesChildren={<BadgesCarouselWidget badges={demoBadges} />}
      user={user}
      skillsChildren={
        <SkillsListWidget
          renderCard={(skill) => (
            <SkillCard image={skill.image} title={skill.name} />
          )}
          skills={user?.skills}
        />
      }
    />
  ),
  projects: () => <></>,
  archive: () => <></>,
  inventory: () => (
    <BadgesListWidget
      badges={demoBadges}
      renderCard={(badge) => <BadgeCardDetailed badge={badge} />}
    />
  ),
};
