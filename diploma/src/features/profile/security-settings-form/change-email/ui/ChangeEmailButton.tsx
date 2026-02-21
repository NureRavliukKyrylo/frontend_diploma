import styles from "../../base-security-form/ui/SecuritySettingsForm.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { Edit } from "@shared/assets/icons/actions";
import { useSendChangeEmailRequest } from "../model/useSendChangeEmailRequest";
import { useUserProfileStore } from "@entities/user";

export const ChangeEmailButton = () => {
  const { openVerificationModal } = useUserProfileStore();
  const { sendEmail, isLoading } = useSendChangeEmailRequest({
    onSuccess: () => {
      openVerificationModal("emailVerification");
    },
  });

  return (
    <BaseButtonWrapper
      className={styles.editPasswordButton}
      type="button"
      loading={isLoading}
      showLoadingText={false}
      onClick={() => {
        sendEmail();
      }}
    >
      <img src={Edit} alt="pencil-icon" />
    </BaseButtonWrapper>
  );
};
