import styles from "./GoogleButton.module.scss";
import { GoogleIcon } from "../../../../shared/assets/auth";
import { useGoogleLogin as useGoogleOAuth } from "@react-oauth/google";
import { useGoogleLogin } from "../model/useGoogleLogin";

export const GoogleButton = () => {
  const { loginWithGoogle, isLoading } = useGoogleLogin();

  const signIn = useGoogleOAuth({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log("Google auth code:", codeResponse.code);
      loginWithGoogle(codeResponse.code);
    },
    onError: (err) => {
      console.error("Google login error:", err);
    },
    scope: "openid profile email",
  });

  return (
    <button
      className={styles.googleSign}
      onClick={() => signIn()}
      disabled={isLoading}
    >
      <img src={GoogleIcon} alt="google" />
      <span></span>
    </button>
  );
};
