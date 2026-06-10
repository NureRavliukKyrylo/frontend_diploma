import styles from "./BaseWrapperFilter.module.scss";

interface BaseWrapperFilterProps {
  children: React.ReactNode;
}
export const BaseWrapperFilter = ({ children }: BaseWrapperFilterProps) => {
  return (
    <div className={styles.baseWrapperFilter}>
      <div className={styles.topContent}>
        <h1>Filter</h1>
        <div className={styles.line} />
      </div>
      {children}
    </div>
  );
};
