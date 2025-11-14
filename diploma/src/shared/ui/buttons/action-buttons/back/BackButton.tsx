import { BaseButtonWrapper } from "../../base-buttons/base-wrapper/BaseButtonWrapper";
import styles from "./BackButton.module.scss";
import { Arrow } from "@shared/assets/icons/actions";

interface BackButtonProps {
  onBack?: () => void;
  disabled?: boolean;
  className?: string;
}

export const BackButton = ({
  onBack,
  disabled = false,
  className,
}: BackButtonProps) => {
  return (
    <BaseButtonWrapper
      className={`${styles.prevStepperButton} ${className || ""}`}
      onClick={onBack}
      disabled={disabled}
    >
      <img src={Arrow} alt="Back" className={styles.arrowIcon} />
    </BaseButtonWrapper>
  );
};
