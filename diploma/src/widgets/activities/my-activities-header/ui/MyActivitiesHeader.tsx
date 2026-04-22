import type { User } from "@entities/user/profile";
import styles from "./MyActivitiesHeader.module.scss";
import { Avatar, Toggle } from "@shared/ui";
import { DefaultAvatar } from "@shared/assets/images/user";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import { Arrow } from "@shared/assets/icons/actions";
import { Layout } from "@shared/assets/images/layout";
import { getFullName } from "@entities/user";
import type { MyActivitiesMode } from "../config/MyActivitiesMode";
import { myActivitiesTabs } from "../config/myActivitiesTabs";

interface MyActivitiesHeaderProps {
  activeTab: MyActivitiesMode;
  onTabChange: (tab: MyActivitiesMode) => void;
  user: User;
}

export const MyActivitiesHeader = ({
  activeTab,
  onTabChange,
  user,
}: MyActivitiesHeaderProps) => {
  return (
    <>
      <Avatar
        src={user?.profile?.avatarUrl ?? DefaultAvatar}
        className={styles.myActivitiesAvatar}
      />
      <div className={styles.manageBlock}>
        <div className={styles.myActivitiesToggle}>
          <Toggle
            tabs={myActivitiesTabs}
            activeValue={activeTab}
            onChange={onTabChange}
            buttonClassName={styles.toggleMyActivitiesButton}
            activeButtonClassName={styles.toggleMyActivitiesButtonActive}
            className={styles.toggleMyActivities}
            pillClassName={styles.toggleMyActivitiesPill}
          />
        </div>
        <div className={styles.usersDetailedInfo}>
          <div className={styles.baseUserInfo}>
            <h1>{getFullName(user.firstName, user.lastName)}</h1>
            <h2>{user?.email}</h2>
          </div>
          <div
            className={styles.statisticsInnerBlock}
            style={{ backgroundImage: `url(${Layout})` }}
          >
            <div className={styles.usersActivitiesTitle}>
              {user?.firstName}'s Activities
            </div>
            <LinkButtonWrapper
              className={styles.backToProfileButton}
              to="/profile"
            >
              BACK <img src={Arrow} alt="arrow-back" />
            </LinkButtonWrapper>
          </div>
        </div>
      </div>
    </>
  );
};
