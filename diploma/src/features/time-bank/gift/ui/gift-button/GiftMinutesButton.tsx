import { useState } from "react";
import { GiftIcon } from "@shared/assets/icons/actions";
import styles from "./GiftMinutesButton.module.scss";
import { GiftMinutesModal } from "../modal/GiftMinutesModal";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useTranslation } from "react-i18next";

interface GiftMinutesButtonProps {
  recipientUserId: string;
}

export const GiftMinutesButton = ({
  recipientUserId,
}: GiftMinutesButtonProps) => {
  const { t } = useTranslation(["timeBank"]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseButtonWrapper
        className={styles.button}
        onClick={() => setIsOpen(true)}
      >
        <GiftIcon className={styles.icon} />
        {t("timeBank:gifts.labels.giftMinutes")}
      </BaseButtonWrapper>
      <GiftMinutesModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        recipientUserId={recipientUserId}
      />
    </>
  );
};
