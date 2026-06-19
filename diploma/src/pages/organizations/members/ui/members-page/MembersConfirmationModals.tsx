import { ConfirmationModal } from "@shared/ui/modals";
import type { OrganizationMembersPageModel } from "../../model/types";

interface MembersConfirmationModalsProps {
  model: OrganizationMembersPageModel;
}

export const MembersConfirmationModals = ({
  model,
}: MembersConfirmationModalsProps) => (
  <>
    <ConfirmationModal
      isOpen={Boolean(model.memberToRemove)}
      title="Remove member?"
      text={
        model.memberToRemove
          ? `Are you sure you want to remove ${model.memberToRemove.fullName} from this organization?`
          : "Are you sure you want to remove this member?"
      }
      confirmText="Remove"
      cancelText="Cancel"
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
          ? "Approve request?"
          : "Reject request?"
      }
      text={
        model.pendingDecision
          ? model.pendingDecision.action === "approve"
            ? `Approve ${model.pendingDecision.request.fullName}'s ${model.pendingDecision.request.kind} request?`
            : `Reject ${model.pendingDecision.request.fullName}'s ${model.pendingDecision.request.kind} request?`
          : ""
      }
      confirmText={
        model.pendingDecision?.action === "approve" ? "Approve" : "Reject"
      }
      cancelText="Cancel"
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
