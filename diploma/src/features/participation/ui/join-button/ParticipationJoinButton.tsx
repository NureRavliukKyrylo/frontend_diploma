import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useJoinParticipation } from "../../model/useJoinParticipation";
import styles from "./ParticipationJoinButton.module.scss";
import type { EntityType } from "@shared/config/types";

interface ParticipationJoinButtonProps {
  entityType: Exclude<EntityType, "organization">;
  entityId: string;
  onSuccess?: () => void;
}

export const ParticipationJoinButton = ({
  entityType,
  entityId,
  onSuccess,
}: ParticipationJoinButtonProps) => {
  const { handleJoin, isLoading } = useJoinParticipation({
    entityType,
    entityId,
    onSuccess,
  });

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <BaseButtonWrapper
        loading={isLoading}
        className={styles.joinEntityButton}
        onClick={() => handleJoin()}
      >
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          Join {entityType.toUpperCase()}
        </motion.span>
      </BaseButtonWrapper>
    </motion.div>
  );
};
