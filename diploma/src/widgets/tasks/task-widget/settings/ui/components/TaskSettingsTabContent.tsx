import type { useTaskEditForm } from "@features/task/edit-form";
import { AccessTab } from "../tabs/AccessTab";
import { DangerTab } from "../tabs/DangerTab";
import { GeneralTab } from "../tabs/GeneralTab";
import type { ActiveTab } from "../config/settingsTabs";

type Form = ReturnType<typeof useTaskEditForm>;

interface TaskSettingsTabContentProps {
  activeTab: ActiveTab;
  form: Form;
}

export const TaskSettingsTabContent = ({
  activeTab,
  form,
}: TaskSettingsTabContentProps) => {
  if (activeTab === "access") {
    return (
      <AccessTab
        values={form.values}
        onPolicyChange={form.handlePolicyChange}
      />
    );
  }

  if (activeTab === "danger") {
    return (
      <DangerTab
        taskStatus={form.taskStatus}
        isCancelPending={form.isCancelPending}
        isDeletePending={form.isDeletePending}
        onCancelClick={() => form.setIsCancelModalOpen(true)}
        onDeleteClick={() => form.setIsDeleteModalOpen(true)}
      />
    );
  }

  return (
    <GeneralTab
      values={form.values}
      errors={form.errors}
      onChange={form.handleChange}
      onDateChange={form.handleDateChange}
      onCategoryToggle={form.handleCategoryToggle}
      onSkillToggle={form.handleSkillToggle}
      onLocationChange={form.handleLocationChange}
      onLocationClear={form.handleLocationClear}
    />
  );
};
