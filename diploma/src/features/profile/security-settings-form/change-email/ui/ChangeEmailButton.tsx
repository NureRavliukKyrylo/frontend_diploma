import styles from "./ChangeEmail.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { Edit } from "@shared/assets/icons/actions";
import { useSendChangeEmailRequest } from "../model/useSendChangeEmailRequest";
import { useUserProfileStore } from "@entities/user";
import { motion } from "framer-motion";

export const ChangeEmailButton = () => {
  const { openVerificationModal } = useUserProfileStore();
  const { sendEmail, isLoading } = useSendChangeEmailRequest({
    onSuccess: () => {
      openVerificationModal("emailVerification");
    },
  });

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={styles.wrapperEditEmailButton}
    >
      <BaseButtonWrapper
        type="button"
        disabled={isLoading}
        showLoadingText={false}
        onClick={() => {
          sendEmail();
        }}
        className={styles.editEmailButton}
      >
        <img src={Edit} alt="pencil-icon" />
      </BaseButtonWrapper>
    </motion.div>
  );
};
