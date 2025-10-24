import { useAuthStore } from "@entities/user";
import { BaseButtonWrapper } from "../../base";
import styles from "./../styles/StepperButtons.module.scss";

interface NextStepperButtonProps {
  form?: string;
}

export const NextStepperButton: React.FC<NextStepperButtonProps> = ({
  form,
}) => {
  const { isLoading } = useAuthStore();
  console.log(isLoading);
  return (
    <BaseButtonWrapper
      loading={isLoading}
      className={styles.nextStepperButton}
      form={form}
    >
      Save & Next
    </BaseButtonWrapper>
  );
};
