import styles from "./GoogleButton.module.scss";
import { GoogleIcon } from "@shared/assets/icons/brands";
import { useGoogleAuth } from "../model/useGoogleAuth";

export const GoogleButton = () => {
  const { loginWithGoogle, isLoading } = useGoogleAuth();

  return (
    <button
      className={styles.googleSign}
      onClick={loginWithGoogle}
      disabled={isLoading}
    >
      <img src={GoogleIcon} alt="google" />
    </button>
  );
};
