import { ProgressBar } from "@shared/ui";
import styles from "./ProfileMainWidget.module.scss";
import { LinkButtonWrapper, ReadMoreButton } from "@shared/ui/buttons";
import { DatePickerInput, MapLocationInput } from "@shared/ui/inputs";
import { useState } from "react";
import { LayoutCard } from "@shared/assets/images/layout";
import { MapUserLocationModal } from "../user-location-modal/MapUserLocationModal";
import type { User } from "@entities/user/profile";
import { getFullName } from "@entities/user";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ProfileMainWidgetProps {
  skillsChildren?: React.ReactNode;
  badgesChildren?: React.ReactNode;
  user?: User;
}

export function ProfileMainWidget({
  skillsChildren,
  badgesChildren,
  user,
}: ProfileMainWidgetProps) {
  const [isLocationMapOpen, setIsLocationMapOpen] = useState(false);
  const { t } = useTranslation(["profile", "common"]);

  const handleModal = () => {
    setIsLocationMapOpen((prev) => !prev);
  };

  return (
    <>
      <div className={styles.levelRateInfo}>
        <div className={styles.levelUserInfo}>
          <div className={styles.headerLevelBar}>
            <span className={styles.current}>
              {t("common:level.current", { level: user?.progress.level })}
            </span>
            <span className={styles.xp}>
              {user?.progress.currentProgress +
                "/" +
                user?.progress.maxProgress}
            </span>
          </div>
          <ProgressBar
            current={user?.progress.currentProgress ?? 0}
            max={user?.progress.maxProgress}
          />
          <div className={styles.footerLevelBar}>
            <span className={styles.label}>{t("common:level.next")}</span>
            <span className={styles.next}>
              {t("common:level.current", {
                level:
                  user?.progress?.level == null ? 1 : user?.progress.level + 1,
              })}
            </span>
          </div>
        </div>
        <div className={styles.ratingUserInfo}>
          <h1>{user?.rating.value}</h1>
          <p>{t("profile:rating.votes", { count: user?.rating.totalVotes })}</p>
        </div>
      </div>
      <div className={styles.bioUser}>
        <ReadMoreButton
          collapsedHeight={90}
          className={styles.readMoreMainProfile}
        >
          <p>{user?.profile?.bio}</p>
        </ReadMoreButton>
      </div>
      <div className={styles.locationDateUserInfo}>
        <div className={styles.datePickerUserProfileWrapper}>
          <DatePickerInput
            name="datePicker"
            value={user?.profile?.dateOfBirth}
            isReadOnly={true}
            label={t("profile:dateOfBirth.label")}
            classNames={{
              base: "border-2 border-[rgba(0,0,0,0.3)] ",
              segment: "!text-[rgba(0,0,0,0.6)]",
            }}
          />
        </div>
        <div className={styles.mapLocationUserProfileWrapper}>
          <MapLocationInput
            handleMapOpen={user?.profile?.coordinates ? handleModal : undefined}
            label={user?.location?.address ?? t("profile:location.empty")}
            variant="profile"
          />
        </div>
        {user?.profile?.coordinates && (
          <MapUserLocationModal
            isOpen={isLocationMapOpen}
            coordinates={user?.profile?.coordinates}
            handleModal={handleModal}
            fullName={getFullName(user.firstName, user.lastName)}
          />
        )}
      </div>
      <div className={styles.privateUserInfo}></div>
      <div className={styles.userActivityInfo}>
        <div className={styles.projectsBlock}>
          <div className={styles.projectsDetailInfoBlock}>
            <div className={styles.projectsUserProfile}>
              <div className={styles.textInfoProjectsUserProfile}>
                <h1>{t("profile:activity.active")}</h1>
                <h2>{t("profile:activity.projects")}</h2>
              </div>
              <p>{user?.profile?.activeProjectCount ?? "0"}</p>
            </div>
            <div className={styles.projectsUserProfile}>
              <div className={styles.textInfoProjectsUserProfile}>
                <h1>{t("profile:activity.completed")}</h1>
                <h2>{t("profile:activity.projects")}</h2>
              </div>
              <p>{user?.profile?.completedProjectCount ?? "0"}</p>
            </div>
          </div>
          <div className={styles.projectsSeeMore}>
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={styles.seeMoreProjectsButton}
            >
              <LinkButtonWrapper to="/activities/my">
                {t("profile:activity.seeMore")}
              </LinkButtonWrapper>
            </motion.div>
            <img src={LayoutCard} alt="layout" />
          </div>
        </div>
        <div className={styles.skillsBlock}>
          <div className={styles.skillProfileWrapper}>
            <h1 className={styles.skillsProfileTitle}>
              {t("profile:skills.title")}
            </h1>
            {skillsChildren}
          </div>
          <div className={styles.buttonSkillsBlock}>
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={styles.seeMoreSkillsButton}
            >
              <LinkButtonWrapper to="/profile" search={{ tab: "skills" }}>
                {t("profile:skills.seeMore")}
              </LinkButtonWrapper>
            </motion.div>
          </div>
        </div>
      </div>
      <div className={styles.lineDividerBadges}>
        <div className={styles.textBadges}>
          <h1>{t("profile:badges.title")}</h1>
        </div>
      </div>
      {badgesChildren}
    </>
  );
}
