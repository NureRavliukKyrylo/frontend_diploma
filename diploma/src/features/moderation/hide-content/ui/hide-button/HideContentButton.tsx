import { useState } from "react";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./HideContentButton.module.scss";
import { HideContentModal } from "../modal/HideContentModal";
import type { EntityType } from "@shared/config/types";
import { useTranslation } from "react-i18next";

interface HideContentButtonProps {
  caseId: string;
  targetEntityType: EntityType;
  targetEntityId: string;
}

export const HideContentButton = ({
  caseId,
  targetEntityType,
  targetEntityId,
}: HideContentButtonProps) => {
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
          className={styles.hideButton}
          onClick={() => setIsOpen(true)}
        >
          {t("moderation:hideContent.button")}
        </BaseButtonWrapper>
      </motion.div>

      <HideContentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        caseId={caseId}
        targetEntityType={targetEntityType}
        targetEntityId={targetEntityId}
      />
    </>
  );
};
