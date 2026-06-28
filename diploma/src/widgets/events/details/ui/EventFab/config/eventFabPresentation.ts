import type { Variants } from "framer-motion";
import type { EventFabActionId } from "./fabActionsConfig";
import styles from "@widgets/organizations/details/ui/OrganizationFab/OrganizationFab.module.scss";
import eventStyles from "../EventFab.module.scss";

export const menuVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.88 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      delay: index * 0.05,
    },
  }),
  exit: { opacity: 0, y: 12, scale: 0.85 },
};

export const actionClassNames: Record<EventFabActionId, string> = {
  dashboard: styles.dashboardAction,
  settings: styles.settingsAction,
  members: styles.membersAction,
  roles: styles.rolesAction,
  "new-task": styles.taskAction,
  attendance: eventStyles.attendanceAction,
};
