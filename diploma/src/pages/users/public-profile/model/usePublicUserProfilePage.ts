import { useMemo, useState } from "react";
import { addToast } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useParams,
  useRouter,
  useSearch,
} from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { organizationQuery } from "@entities/organization";
import { participationQuery } from "@entities/participation";
import { useUserStore } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import { useCreatePrivateChat } from "@features/chat/private-chat/model/useCreatePrivateChat";
import { useInviteVolunteer } from "@features/invitation/invite-volunteer";
import { getErrorMessage } from "@shared/libs/error-message";

export const usePublicUserProfilePage = () => {
  const { userId } = useParams({ from: "/_masterLayout/users/$userId/" });
  const { organizationId } = useSearch({
    from: "/_masterLayout/users/$userId/",
  });
  const navigate = useNavigate();
  const router = useRouter();
  const { t } = useTranslation("common");
  const storedUserId = useUserStore((state) => state.userId);
  const currentUserQuery = useQuery(profileQuery.all());
  const profileQueryResult = useQuery(profileQuery.publicById(userId));
  const organizationResult = useQuery({
    ...organizationQuery.byId(organizationId ?? ""),
    enabled: Boolean(organizationId),
    retry: false,
  });
  const currentUserId =
    storedUserId?.trim() || currentUserQuery.data?.id?.trim() || null;
  const isOwner = Boolean(
    currentUserId &&
      organizationResult.data?.ownerId &&
      currentUserId === organizationResult.data.ownerId,
  );
  const editAccessResult = useQuery({
    ...organizationQuery.editAccess(organizationId ?? ""),
    enabled: Boolean(organizationId && organizationResult.data && !isOwner),
    retry: false,
  });
  const canManageMembers = Boolean(isOwner || editAccessResult.data);
  const membersResult = useQuery({
    ...participationQuery.members({
      entityType: "organization",
      entityId: organizationId ?? "",
      page: 1,
      pageSize: 500,
    }),
    enabled: Boolean(organizationId && canManageMembers),
    retry: false,
  });
  const isMember = useMemo(
    () =>
      Boolean(
        membersResult.data?.data.some((member) => member.userId === userId),
      ),
    [membersResult.data?.data, userId],
  );
  const invitation = useInviteVolunteer(organizationId ?? "");
  const privateChat = useCreatePrivateChat();
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [invitationMessage, setInvitationMessage] = useState("");
  const [isInvited, setIsInvited] = useState(false);

  const fullName =
    [profileQueryResult.data?.firstName, profileQueryResult.data?.lastName]
      .filter(Boolean)
      .join(" ") || t("publicProfile.volunteer");

  const closeInvitation = () => {
    if (invitation.isLoading) return;
    invitation.reset();
    setInvitationMessage("");
    setIsInvitationOpen(false);
  };

  const confirmInvitation = async () => {
    if (!organizationId) return;

    try {
      await invitation.inviteVolunteer({
        userId,
        message: invitationMessage.trim() || undefined,
      });
      setIsInvited(true);
      setIsInvitationOpen(false);
      setInvitationMessage("");
      addToast({
        title: t("publicProfile.invitationSent"),
        description: t("publicProfile.invitationSentText", { name: fullName }),
        color: "success",
      });
    } catch {
      return;
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.history.back();
      return;
    }

    if (organizationId) {
      void navigate({
        to: "/organizations/$id/members",
        params: { id: organizationId },
      });
      return;
    }

    void navigate({ to: "/" });
  };

  return {
    userId,
    profile: profileQueryResult.data,
    organization: organizationResult.data,
    fullName,
    isLoading: profileQueryResult.isPending,
    isError: profileQueryResult.isError,
    canInvite: Boolean(
      organizationId &&
        canManageMembers &&
        !isMember &&
        currentUserId !== userId,
    ),
    isInvited,
    isInvitationOpen,
    invitationMessage,
    setInvitationMessage,
    openInvitation: () => setIsInvitationOpen(true),
    closeInvitation,
    confirmInvitation,
    invitationError: invitation.error
      ? getErrorMessage(invitation.error, t)
      : null,
    isInviting: invitation.isLoading,
    sendMessage: () => privateChat.createPrivateChat(userId),
    isOpeningChat: privateChat.isLoading,
    handleBack,
  };
};

export type PublicUserProfilePageModel = ReturnType<
  typeof usePublicUserProfilePage
>;
