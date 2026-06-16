import styles from "./PasswordForm.module.scss";
import { PasswordInput } from "@shared/ui/inputs";
import { useSetPassword } from "../model/useSetPassword";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useTranslation } from "react-i18next";

export const PasswordForm = () => {
  const { t } = useTranslation("auth");
  const { formik, isLoading, errorMessage } = useSetPassword();

  return (
    <form onSubmit={formik.handleSubmit} className={styles.passwordSetForm}>
      <div className={styles.inputsSetPassword}>
        <PasswordInput
          id="newPassword"
          name="newPassword"
          type="password"
          label={t("setPassword.passwordPlaceholder")}
          activeLabel={t("setPassword.passwordLabel")}
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          error={formik.submitCount > 0 ? formik.errors.newPassword : ""}
        />
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label={t("setPassword.confirmPlaceholder")}
          activeLabel={t("setPassword.confirmLabel")}
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={formik.submitCount > 0 ? formik.errors.confirmPassword : ""}
        />
      </div>
      <div className={styles.buttonSetPasswordBlock}>
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.setPasswordButton}
        >
          {t("setPassword.submit")}
        </BaseButtonWrapper>
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      </div>
    </form>
  );
};
