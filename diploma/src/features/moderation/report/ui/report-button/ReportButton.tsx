import { useState } from "react";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { ReportModal } from "../modal/ReportModal";
import styles from "./ReportButton.module.scss";
import type { ModerationSubjectType } from "@entities/report";
import { Report } from "@shared/assets/icons/info";

interface ReportButtonProps {
  subjectType: ModerationSubjectType;
  subjectId: string;
  buttonClassName?: string;
  iconClassName?: string;
}

export const ReportButton = ({
  subjectType,
  subjectId,
  buttonClassName,
  iconClassName,
}: ReportButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <BaseButtonWrapper
          className={`${styles.button} ${buttonClassName ?? ""}`}
          onClick={() => setIsOpen(true)}
        >
          <Report className={`${styles.icon} ${iconClassName ?? ""}`} />
        </BaseButtonWrapper>
      </motion.div>
      <ReportModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        subjectType={subjectType}
        subjectId={subjectId}
      />
    </>
  );
};
