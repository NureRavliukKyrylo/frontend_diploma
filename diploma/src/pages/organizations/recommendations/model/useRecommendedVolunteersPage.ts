import { useEffect, useMemo, useState } from "react";
import { addToast } from "@heroui/react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { VolunteerRecommendation } from "@entities/recommendation";
import { useInviteVolunteer } from "@features/invitation/invite-volunteer";
import type { EntityType } from "@shared/config/types";
import { getErrorMessage } from "@shared/libs/error-message";
import type { RecommendationFilter, RecommendationSort } from "./types";
import { useRecommendedVolunteersData } from "./useRecommendedVolunteersData";

const matchesSearch = (
  recommendation: VolunteerRecommendation,
  search: string,
  skillNamesById: Map<string, string>,
) => {
  const normalizedSearch = search.trim().toLowerCase();
  if (!normalizedSearch) return true;

  return (
    recommendation.displayName.toLowerCase().includes(normalizedSearch) ||
    recommendation.reasons.some((reason) =>
      reason.toLowerCase().includes(normalizedSearch),
    ) ||
    recommendation.matchedSkillIds.some((skillId) =>
      skillNamesById.get(skillId)?.toLowerCase().includes(normalizedSearch),
    )
  );
};

export const useRecommendedVolunteersPage = (
  entityType: EntityType,
  entityId: string,
) => {
  const navigate = useNavigate();
  const router = useRouter();
  const { t } = useTranslation(["common", "organizations"]);
  const data = useRecommendedVolunteersData(entityType, entityId);
  const invitation = useInviteVolunteer(entityId, entityType);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState<RecommendationFilter>("all");
  const [sort, setSort] = useState<RecommendationSort>("score");
  const [selected, setSelected] = useState<VolunteerRecommendation | null>(
    null,
  );
  const [message, setMessage] = useState("");
  const [invitedIds, setInvitedIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (
      !data.entity ||
      data.isOwner ||
      data.isEditAccessLoading ||
      data.canEdit
    ) {
      return;
    }

    if (entityType === "project") {
      void navigate({
        to: "/projects/$id",
        params: { id: entityId },
        replace: true,
      });
      return;
    }

    void navigate({
      to: "/organizations/$id",
      params: { id: entityId },
      replace: true,
    });
  }, [
    data.canEdit,
    data.isEditAccessLoading,
    data.isOwner,
    data.entity,
    entityId,
    entityType,
    navigate,
  ]);

  const visibleRecommendations = useMemo(() => {
    const filtered = data.recommendations.filter((recommendation) => {
      if (
        !matchesSearch(recommendation, searchValue, data.skillNamesById)
      ) {
        return false;
      }
      if (filter === "boosted") return recommendation.hasActivePriorityBoost;
      if (filter === "nearby") return recommendation.breakdown.locationFit >= 12;
      return true;
    });

    return [...filtered].sort((left, right) =>
      sort === "score" ? right.score - left.score : 0,
    );
  }, [
    data.recommendations,
    data.skillNamesById,
    filter,
    searchValue,
    sort,
  ]);

  const boostedCount = useMemo(
    () =>
      data.recommendations.filter(
        (recommendation) => recommendation.hasActivePriorityBoost,
      ).length,
    [data.recommendations],
  );

  const openInvitation = (recommendation: VolunteerRecommendation) => {
    invitation.reset();
    setMessage("");
    setSelected(recommendation);
  };

  const closeInvitation = () => {
    if (invitation.isLoading) return;
    invitation.reset();
    setMessage("");
    setSelected(null);
  };

  const confirmInvitation = async () => {
    if (!selected) return;

    try {
      await invitation.inviteVolunteer({
        userId: selected.userId,
        message: message.trim() || undefined,
      });
      setInvitedIds((current) => new Set(current).add(selected.userId));
      addToast({
        title: t("organizations:recommendations.actions.sent"),
        description: t("organizations:recommendations.actions.sentText", {
          name: selected.displayName,
        }),
        color: "success",
      });
      setMessage("");
      setSelected(null);
    } catch {
      return;
    }
  };

  const handleProfileClick = (recommendation: VolunteerRecommendation) => {
    void navigate({
      to: "/users/$userId",
      params: { userId: recommendation.userId },
      search: {
        organizationId: entityType === "organization" ? entityId : undefined,
      },
    });
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.history.back();
      return;
    }

    if (entityType === "project") {
      void navigate({
        to: "/projects/$id",
        params: { id: entityId },
      });
      return;
    }

    void navigate({
      to: "/organizations/$id",
      params: { id: entityId },
    });
  };

  return {
    ...data,
    searchValue,
    setSearchValue,
    filter,
    setFilter,
    sort,
    setSort,
    visibleRecommendations,
    boostedCount,
    invitedIds,
    selected,
    message,
    setMessage,
    openInvitation,
    closeInvitation,
    confirmInvitation,
    handleProfileClick,
    invitationError: invitation.error
      ? getErrorMessage(invitation.error, t)
      : null,
    isInviting: invitation.isLoading,
    handleBack,
  };
};

export type RecommendedVolunteersPageModel = ReturnType<
  typeof useRecommendedVolunteersPage
>;
