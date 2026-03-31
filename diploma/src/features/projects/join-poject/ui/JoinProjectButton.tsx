import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useJoinProject } from "../model/useJoinProject";
import styles from "./JoinProjectButton.module.scss";
import { motion } from "framer-motion";

interface JoinProjectButtonProps {
  projectId: string;
  isJoined?: boolean;
}

export const JoinProjectButton = ({
  projectId,
  isJoined,
}: JoinProjectButtonProps) => {
  const { handleJoinProject, isLoading } = useJoinProject();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <BaseButtonWrapper
        loading={isLoading}
        className={`${styles.joinProjectButton} ${isJoined ? styles.joined : styles.notJoined}`}
        onClick={() => handleJoinProject(projectId)}
      >
        <motion.span
          key="join"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          {isJoined ? "Leave Project" : "Join Project"}
        </motion.span>
      </BaseButtonWrapper>
    </motion.div>
  );
};
