import styles from "./VerificationForm.module.scss";
import { OtpType, useErrorStore } from "@shared/config";
import { AuthButton } from "@shared/ui/buttons";
import { InputOtp } from "@shared/ui/inputs";
import { useVerifyEmail } from "../model/useVerifyEmail";
import { useAuthStore } from "@entities/user";
import { useResendCode } from "@shared/api";
export const VerificationForm = () => {
  const serverError = useErrorStore((state) => state.serverError);
  const { formik, isLoading } = useVerifyEmail();
  const { setVerifyCode } = useAuthStore();
  const { resend, isLoadingResend } = useResendCode({
    type: OtpType.EmailVerification,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.verificationForm}>
        <InputOtp
          onResend={resend}
          otpType="email"
          length={6}
          value={formik.values.code}
          onValueChange={(val) => {
            formik.setFieldValue("code", val);
            setVerifyCode(val);
          }}
          error={
            formik.submitCount > 0 && formik.errors.code
              ? formik.errors.code
              : undefined
          }
          isInvalid={!!formik.errors.code}
        />
        <div className={styles.buttonBlock}>
          <AuthButton loading={isLoading} label="Confirm" />
          {serverError && <div className="errorMessage">{serverError}</div>}
        </div>
      </form>
    </>
  );
};
