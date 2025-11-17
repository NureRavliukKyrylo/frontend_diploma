import styles from "./MainProfileWrapper.module.scss";

interface MainProfileWrapperProps {
  children?: React.ReactNode;
}
export const MainProfileWrapper = ({ children }: MainProfileWrapperProps) => {
  return <div className={styles.mainProfileWrapper}>{children}</div>;
};
