import type { User } from "@entities/user/profile";
import styles from "./MyActivitiesHeader.module.scss";
import { Avatar, Toggle } from "@shared/ui";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import { Arrow } from "@shared/assets/icons/actions";
import { Layout } from "@shared/assets/images/layout";
import { getFullName } from "@entities/user";
import type { MyActivitiesMode } from "../config/MyActivitiesMode";
import { getMyActivitiesTab } from "../config/myActivitiesTabs";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["activities", "common"]);

  return (
    <>
      <Avatar
        src={user?.profile?.avatarUrl}
        fallback={getFullName(user?.firstName, user?.lastName)}
        className={styles.myActivitiesAvatar}
      />
      <div className={styles.myActivitiesToggle}>
        <Toggle
          tabs={getMyActivitiesTab(t)}
          activeValue={activeTab}
          onChange={onTabChange}
          buttonClassName={styles.toggleMyActivitiesButton}
          activeButtonClassName={styles.toggleMyActivitiesButtonActive}
          className={styles.toggleMyActivities}
          pillClassName={styles.toggleMyActivitiesPill}
          innerWrapperClassName={styles.innerToggleBLock}
        />
      </div>
      <div className={styles.baseUserInfo}>
        <h1>{getFullName(user?.firstName, user?.lastName)}</h1>
        <h2>{user?.email}</h2>
      </div>
      <div
        className={styles.statisticsInnerBlock}
        style={{ backgroundImage: `url(${Layout})` }}
      >
        <div className={styles.usersActivitiesTitle}>
          {t("my.header.userActivities", { name: user?.firstName || "" })}
        </div>
        <LinkButtonWrapper className={styles.backToProfileButton} to="/profile">
          {t("common:actions.back")} <Arrow className={styles.backArrow} />
        </LinkButtonWrapper>
      </div>
    </>
  );
};
