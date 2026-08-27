import styles from "./GoogleButton.module.scss";
import { GoogleIcon } from "@shared/assets/icons/brands";
import { useGoogleAuth } from "../model/useGoogleAuth";
import { useTranslation } from "react-i18next";

export const GoogleButton = () => {
  const { loginWithGoogle, isLoading } = useGoogleAuth();
  const { t } = useTranslation("auth");
  return (
    <button
      type="button"
      className={styles.googleBtn}
      onClick={loginWithGoogle}
      disabled={isLoading}
    >
      <img src={GoogleIcon} alt="google" />
      <span>{t("common.continueWithGoogle")}</span>
    </button>
  );
};
