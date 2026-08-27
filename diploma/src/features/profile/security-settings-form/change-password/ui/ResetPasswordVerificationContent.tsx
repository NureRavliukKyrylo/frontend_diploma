import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "./ChangePasswordButton.module.scss";
import { ProfilePasswordInput } from "@shared/ui/inputs";
import { useSendNewPassword } from "../model/useSendNewPassword";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useUserStore } from "@entities/user";
import { useTranslation } from "react-i18next";

export const ResetPasswordVerificationContent = () => {
  const { t } = useTranslation("profile");
  const { formik, errorMessage, isLoading } = useSendNewPassword();
  const { isPasswordSet } = useUserStore();

  return (
    <VerificationWrapper
      title={
        isPasswordSet
          ? t("security.changePassword.resetTitle")
          : t("security.changePassword.setTitle")
      }
      description={
        isPasswordSet
          ? t("security.changePassword.resetDescription")
          : t("security.changePassword.setDescription")
      }
    >
      <form
        className={styles.verificationChangePassword}
        onSubmit={formik.handleSubmit}
      >
        <ProfilePasswordInput
          name="newPassword"
          variant="verification"
          placeholder={t("security.changePassword.newPlaceholder")}
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          error={formik.submitCount > 0 ? formik.errors.newPassword : ""}
          showEyeButton
        />
        <ProfilePasswordInput
          name="confirmPassword"
          variant="verification"
          placeholder={t("security.changePassword.confirmPlaceholder")}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.submitCount > 0 ? formik.errors.confirmPassword : ""}
          showEyeButton
        />
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.setNewPasswordButton}
          type="submit"
        >
          {t("security.changePassword.saveButton")}
        </BaseButtonWrapper>
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      </form>
    </VerificationWrapper>
  );
};
