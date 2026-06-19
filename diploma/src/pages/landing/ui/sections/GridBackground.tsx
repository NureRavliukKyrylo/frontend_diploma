import styles from "../LandingPage.module.scss";

export const GridBackground = () => (
  <svg className={styles.gridBackground} aria-hidden="true">
    <defs>
      <pattern
        id="impactflow-landing-grid"
        width="56"
        height="56"
        patternUnits="userSpaceOnUse"
      >
        <path d="M56 0H0V56" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#impactflow-landing-grid)" />
  </svg>
);
