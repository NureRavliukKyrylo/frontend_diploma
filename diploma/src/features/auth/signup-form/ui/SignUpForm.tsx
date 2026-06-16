import styles from "./SignUpForm.module.scss";
import { BaseInput, EmailInput, PasswordInput } from "@shared/ui/inputs";
import { Checkbox } from "@shared/ui/inputs";
import { useRegistration } from "../model/useRegistration";
import { useAuthStore } from "@entities/user";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useTranslation } from "react-i18next";

export const SignUpForm = () => {
  const { t } = useTranslation("auth");
  const { formik, isLoading, errorMessage } = useRegistration();
  const {
    setSignUpEmail,
    setSignUpPassword,
    setSignFirstName,
    setSignLastName,
    setAgreement,
  } = useAuthStore();

  return (
    <>
      <div className={styles.headerSignUp}>
        <h1>{t("register.title")}</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.signUpForm}>
        <div className={styles.inputsSignUp}>
          <div className={styles.inputsFullName}>
            <BaseInput
              id="firstName"
              name="firstName"
              type="text"
              label={t("register.firstNamePlaceholder")}
              activeLabel={t("register.firstNameLabel")}
              onChange={(e) => {
                formik.handleChange(e);
                setSignFirstName(e.target.value);
              }}
              value={formik.values.firstName}
              error={formik.submitCount > 0 ? formik.errors.firstName : ""}
            />
            <BaseInput
              id="lastName"
              name="lastName"
              type="text"
              label={t("register.lastNamePlaceholder")}
              activeLabel={t("register.lastNameLabel")}
              onChange={(e) => {
                formik.handleChange(e);
                setSignLastName(e.target.value);
              }}
              value={formik.values.lastName}
              error={formik.submitCount > 0 ? formik.errors.lastName : ""}
            />
          </div>
          <EmailInput
            id="email"
            name="email"
            type="email"
            label={t("register.emailPlaceholder")}
            activeLabel={t("register.emailLabel")}
            onChange={(e) => {
              formik.handleChange(e);
              setSignUpEmail(e.target.value);
            }}
            value={formik.values.email}
            error={formik.submitCount > 0 ? formik.errors.email : ""}
          />
          <PasswordInput
            id="password"
            name="password"
            label={t("register.passwordPlaceholder")}
            activeLabel={t("register.passwordLabel")}
            onChange={(e) => {
              formik.handleChange(e);
              setSignUpPassword(e.target.value);
            }}
            value={formik.values.password}
            error={formik.submitCount > 0 ? formik.errors.password : ""}
          />
        </div>
        <div className={styles.agreement}>
          <Checkbox
            name="agreement"
            checked={formik.values.agreement}
            onChange={(e) => {
              formik.handleChange(e);
              setAgreement(e.target.checked);
            }}
            error={formik.submitCount > 0 ? formik.errors.agreement : ""}
          >
            {t("register.agreementText")}{" "}
            <span>{t("register.agreementLink")}</span>
          </Checkbox>
        </div>
        <div className={styles.buttonBlock}>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.signUpButton}
          >
            {t("register.submit")}
          </BaseButtonWrapper>
          {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        </div>
      </form>
    </>
  );
};
