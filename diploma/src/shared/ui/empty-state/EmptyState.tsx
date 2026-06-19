import styles from "./EmptyState.module.scss";

export interface EmptyStateProps {
  title: string;
  subtitle: string;
}

export const EmptyState = ({ title, subtitle }: EmptyStateProps) => (
  <div className={styles.emptyState}>
    <svg
      className={styles.emptyIllustration}
      width="220"
      height="220"
      viewBox="0 0 220 220"
      role="img"
      aria-label="No organization activity yet"
    >
      <g className={styles.outerOrbit}>
        <circle
          cx="110"
          cy="110"
          r="94"
          fill="none"
          stroke="#e8e8e8"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        <circle cx="110" cy="16" r="3" fill="#8b0000" opacity="0.2" />
      </g>

      <g className={styles.middleOrbit}>
        <circle
          cx="110"
          cy="110"
          r="74"
          fill="none"
          stroke="#8b0000"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          opacity="0.25"
        />
        <circle cx="110" cy="36" r="6" fill="#8b0000" opacity="0.5" />
        <circle cx="110" cy="184" r="4" fill="#8b0000" opacity="0.25" />
      </g>

      <g className={styles.innerOrbit}>
        <circle
          cx="110"
          cy="110"
          r="52"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="1"
          strokeDasharray="5 8"
          opacity="0.12"
        />
        <circle cx="162" cy="110" r="5" fill="#1a1a1a" opacity="0.2" />
        <circle cx="58" cy="110" r="4" fill="#8b0000" opacity="0.3" />
      </g>

      <circle cx="110" cy="110" r="28" fill="#ffffff" stroke="#e8e8e8" />
      <circle className={styles.coreGlow} cx="110" cy="110" r="24" fill="#8b0000" />
      <circle cx="110" cy="110" r="14" fill="#8b0000" />

      <circle
        className={`${styles.sparkleDot} ${styles.sparkleDotOne}`}
        cx="110"
        cy="36"
        r="3"
        fill="#8b0000"
      />
      <circle
        className={`${styles.sparkleDot} ${styles.sparkleDotTwo}`}
        cx="162"
        cy="84"
        r="2.5"
        fill="#8b0000"
      />
      <circle
        className={`${styles.sparkleDot} ${styles.sparkleDotThree}`}
        cx="58"
        cy="136"
        r="2"
        fill="#1a1a1a"
      />
    </svg>

    <h3>{title}</h3>
    <p>{subtitle}</p>
  </div>
);
