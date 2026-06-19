import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import type { ProjectMode } from "@entities/project";
import type { TabOption } from "@shared/config/types";
import { Toggle } from "@shared/ui";
import styles from "../ProjectPage.module.scss";

interface ProjectTabsContentProps {
  tabs: TabOption<ProjectMode>[];
  activeTab: ProjectMode;
  forms: Record<ProjectMode, ReactNode>;
  onTabChange: (tab: ProjectMode) => void;
}

export const ProjectTabsContent = ({
  tabs,
  activeTab,
  forms,
  onTabChange,
}: ProjectTabsContentProps) => (
  <>
    <div className={styles.toggleWrapper}>
      <Toggle
        tabs={tabs}
        activeValue={activeTab}
        onChange={onTabChange}
        buttonClassName={styles.toggleProjectButton}
        activeButtonClassName={styles.toggleProjectButtonActive}
        className={styles.toggleProject}
        pillClassName={styles.toggleProjectPill}
      />
    </div>
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
      >
        {forms[activeTab]}
      </motion.div>
    </AnimatePresence>
  </>
);
