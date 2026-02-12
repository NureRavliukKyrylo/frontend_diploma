import { type ReactNode } from "react";
import styles from "./AuthWrapper.module.scss";
import { AppleIcon } from "@shared/assets/icons/brands";
import { AnimatePresence, motion } from "framer-motion";
import { GoogleButton } from "@features/auth";
import type { TabOption } from "@shared/config/types";
import { Toggle } from "@shared/ui";

interface AuthWrapperProps<T extends string> {
  tabs: TabOption<T>[];
  activeValue: T;
  onChange: (value: T) => void;
  forms: Record<T, ReactNode>;
}

export function AuthWrapper<T extends string>({
  tabs,
  activeValue,
  onChange,
  forms,
}: AuthWrapperProps<T>) {
  return (
    <div className={styles.wrapperAuthContainer}>
      <div className={styles.authContainer}>
        <div className={styles.switchAuth}>
          <Toggle<T>
            tabs={tabs}
            activeValue={activeValue}
            onChange={onChange}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeValue}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {forms[activeValue]}
          </motion.div>
        </AnimatePresence>

        <div className={styles.apiAuth}>
          <div className={styles.line}>
            <span>OR SIGN UP WITH</span>
          </div>
          <div className={styles.apiButtons}>
            <button className={styles.appleSign}>
              <img src={AppleIcon} alt="apple" />
            </button>
            <GoogleButton />
          </div>
        </div>
      </div>
    </div>
  );
}

