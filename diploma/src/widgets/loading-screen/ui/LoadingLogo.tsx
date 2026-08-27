import type { RefObject } from "react";
import styles from "./LoadingScreen.module.scss";

const LOGO_TEXT_X = 12;
const LOGO_TEXT_Y = 148;
const LOGO_FONT_SIZE = 168;

interface LoadingLogoProps {
  percent: number;
  waveY: number;
  waveReady: boolean;
  logoExiting: boolean;
  percentFadeOut: boolean;
  textRef: RefObject<SVGTextElement | null>;
}

export const LoadingLogo = ({
  percent,
  waveY,
  waveReady,
  logoExiting,
  percentFadeOut,
  textRef,
}: LoadingLogoProps) => (
  <div className={`${styles.logoWrap} ${logoExiting ? styles.exiting : ""}`}>
    <svg
      className={styles.logo}
      viewBox="0 0 1120 190"
      role="img"
      aria-label="ImpactFlow"
    >
      <defs>
        <linearGradient id="wave-gradient" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#840000" />
          <stop offset="100%" stopColor="#b33a3a" />
        </linearGradient>
        <clipPath id="impactflow-text-clip">
          <text
            x={LOGO_TEXT_X}
            y={LOGO_TEXT_Y}
            fontSize={LOGO_FONT_SIZE}
            fontWeight="900"
            letterSpacing="-3"
            fontFamily="Exo 2, sans-serif"
          >
            IMPACTFLOW
          </text>
        </clipPath>
      </defs>

      <text ref={textRef} x={LOGO_TEXT_X} y={LOGO_TEXT_Y} className={styles.outlineText}>
        IMPACTFLOW
      </text>

      <g clipPath="url(#impactflow-text-clip)">
        <rect x="0" y="0" width="1120" height="190" fill="#f4f4f4" />
        <g
          className={`${styles.waveGroup} ${waveReady ? styles.waveReady : ""}`}
          style={{ transform: `translateY(${waveY}px)` }}
        >
          <path
            d="M-60,15 Q-30,0 0,15 T60,15 T120,15 T180,15 T240,15 T300,15 T360,15 T420,15 T480,15 T540,15 T600,15 T660,15 T720,15 T780,15 T840,15 T900,15 T960,15 T1020,15 T1080,15 T1140,15 T1200,15 V320 H-60 Z"
            fill="url(#wave-gradient)"
          />
        </g>
      </g>
    </svg>

    <div
      className={`${styles.percent} ${percentFadeOut ? styles.fadeOut : ""}`}
      aria-hidden="true"
    >
      <span className={styles.loadingLabel}>Loading...</span>
      <span className={styles.percentNum}>{percent}%</span>
    </div>
  </div>
);
