import React, { useEffect } from "react";
import styles from "./ResendButton.module.scss";
import type { TFunction } from "i18next";

type ResendButtonProps = {
  seconds: number;
  onResend: () => void;
  resetTimer: () => void;
  decrementTimer: () => void;
  isLoading: boolean;
  variant?: "default" | "profile";
  t?: TFunction;
};

const fallbackT = ((key: string, options?: { time?: string }) => {
  if (key === "common:actions.resendCode") return "Resend Code";
  if (key === "common:actions.didNotReceive") return "Resend code in";
  if (key === "common:actions.resendIn") return options?.time ?? "";
  return key;
}) as TFunction;

export const ResendButton: React.FC<ResendButtonProps> = ({
  seconds,
  onResend,
  resetTimer,
  decrementTimer,
  isLoading,
  variant = "default",
  t,
}) => {
  const canResend = seconds === 0;
  const translate = t ?? fallbackT;

  useEffect(() => {
    if (seconds === 0) return;
    const timer = setTimeout(() => decrementTimer(), 1000);
    return () => clearTimeout(timer);
  }, [seconds, decrementTimer]);

  const handleClick = async () => {
    if (!canResend) return;
    try {
      await onResend();
      resetTimer();
    } catch {}
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
        translate("common:actions.resendCode")
      ) : (
        <>
          {translate("common:actions.didNotReceive")}{" "}
          <span>
            {translate("common:actions.resendIn", { time: formattedTime })}
          </span>
        </>
      )}
    </button>
  );
};
