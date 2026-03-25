import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useJoinProject } from "../model/useJoinProject";
import styles from "./JoinProjectButton.module.scss";
import { motion } from "framer-motion";

interface JoinProjectButtonProps {
  projectId: string;
}

export const JoinProjectButton = ({ projectId }: JoinProjectButtonProps) => {
  const { handleJoinProject, isLoading } = useJoinProject();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <BaseButtonWrapper
        loading={isLoading}
        className={styles.joinProjectButton}
        onClick={() => handleJoinProject(projectId)}
      >
        Join Project
      </BaseButtonWrapper>
    </motion.div>
  );
};
