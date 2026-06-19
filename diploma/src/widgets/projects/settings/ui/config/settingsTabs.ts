import styles from "../SettingsWidget.module.scss";

export type ActiveTab = "general" | "access" | "danger";

export const tabs: Array<{ id: ActiveTab; label: string }> = [
  { id: "general", label: "General" },
  { id: "access", label: "Access" },
  { id: "danger", label: "Danger zone" },
];

export const statusLabels = {
  active: "Active",
  endingSoon: "Ending soon",
  completed: "Completed",
  archived: "Archived",
};

export const statusClassNames = {
  active: styles.statusActive,
  endingSoon: styles.statusEndingSoon,
  completed: styles.statusCompleted,
  archived: styles.statusArchived,
};
