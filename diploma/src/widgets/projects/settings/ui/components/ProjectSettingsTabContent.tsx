import type { useProjectSettingsForm } from "@features/project";
import { GeneralTab } from "../tabs/GeneralTab";
import { AccessTab } from "../tabs/AccessTab";
import { DangerTab } from "../tabs/DangerTab";
import type { ActiveTab } from "../config/settingsTabs";

type Form = ReturnType<typeof useProjectSettingsForm>;

interface ProjectSettingsTabContentProps {
  activeTab: ActiveTab;
  form: Form;
}

export const ProjectSettingsTabContent = ({
  activeTab,
  form,
}: ProjectSettingsTabContentProps) => {
  if (!form.values) return null;

  if (activeTab === "access") {
    return <AccessTab values={form.values} onPolicyChange={form.handlePolicyChange} />;
  }

  if (activeTab === "danger") {
    return (
      <DangerTab
        projectStatus={form.projectStatus}
        isArchivePending={form.isArchivePending}
        isRecoverPending={form.isRecoverPending}
        onArchiveClick={() => form.setIsArchiveModalOpen(true)}
        onRecoverClick={() => form.setIsRecoverModalOpen(true)}
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
      onLocationTextChange={form.handleLocationTextChange}
      onLocationChange={form.handleLocationChange}
    />
  );
};
