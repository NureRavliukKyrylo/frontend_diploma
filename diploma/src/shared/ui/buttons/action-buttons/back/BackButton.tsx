import { useNavigate, useRouter } from "@tanstack/react-router";
import { BaseButtonWrapper } from "../../base-buttons/base-wrapper/BaseButtonWrapper";
import styles from "./BackButton.module.scss";
import { Arrow } from "@shared/assets/icons/actions";

interface BackButtonProps {
  disabled?: boolean;
  className?: string;
  fallbackRoute?: string;
}

export const BackButton = ({
  disabled = false,
  className,
  fallbackRoute = "/",
}: BackButtonProps) => {
  const { history } = useRouter();
  const navigate = useNavigate();

  const canGoBack = history.length > 1;

  const handleBack = () => {
    if (canGoBack) {
      history.go(-1);
    } else {
      navigate({ to: fallbackRoute });
    }
  };

  return (
    <BaseButtonWrapper
      className={`${styles.prevStepperButton} ${className || ""}`}
      onClick={handleBack}
      disabled={disabled}
    >
      <img src={Arrow} alt="Back" className={styles.arrowIcon} />
    </BaseButtonWrapper>
  );
};
