import styles from "./ForgotPassword.module.scss";
import { useErrorStore } from "@shared/config";
import { AuthButton } from "@shared/ui/buttons";
import { EmailInput } from "@shared/ui/inputs";
import { useForgotPassword } from "../model/useForgotPassword";
import { useAuthStore } from "@entities/user";

export const ForgotPasswordForm = () => {
  const serverError = useErrorStore(
    (state) => state.errors["forgotPasswordError"]
  );
  const { setEmailForgotPassword } = useAuthStore();

  const { formik, isLoading } = useForgotPassword();
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
            setEmailForgotPassword(e.target.value);
          }}
          value={formik.values.email}
          error={formik.submitCount > 0 ? formik.errors.email : ""}
        />
        <div className={styles.buttonForgotPasswordBlock}>
          <AuthButton loading={isLoading} label="Send request" />
          {serverError && <div className="errorMessage">{serverError}</div>}
        </div>
      </form>
    </>
  );
};
