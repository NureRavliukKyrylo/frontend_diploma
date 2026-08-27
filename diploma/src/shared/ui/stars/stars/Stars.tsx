import { useCallback, useId, useState } from "react";
import styles from "./Stars.module.scss";
import { StarIcon } from "../star-icon/StarIcon";

export interface StarsProps {
  value: number;
  maxStars?: number;
  className?: string;
  classNameStar?: string;
  gradient?: string;
  onChange?: (value: number) => void;
  allowHalf?: boolean;
}

export const Stars = ({
  value,
  maxStars = 5,
  className = "",
  classNameStar,
  gradient,
  onChange,
  allowHalf = false,
}: StarsProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const uid = useId();

  const isInteractive = Boolean(onChange);
  const displayValue = hoverValue ?? Math.max(0, Math.min(value, maxStars));

  const resolveStarValue = useCallback(
    (index: number, e: React.MouseEvent<HTMLSpanElement>): number => {
      if (!allowHalf) return index + 1;

      const { left, width } = e.currentTarget.getBoundingClientRect();
      return e.clientX - left < width / 2 ? index + 0.5 : index + 1;
    },
    [allowHalf],
  );

  const handleMouseMove = useCallback(
    (index: number, e: React.MouseEvent<HTMLSpanElement>) => {
      if (!isInteractive) return;
      setHoverValue(resolveStarValue(index, e));
    },
    [isInteractive, resolveStarValue],
  );

  const handleMouseLeave = useCallback(() => {
    if (!isInteractive) return;
    setHoverValue(null);
  }, [isInteractive]);

  const handleClick = useCallback(
    (index: number, e: React.MouseEvent<HTMLSpanElement>) => {
      if (!isInteractive) return;
      onChange?.(resolveStarValue(index, e));
    },
    [isInteractive, onChange, resolveStarValue],
  );

  return (
    <div
      className={`${styles.stars} ${isInteractive ? styles.interactive : ""} ${className}`}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: maxStars }, (_, index) => (
        <span
          key={index}
          className={styles.starWrapper}
          onMouseMove={(e) => handleMouseMove(index, e)}
          onClick={(e) => handleClick(index, e)}
        >
          <StarIcon
            fillPercentage={Math.max(
              0,
              Math.min(100, (displayValue - index) * 100),
            )}
            gradientId={`${uid}-star-${index}`}
            gradient={gradient ?? "#8C0000"}
            className={classNameStar}
          />
        </span>
      ))}
    </div>
  );
};
