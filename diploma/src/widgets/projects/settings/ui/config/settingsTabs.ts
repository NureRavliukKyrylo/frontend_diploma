import styles from "../SettingsWidget.module.scss";

export type ActiveTab = "general" | "access" | "danger";

export const tabs: Array<{ id: ActiveTab; labelKey: string }> = [
  { id: "general", labelKey: "settings.tabs.general" },
  { id: "access", labelKey: "settings.tabs.access" },
  { id: "danger", labelKey: "settings.tabs.danger" },
];

export const statusLabels = {
  active: "statuses.active",
  endingSoon: "statuses.endingSoon",
  completed: "statuses.completed",
  archived: "statuses.archived",
};

export const statusClassNames = {
  active: styles.statusActive,
  endingSoon: styles.statusEndingSoon,
  completed: styles.statusCompleted,
  archived: styles.statusArchived,
};
