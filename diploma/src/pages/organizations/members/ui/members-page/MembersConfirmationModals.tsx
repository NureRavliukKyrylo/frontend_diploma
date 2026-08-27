import { ConfirmationModal } from "@shared/ui/modals";
import { useTranslation } from "react-i18next";
import type { OrganizationMembersPageModel } from "../../model/types";

interface MembersConfirmationModalsProps {
  model: OrganizationMembersPageModel;
}

export const MembersConfirmationModals = ({
  model,
}: MembersConfirmationModalsProps) => {
  const { t } = useTranslation("common");
  const entity = t(`member.entities.${model.entityLabel}`);
  const requestKind = model.pendingDecision
    ? t(
        model.pendingDecision.request.kind === "join"
          ? "member.requestJoin"
          : "member.requestLeave",
      )
    : "";

  return (
    <>
      <ConfirmationModal
      isOpen={Boolean(model.memberToRemove)}
      title={t("memberList.removeTitle")}
      text={
        model.memberToRemove
          ? t("memberList.removeNamedText", {
              name: model.memberToRemove.fullName,
              entity,
            })
          : t("memberList.removeText")
      }
      confirmText={t("memberList.remove")}
      cancelText={t("actions.cancel")}
      isLoading={model.removalMutation.isPending}
      onConfirm={() =>
        model.memberToRemove &&
        model.removalMutation.mutate(model.memberToRemove)
      }
      onCancel={() => model.setMemberToRemove(null)}
    />

      <ConfirmationModal
      isOpen={Boolean(model.pendingDecision)}
      title={
        model.pendingDecision?.action === "approve"
          ? t("memberList.approveTitle")
          : t("memberList.rejectTitle")
      }
      text={
        model.pendingDecision
          ? t(
              model.pendingDecision.action === "approve"
                ? "memberList.approveText"
                : "memberList.rejectText",
              {
                name: model.pendingDecision.request.fullName,
                kind: requestKind,
              },
            )
          : ""
      }
      confirmText={
        model.pendingDecision?.action === "approve"
          ? t("actions.approve")
          : t("actions.reject")
      }
      cancelText={t("actions.cancel")}
      isLoading={model.decisionMutation.isPending}
      onConfirm={() =>
        model.pendingDecision &&
        model.decisionMutation.mutate({
          requestId: model.pendingDecision.request.id,
          action: model.pendingDecision.action,
        })
      }
      onCancel={() => model.setPendingDecision(null)}
      />
    </>
  );
};
