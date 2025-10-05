import styles from "./PasswordForm.module.scss";
import { useErrorStore } from "../../../../shared/stores";
import { AuthButton } from "../../../../shared/buttons/auth";
import { PasswordInput } from "../../../../shared/inputs";

export const PasswordForm = () => {
  const serverError = useErrorStore((state) => state.serverError);
  return (
    <>
      <form className={styles.passwordSetForm}>
        <div className={styles.inputsSetPassword}>
          <PasswordInput
            id="password"
            name="password"
            type="password"
            label="Enter your password"
            activeLabel="Password"
          />
          <PasswordInput
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            label="Repeat your password"
            activeLabel="Repeat password"
          />
        </div>
        <div className={styles.buttonSetPasswordBlock}>
          <AuthButton loading={false} label="Confirm" />
          {serverError && <div className="errorMessage">{serverError}</div>}
        </div>
      </form>
    </>
  );
};
