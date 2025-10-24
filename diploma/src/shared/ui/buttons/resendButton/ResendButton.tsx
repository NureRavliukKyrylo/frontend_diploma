import React, { useEffect } from "react";
import styles from "./ResendButton.module.scss";

type ResendButtonProps = {
  seconds: number;
  onResend: () => void;
  resetTimer: () => void;
  decrementTimer: () => void;
  serverError?: string | null;
  isLoading: boolean;
};

export const ResendButton: React.FC<ResendButtonProps> = ({
  seconds,
  onResend,
  resetTimer,
  decrementTimer,
  serverError,
  isLoading,
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

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!canResend}
      className={`${styles.resendButton} ${
        canResend && !isLoading ? styles.active : styles.disabled
      } ${isLoading ? styles.loading : ""}`}
    >
      {canResend ? (
        "Resend Code"
      ) : (
        <>
          Didn’t receive the code? <span>Resend code in ({formattedTime})</span>
        </>
      )}
    </button>
  );
};
