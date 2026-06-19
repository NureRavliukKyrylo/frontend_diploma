import styles from "./AuthCardDecoration.module.scss";

export const AuthCardDecoration = () => (
  <svg
    className={styles.deco}
    width="180"
    height="120"
    viewBox="0 0 180 120"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M10 60 Q50 18 90 60 Q130 102 170 60"
      stroke="#840000"
      strokeWidth="2.2"
      fill="none"
    />
    <path
      d="M10 45 Q50 8 90 45 Q130 82 170 45"
      stroke="#840000"
      strokeWidth="1.6"
      fill="none"
    />
    <path
      d="M10 75 Q50 35 90 75 Q130 115 170 75"
      stroke="#840000"
      strokeWidth="1.6"
      fill="none"
    />
    <circle cx="90" cy="60" r="6" fill="#840000" opacity="0.15" />
  </svg>
);
