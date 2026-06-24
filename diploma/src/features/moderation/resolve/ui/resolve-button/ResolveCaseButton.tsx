import { useState } from "react";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./ResolveCaseButton.module.scss";
import { ResolveCaseModal } from "../modal/ResolveCaseModal";
import { useTranslation } from "react-i18next";

interface ResolveCaseButtonProps {
  caseId: string;
  reportId: string;
}

export const ResolveCaseButton = ({
  caseId,
  reportId,
}: ResolveCaseButtonProps) => {
  const { t } = useTranslation(["moderation"]);
  const [isOpen, setIsOpen] = useState(false);
  const [rejected, setRejected] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <BaseButtonWrapper
          className={styles.resolveButton}
          onClick={() => setIsOpen(true)}
        >
          {t("moderation:resolveCase.button")}
        </BaseButtonWrapper>
      </motion.div>

      <ResolveCaseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        caseId={caseId}
        rejected={rejected}
        onChangeDecision={setRejected}
        reportId={reportId}
      />
    </>
  );
};
