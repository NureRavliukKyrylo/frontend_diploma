import { BadgeCardDetailed, type Badge, type Tier } from "@entities/badge";
import { SkillCardBase } from "@entities/skill";
import { type ProfileMode } from "@entities/user";
import type { User } from "@entities/user/profile";
import { BadgesCarouselWidget, BadgesListWidget } from "@widgets/badges";
import { ProfileMainWidget } from "@widgets/profile";
import { SkillsListWidget } from "@widgets/skills";
import styles from "../ui/MainProfilePage.module.scss";
import { ProfileSkillsTab } from "../../skill-tab";

interface ProfileFormProps {
  user?: User;
}

const demoBadges: Badge[] = [
  {
    id: "asdasdsd",
    image: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=400",
    tier: "S" as Tier,
    name: "Top-200 volunteer",
    description: "",
  },
  {
    id: "asdasdsds",
    image: "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=400",
    tier: "A" as Tier,
    name: "First Step",
    description: "",
  },
  {
    id: "asdasdsdd",
    image: "https://images.unsplash.com/photo-1614288533766-ba18c1ea0685?w=400",
    tier: "S" as Tier,
    name: "Active Heart",
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
            <SkillCardBase
              classNameBase={styles.cardBaseProfileBlock}
              iconUrl={skill.iconUrl}
              name={skill.name}
            />
          )}
          className={styles.skillsProfileList}
          skills={user?.skills?.slice(0, 4)}
        />
      }
    />
  ),
  projects: () => <></>,
  skills: () => <ProfileSkillsTab />,
  inventory: () => (
    <div className={styles.inventoryWrapper}>
      <h1 className={styles.achievementsTitle}>Achievements</h1>
      <BadgesListWidget
        badges={demoBadges}
        className={styles.badgesProfileList}
        renderCard={(badge) => (
          <BadgeCardDetailed
            badge={badge}
            classImgName={styles.badgeImageWrapper}
          />
        )}
      />
    </div>
  ),
};
