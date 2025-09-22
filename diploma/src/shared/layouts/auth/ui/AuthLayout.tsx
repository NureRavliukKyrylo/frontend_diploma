import styles from "./../styles/AuthLayout.module.scss";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return <div className={styles.authWrapper}>{children}</div>;
};
