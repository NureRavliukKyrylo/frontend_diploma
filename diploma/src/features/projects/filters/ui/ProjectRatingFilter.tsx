import { Star } from "@shared/assets/icons/info";
import styles from "./ProjectFilters.module.scss";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Slider } from "@heroui/react";

export const ProjectRatingFilter = () => {
  const navigate = useNavigate({ from: "/projects/" });
  const search = useSearch({ from: "/_masterLayout/projects/" });

  return (
    <div className={styles.projectRating}>
      <h1 className={styles.subHeaderFilter}>Project rating</h1>
      <div className={styles.ratingBlock}>
        <div className={styles.valueRating}>
          <img src={Star} alt="star" className={styles.starReview} />
          <h1 className={styles.starReviewValue}>{search.rating ?? 0}</h1>
        </div>
        <Slider
          aria-label="slider"
          size="md"
          value={search.rating}
          minValue={0}
          maxValue={5}
          step={0.1}
          onChange={(rating) => {
            navigate({
              search: (prev) => ({ ...prev, rating: rating as number }),
              resetScroll: false,
            });
          }}
        />
      </div>
    </div>
  );
};
