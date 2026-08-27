import { BaseModal } from "@shared/ui/modals";
import { useUserProfileStore } from "@entities/user";
import { verificationConfig } from "../configs/verificationConfig";
import { useMediaQuery } from "usehooks-ts";

export const VerificationModal = () => {
  const { activeVerificationModal, verificationSteps, closeVerificationModal } =
    useUserProfileStore();
  const isTabletOrLess = useMediaQuery("(max-width: 900px)");

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
      maxWidth={isTabletOrLess ? "500px" : "700px"}
    >
      {StepComponent}
    </BaseModal>
  );
};
