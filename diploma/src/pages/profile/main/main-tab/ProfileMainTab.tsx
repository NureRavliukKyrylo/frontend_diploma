import { SkillCardBase } from "@entities/skill";
import type { User } from "@entities/user/profile";
import { BadgesCarouselWidget } from "@widgets/badges";
import { ProfileMainWidget } from "@widgets/profile";
import { SkillsListWidget } from "@widgets/skills";
import styles from "./ProfileMainTab.module.scss";

interface ProfileMainTab {
  user?: User;
}

export const ProfileMainTab = ({ user }: ProfileMainTab) => {
  return (
    <ProfileMainWidget
      badgesChildren={
        user?.profile?.badgesPreview ? (
          <BadgesCarouselWidget badges={user.profile.badgesPreview} />
        ) : (
          <div className={styles.noBadgesContainer}>
            <p className={styles.noBadgesTitle}>No badges yet</p>
            <p className={styles.noBadgesSubtitle}>
              Complete challenges and grow your skills — your first badge is
              just around the corner!
            </p>
          </div>
        )
      }
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
  );
};
