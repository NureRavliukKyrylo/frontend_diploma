import styles from "./LoginForm.module.scss";
import { EmailInput, PasswordInput } from "@shared/ui/inputs";
import { Checkbox } from "@shared/ui/inputs";
import { useErrorStore } from "@shared/config";
import { useLogin } from "../model/useLogin";
import { AuthButton } from "@shared/ui/buttons";
import { useAuthStore } from "@entities/user";
import { AuthRoutes } from "@shared/routes";
import { Link } from "@tanstack/react-router";

export const LoginForm = () => {
  const serverError = useErrorStore((state) => state.errors["loginError"]);
  const { formik, isLoading } = useLogin();
  const { setLoginEmail, setLoginPassword, setRememberMe } = useAuthStore();
  return (
    <>
      <div className={styles.headerLogin}>
        <h1>Sign in to your account</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.loginForm}>
        <div className={styles.inputsLogin}>
          <EmailInput
            id="email"
            name="email"
            type="email"
            label="Enter email adress"
            activeLabel="Email"
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
            label="Enter your password"
            activeLabel="Password"
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
              <span>Remember me</span>
            </Checkbox>
          </div>
          <Link
            to={AuthRoutes.forgotPassword.root}
            className={styles.forgotPassword}
          >
            Forgot Password
          </Link>
        </div>
        <div className={styles.buttonBlock}>
          <AuthButton loading={isLoading} />
          {serverError && <div className="errorMessage">{serverError}</div>}
        </div>
      </form>
    </>
  );
};
