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

  const handleModal = () => {
    setIsLocationMapOpen((prev) => !prev);
  };

  return (
    <>
      <div className={styles.levelRateInfo}>
        <div className={styles.levelUserInfo}>
          <div className={styles.headerLevelBar}>
            <span className={styles.current}>Level {user?.progress.level}</span>
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
            <span className={styles.label}>Next level</span>
            <span className={styles.next}>
              Level{" "}
              {user?.progress?.level == null ? 1 : user?.progress.level + 1}
            </span>
          </div>
        </div>
        <div className={styles.ratingUserInfo}>
          <h1>{user?.rating.value}</h1>
          <p>({user?.rating.totalVotes} VOTES)</p>
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
            label={"Date of birthday"}
            classNames={{
              base: "border-2 border-[rgba(0,0,0,0.3)] ",
              segment: "!text-[rgba(0,0,0,0.6)]",
            }}
          />
        </div>
        <div className={styles.mapLocationUserProfileWrapper}>
          <MapLocationInput
            handleMapOpen={user?.profile?.coordinates ? handleModal : undefined}
            label={user?.location?.address ?? "No location added"}
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
                <h1>ACTIVE</h1>
                <h2>PROJECTS</h2>
              </div>
              <p>{user?.profile?.activeProjectCount ?? "0"}</p>
            </div>
            <div className={styles.projectsUserProfile}>
              <div className={styles.textInfoProjectsUserProfile}>
                <h1>COMPLETED</h1>
                <h2>PROJECTS</h2>
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
                SEE MORE
              </LinkButtonWrapper>
            </motion.div>
            <img src={LayoutCard} alt="layout" />
          </div>
        </div>
        <div className={styles.skillsBlock}>
          <div className={styles.skillProfileWrapper}>
            <h1 className={styles.skillsProfileTitle}>SKILLS</h1>
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
                See more
              </LinkButtonWrapper>
            </motion.div>
          </div>
        </div>
      </div>
      <div className={styles.lineDividerBadges}>
        <div className={styles.textBadges}>
          <h1>BADGES</h1>
        </div>
      </div>
      {badgesChildren}
    </>
  );
}
