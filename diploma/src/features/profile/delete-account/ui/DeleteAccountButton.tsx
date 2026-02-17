import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./DeleteAccountButton.module.scss";

export const DeleteAccountButton = () => {
  let isLoading = false; //temporary
  return (
    <BaseButtonWrapper
      loading={isLoading}
      className={styles.deleteAccountButton}
    >
      DELETE PROFILE
    </BaseButtonWrapper>
  );
};
