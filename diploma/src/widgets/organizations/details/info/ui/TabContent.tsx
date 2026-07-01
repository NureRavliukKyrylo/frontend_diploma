import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { EmptyState } from "@shared/ui";
import type { Organization } from "@entities/organization";
import type { FeedbackSortValues } from "@entities/feedback";
import { ActivityFeedbackTab } from "@widgets/activities";
import type { OrganizationDetailsTab } from "../config/tabs";
import type { useOrganizationDetailsInfoModel } from "../model/useInfoModel";
import { OrganizationDetailsCategoryGrid } from "./CategoryGrid";
import { OrganizationDetailsEventsPanel } from "../../events";
import { OrganizationDetailsProjectsPanel } from "../../projects";
import { OrganizationDetailsTasksPanel } from "../../tasks";
import styles from "../Widget.module.scss";

type OrganizationDetailsInfoModel = ReturnType<
  typeof useOrganizationDetailsInfoModel
>;

interface OrganizationDetailsTabContentProps {
  activeTab: OrganizationDetailsTab;
  organization: Organization;
  organizationId: string;
  canManageOrganization: boolean;
  feedbackOrderBy: FeedbackSortValues;
  setFeedbackOrderBy: Dispatch<SetStateAction<FeedbackSortValues>>;
  model: OrganizationDetailsInfoModel;
}

export const OrganizationDetailsTabContent = ({
  activeTab,
  organization,
  organizationId,
  canManageOrganization,
  feedbackOrderBy,
  setFeedbackOrderBy,
  model,
}: OrganizationDetailsTabContentProps) => {
  const { t } = useTranslation("organizations");
  const projectsCount =
    organization.activeProjects ?? organization.projects?.length ?? 0;
  const eventsCount = organization.activeEvents ?? 0;
  const tasksCount = organization.activeTasks ?? 0;
  const isOverviewEmpty =
    projectsCount === 0 && eventsCount === 0 && tasksCount === 0;
  const feedbackRating = {
    value: model.rating,
    totalVotes: model.votes,
    detailInfo: [5, 4, 3, 2, 1].map((value) => ({
      value,
      totalVotes: 0,
      percentOfAll: 0,
    })),
  };

  if (activeTab === "overview") {
    if (isOverviewEmpty) {
      return (
        <EmptyState
          title={t("details.overview.emptyTitle")}
          subtitle={t("details.overview.emptyText")}
        />
      );
    }

    return (
      <OrganizationDetailsCategoryGrid
        organizationId={organization.id}
        animation={model.animation}
      />
    );
  }

  if (activeTab === "projects") {
    return (
      <OrganizationDetailsProjectsPanel
        organization={organization}
        canManageOrganization={canManageOrganization}
      />
    );
  }

  if (activeTab === "events") {
    return <OrganizationDetailsEventsPanel organization={organization} />;
  }

  if (activeTab === "tasks") {
    return (
      <OrganizationDetailsTasksPanel
        organization={organization}
        canManageOrganization={canManageOrganization}
      />
    );
  }

  if (activeTab === "feedback") {
    return (
      <ActivityFeedbackTab
        entityType="organization"
        entityId={organizationId}
        userId={model.currentUserId ?? undefined}
        PageSize={3}
        OrderBy={feedbackOrderBy}
        canSubmitFeedback={false}
        handleSort={setFeedbackOrderBy}
        rating={feedbackRating}
      />
    );
  }

  return <div className={styles.placeholderPanel} />;
};
