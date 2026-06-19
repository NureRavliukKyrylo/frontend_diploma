import { useState } from "react";
import type { Task } from "@entities/task";
import { useTaskEditForm } from "@features/task/edit-form";
import { StatePanel } from "./components/StatePanel";
import { TaskSettingsModals } from "./components/TaskSettingsModals";
import { TaskSettingsTabContent } from "./components/TaskSettingsTabContent";
import { TaskSettingsTopBar } from "./components/TaskSettingsTopBar";
import { TaskTabSwitcher } from "./components/TaskTabSwitcher";
import type { ActiveTab } from "./config/settingsTabs";
import styles from "./TaskEditSettings.module.scss";

interface TaskEditSettingsProps {
  task: Task;
  onExitEdit: () => void;
  onCloseDrawer?: () => void;
}

export const TaskEditSettings = ({
  task,
  onExitEdit,
  onCloseDrawer,
}: TaskEditSettingsProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("general");
  const form = useTaskEditForm({ task, onExitEdit, onCloseDrawer });

  if (!form.canEditTask) {
    return (
      <StatePanel
        title="You do not have access"
        text="Task settings require the task.content_manage permission."
        onBack={onExitEdit}
      />
    );
  }

  return (
    <div className={styles.settingsRoot}>
      <TaskSettingsTopBar
        title={task.title}
        isSavePending={form.isSavePending}
        onBack={form.handleDiscard}
        onDiscard={form.handleDiscard}
        onSave={form.handleSave}
      />

      <div className={styles.mainPanel}>
        <TaskTabSwitcher activeTab={activeTab} onChange={setActiveTab} />
        <TaskSettingsTabContent activeTab={activeTab} form={form} />
      </div>

      <TaskSettingsModals
        isSaveModalOpen={form.isSaveModalOpen}
        hasPendingPolicyChange={Boolean(form.pendingPolicyChange)}
        isCancelModalOpen={form.isCancelModalOpen}
        isDeleteModalOpen={form.isDeleteModalOpen}
        isSavePending={form.isSavePending}
        isCancelPending={form.isCancelPending}
        isDeletePending={form.isDeletePending}
        onSaveConfirm={form.handleSaveConfirm}
        onSaveCancel={() => form.setIsSaveModalOpen(false)}
        onPolicyConfirm={form.handlePolicyConfirm}
        onPolicyCancel={() => form.setPendingPolicyChange(null)}
        onCancelTask={() => form.cancelTask()}
        onCancelModalClose={() => form.setIsCancelModalOpen(false)}
        onDeleteTask={() => form.deleteTask()}
        onDeleteModalClose={() => form.setIsDeleteModalOpen(false)}
      />
    </div>
  );
};
