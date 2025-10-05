import { useAuthStore } from "../../../entities/user";
import styles from "./AuthToggle.module.scss";

export function AuthToggle() {
  const { mode, setMode } = useAuthStore();

  return (
    <div className={styles.toggleContainer}>
      <button
        className={`${styles.toggleButton} ${
          mode === "signin" ? styles.active : ""
        }`}
        onClick={() => setMode("signin")}
      >
        Sign in
      </button>
      <button
        className={`${styles.toggleButton} ${
          mode === "signup" ? styles.active : ""
        }`}
        onClick={() => setMode("signup")}
      >
        Sign up
      </button>
    </div>
  );
}
