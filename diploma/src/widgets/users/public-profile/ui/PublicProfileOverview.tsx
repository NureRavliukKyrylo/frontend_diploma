import { useTranslation } from "react-i18next";
import type { PublicUserProfileDetails } from "@entities/user/profile";
import { ProfileSectionCard } from "./ProfileSectionCard";
import styles from "./PublicProfileOverview.module.scss";

export const PublicProfileOverview = ({
  profile,
}: {
  profile: PublicUserProfileDetails | null;
}) => {
  const { t } = useTranslation("common");
  const stats = [
    {
      label: t("publicProfile.overview.activeProjects"),
      value: profile?.activeProjectCount ?? 0,
    },
    {
      label: t("publicProfile.overview.completedProjects"),
      value: profile?.completedProjectCount ?? 0,
    },
    ...(profile?.timeBank
      ? [
          {
            label: t("publicProfile.overview.hoursContributed"),
            value: `${profile.timeBank.lifetimeEarnedHours}h`,
          },
        ]
      : []),
  ];

  return (
    <ProfileSectionCard title={t("publicProfile.sections.overview")}>
      <div className={styles.grid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.tile}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </ProfileSectionCard>
  );
};
