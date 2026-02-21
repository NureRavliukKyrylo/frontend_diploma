import { BaseModal } from "@shared/ui/modals";
import { useUserProfileStore } from "@entities/user";
import { verificationConfig } from "./verificationConfig";

export const VerificationModal = () => {
  const { activeVerificationModal, verificationSteps, closeVerificationModal } =
    useUserProfileStore();

  if (!activeVerificationModal) return null;

  const step = verificationSteps[activeVerificationModal];

  const StepComponent =
    verificationConfig[activeVerificationModal]?.steps[step];

  if (!StepComponent) return null;

  return (
    <BaseModal
      isOpen={true}
      onClose={() => {
        closeVerificationModal(activeVerificationModal);
      }}
      showClosed={false}
      maxWidth="700px"
    >
      {StepComponent}
    </BaseModal>
  );
};
