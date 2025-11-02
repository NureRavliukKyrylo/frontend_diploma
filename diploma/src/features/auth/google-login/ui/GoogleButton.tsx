import styles from "./GoogleButton.module.scss";
import { GoogleIcon } from "@shared/assets/icons/brands";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogle } from "../model/useGoogleLogin";
import { useRef } from "react";

export const GoogleButton = () => {
  const { loginWithGoogle, isLoading } = useGoogle();
  const googleLoginRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <button
        className={styles.googleSign}
        onClick={() => {
          const googleButton =
            googleLoginRef.current?.querySelector("div[role=button]");
          if (googleButton) (googleButton as HTMLElement).click();
        }}
        disabled={isLoading}
      >
        <img src={GoogleIcon} alt="google" />
        <span></span>
      </button>

      <div ref={googleLoginRef} className={styles.hiddenGoogleLogin}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const credential = credentialResponse.credential;
            if (credential) {
              loginWithGoogle(credential);
            } else {
              console.error("No credential returned from Google login");
            }
          }}
          onError={() => console.error("Google login failed")}
        />
      </div>
    </>
  );
};
