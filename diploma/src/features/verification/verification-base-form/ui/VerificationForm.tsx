import styles from "./VerificationForm.module.scss";
import { InputOtp } from "@shared/ui/inputs";

interface VerificationFormProps {
  formik: any;
  verificationError?: string | null;
  children: React.ReactNode;
}

export const VerificationForm = ({
  formik,
  verificationError,
  children,
}: VerificationFormProps) => {
  return (
    <form onSubmit={formik.handleSubmit} className={styles.verificationForm}>
      <div className={styles.wrapperInputResend}>
        <InputOtp
          length={6}
          value={formik.values.code}
          onValueChange={(val) => {
            formik.setFieldValue("code", val);
          }}
          error={formik.submitCount > 0 ? formik.errors.code : undefined}
          isInvalid={!!formik.errors.code}
        />
      </div>
      <div className={styles.childrenVerificationSection}>
        {children}
        {verificationError && (
          <div className="errorMessage">{verificationError}</div>
        )}
      </div>
    </form>
  );
};
