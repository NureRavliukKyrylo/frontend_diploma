import { Star } from "@shared/assets/icons/info";
import styles from "./ProjectFilters.module.scss";
import { useNavigate } from "@tanstack/react-router";
import { Slider } from "@shared/ui";
import type { ProjectSearchParams } from "@entities/project";
import type { NavigateParams } from "../model/NavigateParams";
import { useState } from "react";

interface ProjectRatingFilterProps {
  search: ProjectSearchParams;
  from: NavigateParams;
}
export const ProjectRatingFilter = ({
  search,
  from,
}: ProjectRatingFilterProps) => {
  const navigate = useNavigate({ from });
  const [displayValue, setDisplayValue] = useState(search.Rating ?? 0);

  return (
    <div className={styles.ratingBlock}>
      <div className={styles.valueRating}>
        <img src={Star} alt="star" className={styles.starReview} />
        <h1 className={styles.starReviewValue}>{displayValue}</h1>
      </div>
      <Slider
        aria-label="slider"
        size="md"
        value={search.Rating ?? 0}
        minValue={0}
        maxValue={5}
        step={0.1}
        onChangeImmediate={(rating) => setDisplayValue(rating)}
        onChange={(rating) => {
          navigate({
            search: (prev) => ({
              ...prev,
              Rating: rating === 0 ? undefined : (rating as number),
            }),
            resetScroll: false,
          });
        }}
      />
    </div>
  );
};
