import { Skeleton } from "@heroui/react";
import rootStyles from "./TaskWidget.module.scss";
import contentStyles from "./TaskWidgetContent.module.scss";
import skeletonStyles from "./TaskWidgetSkeleton.module.scss";
import headerStyles from "./task-header/TaskWidgetHeader.module.scss";
import metaStyles from "./task-header/TaskMetaChips.module.scss";
import orgStyles from "./task-header/TaskOrganizationSummary.module.scss";
import participationStyles from "./task-header/TaskParticipationBlock.module.scss";
import relatedStyles from "./task-header/TaskRelatedActivities.module.scss";

export const TaskWidgetSkeleton = () => {
  return (
    <div className={rootStyles.wrapperTaskWidget}>
      <div className={headerStyles.taskWidgetHeader}>
        <div className={headerStyles.headerTaskInfo}>
          <Skeleton className={skeletonStyles.skeletonMetaChip} />

          <div className={headerStyles.mainTaskData}>
            <div className={headerStyles.taskOrganizationInfo}>
              <div className={headerStyles.titleHeader}>
                <Skeleton className={skeletonStyles.skeletonTitle} />
                <div className={metaStyles.taskMetaInfo}>
                  <Skeleton className={skeletonStyles.skeletonMetaChip} />
                  <Skeleton className={skeletonStyles.skeletonMetaChip} />
                  <Skeleton className={skeletonStyles.skeletonMetaChip} />
                </div>
              </div>

              <div className={orgStyles.rightBlockInfo}>
                <div className={orgStyles.organizationInfo}>
                  <Skeleton className={skeletonStyles.skeletonOrgImage} />
                  <Skeleton className={skeletonStyles.skeletonOrgName} />
                </div>
                <Skeleton className={skeletonStyles.skeletonRating} />
              </div>
            </div>

            <div className={relatedStyles.relatedActivities}>
              <Skeleton className={skeletonStyles.skeletonActivityPill} />
              <Skeleton className={skeletonStyles.skeletonActivityPill} />
            </div>
          </div>
        </div>

        <div className={participationStyles.taskFooterContent}>
          <Skeleton className={skeletonStyles.skeletonDescription} />
          <div className={participationStyles.joinTaskBlockButton}>
            <Skeleton className={skeletonStyles.skeletonButton} />
          </div>
        </div>
      </div>

      <div className={contentStyles.contentBlock}>
        <Skeleton className={skeletonStyles.skeletonToggle} />
        <Skeleton className={skeletonStyles.skeletonContent} />
      </div>
    </div>
  );
};
