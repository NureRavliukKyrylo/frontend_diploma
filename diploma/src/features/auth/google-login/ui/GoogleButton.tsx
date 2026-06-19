import styles from "./GoogleButton.module.scss";
import { GoogleIcon } from "@shared/assets/icons/brands";
import { useGoogleAuth } from "../model/useGoogleAuth";

export const GoogleButton = () => {
  const { loginWithGoogle, isLoading } = useGoogleAuth();

  return (
    <button
      type="button"
      className={styles.googleBtn}
      onClick={loginWithGoogle}
      disabled={isLoading}
    >
      <img src={GoogleIcon} alt="google" />
      <span>Continue with Google</span>
    </button>
  );
};
