import { useState } from "react";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./BlockUserButton.module.scss";
import { BlockUserModal } from "../modal/BlockUserModal";
import { useTranslation } from "react-i18next";
import type { ModerationSubjectType } from "@entities/report";

interface BlockUserButtonProps {
  caseId: string;
  targetUserId: string;
  entityType: keyof typeof ModerationSubjectType;
  entityId: string;
}

export const BlockUserButton = ({
  caseId,
  targetUserId,
  entityType,
  entityId,
}: BlockUserButtonProps) => {
  const { t } = useTranslation(["moderation"]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 15, mass: 0.5 }}
        style={{ width: "100%" }}
      >
        <BaseButtonWrapper
          className={styles.blockButton}
          onClick={() => setIsOpen(true)}
        >
          {t("moderation:blockUser.button")}
        </BaseButtonWrapper>
      </motion.div>

      <BlockUserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        caseId={caseId}
        targetUserId={targetUserId}
        entityType={entityType}
        entityId={entityId}
      />
    </>
  );
};
