import type { ReactNode } from "react";
import styles from "../SettingsWidget.module.scss";

interface StatePanelProps {
  title: string;
  text: string;
  action?: ReactNode;
}

export const StatePanel = ({ title, text, action }: StatePanelProps) => (
  <div className={styles.statePanel}>
    <h2>{title}</h2>
    <p>{text}</p>
    {action}
  </div>
);
