import { useState } from "react";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./BanEntityButton.module.scss";
import { BanEntityModal } from "../modal/BanEntityModal";
import { useTranslation } from "react-i18next";
import type { ModerationSubjectType } from "@entities/report";

interface BanEntityButtonProps {
  caseId: string;
  targetEntityType: keyof typeof ModerationSubjectType;
  targetEntityId: string;
}

export const BanEntityButton = ({
  caseId,
  targetEntityType,
  targetEntityId,
}: BanEntityButtonProps) => {
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
          className={styles.banButton}
          onClick={() => setIsOpen(true)}
        >
          {t("moderation:banEntity.button")}
        </BaseButtonWrapper>
      </motion.div>

      <BanEntityModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        caseId={caseId}
        targetEntityType={targetEntityType}
        targetEntityId={targetEntityId}
      />
    </>
  );
};
