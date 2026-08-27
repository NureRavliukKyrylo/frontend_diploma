import { useEffect, useRef, useState } from "react";
import { LoadingLogo } from "./LoadingLogo";
import styles from "./LoadingScreen.module.scss";

const LOADER_SESSION_KEY = "impactflow-loader-shown";
const INITIAL_WAVE_RANGE = { start: 160, end: 0 };

export const hasLoadingScreenPlayed = () => {
  if (typeof window === "undefined") return false;

  try {
    return window.sessionStorage.getItem(LOADER_SESSION_KEY) === "true";
  } catch {
    return false;
  }
};

const rememberLoaderPlayed = () => {
  try {
    window.sessionStorage.setItem(LOADER_SESSION_KEY, "true");
  } catch {
    return;
  }
};

interface LoadingScreenProps {
  onReveal: () => void;
}

export const LoadingScreen = ({ onReveal }: LoadingScreenProps) => {
  const [percent, setPercent] = useState(0);
  const [percentFadeOut, setPercentFadeOut] = useState(false);
  const [logoExiting, setLogoExiting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [waveRange, setWaveRange] = useState(INITIAL_WAVE_RANGE);
  const [waveReady, setWaveReady] = useState(false);
  const textRef = useRef<SVGTextElement>(null);
  const waveY =
    waveRange.start -
    (percent / 100) * (waveRange.start - waveRange.end);

  useEffect(() => {
    let cancelled = false;
    let animationFrame = 0;

    const measureText = () => {
      if (cancelled || !textRef.current) {
        return;
      }

      const bbox = textRef.current.getBBox();
      if (bbox.width === 0 || bbox.height === 0) {
        return;
      }

      setWaveRange({
        start: bbox.y + bbox.height,
        end: bbox.y,
      });
      animationFrame = window.requestAnimationFrame(() => {
        if (!cancelled) {
          setWaveReady(true);
        }
      });
    };

    const prepareMeasurement = async () => {
      await document.fonts?.ready;
      measureText();
    };

    void prepareMeasurement();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    if (hidden) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    let currentPercent = 0;

    document.body.style.overflow = "hidden";

    const interval = window.setInterval(() => {
      currentPercent = Math.min(
        100,
        currentPercent + Math.floor(Math.random() * 4) + 2,
      );
      setPercent(currentPercent);

      if (currentPercent < 100) {
        return;
      }

      window.clearInterval(interval);
    }, 220);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.clearInterval(interval);
    };
  }, [hidden]);

  useEffect(() => {
    if (percent < 100 || hidden) {
      return;
    }

    const exitTimer = window.setTimeout(() => {
      setPercentFadeOut(true);
      setLogoExiting(true);
    }, 300);
    const unmountTimer = window.setTimeout(() => {
      rememberLoaderPlayed();
      onReveal();
      setHidden(true);
    }, 1400);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(unmountTimer);
    };
  }, [hidden, onReveal, percent]);

  if (hidden) return null;

  return (
    <div
      className={styles.loaderLayer}
      role="status"
      aria-label={`Loading ImpactFlow: ${percent}%`}
    >
      <LoadingLogo
        percent={percent}
        waveY={waveY}
        waveReady={waveReady}
        logoExiting={logoExiting}
        percentFadeOut={percentFadeOut}
        textRef={textRef}
      />
    </div>
  );
};
