import { useState } from "react";
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
        title="Loading project settings"
        text="Fetching the latest project details."
      />
    );
  }

  if (isError || !project || !values) {
    return (
      <StatePanel
        title="Project unavailable"
        text="We could not load this project settings page."
        action={
          <button
            type="button"
            className={styles.stateButton}
            onClick={navigateToProject}
          >
            Back to project
          </button>
        }
      />
    );
  }

  if (!canEditProject) {
    return (
      <StatePanel
        title="You do not have access"
        text="Project settings require the project.content_manage permission."
        action={
          <button
            type="button"
            className={styles.stateButton}
            onClick={navigateToProject}
          >
            Back to project
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
