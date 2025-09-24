import { type ReactNode } from "react";
import styles from "../styles/AuthForm.module.scss";
import { AuthToggle } from "../../../components/authToggle";
import { AppleIcon } from "../../../assets/auth";
import { useAuthModeStore } from "../../../../entities/user";
import { GoogleIcon } from "../../../assets/auth";

interface AuthFormProps {
  signupForm: ReactNode;
  signinForm: ReactNode;
}

export function AuthForm({ signupForm, signinForm }: AuthFormProps) {
  const { mode } = useAuthModeStore();
  return (
    <>
      <div className={styles.authContainer}>
        <div className={styles.switchAuth}>
          <AuthToggle />
        </div>
        {mode === "signup" ? signupForm : signinForm}
        <div className={styles.apiAuth}>
          <div className={styles.line}>
            <span>OR SIGN UP WITH</span>
          </div>
          <div className={styles.apiButtons}>
            <button className={styles.appleSign}>
              <img src={AppleIcon} alt="google" />
            </button>
            <button className={styles.googleSign}>
              <img src={GoogleIcon} alt="google" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
