import { Skeleton } from "@heroui/skeleton";
import styles from "./CategoryDetailWidget.module.scss";

export const CategoryDetailWidgetSkeleton = () => {
  return (
    <div className={styles.categoryDetailBlock}>
      <Skeleton className={styles.categoryDetailImage} />

      <div className={styles.categoryInformationSkills}>
        <div className={styles.categoryInformation}>
          <Skeleton className={styles.skeletonTitle} />

          <div className={styles.descriptionProjectsBlock}>
            <div className={styles.skeletonDescLines}>
              <Skeleton className={styles.skeletonDescLine} />
              <Skeleton className={styles.skeletonDescLine} />
              <Skeleton className={styles.skeletonDescLineShort} />
            </div>

            <div className={styles.projectsBlock}>
              {[0, 1, 2].map((i) => (
                <div key={i} className={styles.projectInfo}>
                  <Skeleton className={styles.skeletonStatNumber} />
                  <Skeleton className={styles.skeletonStatLabel} />
                  {i < 2 && <div className={styles.lineDividerProject} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.categorySkills}>
          <Skeleton className={styles.skeletonCoreSkillsText} />
          <div className={styles.skeletonSkillTabs}>
            {[120, 90, 140, 80, 110].map((w, i) => (
              <Skeleton
                key={i}
                className={styles.skeletonSkillTab}
                style={{ width: w }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
