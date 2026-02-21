import { ImpactFlowLogo } from "@shared/assets/images/information";
import styles from "./VerificationWrapper.module.scss";

interface VerificationWrapper {
  title: string;
  description: string;
  children?: React.ReactNode;
}
export const VerificationWrapper = ({
  title,
  description,
  children,
}: VerificationWrapper) => {
  return (
    <div className={styles.wrapperVerificationContainer}>
      <img src={ImpactFlowLogo} alt="ImpactFlow" />
      <div className={styles.wrapperVerificationInfo}>
        <div className={styles.infoVerificationWrapper}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        {children}
      </div>
    </div>
  );
};
