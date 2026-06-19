import { motion } from "framer-motion";
import { EmptyState } from "@shared/ui";
import { RequestCard } from "@widgets/organizations/members";
import type { OrganizationMembersPageModel } from "../../model/types";
import styles from "./MembersContent.module.scss";

interface RequestsContentProps {
  model: OrganizationMembersPageModel;
  hasSearch: boolean;
}

export const RequestsContent = ({ model, hasSearch }: RequestsContentProps) => {
  const emptyCopy = hasSearch
    ? {
        title: "No results found",
        subtitle: "Try a different name or clear your search to see all requests.",
      }
    : {
        title: "No pending requests",
        subtitle:
          model.activeRequestTab === "join"
            ? "Join requests will appear here when volunteers ask to enter the org."
            : "Leave requests will appear here when members ask to exit the org.",
      };

  return (
    <>
      <div
        className={styles.requestTabsContainer}
        role="tablist"
        aria-label="Organization request types"
      >
        <button
          type="button"
          className={`${styles.requestTab} ${
            model.activeRequestTab === "join" ? styles.requestTabActive : ""
          }`}
          aria-selected={model.activeRequestTab === "join"}
          onClick={() => model.setActiveRequestTab("join")}
        >
          Join requests
          <span className={styles.requestTabBadge}>{model.joinRequests.length}</span>
        </button>
        <button
          type="button"
          className={`${styles.requestTab} ${
            model.activeRequestTab === "leave" ? styles.requestTabActive : ""
          }`}
          aria-selected={model.activeRequestTab === "leave"}
          onClick={() => model.setActiveRequestTab("leave")}
        >
          Leave requests
          <span className={styles.requestTabBadge}>{model.leaveRequests.length}</span>
        </button>
      </div>

      {model.visibleRequests.length > 0 ? (
        <div className={styles.requestCardsGrid}>
          {model.visibleRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
              whileHover={{ y: -4 }}
            >
              <RequestCard
                request={request}
                isPending={
                  model.decisionMutation.isPending &&
                  model.pendingDecision?.request.id === request.id
                }
                onApprove={(nextRequest) =>
                  model.setPendingDecision({ action: "approve", request: nextRequest })
                }
                onReject={(nextRequest) =>
                  model.setPendingDecision({ action: "reject", request: nextRequest })
                }
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState title={emptyCopy.title} subtitle={emptyCopy.subtitle} />
      )}
    </>
  );
};
