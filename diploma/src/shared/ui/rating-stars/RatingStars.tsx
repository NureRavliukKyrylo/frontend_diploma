import styles from "./RatingStars.module.scss";

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  className?: string;
}

export const RatingStars = ({
  rating,
  maxStars = 5,
  className = "",
}: RatingStarsProps) => {
  const clampedRating = Math.max(0, Math.min(rating, maxStars));

  return (
    <div className={`${styles.rating} ${className}`}>
      {Array.from({ length: maxStars }, (_, index) => {
        const fillPercentage = Math.max(
          0,
          Math.min(100, (clampedRating - index) * 100)
        );
        const gradientId = `star-gradient-${index}`;

        return (
          <svg
            key={index}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            className={styles.star}
          >
            <defs>
              <linearGradient id={gradientId}>
                <stop offset={`${fillPercentage}%`} stopColor="#8C0000" />
                <stop offset={`${fillPercentage}%`} stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M18.751 10.6553L18.8652 10.9395L19.1709 10.9668L28.8223 11.8281L21.4727 18.5303L21.2588 18.7256L21.3223 19.0078L23.5215 28.9316L15.2686 23.6885L15 23.5186L14.7314 23.6885L6.47754 28.9316L8.67773 19.0078L8.74121 18.7256L8.52734 18.5303L1.17676 11.8281L10.8291 10.9668L11.1348 10.9395L11.249 10.6553L15 1.33789L18.751 10.6553Z"
              stroke="black"
              fill={`url(#${gradientId})`}
            />
          </svg>
        );
      })}
    </div>
  );
};
