import { parseLinearGradient } from "@shared/libs/parsers";
import styles from "./StarIcon.module.scss";

const STAR_PATH =
  "M29.0039 15.2021L29.1221 15.4785L29.4219 15.5029L44.7617 16.7832L33.1172 26.71L32.8848 26.9082L32.9551 27.2051L36.4551 41.9678L23.2549 34.1289L23 33.9766L22.7451 34.1289L9.54395 41.9678L13.0449 27.2051L13.1152 26.9082L12.8828 26.71L1.2373 16.7832L16.5781 15.5029L16.8779 15.4785L16.9961 15.2021L23 1.26367L29.0039 15.2021Z";

interface StarIconProps {
  fillPercentage: number;
  gradientId: string;
  gradient?: string;
  className?: string;
}

export const StarIcon = ({
  fillPercentage,
  gradientId,
  gradient = "#8C0000",
  className = "",
}: StarIconProps) => {
  const parsed = gradient.startsWith("linear-gradient")
    ? parseLinearGradient(gradient)
    : null;

  const colorId = `${gradientId}-color`;
  const maskGradId = `${gradientId}-mask-grad`;
  const maskId = `${gradientId}-mask`;

  return (
    <svg
      viewBox="0 0 46 43"
      fill="none"
      className={`${styles.star} ${className}`}
    >
      <defs>
        {parsed ? (
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
        ) : null}

        <linearGradient id={maskGradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset={`${fillPercentage}%`} stopColor="white" />
          <stop offset={`${fillPercentage}%`} stopColor="black" />
        </linearGradient>

        <mask id={maskId}>
          <rect
            x="0"
            y="0"
            width="46"
            height="43"
            fill={`url(#${maskGradId})`}
          />
        </mask>
      </defs>

      <path d={STAR_PATH} stroke="black" fill="transparent" />

      <path
        d={STAR_PATH}
        stroke="none"
        fill={parsed ? `url(#${colorId})` : gradient}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
};
