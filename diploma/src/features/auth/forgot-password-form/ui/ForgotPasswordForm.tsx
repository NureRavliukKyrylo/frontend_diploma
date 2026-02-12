import styles from "./ForgotPassword.module.scss";

import { EmailInput } from "@shared/ui/inputs";
import { useForgotPassword } from "../model/useForgotPassword";

import { BaseButtonWrapper } from "@shared/ui/buttons";

export const ForgotPasswordForm = () => {
  const { formik, isLoading, errorMessage } = useForgotPassword();
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className={styles.forgotPasswordForm}
      >
        <EmailInput
          id="email"
          name="email"
          type="email"
          label="Enter your email"
          activeLabel="Email"
          onChange={(e) => {
            formik.handleChange(e);
          }}
          value={formik.values.email}
          error={formik.submitCount > 0 ? formik.errors.email : ""}
        />
        <div className={styles.buttonForgotPasswordBlock}>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.buttonSendRequest}
          >
            Send Request
          </BaseButtonWrapper>
          {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        </div>
      </form>
    </>
  );
};
