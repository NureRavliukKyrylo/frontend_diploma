import { useState } from "react";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./BanUserButton.module.scss";
import { BanUserModal } from "../modal/BanUserModal";
import { useTranslation } from "react-i18next";

interface BanUserButtonProps {
  caseId: string;
  targetUserId: string;
}

export const BanUserButton = ({ caseId, targetUserId }: BanUserButtonProps) => {
  const { t } = useTranslation(["moderation"]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 15, mass: 0.5 }}
      >
        <BaseButtonWrapper
          className={styles.banButton}
          onClick={() => setIsOpen(true)}
        >
          {t("moderation:banUser.button")}
        </BaseButtonWrapper>
      </motion.div>

      <BanUserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        caseId={caseId}
        targetUserId={targetUserId}
      />
    </>
  );
};
