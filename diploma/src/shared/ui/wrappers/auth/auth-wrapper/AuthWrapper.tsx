import { type ReactNode } from "react";
import styles from "./AuthWrapper.module.scss";
import { AuthToggle } from "../../..";
import { AppleIcon } from "@shared/assets/icons/brands";
import { useAuthStore } from "@entities/user";
import { AnimatePresence, motion } from "framer-motion";
import { GoogleButton } from "@features/auth";
import { useErrorStore } from "@shared/config";

interface AuthWrapperProps {
  signupForm: ReactNode;
  signinForm: ReactNode;
}

export function AuthWrapper({ signupForm, signinForm }: AuthWrapperProps) {
  const { mode } = useAuthStore();
  const serverError = useErrorStore(
    (state) => state.errors["loginGoogleError"]
  );
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
            <GoogleButton />
          </div>
        </div>
        {serverError && <div className="errorMessage">{serverError}</div>}
      </div>
    </div>
  );
}
