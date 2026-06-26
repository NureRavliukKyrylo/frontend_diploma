import { Slider } from "@shared/ui";
import { Star } from "@shared/assets/icons/info";
import type { ProjectSearchParams } from "@entities/project";
import styles from "../../../shared/filters/Filters.module.scss";
import { OrganizationProjectFiltersSection } from "./Section";

interface OrganizationProjectRatingFilterSectionProps {
  search: ProjectSearchParams;
  displayRating: number;
  setDisplayRating: (value: number) => void;
  onChange: (patch: Partial<ProjectSearchParams>) => void;
}

export const OrganizationProjectRatingFilterSection = ({
  search,
  displayRating,
  setDisplayRating,
  onChange,
}: OrganizationProjectRatingFilterSectionProps) => {
  const hasRatingFilter =
    typeof search.RatingFrom === "number" && search.RatingFrom > 0;

  return (
    <OrganizationProjectFiltersSection
      title="Project rating"
      isActive={hasRatingFilter}
      badge={hasRatingFilter ? "Applied" : undefined}
      className={styles.projectRating}
    >
      <div className={styles.ratingBlock}>
        <div className={styles.valueRating}>
          <Star aria-hidden="true" className={styles.starReview} />
          <span className={styles.starReviewValue}>{displayRating}</span>
        </div>
        <Slider
          aria-label="project-rating"
          size="md"
          value={search.RatingFrom ?? 0}
          minValue={0}
          maxValue={5}
          step={0.1}
          onChangeImmediate={(rating) => setDisplayRating(rating as number)}
          onChange={(rating) => {
            const nextValue = rating as number;
            onChange({
              RatingFrom: nextValue === 0 ? undefined : nextValue,
              Page: 1,
            });
          }}
        />
      </div>
    </OrganizationProjectFiltersSection>
  );
};
