import styles from "../CreateTaskDrawer.module.scss";

interface CreateTaskDrawerHeaderProps {
  orgName?: string;
  onClose: () => void;
}

export const CreateTaskDrawerHeader = ({
  orgName,
  onClose,
}: CreateTaskDrawerHeaderProps) => {
  const resolvedOrgName = orgName?.trim() || "Organization";

  return (
    <header className={styles.drawerHeader}>
      <div>
        <h1 className={styles.drawerTitle}>New task</h1>
        <p className={styles.drawerSubtitle}>Creating in {resolvedOrgName}</p>
      </div>
      <button
        type="button"
        className={styles.closeBtn}
        aria-label="Close"
        onClick={onClose}
      >
        <i className="ti ti-x" aria-hidden="true" />
      </button>
    </header>
  );
};
