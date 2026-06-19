import { DeleteModal } from "@shared/assets/images/actions";
import { ConfirmationModal } from "@shared/ui/modals";
import type { Organization } from "@entities/organization";
import type { useOrganizationDetailsInfoModel } from "../model/useInfoModel";

type OrganizationDetailsInfoModel = ReturnType<
  typeof useOrganizationDetailsInfoModel
>;

interface OrganizationDetailsActionModalsProps {
  organization: Organization;
  model: OrganizationDetailsInfoModel;
}

export const OrganizationDetailsActionModals = ({
  organization,
  model,
}: OrganizationDetailsActionModalsProps) => (
  <>
    <ConfirmationModal
      isOpen={model.isLeaveModalOpen}
      onCancel={model.closeLeaveModal}
      onConfirm={model.confirmLeave}
      title="Are you leaving?"
      text={`Are you sure you want to leave ${organization.name}? You can join it again later.`}
      maxWidth="628px"
      error={model.leaveOrganizationErrorMessage}
      isLoading={model.isLeavePending}
      cancelText="Cancel"
      confirmText="Leave"
      image={DeleteModal}
    />

    <ConfirmationModal
      isOpen={model.isMemberRemovalModalOpen}
      onCancel={model.closeMemberRemoval}
      onConfirm={model.confirmMemberRemoval}
      title="Remove team member?"
      text={
        model.memberToRemove
          ? `Are you sure you want to remove ${model.memberToRemove.name} from ${organization.name}?`
          : "Are you sure you want to remove this team member?"
      }
      maxWidth="628px"
      error={model.memberRemovalErrorMessage}
      isLoading={model.isMemberRemovalPending}
      cancelText="Cancel"
      confirmText="Remove"
      image={DeleteModal}
    />
  </>
);
