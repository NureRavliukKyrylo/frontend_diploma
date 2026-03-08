import styles from "./ChangePasswordButton.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { Edit } from "@shared/assets/icons/actions";
import { useSendChangePasswordRequest } from "../model/useSendChangePasswordRequest";
import { useUserStore } from "@entities/user";
import { motion } from "framer-motion";

export const ChangePasswordButton = () => {
  const { sendPassword, isLoading } = useSendChangePasswordRequest();
  const { isPasswordSet } = useUserStore();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 150 }}
      className={`${styles.changePasswordButton} ${isPasswordSet ? styles.newPassword : ""}`}
    >
      <BaseButtonWrapper
        disabled={isLoading}
        type="button"
        showLoadingText={false}
        onClick={() => sendPassword()}
      >
        {isPasswordSet ? (
          <img src={Edit} alt="pencil-icon" />
        ) : (
          <h1>Set password</h1>
        )}
      </BaseButtonWrapper>
    </motion.div>
  );
};
