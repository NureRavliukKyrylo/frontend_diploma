import type { useEventSettingsForm } from "@features/event";
import { GeneralTab } from "../tabs/GeneralTab";
import { AccessTab } from "../tabs/AccessTab";
import { AttendanceTab } from "../tabs/AttendanceTab";
import { DangerTab } from "../tabs/DangerTab";
import type { ActiveTab } from "../config/settingsTabs";

type Form = ReturnType<typeof useEventSettingsForm>;

interface EventSettingsTabContentProps {
  activeTab: ActiveTab;
  form: Form;
}

export const EventSettingsTabContent = ({
  activeTab,
  form,
}: EventSettingsTabContentProps) => {
  if (!form.values) return null;

  if (activeTab === "access") {
    return <AccessTab values={form.values} onPolicyChange={form.handlePolicyChange} />;
  }

  if (activeTab === "attendance") {
    return (
      <AttendanceTab
        values={form.values}
        errors={form.errors}
        onToggle={form.handleAttendanceToggle}
        onRadiusChange={form.handleRadiusChange}
        onRadiusClear={form.handleRadiusClear}
      />
    );
  }

  if (activeTab === "danger") {
    return (
      <DangerTab
        eventStatus={form.eventStatus}
        isCancelPending={form.isCancelPending}
        onCancelClick={() => form.setIsCancelModalOpen(true)}
      />
    );
  }

  return (
    <GeneralTab
      values={form.values}
      errors={form.errors}
      lockState={form.lockState}
      onChange={form.handleChange}
      onDateChange={form.handleDateChange}
      onCategoryToggle={form.handleCategoryToggle}
      onLocationTextChange={form.handleLocationTextChange}
      onLocationChange={form.handleLocationChange}
      onSkillAdd={form.handleSkillAdd}
      onSkillChange={form.handleSkillChange}
      onSkillRemove={form.handleSkillRemove}
    />
  );
};
