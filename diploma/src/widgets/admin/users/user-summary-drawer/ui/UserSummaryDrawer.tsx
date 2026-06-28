import type {
  AdminQueueItem,
  AdminUserActivitySummary,
  AdminUserListItem,
  AdminUserTimeBankSummary,
} from "@entities/admin";
import { Skeleton } from "@heroui/react";
import { MessageCircle, ShieldCheck, X } from "lucide-react";
import type { AdminUsersStyles, RoleTone } from "../../model/types";
import { DrawerActivitySection } from "./DrawerActivitySection";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerInfoGrid } from "./DrawerInfoGrid";
import { DrawerRecentRequestsSection } from "./DrawerRecentRequestsSection";
import { DrawerTimeBankSection } from "./DrawerTimeBankSection";

interface UserSummaryDrawerProps {
  styles: AdminUsersStyles;
  selectedUserId: string | null;
  user?: AdminUserListItem;
  isBanned: boolean;
  tone: RoleTone;
  isLoading: boolean;
  isError: boolean;
  activity?: AdminUserActivitySummary;
  timeBank?: AdminUserTimeBankSummary;
  recentRequests: AdminQueueItem[];
  copiedUserId: string | null;
  lifetimeExpanded: boolean;
  showActivityCounters: boolean;
  onClose: () => void;
  onCopyUserId: (userId: string) => void;
  onToggleLifetime: () => void;
  onShowActivityCounters: () => void;
  onChangeRole: (user: AdminUserListItem) => void;
  onMessage: (user: AdminUserListItem) => void;
}

const DrawerCloseButton = ({
  styles,
  onClose,
}: {
  styles: AdminUsersStyles;
  onClose: () => void;
}) => (
  <button
    type="button"
    className={styles.drawerClose}
    onClick={onClose}
    aria-label="Close user summary"
  >
    <X size={20} aria-hidden="true" />
  </button>
);

export const UserSummaryDrawer = ({
  styles,
  selectedUserId,
  user,
  isBanned,
  tone,
  isLoading,
  isError,
  activity,
  timeBank,
  recentRequests,
  copiedUserId,
  lifetimeExpanded,
  showActivityCounters,
  onClose,
  onCopyUserId,
  onToggleLifetime,
  onShowActivityCounters,
  onChangeRole,
  onMessage,
}: UserSummaryDrawerProps) => {
  if (!selectedUserId) {
    return null;
  }

  return (
    <div className={styles.drawerOverlay} onClick={onClose}>
      <aside className={styles.drawer} onClick={(event) => event.stopPropagation()}>
        <span
          className={`${styles.headerStripe} ${styles[`headerStripe_${tone}`]}`}
          aria-hidden="true"
        />

        {isLoading || !user ? (
          <div className={styles.drawerBody}>
            <DrawerCloseButton styles={styles} onClose={onClose} />
            <div className={styles.drawerLoading}>
              <Skeleton className={styles.drawerAvatarSkeleton} />
              <Skeleton className={styles.drawerTitleSkeleton} />
              <Skeleton className={styles.drawerLineSkeleton} />
              <Skeleton className={styles.drawerBlockSkeleton} />
            </div>
          </div>
        ) : isError ? (
          <div className={styles.drawerBody}>
            <DrawerCloseButton styles={styles} onClose={onClose} />
            <div className={styles.drawerState}>
              <strong>Summary unavailable</strong>
              <span>Could not load this user's admin summary.</span>
            </div>
          </div>
        ) : (
          <>
            <DrawerHeader
              styles={styles}
              user={user}
              isBanned={isBanned}
              copiedUserId={copiedUserId}
              onCopyUserId={onCopyUserId}
              onClose={onClose}
            />

            <div className={styles.drawerBody}>
              <DrawerInfoGrid styles={styles} user={user} />
              <DrawerTimeBankSection
                styles={styles}
                timeBank={timeBank}
                lifetimeExpanded={lifetimeExpanded}
                onToggleLifetime={onToggleLifetime}
              />
              <DrawerActivitySection
                styles={styles}
                activity={activity}
                showActivityCounters={showActivityCounters}
                onShowActivityCounters={onShowActivityCounters}
              />
              <DrawerRecentRequestsSection
                styles={styles}
                requests={recentRequests}
              />

              <div className={styles.drawerActions}>
                <button
                  type="button"
                  className={styles.primaryAction}
                  onClick={() => onChangeRole(user)}
                >
                  <ShieldCheck size={17} aria-hidden="true" />
                  Change role
                </button>
                <button
                  type="button"
                  className={styles.messageAction}
                  onClick={() => onMessage(user)}
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  Message
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};
