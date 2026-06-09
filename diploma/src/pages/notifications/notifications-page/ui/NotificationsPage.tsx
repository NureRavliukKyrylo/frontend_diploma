import { NotificationsListWidget } from "@widgets/notifications";
import {
  NotificationItem,
  notificationTypeOptions,
} from "@entities/notification";
import { Pagination, Toggle } from "@shared/ui";
import styles from "./NotificationsPage.module.scss";
import {
  ReadAllNotificationsButton,
  ReadNotificationButton,
  DeleteNotificationsButton,
} from "@features/notification";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { ApproveIcon } from "@shared/assets/icons/actions";
import { AnimatePresence, motion } from "framer-motion";
import { useNotificationsPage } from "../model/useNotificationsPage";
import type { TabOption } from "@shared/config/types";
import { SelectFilter } from "@shared/ui/filters";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";
import { fadeDuration, fadeVariants } from "@shared/assets/animations";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";

const notificationStatusTabs: TabOption<"All" | "Unread">[] = [
  { label: "All", value: "All" },
  { label: "Unread", value: "Unread" },
];

export const NotificationsPage = () => {
  const {
    notifications,
    unreadCount,
    activeStatus,
    isSelectMode,
    selectedIds,
    search,
    setIsSelectMode,
    handleToggleSelect,
    handleCancel,
    handleDeleteSuccess,
    handlePageChange,
    handleStatusChange,
    useNotificationsQuery,
    activeType,
    handleTypeChange,
  } = useNotificationsPage();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.topContent}>
            <h1 className={styles.title}>NOTIFICATIONS</h1>
            {unreadCount > 0 && (
              <span className={styles.unreadBadge}>{unreadCount}</span>
            )}
          </div>

          <div className={styles.bottomContent}>
            <Toggle
              tabs={notificationStatusTabs}
              activeValue={activeStatus}
              onChange={handleStatusChange}
              className={styles.toggleNotification}
              buttonClassName={styles.toggleNotificationButton}
              activeButtonClassName={styles.toggleNotificationButtonActive}
              pillClassName={styles.toggleNotificationPill}
            />
            <SelectFilter
              label="Type"
              options={notificationTypeOptions}
              value={activeType ?? "All"}
              onChange={handleTypeChange}
              hideLabel={true}
              variant="absolute"
            />
          </div>
        </div>
        <div className={styles.headerRight}>
          <ReadAllNotificationsButton />
          <AnimatePresence mode="wait">
            {isSelectMode ? (
              <motion.div
                key="selection-actions"
                className={styles.selectionActions}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
              >
                <motion.div
                  whileHover={{ opacity: 0.7 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  <BaseButtonWrapper
                    className={styles.cancelButton}
                    onClick={handleCancel}
                  >
                    Cancel
                  </BaseButtonWrapper>
                </motion.div>
                {selectedIds.length > 0 && (
                  <DeleteNotificationsButton
                    ids={selectedIds}
                    onSuccess={handleDeleteSuccess}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="select-trigger"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
              >
                <motion.div
                  whileHover={{ opacity: 0.7 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  <BaseButtonWrapper
                    className={styles.selectButton}
                    onClick={() => setIsSelectMode(true)}
                  >
                    Delete Messages
                  </BaseButtonWrapper>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ErrorBoundary
        fallbackRender={({ error }) => (
          <div className={styles.errorState}>
            <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
            <p className="errorHint">
              Try reloading the page or come back later.
            </p>
          </div>
        )}
      >
        {notifications?.data?.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No notifications found</h2>
            <p>Try adjusting your filters</p>
          </div>
        ) : (
          <Suspense
            fallback={
              <ListWidgetSkeleton renderSkeleton={() => <div />} items={15} />
            }
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={JSON.stringify(search)}
                {...fadeVariants}
                transition={fadeDuration}
              >
                <NotificationsListWidget
                  renderCard={(notification) => (
                    <motion.div
                      key={notification.id}
                      className={`${styles.notificationWrapper} ${
                        isSelectMode ? styles.selectMode : ""
                      } ${selectedIds.includes(notification.id) ? styles.selected : ""}`}
                      onClick={() => handleToggleSelect(notification.id)}
                    >
                      <NotificationItem
                        notification={notification}
                        rightContent={
                          !isSelectMode &&
                          notification.status === "Unread" && (
                            <ReadNotificationButton
                              notificationId={notification.id}
                            />
                          )
                        }
                      />
                      <AnimatePresence>
                        {isSelectMode && (
                          <motion.div
                            className={`${styles.checkmark} ${
                              selectedIds.includes(notification.id)
                                ? styles.checkmarkSelected
                                : ""
                            }`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 20,
                            }}
                          >
                            <ApproveIcon className={styles.checkmarkIcon} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                  useNotificationsQuery={useNotificationsQuery}
                  className={styles.notificationsList}
                />
              </motion.div>
            </AnimatePresence>
          </Suspense>
        )}
      </ErrorBoundary>

      {notifications && notifications.pagination?.totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            total={notifications.pagination.totalPages}
            page={search.Page ?? 1}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
