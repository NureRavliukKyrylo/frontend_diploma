import styles from "./ChangePasswordButton.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { Edit } from "@shared/assets/icons/actions";
import { useSendChangePasswordRequest } from "../model/useSendChangePasswordRequest";
import { useUserStore } from "@entities/user";

export const ChangePasswordButton = () => {
  const { sendPassword, isLoading } = useSendChangePasswordRequest();
  const { isPasswordSet } = useUserStore();

  return (
    <BaseButtonWrapper
      className={`${styles.editPasswordButton} ${isPasswordSet ? styles.newPassword : ""}`}
      disabled={isLoading}
      type="button"
      showLoadingText={false}
      onClick={() => {
        sendPassword();
      }}
    >
      {isPasswordSet ? (
        <img src={Edit} alt="pencil-icon" />
      ) : (
        <h1>Set password</h1>
      )}
    </BaseButtonWrapper>
  );
};
