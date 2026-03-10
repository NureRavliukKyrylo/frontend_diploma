import { ProgressBar } from "@shared/ui";
import styles from "./ProfileMainWidget.module.scss";
import { BaseButtonWrapper, ReadMoreButton } from "@shared/ui/buttons";
import { DatePickerInput, MapLocationInput } from "@shared/ui/inputs";
import { useState } from "react";
import { LayoutCard } from "@shared/assets/images/layout";
import { MapUserLocationModal } from "../user-location-modal/MapUserLocationModal";
import type { User } from "@entities/user/profile";

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

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <>
      <div className={styles.levelRateInfo}>
        <div className={styles.levelUserInfo}>
          <div className={styles.headerLevelBar}>
            <span className={styles.current}>Level 12</span>
            <span className={styles.xp}>25/100</span>
          </div>
          <ProgressBar current={25} max={100} />
          <div className={styles.footerLevelBar}>
            <span className={styles.label}>Next level</span>
            <span className={styles.next}>Level 2</span>
          </div>
        </div>
        <div className={styles.ratingUserInfo}>
          <h1>4.5</h1>
          <p>(120 votes)</p>
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
            handleMapOpen={handleModal}
            label={user?.location?.address ?? "No location added"}
            variant="profile"
          />
        </div>
        {user?.profile?.coordinates && (
          <MapUserLocationModal
            isOpen={isLocationMapOpen}
            coordinates={user?.profile?.coordinates}
            handleModal={handleModal}
            fullName={fullName}
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
            <BaseButtonWrapper className={styles.seeMoreProjectsButton}>
              SEE MORE
            </BaseButtonWrapper>
            <img src={LayoutCard} alt="layout" />
          </div>
        </div>
        <div className={styles.skillsBlock}>
          <h1>SKILLS</h1>
          {skillsChildren}
          <div className={styles.buttonSkillsBlock}>
            <BaseButtonWrapper className={styles.seeMoreSkillsButton}>
              See more
            </BaseButtonWrapper>
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
