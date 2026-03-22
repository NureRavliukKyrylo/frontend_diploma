import { useQuery } from "@tanstack/react-query";
import styles from "./MyProjectsPage.module.scss";
import { profileQuery } from "@entities/user/profile";
import { useSearch } from "@tanstack/react-router";
import { useMyProjectsTabs } from "@entities/project";
import { myProjectsMainForms } from "../config/myProjectsMainForms";
import { MyProjectsHeader } from "@widgets/projects";

export const MyProjectsPage = () => {
  const { data: user } = useQuery(profileQuery.all());
  const search = useSearch({ from: "/_masterLayout/projects/my/" });
  const { activeTab, handleTabChange } = useMyProjectsTabs(search.tab);

  return (
    <div className={styles.myProjectsWrapper}>
      <div className={styles.userInfo}>
        {user && (
          <MyProjectsHeader
            activeTab={activeTab}
            onTabChange={handleTabChange}
            user={user}
          />
        )}
      </div>
      <div className={styles.activityInfo}>
        {myProjectsMainForms[activeTab]}
      </div>
    </div>
  );
};
