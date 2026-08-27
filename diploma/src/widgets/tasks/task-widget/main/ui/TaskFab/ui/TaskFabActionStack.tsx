import { motion } from "framer-motion";
import {
  actionClassNames,
  itemVariants,
  menuVariants,
} from "../config/taskFabPresentation";
import type { useTaskFabActions } from "../model/useTaskFabActions";
import styles from "@widgets/organizations/details/ui/OrganizationFab/OrganizationFab.module.scss";

interface TaskFabActionStackProps {
  model: ReturnType<typeof useTaskFabActions>;
}

export const TaskFabActionStack = ({ model }: TaskFabActionStackProps) => (
  <motion.div
    className={styles.actionsStack}
    variants={menuVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
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
