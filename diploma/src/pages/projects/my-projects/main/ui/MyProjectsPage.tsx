import { useQuery } from "@tanstack/react-query";
import styles from "./MyProjectsPage.module.scss";
import { profileQuery } from "@entities/user/profile";
import { Avatar } from "@shared/ui";
import { useSearch } from "@tanstack/react-router";
import { useMyProjectsTabs } from "@entities/project";
import { Toggle } from "@shared/ui";
import { myProjectMainTabs } from "../config/myProjectsMainTabs";
import { myProjectsMainForms } from "../config/myProjectsMainForms";
import { DefaultAvatar } from "@shared/assets/images/user";
import { Layout } from "@shared/assets/images/layout";
import { Arrow } from "@shared/assets/icons/actions";
import { LinkButtonWrapper } from "@shared/ui/buttons";

export const MyProjectsPage = () => {
  const { data: user } = useQuery(profileQuery.all());
  const search = useSearch({ from: "/_masterLayout/projects/my/" });
  const { activeTab, handleTabChange } = useMyProjectsTabs(search.tab);
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <div className={styles.myProjectsWrapper}>
      <div className={styles.userInfo}>
        <Avatar
          className={styles.myProjectsAvatar}
          src={user?.profile?.avatarUrl ?? DefaultAvatar}
        />
        <div className={styles.manageBlock}>
          <div className={styles.myProjectsToggle}>
            <Toggle
              tabs={myProjectMainTabs}
              activeValue={activeTab}
              onChange={handleTabChange}
              buttonClassName={styles.toggleProfileMainProjectsButton}
              activeButtonClassName={
                styles.toggleProfileMainProjectsButtonActive
              }
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
      </div>
      <div className={styles.activityInfo}>
        {myProjectsMainForms[activeTab]}
      </div>
    </div>
  );
};
