import styles from "./AuthToggle.module.scss";

interface AuthToggleProps {
  mode: "signup" | "signin";
  onChange: (mode: "signup" | "signin") => void;
}

export function AuthToggle({ mode, onChange }: AuthToggleProps) {
  return (
    <div className={styles.toggleContainer}>
      <button
        className={`${styles.toggleButton} ${
          mode === "signup" ? styles.active : ""
        }`}
        onClick={() => onChange("signup")}
      >
        Sign up
      </button>
      <button
        className={`${styles.toggleButton} ${
          mode === "signin" ? styles.active : ""
        }`}
        onClick={() => onChange("signin")}
      >
        Sign in
      </button>
    </div>
  );
}
