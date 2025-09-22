import { useState, type ReactNode } from "react";
import styles from "../styles/AuthForm.module.scss";
import { AuthToggle } from "../../../../features/auth";
import { AppleIcon } from "../../../assets/auth";

interface AuthFormProps {
  signupForm: ReactNode;
  signinForm: ReactNode;
}

export function AuthForm({ signupForm, signinForm }: AuthFormProps) {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  return (
    <>
      <div className={styles.authContainer}>
        <div className={styles.switchAuth}>
          <AuthToggle mode={mode} onChange={setMode} />
        </div>
        {mode === "signup" ? signupForm : signinForm}
        <div className={styles.apiAuth}>
          <div className={styles.line}>
            <span>OR SIGN UP WITH</span>
          </div>
          <div className={styles.apiButtons}>
            <button className={styles.appleSign}>
              <img src={AppleIcon} alt="Apple" className={styles.appleIcon} />
            </button>
            <button className={styles.googleSign}></button>
          </div>
        </div>
      </div>
    </>
  );
}
