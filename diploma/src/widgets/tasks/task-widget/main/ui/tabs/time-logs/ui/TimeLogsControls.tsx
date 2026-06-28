import { statusOptions, type TaskTimeLogsLabels } from "../model/types";
import styles from "../../TaskTabs.module.scss";

interface TimeLogsControlsProps {
  status: string;
  labels: TaskTimeLogsLabels;
  isExporting: boolean;
  onStatusChange: (value: string) => void;
  onExport: () => void;
}

export const TimeLogsControls = ({
  status,
  labels,
  isExporting,
  onStatusChange,
  onExport,
}: TimeLogsControlsProps) => (
  <div className={styles.controlsRow}>
    <select
      className={styles.statusSelect}
      value={status}
      aria-label={labels.table.status}
      onChange={(event) => onStatusChange(event.target.value)}
    >
      <option value="">{labels.controls.allStatuses}</option>
      {statusOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <button
      type="button"
      className={styles.exportButton}
      disabled={isExporting}
      onClick={onExport}
    >
      {labels.controls.export}
    </button>
  </div>
);
