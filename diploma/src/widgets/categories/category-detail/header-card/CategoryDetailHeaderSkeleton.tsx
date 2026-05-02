import { Skeleton } from "@heroui/react";
import styles from "./CategoryDetailHeader.module.scss";

export const CategoryDetailHeaderSkeleton = () => (
  <div className={styles.categoryHeader}>
    <div className={styles.categoryInformation}>
      <div className={styles.textCategoryInformation}>
        <div className={styles.textCategory}>
          <Skeleton className={styles.titleSk} />
          <Skeleton className={styles.subtitleSk} />
        </div>
        <div className={styles.categoryDescription}>
          <Skeleton className={styles.descriptionSk} />
        </div>
        <div className={styles.projectsBlock}>
          {[0, 1, 2].map((i) => (
            <div key={i} className={styles.projectInfo}>
              <Skeleton className={styles.statNumberSk} />
              <Skeleton className={styles.statLabelSk} />
              {i < 2 && <div className={styles.lineDividerProject} />}
            </div>
          ))}
        </div>
        <div className={styles.categorySkills}>
          <Skeleton className={styles.coreSkillsTitleSk} />
          <div className={styles.skillTabsSk}>
            {[100, 130, 90, 115, 80, 120].map((w, i) => (
              <Skeleton
                key={i}
                className={styles.skillTabSk}
                style={{ width: w }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.listActivitiesToggle}>
        <Skeleton className={styles.toggleSk} />
      </div>
    </div>

    <div className={styles.imageCategory}>
      <Skeleton className={styles.imageSk} />
    </div>
  </div>
);
