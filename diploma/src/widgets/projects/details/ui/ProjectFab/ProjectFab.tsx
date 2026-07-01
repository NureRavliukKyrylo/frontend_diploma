import { AnimatePresence, motion } from "framer-motion";
import type { Project, ProjectMode } from "@entities/project";
import { CreateTaskDrawer } from "@features/task/create-task";
import { useTranslation } from "react-i18next";
import { useProjectFabActions } from "./model/useProjectFabActions";
import { ProjectFabActionStack } from "./ui/ProjectFabActionStack";
import { ProjectFabMainButton } from "./ui/ProjectFabMainButton";
import styles from "@widgets/organizations/details/ui/OrganizationFab/OrganizationFab.module.scss";

interface ProjectFabProps {
  projectId: string;
  project: Project;
  activeTab?: ProjectMode;
  onTabChange?: (nextTab: "overview") => void;
}

export const ProjectFab = (props: ProjectFabProps) => {
  const { t } = useTranslation(["project"]);
  const model = useProjectFabActions(props);

  if (!model.isVisible) return null;

  return (
    <>
      <AnimatePresence>
        {model.isOpen ? (
          <motion.button
            type="button"
            className={styles.backdrop}
            aria-label={t("fab.closeActions")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={model.closeMenu}
          />
        ) : null}
      </AnimatePresence>

      <div className={styles.fabRoot}>
        <AnimatePresence>
          {model.isOpen ? (
            <ProjectFabActionStack project={props.project} model={model} />
          ) : null}
        </AnimatePresence>

        <ProjectFabMainButton
          isOpen={model.isOpen}
          onClick={() => model.setIsOpen((current) => !current)}
        />
      </div>

      {props.project.organizationId ? (
        <CreateTaskDrawer
          isOpen={model.isTaskDrawerOpen}
          onClose={model.closeTaskDrawer}
          organizationId={props.project.organizationId}
          projectId={props.projectId}
          orgName={props.project.organization?.name}
        />
      ) : null}
    </>
  );
};
