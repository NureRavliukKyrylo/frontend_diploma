import AddRounded from "@mui/icons-material/AddRounded";
import { motion } from "framer-motion";
import cardStyles from "../Card.module.scss";
import styles from "./CreateCard.module.scss";

interface ProjectCreateCardProps {
  organizationName: string;
  onCreateProject?: () => void;
}

export const ProjectCreateCard = ({
  organizationName,
  onCreateProject,
}: ProjectCreateCardProps) => {
  return (
    <motion.button
      type="button"
      className={`${cardStyles.projectCard} ${styles.projectCreateCard}`}
      variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      onClick={onCreateProject}
      aria-label="Create project"
    >
      <div className={styles.projectCreateTop}>
        <span className={styles.projectCreateIcon} aria-hidden="true">
          <AddRounded />
        </span>
      </div>

      <div className={styles.projectCreateBody}>
        <h3>Create project</h3>
        <p>
          Add a new project for {organizationName} and place it next to the
          current organization initiatives.
        </p>
      </div>
    </motion.button>
  );
};
