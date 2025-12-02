import { Star } from "@shared/assets/icons/info";
import styles from "./CategoryFiltersWidget.module.scss";
import { DatePickerInput } from "@shared/ui/inputs";
import { useState } from "react";
import { Slider } from "@heroui/react";

export const CategoryFiltersWidget = () => {
  const [rating, setRating] = useState(0);
  return (
    <div className={styles.categoryFiltersWidgetBlock}>
      <div className={styles.projectDeadLine}>
        <h1 className={styles.subHeaderFilter}>Project deadline due</h1>
        <div className={styles.deadlineCalendarBlock}>
          <div className={styles.startDate}>
            <h2>Start date</h2>
            <div className={styles.dateStartInput}>
              <DatePickerInput
                label=""
                showMonthAndYearPickers
                name={""}
                onChange={function (value: string | undefined): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>
          <div className={styles.dueDate}>
            <h2>Due date</h2>
            <div className={styles.dateDueInput}>
              <DatePickerInput
                label=""
                showMonthAndYearPickers
                name={""}
                onChange={function (value: string | undefined): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.dividerFilterBlock} />
      <div className={styles.projectRating}>
        <h1 className={styles.subHeaderFilter}>Project rating</h1>
        <div className={styles.ratingBlock}>
          <div className={styles.valueRating}>
            <img src={Star} alt="star" className={styles.starReview} />
            <h1 className={styles.starReviewValue}>{rating.toFixed(1)}</h1>
          </div>
          <Slider
            size="md"
            minValue={0}
            maxValue={5}
            step={0.1}
            value={rating}
            onChange={(value) => {
              setRating(Number(value));
            }}
          />
        </div>
      </div>
      <div className={styles.dividerFilterBlock} />
      <div className={styles.projectCategories}>
        <h1 className={styles.subHeaderFilter}>Categories</h1>
      </div>
      <div className={styles.dividerFilterBlock} />
      <div className={styles.projectOrganizations}>
        <h1 className={styles.subHeaderFilter}>Organizations</h1>
      </div>
      <div className={styles.dividerFilterBlock} />
      <div className={styles.projectDistance}>
        <h1 className={styles.subHeaderFilter}>Distance</h1>
      </div>
      <div className={styles.dividerFilterBlock} />
      <div className={styles.moreOptions}>
        <h1 className={styles.subHeaderFilter}>More Options</h1>
      </div>
      <div className={styles.dividerFilterBlock} />
    </div>
  );
};
