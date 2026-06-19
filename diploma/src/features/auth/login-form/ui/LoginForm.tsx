import styles from "./LoginForm.module.scss";
import { EmailInput, PasswordInput } from "@shared/ui/inputs";
import { Checkbox } from "@shared/ui/inputs";
import { useLogin } from "../model/useLogin";
import { useAuthStore } from "@entities/user";
import { AuthRoutes } from "@shared/routes";
import { Link } from "@tanstack/react-router";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useTranslation } from "react-i18next";

export const LoginForm = () => {
  const { formik, isLoading, errorMessage } = useLogin();
  const { t } = useTranslation("auth");
  const { setLoginEmail, setLoginPassword, setRememberMe } = useAuthStore();
  return (
    <>
      <div className={styles.headerLogin}>
        <h1 className={styles.title}>{t("login.title")}</h1>
        <p className={styles.subtitle}>{t("login.subtitle")}</p>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.loginForm}>
        <div className={styles.inputsLogin}>
          <EmailInput
            id="email"
            name="email"
            type="email"
            label={t("login.emailPlaceholder")}
            activeLabel={t("login.emailLabel")}
            onChange={(e) => {
              formik.handleChange(e);
              setLoginEmail(e.target.value);
            }}
            value={formik.values.email}
            error={formik.submitCount > 0 ? formik.errors.email : ""}
          />
          <PasswordInput
            id="password"
            name="password"
            type="password"
            label={t("login.passwordPlaceholder")}
            activeLabel={t("login.passwordLabel")}
            onChange={(e) => {
              formik.handleChange(e);
              setLoginPassword(e.target.value);
            }}
            value={formik.values.password}
            error={formik.submitCount > 0 ? formik.errors.password : ""}
          />
        </div>
        <div className={styles.additional}>
          <div className={styles.rememberMe}>
            <Checkbox
              name="rememberMe"
              onChange={(e) => {
                formik.handleChange(e);
                setRememberMe(e.target.checked);
              }}
              checked={formik.values.rememberMe}
            >
              <span>{t("login.rememberMe")}</span>
            </Checkbox>
          </div>
          <Link
            to={AuthRoutes.forgotPassword.root}
            className={styles.forgotLink}
          >
            {t("login.forgotPassword")}
          </Link>
        </div>
        <div className={styles.buttonBlock}>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.signInButton}
          >
            {t("login.signIn")}
          </BaseButtonWrapper>
          {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        </div>
      </form>
    </>
  );
};
