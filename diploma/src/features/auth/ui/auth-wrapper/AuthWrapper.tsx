import { type ReactNode } from "react";
import styles from "./AuthWrapper.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import type { TabOption } from "@shared/config/types";
import { Toggle } from "@shared/ui";
import { AuthCardDecoration } from "@shared/ui/wrappers/auth/card-decoration";
import { GoogleButton } from "../../google-login/ui/GoogleButton";
import type { TFunction } from "i18next";

interface AuthWrapperProps<T extends string> {
  tabs: TabOption<T>[];
  activeValue: T;
  onChange: (value: T) => void;
  forms: Record<T, ReactNode>;
  t: TFunction;
}

export function AuthWrapper<T extends string>({
  tabs,
  activeValue,
  onChange,
  forms,
  t,
}: AuthWrapperProps<T>) {
  const activeTabLabel =
    tabs.find((tab) => tab.value === activeValue)?.label ?? activeValue;

  return (
    <div className={styles.wrapperAuthContainer}>
      <div className={styles.authContainer}>
        <AuthCardDecoration />
        <div className={styles.cardContent}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>{activeTabLabel}</span>
          </div>

          <div className={styles.switchAuth}>
            <Toggle<T>
              tabs={tabs}
              activeValue={activeValue}
              onChange={onChange}
              className={styles.tabs}
              buttonClassName={styles.toggleAuthButton}
              activeButtonClassName={styles.toggleActiveAuthButton}
              pillClassName={styles.activePill}
              innerWrapperClassName={styles.tabsInner}
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
              <span>{t("common.thirdService")}</span>
            </div>
            <div className={styles.apiButtons}>
              <GoogleButton />
            </div>
          </div>

          <div className={styles.switchFooter}>
            <span>
              {activeValue === "signin"
                ? t("common.noAccount")
                : t("common.hasAccount")}
            </span>
            <button
              type="button"
              onClick={() =>
                onChange(
                  (activeValue === "signin" ? "signup" : "signin") as T,
                )
              }
            >
              {activeValue === "signin"
                ? t("common.signUp")
                : t("common.signIn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
