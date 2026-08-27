import { ApproveIcon } from "@shared/assets/icons/actions";
import { useAcceptInvitation } from "../model/useAcceptInvitation";
import styles from "./AcceptInvitationButton.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface AcceptInvitationButtonProps {
  requestId: string;
  onSuccess?: () => void;
}

export const AcceptInvitationButton = ({
  requestId,
  onSuccess,
}: AcceptInvitationButtonProps) => {
  const { t } = useTranslation(["common"]);
  const { accept, isLoading } = useAcceptInvitation(requestId, onSuccess);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <BaseButtonWrapper
        className={styles.acceptButton}
        onClick={() => accept()}
        disabled={isLoading}
      >
        <ApproveIcon className={styles.icon} />
        {t("common:requests.actions.acceptName")}
      </BaseButtonWrapper>
    </motion.div>
  );
};
