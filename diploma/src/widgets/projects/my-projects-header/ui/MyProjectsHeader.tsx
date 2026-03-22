import type { User } from "@entities/user/profile";
import styles from "./MyProjectsHeader.module.scss";
import { Avatar, Toggle } from "@shared/ui";
import { DefaultAvatar } from "@shared/assets/images/user";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import { myProjectMainTabs } from "../config/myProjectMainTabs";
import type { MyProjectsMode } from "@entities/project";
import { Arrow } from "@shared/assets/icons/actions";
import { Layout } from "@shared/assets/images/layout";

interface MyProjectsHeaderProps {
  activeTab: MyProjectsMode;
  onTabChange: (tab: MyProjectsMode) => void;
  user: User;
}

export const MyProjectsHeader = ({
  activeTab,
  onTabChange,
  user,
}: MyProjectsHeaderProps) => {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <>
      <Avatar
        src={user?.profile?.avatarUrl ?? DefaultAvatar}
        className={styles.myProjectsAvatar}
      />
      <div className={styles.manageBlock}>
        <div className={styles.myProjectsToggle}>
          <Toggle
            tabs={myProjectMainTabs}
            activeValue={activeTab}
            onChange={onTabChange}
            buttonClassName={styles.toggleProfileMainProjectsButton}
            activeButtonClassName={styles.toggleProfileMainProjectsButtonActive}
            className={styles.toggleProfileMainProjects}
          />
        </div>
        <div className={styles.usersDetailedInfo}>
          <div className={styles.baseUserInfo}>
            <h1>{fullName}</h1>
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
