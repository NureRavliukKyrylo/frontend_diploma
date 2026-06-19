import { useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { organizationQuery, type OrganizationMember } from "@entities/organization";
import { useUserStore } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import {
  OrganizationDetailsInfoWidget,
  ProjectsCarousel,
  type OrganizationDetailsTab,
} from "@widgets/organizations";
import styles from "./OrganizationDetailsPage.module.scss";

interface OrganizationDetailsPageProps {
  organizationId: string;
  initialTab?: OrganizationDetailsTab;
}

export const OrganizationDetailsPage = ({
  organizationId: id,
  initialTab = "overview",
}: OrganizationDetailsPageProps) => {
  const [activeTab, setActiveTab] =
    useState<OrganizationDetailsTab>(initialTab);
  const storedUserId = useUserStore((state) => state.userId);
  const storedFirstName = useUserStore((state) => state.firstName);
  const storedLastName = useUserStore((state) => state.lastName);
  const storedEmail = useUserStore((state) => state.email);
  const { data: organization, isPending, isError } = useQuery(
    organizationQuery.byId(id),
  );
  const { data: currentUser } = useQuery(profileQuery.all());
  const viewerUserId = storedUserId?.trim() || currentUser?.id?.trim();
  const normalizedOwnerId = organization?.ownerId?.trim();
  const isOwnerByIdMatch = Boolean(
    viewerUserId && normalizedOwnerId && viewerUserId === normalizedOwnerId,
  );
  const { data: ownedOrganizationsResponse } = useQuery({
    ...organizationQuery.my({
      Page: 1,
      pageSize: 200,
    }),
    enabled: Boolean(viewerUserId),
  });
  const isOwnerByOwnedOrganizations = Boolean(
    ownedOrganizationsResponse?.data?.some(
      (ownedOrganization) => ownedOrganization.id === id,
    ),
  );
  const isOrganizationOwner = isOwnerByIdMatch || isOwnerByOwnedOrganizations;
  const { data: canEditOrganization = false } = useQuery({
    ...organizationQuery.editAccess(id),
    enabled: Boolean(id) && Boolean(organization) && !isOrganizationOwner,
    retry: false,
  });
  const canManageOrganization = isOrganizationOwner || canEditOrganization;
  const {
    data: members = [],
    error: membersError,
    isLoading: isMembersLoading,
    isSuccess: isMembersSuccess,
  } = useQuery({
    ...organizationQuery.members(id),
    enabled: Boolean(id) && Boolean(organization),
    retry: false,
  });
  const isMembersAccessDenied =
    axios.isAxiosError(membersError) && membersError.response?.status === 403;
  const canViewMembersTab = isMembersSuccess && !isMembersAccessDenied;

  const resolvedMembers = useMemo(() => {
    const baseMembers = members.length > 0 ? members : (organization?.members ?? []);
    const membersMap = new Map<string, OrganizationMember>(
      baseMembers.map((member) => [member.id, member]),
    );

    if (viewerUserId && normalizedOwnerId && viewerUserId === normalizedOwnerId) {
      const existingOwner = membersMap.get(viewerUserId);

      membersMap.set(viewerUserId, {
        id: viewerUserId,
        firstName:
          currentUser?.firstName ?? storedFirstName ?? existingOwner?.firstName,
        lastName:
          currentUser?.lastName ?? storedLastName ?? existingOwner?.lastName,
        email: currentUser?.email ?? storedEmail ?? existingOwner?.email ?? null,
        avatarUrl:
          currentUser?.profile?.avatarUrl ?? existingOwner?.avatarUrl ?? null,
        role: existingOwner?.role ?? "Owner",
      });
    }

    const mergedMembers = Array.from(membersMap.values());

    if (!normalizedOwnerId) return mergedMembers;

    return mergedMembers.sort((left, right) => {
      if (left.id === normalizedOwnerId) return -1;
      if (right.id === normalizedOwnerId) return 1;
      return 0;
    });
  }, [
    currentUser?.email,
    currentUser?.firstName,
    currentUser?.id,
    currentUser?.lastName,
    currentUser?.profile?.avatarUrl,
    members,
    organization?.members,
    storedEmail,
    storedFirstName,
    storedLastName,
    viewerUserId,
    normalizedOwnerId,
  ]);

  if (isPending) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingPanel}>Loading organization details...</div>
      </div>
    );
  }

  if (isError || !organization) {
    return (
      <div className={styles.page}>
        <div className={styles.errorPanel}>
          Organization not found or unavailable right now.
        </div>
      </div>
    );
  }

  const projectsCount =
    organization.activeProjects ?? organization.projects?.length ?? 0;

  return (
    <div className={styles.page}>
      <OrganizationDetailsInfoWidget
        organization={organization}
        organizationId={id}
        members={resolvedMembers}
        canManageOrganization={canManageOrganization}
        canViewMembersTab={canViewMembersTab}
        membersAccessDenied={isMembersAccessDenied}
        isMembersLoading={isMembersLoading}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTab === "overview" && projectsCount > 0 && (
        <ProjectsCarousel organizationId={organization.id} />
      )}
    </div>
  );
};
