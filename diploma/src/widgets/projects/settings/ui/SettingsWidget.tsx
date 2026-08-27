import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useProjectSettingsForm } from "@features/project";
import { ProjectSettingsModals } from "./components/ProjectSettingsModals";
import { ProjectSettingsTabContent } from "./components/ProjectSettingsTabContent";
import { ProjectSettingsTopBar } from "./components/ProjectSettingsTopBar";
import { ProjectSidebarCard } from "./components/ProjectSidebarCard";
import { ProjectTabSwitcher } from "./components/ProjectTabSwitcher";
import { StatePanel } from "./components/StatePanel";
import type { ActiveTab } from "./config/settingsTabs";
import { getProgressPercent } from "./lib/projectSettingsFormat";
import styles from "./SettingsWidget.module.scss";

interface ProjectSettingsWidgetProps {
  projectId: string;
}

export const ProjectSettingsWidget = ({
  projectId,
}: ProjectSettingsWidgetProps) => {
  const { t } = useTranslation("project");
  const [activeTab, setActiveTab] = useState<ActiveTab>("general");
  const form = useProjectSettingsForm(projectId);
  const {
    project,
    projectStatus,
    values,
    isLoading,
    isError,
    canEditProject,
    isSaveModalOpen,
    isArchiveModalOpen,
    isRecoverModalOpen,
    pendingPolicyChange,
    isSavePending,
    isArchivePending,
    isRecoverPending,
    handlePolicyConfirm,
    handleDiscard,
    handleSave,
    handleSaveConfirm,
    navigateToProject,
    setIsSaveModalOpen,
    setIsArchiveModalOpen,
    setIsRecoverModalOpen,
    setPendingPolicyChange,
    archiveProject,
    recoverProject,
  } = form;

  if (isLoading) {
    return (
      <StatePanel
        title={t("settings.states.loadingTitle")}
        text={t("settings.states.loadingText")}
      />
    );
  }

  if (isError || !project || !values) {
    return (
      <StatePanel
        title={t("settings.states.unavailableTitle")}
        text={t("settings.states.unavailableText")}
        action={
          <button
            type="button"
            className={styles.stateButton}
            onClick={navigateToProject}
          >
            {t("settings.states.back")}
          </button>
        }
      />
    );
  }

  if (!canEditProject) {
    return (
      <StatePanel
        title={t("settings.states.accessTitle")}
        text={t("settings.states.accessText")}
        action={
          <button
            type="button"
            className={styles.stateButton}
            onClick={navigateToProject}
          >
            {t("settings.states.back")}
          </button>
        }
      />
    );
  }

  const progressPercent = getProgressPercent(
    project.progressPercent,
    project.progress,
  );

  return (
    <>
      <ProjectSettingsTopBar
        title={project.title}
        isSavePending={isSavePending}
        onBack={navigateToProject}
        onDiscard={handleDiscard}
        onSave={handleSave}
      />

      <div className={styles.layout}>
        <ProjectSidebarCard
          project={project}
          projectStatus={projectStatus}
          progressPercent={progressPercent}
        />

        <main className={styles.mainPanel}>
          <ProjectTabSwitcher activeTab={activeTab} onChange={setActiveTab} />
          <ProjectSettingsTabContent activeTab={activeTab} form={form} />
        </main>
      </div>

      <ProjectSettingsModals
        isSaveModalOpen={isSaveModalOpen}
        hasPendingPolicyChange={Boolean(pendingPolicyChange)}
        isArchiveModalOpen={isArchiveModalOpen}
        isRecoverModalOpen={isRecoverModalOpen}
        isSavePending={isSavePending}
        isArchivePending={isArchivePending}
        isRecoverPending={isRecoverPending}
        onSaveConfirm={handleSaveConfirm}
        onSaveCancel={() => setIsSaveModalOpen(false)}
        onPolicyConfirm={handlePolicyConfirm}
        onPolicyCancel={() => setPendingPolicyChange(null)}
        onArchiveConfirm={() => archiveProject()}
        onArchiveCancel={() => setIsArchiveModalOpen(false)}
        onRecoverConfirm={() => recoverProject()}
        onRecoverCancel={() => setIsRecoverModalOpen(false)}
      />
    </>
  );
};
