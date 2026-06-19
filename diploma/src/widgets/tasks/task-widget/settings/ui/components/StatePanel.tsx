import styles from "../TaskEditSettings.module.scss";

interface StatePanelProps {
  title: string;
  text: string;
  onBack: () => void;
}

export const StatePanel = ({ title, text, onBack }: StatePanelProps) => (
  <div className={styles.statePanel}>
    <h2>{title}</h2>
    <p>{text}</p>
    <button type="button" className={styles.stateButton} onClick={onBack}>
      Back to task
    </button>
  </div>
);
