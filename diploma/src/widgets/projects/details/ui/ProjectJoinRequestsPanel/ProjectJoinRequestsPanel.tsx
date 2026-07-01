import { useMemo, useState } from "react";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import {
  approveEntityRequest,
  entityRequestKeys,
  pendingEntityRequestsQuery,
  rejectEntityRequest,
} from "@entities/request";
import { participationKeys } from "@entities/participation";
import { projectKeys } from "@entities/project";
import { profileQuery, type User } from "@entities/user/profile";
import { getErrorMessage } from "@shared/libs/error-message";
import { ConfirmationModal } from "@shared/ui/modals";
import {
  RequestCard,
  type OrganizationRequestCardModel,
} from "@widgets/organizations/members";
import { useTranslation } from "react-i18next";
import styles from "./ProjectJoinRequestsPanel.module.scss";

interface ProjectJoinRequestsPanelProps {
  projectId: string;
}

interface PendingDecision {
  action: "approve" | "reject";
  request: OrganizationRequestCardModel;
}

const getFullName = (user: User | null, fallback: string) =>
  [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() ||
  fallback ||
  "Volunteer";

export const ProjectJoinRequestsPanel = ({
  projectId,
}: ProjectJoinRequestsPanelProps) => {
  const { t } = useTranslation(["common", "project"]);
  const queryClient = useQueryClient();
  const [pendingDecision, setPendingDecision] =
    useState<PendingDecision | null>(null);
  const requestsResult = useQuery(
    pendingEntityRequestsQuery("project", projectId, "join"),
  );
  const requests = useMemo(
    () => requestsResult.data ?? [],
    [requestsResult.data],
  );
  const profileResults = useQueries({
    queries: requests.map((request) => ({
      ...profileQuery.byId(request.userId),
      retry: false,
      staleTime: 5 * 60 * 1000,
    })),
  });
  const requestCards = useMemo(
    () =>
      requests.map((request, index): OrganizationRequestCardModel => {
        const user = profileResults[index]?.data ?? null;

        return {
          id: request.id,
          userId: request.userId,
          kind: "join",
          fullName: getFullName(
            user,
            request.title || t("project:joinRequests.volunteer"),
          ),
          avatarUrl: user?.profile?.avatarUrl ?? null,
          level: user?.progress?.level ?? null,
          rating: user?.rating?.value ?? 0,
          ratingCount: user?.rating?.totalVotes ?? 0,
          totalHours: null,
          primaryStatValue: String(
            user?.profile?.completedProjectCount ?? 0,
          ),
          primaryStatLabel: t("common:member.completedProjects"),
          secondaryStatValue: String(user?.profile?.activeProjectCount ?? 0),
          secondaryStatLabel: t("common:member.activeProjects"),
          submittedAt: request.createdAt,
        };
      }),
    [profileResults, requests, t],
  );
  const decisionMutation = useMutation({
    mutationFn: ({
      requestId,
      action,
    }: {
      requestId: string;
      action: PendingDecision["action"];
    }) =>
      action === "approve"
        ? approveEntityRequest(requestId)
        : rejectEntityRequest(requestId),
    onSuccess: async (_, { action }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: entityRequestKeys.pending(
            "project",
            projectId,
            "join",
          ),
        }),
        queryClient.invalidateQueries({
          queryKey: participationKeys.members("project", projectId),
        }),
        queryClient.invalidateQueries({
          queryKey: projectKeys.id(projectId),
        }),
      ]);
      addToast({
        title:
          action === "approve"
            ? t("project:joinRequests.approved")
            : t("project:joinRequests.rejected"),
        color: "success",
      });
      setPendingDecision(null);
    },
    onError: (error: unknown) =>
      addToast({
        title: t("project:joinRequests.updateError"),
        description: getErrorMessage(error, t),
        color: "danger",
      }),
  });

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>
            {t("project:joinRequests.eyebrow")}
          </span>
          <h2>{t("project:joinRequests.title")}</h2>
          <p>{t("project:joinRequests.subtitle")}</p>
        </div>
        <span className={styles.count}>{requestCards.length}</span>
      </div>

      {requestsResult.isPending ? (
        <div className={styles.state}>
          {t("project:joinRequests.loading")}
        </div>
      ) : null}

      {requestsResult.isError ? (
        <div className={styles.state}>
          {t("project:joinRequests.error")}
        </div>
      ) : null}

      {!requestsResult.isPending &&
      !requestsResult.isError &&
      requestCards.length === 0 ? (
        <div className={styles.state}>
          {t("project:joinRequests.empty")}
        </div>
      ) : null}

      {requestCards.length > 0 ? (
        <div className={styles.grid}>
          {requestCards.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              isPending={
                decisionMutation.isPending &&
                pendingDecision?.request.id === request.id
              }
              onApprove={(nextRequest) =>
                setPendingDecision({
                  action: "approve",
                  request: nextRequest,
                })
              }
              onReject={(nextRequest) =>
                setPendingDecision({
                  action: "reject",
                  request: nextRequest,
                })
              }
            />
          ))}
        </div>
      ) : null}

      <ConfirmationModal
        isOpen={Boolean(pendingDecision)}
        title={
          pendingDecision?.action === "approve"
            ? t("project:joinRequests.approveTitle")
            : t("project:joinRequests.rejectTitle")
        }
        text={
          pendingDecision
            ? t(
                pendingDecision.action === "approve"
                  ? "project:joinRequests.approveText"
                  : "project:joinRequests.rejectText",
                { name: pendingDecision.request.fullName },
              )
            : ""
        }
        confirmText={
          pendingDecision?.action === "approve"
            ? t("project:joinRequests.approve")
            : t("project:joinRequests.reject")
        }
        cancelText={t("project:joinRequests.cancel")}
        isLoading={decisionMutation.isPending}
        onConfirm={() => {
          if (!pendingDecision) return;
          decisionMutation.mutate({
            requestId: pendingDecision.request.id,
            action: pendingDecision.action,
          });
        }}
        onCancel={() => setPendingDecision(null)}
      />
    </section>
  );
};
