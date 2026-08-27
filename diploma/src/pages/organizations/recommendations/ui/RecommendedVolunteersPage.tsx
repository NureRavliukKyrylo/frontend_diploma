import { SearchX, UsersRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { InviteVolunteerModal } from "@features/invitation/invite-volunteer";
import { useRecommendedVolunteersPage } from "../model/useRecommendedVolunteersPage";
import { RecommendationsGrid } from "./recommendations-page/RecommendationsGrid";
import { RecommendationsHero } from "./recommendations-page/RecommendationsHero";
import { RecommendationsToolbar } from "./recommendations-page/RecommendationsToolbar";
import {
  ManagementPageLayout,
  ManagementTopRow,
} from "@shared/ui/management-page-shell";
import type { EntityType } from "@shared/config/types";
import styles from "./RecommendedVolunteersPage.module.scss";

const PageState = ({
  title,
  text,
}: {
  title: string;
  text?: string;
}) => (
  <ManagementPageLayout>
    <div className={styles.statePanel}>
      <UsersRound size={30} />
      <strong>{title}</strong>
      {text && <span>{text}</span>}
    </div>
  </ManagementPageLayout>
);

interface RecommendedVolunteersPageProps {
  entityType: EntityType;
  entityId: string;
}

export const RecommendedVolunteersPage = ({
  entityType,
  entityId,
}: RecommendedVolunteersPageProps) => {
  const { t } = useTranslation("organizations");
  const model = useRecommendedVolunteersPage(entityType, entityId);
  const entityLabel =
    entityType === "project"
      ? t("recommendations.page.project").toLocaleLowerCase()
      : t("members.entityLabel");

  if (model.isEntityPending) {
    return (
      <PageState
        title={t("recommendations.page.loading", { entity: entityLabel })}
      />
    );
  }

  if (model.isEntityError || !model.entity) {
    return (
      <PageState
        title={t("recommendations.page.entityError", {
          entity: entityLabel,
        })}
      />
    );
  }

  if (!model.isOwner && model.isEditAccessLoading) {
    return <PageState title={t("recommendations.page.checkingAccess")} />;
  }

  if (!model.isOwner && !model.canEdit) {
    return <PageState title={t("recommendations.page.redirecting")} />;
  }

  return (
    <ManagementPageLayout>
      <div className={styles.content}>
        <ManagementTopRow
          contextName={model.entityName}
          contextLabel={
            entityType === "project"
              ? t("recommendations.page.project")
              : undefined
          }
          title={t("recommendations.page.title")}
          onBack={model.handleBack}
        />
        <RecommendationsHero
          totalCount={model.recommendations.length}
          boostedCount={model.boostedCount}
          invitedCount={model.invitedIds.size}
        />
        <RecommendationsToolbar
          searchValue={model.searchValue}
          onSearchChange={model.setSearchValue}
          filter={model.filter}
          onFilterChange={model.setFilter}
          sort={model.sort}
          onSortChange={model.setSort}
        />

        {model.isRecommendationsPending && (
          <div className={styles.inlineState}>
            {t("recommendations.states.loading")}
          </div>
        )}

        {model.isRecommendationsError && (
          <div className={styles.inlineState}>
            {t("recommendations.states.error")}
          </div>
        )}

        {!model.isRecommendationsPending &&
          !model.isRecommendationsError &&
          model.visibleRecommendations.length === 0 && (
            <div className={styles.emptyState}>
              <SearchX size={30} />
              <strong>{t("recommendations.states.emptyTitle")}</strong>
              <span>{t("recommendations.states.emptyText")}</span>
            </div>
          )}

        {!model.isRecommendationsPending &&
          !model.isRecommendationsError &&
          model.visibleRecommendations.length > 0 && (
            <RecommendationsGrid
              recommendations={model.visibleRecommendations}
              invitedIds={model.invitedIds}
              skillNamesById={model.skillNamesById}
              onInvite={model.openInvitation}
              onProfile={model.handleProfileClick}
            />
          )}
      </div>

      <InviteVolunteerModal
        isOpen={Boolean(model.selected)}
        volunteerName={
          model.selected?.displayName ?? t("recommendations.page.volunteer")
        }
        entityName={
          model.entityName ??
          t("recommendations.page.entityFallback", { entity: entityLabel })
        }
        entityLabel={entityLabel}
        message={model.message}
        onMessageChange={model.setMessage}
        onConfirm={model.confirmInvitation}
        onCancel={model.closeInvitation}
        isLoading={model.isInviting}
        error={model.invitationError}
      />
    </ManagementPageLayout>
  );
};
