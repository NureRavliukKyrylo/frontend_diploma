import { useId } from "react";
import styles from "./ProgressCircle.module.scss";
import clsx from "clsx";
import { parseLinearGradient } from "@shared/libs/parsers";

interface ProgressCircleProps {
  value: number;
  gradient?: string;
  className?: string;
}

export const ProgressCircle = ({
  value,
  gradient = "#8C0000",
  className,
}: ProgressCircleProps) => {
  const id = useId();
  const colorId = `${id}-color`;

  const clampedValue = Math.min(100, Math.max(0, value));
  const parsed = gradient.startsWith("linear-gradient")
    ? parseLinearGradient(gradient)
    : null;

  const size = 29;
  const strokeWidth = 4.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedValue / 100) * circumference;
  const center = size / 2;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={clsx(styles.progressCircle, className)}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <defs>
        {parsed && (
          <linearGradient
            id={colorId}
            x1={parsed.x1}
            y1={parsed.y1}
            x2={parsed.x2}
            y2={parsed.y2}
          >
            {parsed.stops.map((stop, i) => (
              <stop key={i} offset={stop.offset} stopColor={stop.color} />
            ))}
          </linearGradient>
        )}
      </defs>

      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        className={styles.track}
      />

      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={parsed ? `url(#${colorId})` : gradient}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className={styles.progress}
      />
    </svg>
  );
};
