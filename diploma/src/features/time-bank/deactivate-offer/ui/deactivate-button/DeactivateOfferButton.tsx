import { useState } from "react";
import styles from "./DeactivateOfferButton.module.scss";
import { DeactivateOfferModal } from "../modal/DeactivateOfferModal";
import { BaseButtonWrapper } from "@shared/ui/buttons";

interface DeactivateOfferButtonProps {
  offerId: string;
}

export const DeactivateOfferButton = ({
  offerId,
}: DeactivateOfferButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseButtonWrapper
        className={styles.button}
        onClick={() => setIsOpen(true)}
      >
        Deactivate
      </BaseButtonWrapper>
      <DeactivateOfferModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        offerId={offerId}
      />
    </>
  );
};
