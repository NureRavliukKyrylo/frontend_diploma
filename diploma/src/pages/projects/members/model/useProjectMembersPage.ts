import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { addToast } from "@heroui/react";
import { useNavigate, useParams, useRouter } from "@tanstack/react-router";
import { profileSearchDefaults } from "@entities/user";
import type { OrganizationMemberCardModel } from "@widgets/organizations/members";
import type { OrganizationRequestTab } from "@pages/organizations/members/lib/requestViewModels";
import { useProjectMemberMutations } from "./useProjectMemberMutations";
import { useProjectMembersData } from "./useProjectMembersData";

export type ProjectMembersTab = "members" | "requests";

const matchesSearch = (value: string, search: string) =>
  value.toLowerCase().includes(search.trim().toLowerCase());

export const useProjectMembersPage = () => {
  const { t } = useTranslation("project");
  const { id: projectId } = useParams({
    from: "/_masterLayout/projects/$id/members/",
  });
  const navigate = useNavigate();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ProjectMembersTab>("members");
  const [activeRequestTab, setActiveRequestTab] =
    useState<OrganizationRequestTab>("join");
  const [searchValue, setSearchValue] = useState("");
  const data = useProjectMembersData(projectId);
  const mutations = useProjectMemberMutations(projectId);

  useEffect(() => {
    if (
      !data.project ||
      data.isEditAccessLoading ||
      data.canEdit
    ) {
      return;
    }
    void navigate({
      to: "/projects/$id",
      params: { id: projectId },
      replace: true,
    });
  }, [
    data.canEdit,
    data.isEditAccessLoading,
    data.project,
    navigate,
    projectId,
  ]);

  const filteredMembers = useMemo(() => {
    if (!searchValue.trim()) return data.memberCards;
    return data.memberCards.filter(
      (member) =>
        matchesSearch(member.fullName, searchValue) ||
        matchesSearch(member.roleName, searchValue),
    );
  }, [data.memberCards, searchValue]);
  const joinRequests = useMemo(
    () => data.requestCards.filter((request) => request.kind === "join"),
    [data.requestCards],
  );
  const leaveRequests = useMemo(
    () => data.requestCards.filter((request) => request.kind === "leave"),
    [data.requestCards],
  );
  const visibleRequests = useMemo(() => {
    const requests =
      activeRequestTab === "join" ? joinRequests : leaveRequests;
    if (!searchValue.trim()) return requests;
    return requests.filter((request) =>
      matchesSearch(request.fullName, searchValue),
    );
  }, [activeRequestTab, joinRequests, leaveRequests, searchValue]);
  const handleProfileClick = (member: OrganizationMemberCardModel) => {
    if (data.currentUserId && member.userId === data.currentUserId) {
      void navigate({ to: "/profile", search: profileSearchDefaults.profile });
      return;
    }

    void navigate({
      to: "/users/$userId",
      params: { userId: member.userId },
      search: {
        organizationId: data.project?.organizationId,
      },
    });
  };
  const handleMessageClick = () =>
    addToast({
      title: t("membersPage.messageUnavailable"),
      description: t("membersPage.messageUnavailable"),
      color: "warning",
    });
  const handleBrowseVolunteers = () => {
    void navigate({
      to: "/projects/$id/recommendations",
      params: { id: projectId },
    });
  };
  const handleBack = () => {
    if (window.history.length > 1) {
      router.history.back();
      return;
    }
    void navigate({ to: "/projects/$id", params: { id: projectId } });
  };

  return {
    ...data,
    ...mutations,
    entityLabel: t("membersPage.entityLabel"),
    activeTab,
    setActiveTab,
    activeRequestTab,
    setActiveRequestTab,
    searchValue,
    setSearchValue,
    filteredMembers,
    joinRequests,
    leaveRequests,
    visibleRequests,
    totalPendingCount: joinRequests.length + leaveRequests.length,
    handleProfileClick,
    handleMessageClick,
    handleBrowseVolunteers,
    handleBack,
  };
};
