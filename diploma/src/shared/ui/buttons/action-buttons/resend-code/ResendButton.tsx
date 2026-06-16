import React, { useEffect } from "react";
import styles from "./ResendButton.module.scss";
import type { TFunction } from "i18next";

type ResendButtonProps = {
  seconds: number;
  onResend: () => void;
  resetTimer: () => void;
  decrementTimer: () => void;
  serverError?: string | null;
  isLoading: boolean;
  variant?: "default" | "profile";
  t: TFunction;
};

export const ResendButton: React.FC<ResendButtonProps> = ({
  seconds,
  onResend,
  resetTimer,
  decrementTimer,
  serverError,
  isLoading,
  variant = "default",
  t,
}) => {
  const canResend = seconds === 0;

  useEffect(() => {
    if (seconds === 0) return;
    const timer = setTimeout(() => decrementTimer(), 1000);
    return () => clearTimeout(timer);
  }, [seconds, decrementTimer]);

  const handleClick = async () => {
    if (!canResend) return;
    try {
      await onResend();
      if (!serverError) resetTimer();
    } catch (err) {
      console.log("Resend failed:", err);
    }
  };

  const formattedTime = `${Math.floor(seconds / 60)}:${(seconds % 60)
    .toString()
    .padStart(2, "0")}`;

  const variantClass = variant !== "default" ? styles[variant] : "";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!canResend}
      className={`${styles.resendButton} ${variantClass} ${
        canResend && !isLoading ? styles.active : styles.disabled
      } ${isLoading ? styles.loading : ""}`}
    >
      {canResend ? (
        t("common:actions.resendCode")
      ) : (
        <>
          {t("common:actions.didNotReceive")}{" "}
          <span>{t("common:actions.resendIn", { time: formattedTime })}</span>
        </>
      )}
    </button>
  );
};
