import styles from "./ForgotPassword.module.scss";

import { EmailInput } from "@shared/ui/inputs";
import { useForgotPassword } from "../model/useForgotPassword";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useTranslation } from "react-i18next";

export const ForgotPasswordForm = () => {
  const { t } = useTranslation("auth");
  const { formik, isLoading, errorMessage } = useForgotPassword();

  return (
    <form onSubmit={formik.handleSubmit} className={styles.forgotPasswordForm}>
      <EmailInput
        id="email"
        name="email"
        type="email"
        label={t("forgotPassword.emailPlaceholder")}
        activeLabel={t("forgotPassword.emailLabel")}
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.submitCount > 0 ? formik.errors.email : ""}
      />
      <div className={styles.buttonForgotPasswordBlock}>
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.buttonSendRequest}
        >
          {t("forgotPassword.submit")}
        </BaseButtonWrapper>
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      </div>
    </form>
  );
};
