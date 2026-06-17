import { useState } from "react";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { LeaveConfirmationModal } from "../leave-modal/LeaveConfirmationModal";
import styles from "./ParticipationLeaveButton.module.scss";
import type { EntityType } from "@shared/config/types";
import { useTranslation } from "react-i18next";

interface ParticipationLeaveButtonProps {
  entityType: Exclude<EntityType, "organization">;
  entityId: string;
  entityName: string;
  onSuccess?: () => void;
}

export const ParticipationLeaveButton = ({
  entityType,
  entityId,
  entityName,
  onSuccess,
}: ParticipationLeaveButtonProps) => {
  const { t } = useTranslation("common");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <BaseButtonWrapper
          className={styles.leaveButton}
          onClick={() => setIsModalOpen(true)}
        >
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {t("participation.leave", {
              entity: t(`participation.entities.${entityType}`),
            })}
          </motion.span>
        </BaseButtonWrapper>
      </motion.div>
      <LeaveConfirmationModal
        entityType={entityType}
        entityId={entityId}
        entityName={entityName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
};
