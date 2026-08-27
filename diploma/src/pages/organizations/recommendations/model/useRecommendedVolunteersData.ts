import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { organizationQuery } from "@entities/organization";
import { projectQuery } from "@entities/project";
import { recommendationQuery } from "@entities/recommendation";
import { skillsQuery } from "@entities/skill";
import { useUserStore } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import type { EntityType } from "@shared/config/types";

export const useRecommendedVolunteersData = (
  entityType: EntityType,
  entityId: string,
) => {
  const storedUserId = useUserStore((state) => state.userId);
  const systemRole = useUserStore((state) => state.systemRole);
  const currentUserQuery = useQuery(profileQuery.all());
  const currentUserId =
    storedUserId?.trim() || currentUserQuery.data?.id?.trim() || null;
  const organizationResult = useQuery({
    ...organizationQuery.byId(entityId),
    enabled: entityType === "organization" && Boolean(entityId),
  });
  const projectResult = useQuery({
    ...projectQuery.id(entityId),
    enabled: entityType === "project" && Boolean(entityId),
  });
  const organization = organizationResult.data;
  const project = projectResult.data;
  const entity = entityType === "project" ? project : organization;
  const ownerId =
    entityType === "project"
      ? project?.organization?.ownerId
      : organization?.ownerId;
  const hasSystemBypass =
    systemRole?.toLowerCase() === "admin" ||
    systemRole?.toLowerCase() === "superadmin";
  const isOwner = Boolean(
    currentUserId && ownerId && currentUserId === ownerId.trim(),
  );
  const editAccessResult = useQuery({
    ...organizationQuery.editAccess(entityId),
    enabled:
      entityType === "organization" &&
      Boolean(organization) &&
      !isOwner &&
      !hasSystemBypass,
    retry: false,
  });
  const permissions = project?.currentUserRole?.permissions;
  const hasProjectMemberPermission = Boolean(
    permissions?.includes("*") ||
      permissions?.includes("project.members_manage"),
  );
  const hasKnownAccess =
    isOwner ||
    hasSystemBypass ||
    (entityType === "organization" && Boolean(editAccessResult.data)) ||
    (entityType === "project" && hasProjectMemberPermission);
  const canLoad = Boolean(
    entity && (entityType === "project" || hasKnownAccess),
  );
  const recommendationsResult = useQuery({
    ...recommendationQuery.volunteers({
      entityType,
      entityId,
      take: 20,
    }),
    enabled: canLoad,
    retry: false,
  });
  const skillsResult = useQuery({
    ...skillsQuery.list({
      OrderBy: "NameAsc",
      Page: 1,
      PageSize: 500,
    }),
    enabled: canLoad,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  const skillNamesById = useMemo(
    () =>
      new Map(
        (skillsResult.data?.data ?? []).map((skill) => [skill.id, skill.name]),
      ),
    [skillsResult.data?.data],
  );

  return {
    entity,
    entityName:
      entityType === "project" ? project?.title : organization?.name,
    entityLabel: entityType === "project" ? "project" : "organization",
    organization,
    project,
    recommendations: recommendationsResult.data ?? [],
    isOwner,
    canEdit:
      hasKnownAccess ||
      (entityType === "project" && recommendationsResult.isSuccess),
    skillNamesById,
    isEditAccessLoading:
      entityType === "project"
        ? recommendationsResult.isPending && canLoad
        : editAccessResult.isLoading,
    isEntityPending:
      entityType === "project"
        ? projectResult.isPending
        : organizationResult.isPending,
    isEntityError:
      entityType === "project"
        ? projectResult.isError
        : organizationResult.isError,
    isRecommendationsPending: recommendationsResult.isPending && canLoad,
    isRecommendationsError: recommendationsResult.isError,
  };
};
