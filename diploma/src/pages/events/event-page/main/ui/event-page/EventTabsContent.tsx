import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import type { EventMode } from "@entities/event";
import type { TabOption } from "@shared/config/types";
import { Toggle } from "@shared/ui";
import styles from "../EventPage.module.scss";

interface EventTabsContentProps {
  tabs: TabOption<EventMode>[];
  activeTab: EventMode;
  forms: Record<EventMode, ReactNode>;
  onTabChange: (tab: EventMode) => void;
}

export const EventTabsContent = ({
  tabs,
  activeTab,
  forms,
  onTabChange,
}: EventTabsContentProps) => (
  <>
    <div className={styles.toggleWrapper}>
      <Toggle
        tabs={tabs}
        activeValue={activeTab}
        onChange={onTabChange}
        buttonClassName={styles.toggleEventButton}
        activeButtonClassName={styles.toggleEventButtonActive}
        className={styles.toggleEvent}
        pillClassName={styles.toggleEventPill}
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
