import styles from "./LoginForm.module.scss";
import { DefaultInput } from "../../../../shared/inputs";
import { Checkbox } from "../../../../shared/checkBox";
import { useErrorStore } from "../../../../shared/stores";
import { useLogin } from "../../../auth";
import { AuthButton } from "../../../../shared/buttons/auth";
import { useAuthFormStore } from "../../../../entities/user";

export const LoginForm = () => {
  const serverError = useErrorStore((state) => state.serverError);
  const { formik, isLoading } = useLogin();
  const { setEmail, setPassword, setRememberMe } = useAuthFormStore();
  return (
    <>
      <div className={styles.headerLogin}>
        <h1>Sign in to your account</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.inputsLogin}>
          <DefaultInput
            id="email"
            name="email"
            type="email"
            label="Email Address or username"
            onChange={(e) => {
              formik.handleChange(e);
              setEmail(e.target.value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.submitCount > 0 ? formik.errors.email : ""}
          />
          <DefaultInput
            id="password"
            name="password"
            type="password"
            label="Enter your password"
            onChange={(e) => {
              formik.handleChange(e);
              setPassword(e.target.value);
            }}
            onBlur={formik.handleBlur}
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
            />
            <span>Remember me</span>
          </div>
          <div className={styles.forgotPassword}>Forgot Password</div>
        </div>
        <div className={styles.buttonBlock}>
          <AuthButton loading={isLoading} />
          {serverError && <div className="errorMessage">{serverError}</div>}
        </div>
      </form>
    </>
  );
};
