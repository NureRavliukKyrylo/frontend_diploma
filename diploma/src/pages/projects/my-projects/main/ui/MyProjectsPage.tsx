import { useQuery } from "@tanstack/react-query";
import styles from "./MyProjectsPage.module.scss";
import { profileQuery } from "@entities/user/profile";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { myProjectsMainForms } from "../config/myProjectsMainForms";
import { MyProjectsHeader } from "@widgets/projects";
import {
  myProjectSearchDefaults,
  type MyProjectsMode,
} from "@entities/project";

export const MyProjectsPage = () => {
  const { data: user } = useQuery(profileQuery.all());
  const search = useSearch({ from: "/_masterLayout/projects/my/" });

  const navigate = useNavigate({ from: "/projects/my/" });

  const activeTab = search.tab;
  const handleTabChange = (tab: MyProjectsMode) => {
    navigate({ search: myProjectSearchDefaults[tab] });
  };

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
