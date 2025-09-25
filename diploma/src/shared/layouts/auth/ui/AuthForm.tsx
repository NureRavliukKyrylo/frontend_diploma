import { type ReactNode } from "react";
import styles from "../styles/AuthForm.module.scss";
import { AuthToggle } from "../../../components/authToggle";
import { AppleIcon } from "../../../assets/auth";
import { useAuthModeStore } from "../../../../entities/user";
import { GoogleIcon } from "../../../assets/auth";
import { AnimatePresence, motion } from "framer-motion";

interface AuthFormProps {
  signupForm: ReactNode;
  signinForm: ReactNode;
}

export function AuthForm({ signupForm, signinForm }: AuthFormProps) {
  const { mode } = useAuthModeStore();
  return (
    <div className={styles.wrapperAuthContainer}>
      <div className={styles.authContainer}>
        <div className={styles.switchAuth}>
          <AuthToggle />
        </div>
        <AnimatePresence mode="wait">
          {mode === "signup" ? (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {signupForm}
            </motion.div>
          ) : (
            <motion.div
              key="signin"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {signinForm}
            </motion.div>
          )}
        </AnimatePresence>
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
    </div>
  );
}
