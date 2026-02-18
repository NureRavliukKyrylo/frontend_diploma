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
      <div className={styles.wrapperVerificationInfo}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
};
