import styles from "./VerificationForm.module.scss";
import { AuthButton } from "@shared/ui/buttons";
import { InputOtp } from "@shared/ui/inputs";
import { useErrorStore, OtpType } from "@shared/config";

interface VerificationFormProps {
  otpType: OtpType;
  formik: any;
  isLoading: boolean;
  onResend: () => void;
}

export const VerificationForm = ({
  otpType,
  formik,
  isLoading,
  onResend,
}: VerificationFormProps) => {
  const serverErrorVerification = useErrorStore(
    (state) => state.errors["otpVerification"]
  );
  const serverErrorVerificationCode = useErrorStore(
    (state) => state.errors["otpVerificationCode"]
  );

  return (
    <form onSubmit={formik.handleSubmit} className={styles.verificationForm}>
      <InputOtp
        onResend={onResend}
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
      <div className={styles.buttonBlock}>
        <AuthButton loading={isLoading} label="Confirm" />
        {serverErrorVerification && (
          <div className="errorMessage">{serverErrorVerification}</div>
        )}
      </div>
    </form>
  );
};
