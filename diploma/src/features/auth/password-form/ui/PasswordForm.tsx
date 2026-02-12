import styles from "./PasswordForm.module.scss";

import { PasswordInput } from "@shared/ui/inputs";
import { useSetPassword } from "../model/useSetPassword";
import { BaseButtonWrapper } from "@shared/ui/buttons";

export const PasswordForm = () => {
  const { formik, isLoading, errorMessage } = useSetPassword();

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.passwordSetForm}>
        <div className={styles.inputsSetPassword}>
          <PasswordInput
            id="newPassword"
            name="newPassword"
            type="password"
            label="Enter your password"
            activeLabel="Password"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            value={formik.values.newPassword}
            error={formik.submitCount > 0 ? formik.errors.newPassword : ""}
          />
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Repeat your password"
            activeLabel="Repeat password"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            value={formik.values.confirmPassword}
            error={formik.submitCount > 0 ? formik.errors.confirmPassword : ""}
          />
        </div>
        <div className={styles.buttonSetPasswordBlock}>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.setPasswordButton}
          >
            Confirm
          </BaseButtonWrapper>
          {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        </div>
      </form>
    </>
  );
};
