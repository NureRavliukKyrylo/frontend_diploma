import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@entities/project";
import { useTranslation } from "react-i18next";
import {
  actionClassNames,
  itemVariants,
  menuVariants,
} from "../config/projectFabPresentation";
import type { useProjectFabActions } from "../model/useProjectFabActions";
import styles from "@widgets/organizations/details/ui/OrganizationFab/OrganizationFab.module.scss";

interface ProjectFabActionStackProps {
  project: Project;
  model: ReturnType<typeof useProjectFabActions>;
}

export const ProjectFabActionStack = ({
  project,
  model,
}: ProjectFabActionStackProps) => {
  const { t } = useTranslation(["project"]);

  return (
    <motion.div
      className={styles.actionsStack}
      variants={menuVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {model.shouldShowContextBlock ? (
        <>
          <motion.button
            type="button"
            className={styles.contextBlock}
            custom={model.actions.length}
            variants={itemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={model.openDashboard}
          >
            <span className={styles.contextAvatar}>
              <span>{model.initials}</span>
            </span>
            <span className={styles.contextText}>
              <span className={styles.contextHint}>{t("fab.contextHint")}</span>
              <span className={styles.contextName}>{project.title}</span>
            </span>
            <ArrowRight size={16} color="#bbb" strokeWidth={2.4} />
          </motion.button>
          <motion.div
            className={styles.contextDivider}
            custom={model.actions.length - 0.5}
            variants={itemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </>
      ) : null}

      {model.actions.map((action, index) => {
        const Icon = action.icon;
        const actionClassName = actionClassNames[action.id];

        return (
          <motion.div
            key={action.id}
            className={styles.actionRow}
            custom={index}
            variants={itemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.button
              type="button"
              className={`${styles.actionPill} ${actionClassName}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={action.onClick}
            >
              <Icon size={16} strokeWidth={2.4} />
              <span>{action.label}</span>
            </motion.button>

            <motion.button
              type="button"
              className={`${styles.actionCircle} ${actionClassName}`}
              aria-label={action.label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.96 }}
              onClick={action.onClick}
            >
              <Icon size={18} strokeWidth={2.5} />
            </motion.button>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
