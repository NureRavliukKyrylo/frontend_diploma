import type { Variants } from "framer-motion";
import type { TaskFabActionId } from "./fabActionsConfig";
import organizationStyles from "@widgets/organizations/details/ui/OrganizationFab/OrganizationFab.module.scss";
import taskStyles from "../TaskFab.module.scss";

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

export const actionClassNames: Record<TaskFabActionId, string> = {
  members: organizationStyles.membersAction,
  roles: organizationStyles.rolesAction,
  timelog: taskStyles.attendanceAction,
  settings: taskStyles.settingsAction,
};
