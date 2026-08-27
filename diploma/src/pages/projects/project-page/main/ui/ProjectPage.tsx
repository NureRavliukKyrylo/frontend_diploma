import { useTranslation } from "react-i18next";
import { getProjectMainTabs } from "../config/projectMainTabs";
import { useProjectPage } from "../model/useProjectPage";
import { ProjectFab } from "@widgets/projects";
import { ProjectHeader } from "./project-page/ProjectHeader";
import { ProjectTabsContent } from "./project-page/ProjectTabsContent";
import styles from "./ProjectPage.module.scss";

export const ProjectPage = () => {
  const { t } = useTranslation(["project", "common"]);
  const { tab, project, policyConfig, forms, handleTabChange } =
    useProjectPage();

  return (
    <div className={styles.wrapperProjectPage}>
      <ProjectHeader project={project} policyConfig={policyConfig} />
      <ProjectTabsContent
        tabs={getProjectMainTabs(t)}
        activeTab={tab}
        forms={forms}
        onTabChange={handleTabChange}
      />
      <ProjectFab
        projectId={project.id}
        project={project}
        activeTab={tab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};
