import { RejectIcon } from "@shared/assets/icons/actions";
import { useDeclineInvitation } from "../model/useDeclineInvitation";
import styles from "./DeclineInvitationButton.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface DeclineInvitationButtonProps {
  requestId: string;
  onSuccess?: () => void;
}

export const DeclineInvitationButton = ({
  requestId,
  onSuccess,
}: DeclineInvitationButtonProps) => {
  const { t } = useTranslation(["common"]);
  const { decline, isLoading } = useDeclineInvitation(requestId, onSuccess);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <BaseButtonWrapper
        className={styles.declineButton}
        onClick={() => decline()}
        disabled={isLoading}
      >
        <RejectIcon className={styles.icon} />
        {t("common:requests.actions.declineName")}
      </BaseButtonWrapper>
    </motion.div>
  );
};
