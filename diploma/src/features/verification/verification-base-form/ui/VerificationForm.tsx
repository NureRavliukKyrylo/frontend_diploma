import styles from "./VerificationForm.module.scss";
import { InputOtp } from "@shared/ui/inputs";
import type { OtpType } from "@shared/config/types";

interface VerificationFormProps {
  otpType: OtpType;
  formik: any;
  verificationError?: string | null;
  resendError?: string | null;
  children: React.ReactNode;
}

export const VerificationForm = ({
  otpType,
  formik,
  verificationError,
  resendError,
  children,
}: VerificationFormProps) => {
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
          serverError={resendError}
          isInvalid={!!formik.errors.code}
        />
      </div>
      {children}
      {verificationError && (
        <div className="errorMessage">{verificationError}</div>
      )}
    </form>
  );
};
