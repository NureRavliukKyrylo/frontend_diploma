import { useState } from "react";
import styles from "./DeactivateOfferButton.module.scss";
import { DeactivateOfferModal } from "../modal/DeactivateOfferModal";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { DeactivateIcon } from "@shared/assets/icons/actions";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface DeactivateOfferButtonProps {
  offerId: string;
}

export const DeactivateOfferButton = ({
  offerId,
}: DeactivateOfferButtonProps) => {
  const { t } = useTranslation(["timeBank"]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <BaseButtonWrapper
          className={styles.button}
          onClick={() => setIsOpen(true)}
        >
          <DeactivateIcon className={styles.icon} />
          {t("timeBank:deactivateOffer.actions.confirm")}
        </BaseButtonWrapper>
      </motion.div>
      <DeactivateOfferModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        offerId={offerId}
      />
    </>
  );
};
