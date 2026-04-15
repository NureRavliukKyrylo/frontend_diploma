import { Star } from "@shared/assets/icons/info";
import styles from "./RatingFilter.module.scss";
import { Slider } from "@shared/ui";
import { useState } from "react";

interface RatingFilterProps {
  rating?: number;
  onRatingChange: (rating: number | undefined) => void;
}

export const RatingFilter = ({ rating, onRatingChange }: RatingFilterProps) => {
  const [displayValue, setDisplayValue] = useState(rating ?? 0);

  return (
    <div className={styles.ratingBlock}>
      <div className={styles.valueRating}>
        <img src={Star} alt="star" className={styles.starReview} />
        <h1 className={styles.starReviewValue}>{displayValue}</h1>
      </div>
      <Slider
        aria-label="slider"
        size="md"
        value={rating ?? 0}
        minValue={0}
        maxValue={5}
        step={0.1}
        onChangeImmediate={(rating) => setDisplayValue(rating)}
        onChange={(value) =>
          onRatingChange(value === 0 ? undefined : (value as number))
        }
      />
    </div>
  );
};
