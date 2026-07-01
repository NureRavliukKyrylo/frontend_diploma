import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { addToast } from "@heroui/react";
import { useNavigate, useParams, useRouter } from "@tanstack/react-router";
import { profileSearchDefaults } from "@entities/user";
import type { OrganizationMemberCardModel } from "@widgets/organizations/members";
import type { OrganizationRequestTab } from "../lib/requestViewModels";
import { useOrganizationMemberMutations } from "./useOrganizationMemberMutations";
import { useOrganizationMembersData } from "./useOrganizationMembersData";

export type OrganizationMembersTab = "members" | "requests";

const matchesSearch = (value: string, search: string) =>
  value.toLowerCase().includes(search.trim().toLowerCase());

export const useOrganizationMembersPage = () => {
  const { t } = useTranslation("organizations");
  const { id: organizationId } = useParams({
    from: "/_masterLayout/organizations/$id/members/",
  });
  const navigate = useNavigate();
  const router = useRouter();
  const [activeTab, setActiveTab] =
    useState<OrganizationMembersTab>("members");
  const [activeRequestTab, setActiveRequestTab] =
    useState<OrganizationRequestTab>("join");
  const [searchValue, setSearchValue] = useState("");
  const data = useOrganizationMembersData(organizationId);
  const mutations = useOrganizationMemberMutations(organizationId);

  useEffect(() => {
    if (
      !data.organization ||
      data.isOwner ||
      data.isEditAccessLoading ||
      data.canEdit
    ) {
      return;
    }
    void navigate({
      to: "/organizations/$id",
      params: { id: organizationId },
      replace: true,
    });
  }, [
    data.canEdit,
    data.isEditAccessLoading,
    data.isOwner,
    data.organization,
    navigate,
    organizationId,
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
      search: { organizationId },
    });
  };
  const handleMessageClick = () =>
    addToast({
      title: t("members.messageUnavailable"),
      description: t("members.messageUnavailable"),
      color: "warning",
    });
  const handleBrowseVolunteers = () => {
    void navigate({
      to: "/organizations/$id/recommendations",
      params: { id: organizationId },
    });
  };
  const handleBack = () => {
    if (window.history.length > 1) {
      router.history.back();
      return;
    }
    if (data.organization) {
      void navigate({
        to: "/organizations/$id",
        params: { id: data.organization.id },
      });
    }
  };

  return {
    ...data,
    ...mutations,
    entityLabel: t("members.entityLabel"),
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
