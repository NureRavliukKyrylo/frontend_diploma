import styles from "./PasswordForm.module.scss";
import { useErrorStore } from "@shared/config";
import { AuthButton } from "@shared/ui/buttons";
import { PasswordInput } from "@shared/ui/inputs";
import { useSetPassword } from "../model/useSetPassword";

export const PasswordForm = () => {
  const serverError = useErrorStore(
    (state) => state.errors["setPasswordError"]
  );
  const { formik, isLoading } = useSetPassword();

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
          <AuthButton loading={isLoading} label="Confirm" />
          {serverError && <div className="errorMessage">{serverError}</div>}
        </div>
      </form>
    </>
  );
};
