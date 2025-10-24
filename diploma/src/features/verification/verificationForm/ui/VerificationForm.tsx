import styles from "./VerificationForm.module.scss";
import { AuthButton, ResendButton } from "@shared/ui/buttons";
import { InputOtp } from "@shared/ui/inputs";
import { useErrorStore, OtpType } from "@shared/config";
import { useAuthStore } from "@entities/user";

interface VerificationFormProps {
  otpType: OtpType;
  formik: any;
  isLoading: boolean;
  isLoadingResend: boolean;
  onResend: () => void;
}

export const VerificationForm = ({
  otpType,
  formik,
  isLoading,
  isLoadingResend,
  onResend,
}: VerificationFormProps) => {
  const { otpTimers, resetOtpTimer, decrementOtpTimer } = useAuthStore();
  const serverErrorVerification = useErrorStore(
    (state) => state.errors["otpVerification"]
  );
  const serverErrorVerificationCode = useErrorStore(
    (state) => state.errors["otpVerificationCode"]
  );

  return (
    <form onSubmit={formik.handleSubmit} className={styles.verificationForm}>
      <div className={styles.wrapperInputResend}>
        <InputOtp
          otpType={otpType}
          length={6}
          value={formik.values.code}
          onValueChange={(val) => {
            formik.setFieldValue("code", val);
          }}
          error={formik.submitCount > 0 ? formik.errors.code : undefined}
          serverError={serverErrorVerificationCode}
          isInvalid={!!formik.errors.code}
        />
        <div className={styles.resendButtonWrapperVerification}>
          <ResendButton
            seconds={otpTimers[otpType]}
            onResend={onResend}
            resetTimer={() => resetOtpTimer(otpType)}
            decrementTimer={() => decrementOtpTimer(otpType)}
            serverError={serverErrorVerificationCode}
            isLoading={isLoadingResend}
          />
        </div>
      </div>
      <div className={styles.buttonBlock}>
        <AuthButton loading={isLoading} label="Confirm" />
        {serverErrorVerification && (
          <div className="errorMessage">{serverErrorVerification}</div>
        )}
      </div>
    </form>
  );
};
