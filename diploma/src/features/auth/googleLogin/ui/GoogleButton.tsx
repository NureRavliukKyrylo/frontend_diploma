import styles from "./GoogleButton.module.scss";
import { GoogleIcon } from "../../../../shared/assets/auth";

export const googleLogin = () => {
  window.location.href = "https://localhost:7111/api/Auth/google-login";
};

export const GoogleButton = () => {
  return (
    <button className={styles.googleSign} onClick={googleLogin}>
      <img src={GoogleIcon} alt="google" />
    </button>
  );
};
