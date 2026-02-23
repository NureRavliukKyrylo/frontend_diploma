import styles from "../../base-security-form/ui/SecuritySettingsForm.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { Edit } from "@shared/assets/icons/actions";
import { useSendChangePasswordRequest } from "../model/useSendChangePasswordRequest";

export const ChangePasswordButton = () => {
  const { sendPassword, isLoading } = useSendChangePasswordRequest();

  return (
    <BaseButtonWrapper
      className={styles.editPasswordButton}
      disabled={isLoading}
      type="button"
      showLoadingText={false}
      onClick={() => {
        sendPassword();
      }}
    >
      <img src={Edit} alt="pencil-icon" />
    </BaseButtonWrapper>
  );
};
