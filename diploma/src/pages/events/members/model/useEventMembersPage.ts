import { useEffect, useMemo, useState } from "react";
import { addToast } from "@heroui/react";
import { useNavigate, useParams, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { profileSearchDefaults } from "@entities/user";
import type { OrganizationRequestTab } from "@pages/organizations/members/lib/requestViewModels";
import type { OrganizationMemberCardModel } from "@widgets/organizations/members";
import { useEventMemberMutations } from "./useEventMemberMutations";
import { useEventMembersData } from "./useEventMembersData";

export type EventMembersTab = "members" | "requests";

const matchesSearch = (value: string, search: string) =>
  value.toLowerCase().includes(search.trim().toLowerCase());

export const useEventMembersPage = () => {
  const { t } = useTranslation("event");
  const { id: eventId } = useParams({
    from: "/_masterLayout/events/$id/members/",
  });
  const navigate = useNavigate();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<EventMembersTab>("members");
  const [activeRequestTab, setActiveRequestTab] =
    useState<OrganizationRequestTab>("join");
  const [searchValue, setSearchValue] = useState("");
  const data = useEventMembersData(eventId);
  const mutations = useEventMemberMutations(eventId);

  useEffect(() => {
    if (!data.event || data.isEditAccessLoading || data.canEdit) return;
    void navigate({
      to: "/events/$id",
      params: { id: eventId },
      replace: true,
    });
  }, [
    data.canEdit,
    data.event,
    data.isEditAccessLoading,
    eventId,
    navigate,
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
      search: { organizationId: data.event?.organizationId },
    });
  };
  const handleMessageClick = () =>
    addToast({
      title: t("membersPage.chatUnavailableTitle"),
      description: t("membersPage.messageUnavailable"),
      color: "warning",
    });
  const handleBrowseVolunteers = () =>
    addToast({
      title: t("membersPage.recommendationsUnavailableTitle"),
      description: t("membersPage.recommendationsUnavailable"),
      color: "primary",
    });
  const handleBack = () => {
    if (window.history.length > 1) {
      router.history.back();
      return;
    }
    void navigate({ to: "/events/$id", params: { id: eventId } });
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
