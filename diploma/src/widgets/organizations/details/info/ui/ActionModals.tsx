import { DeleteModal } from "@shared/assets/images/actions";
import { useTranslation } from "react-i18next";
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
}: OrganizationDetailsActionModalsProps) => {
  const { t } = useTranslation("organizations");

  return (
    <>
    <ConfirmationModal
      isOpen={model.isLeaveModalOpen}
      onCancel={model.closeLeaveModal}
      onConfirm={model.confirmLeave}
      title={t("details.modals.leaveTitle")}
      text={t("myOrganizations.leaveText", { name: organization.name })}
      maxWidth="628px"
      error={model.leaveOrganizationErrorMessage}
      isLoading={model.isLeavePending}
      cancelText={t("details.modals.cancel")}
      confirmText={t("details.modals.confirmLeave")}
      image={DeleteModal}
    />

    <ConfirmationModal
      isOpen={model.isMemberRemovalModalOpen}
      onCancel={model.closeMemberRemoval}
      onConfirm={model.confirmMemberRemoval}
      title={t("details.modals.removeTitle", {
        name: model.memberToRemove?.name ?? t("details.labels.teamMember"),
      })}
      text={
        model.memberToRemove
          ? t("details.modals.removeText", {
              name: model.memberToRemove.name,
              organization: organization.name,
            })
          : t("details.modals.removeText", {
              name: t("details.labels.teamMember"),
              organization: organization.name,
            })
      }
      maxWidth="628px"
      error={model.memberRemovalErrorMessage}
      isLoading={model.isMemberRemovalPending}
      cancelText={t("details.modals.cancel")}
      confirmText={t("details.modals.confirmRemove")}
      image={DeleteModal}
    />
    </>
  );
};
