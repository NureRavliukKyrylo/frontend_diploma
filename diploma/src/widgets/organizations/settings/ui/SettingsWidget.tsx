import { useState } from "react";
import { useOrganizationSettingsForm } from "@features/organization/settings-form";
import { OrganizationSettingsModals } from "./components/OrganizationSettingsModals";
import { OrganizationSettingsTabContent } from "./components/OrganizationSettingsTabContent";
import { OrganizationSettingsTopBar } from "./components/OrganizationSettingsTopBar";
import { OrganizationSidebarCard } from "./components/OrganizationSidebarCard";
import { OrganizationTabSwitcher } from "./components/OrganizationTabSwitcher";
import type { SettingsTab } from "./config/settingsTabs";
import styles from "./SettingsWidget.module.scss";

interface OrganizationSettingsWidgetProps {
  organizationId: string;
}

export const OrganizationSettingsWidget = ({
  organizationId,
}: OrganizationSettingsWidgetProps) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const form = useOrganizationSettingsForm(organizationId);
  const {
    organization,
    values,
    currentLogoUrl,
    logoCropUrl,
    initials,
    pendingPolicyChange,
    isPending,
    isError,
    isOrganizationOwner,
    isEditAccessLoading,
    canEditOrganization,
    isSaving,
    isArchivePending,
    isSaveModalOpen,
    isArchiveModalOpen,
    isDeleteModalOpen,
    setIsSaveModalOpen,
    setIsArchiveModalOpen,
    setIsDeleteModalOpen,
    setPendingPolicyChange,
    handlePolicyConfirm,
    handleDiscard,
    handleSave,
    handleSaveConfirm,
    handleLogoCropClose,
    handleLogoCropSave,
    handleDeleteConfirm,
    archiveOrganization,
    navigateToOrganization,
  } = form;

  if (isPending || !values) {
    return <div className={styles.statePanel}>Loading organization settings...</div>;
  }

  if (isError || !organization) {
    return (
      <div className={styles.statePanel}>
        We could not load this organization right now.
      </div>
    );
  }

  if (!isOrganizationOwner && isEditAccessLoading) {
    return <div className={styles.statePanel}>Checking your access...</div>;
  }

  if (!isOrganizationOwner && !canEditOrganization) {
    return <div className={styles.statePanel}>Redirecting...</div>;
  }

  return (
    <section className={styles.wrapper}>
      <OrganizationSettingsTopBar
        name={organization.name}
        isSaving={isSaving}
        onBack={navigateToOrganization}
        onDiscard={handleDiscard}
        onSave={handleSave}
      />

      <div className={styles.layout}>
        <OrganizationSidebarCard
          name={organization.name}
          contactEmail={organization.contactEmail}
          currentLogoUrl={currentLogoUrl}
          initials={initials}
        />

        <div className={styles.mainColumn}>
          <OrganizationTabSwitcher activeTab={activeTab} onChange={setActiveTab} />
          <OrganizationSettingsTabContent
            activeTab={activeTab}
            organizationId={organizationId}
            form={form}
          />
        </div>
      </div>

      <OrganizationSettingsModals
        logoCropUrl={logoCropUrl}
        isSaveModalOpen={isSaveModalOpen}
        hasPendingPolicyChange={Boolean(pendingPolicyChange)}
        isArchiveModalOpen={isArchiveModalOpen}
        isDeleteModalOpen={isDeleteModalOpen}
        isSaving={isSaving}
        isArchivePending={isArchivePending}
        onLogoCropClose={handleLogoCropClose}
        onLogoCropSave={handleLogoCropSave}
        onSaveConfirm={handleSaveConfirm}
        onSaveCancel={() => setIsSaveModalOpen(false)}
        onPolicyConfirm={handlePolicyConfirm}
        onPolicyCancel={() => setPendingPolicyChange(null)}
        onArchiveConfirm={archiveOrganization}
        onArchiveCancel={() => setIsArchiveModalOpen(false)}
        onDeleteConfirm={handleDeleteConfirm}
        onDeleteCancel={() => setIsDeleteModalOpen(false)}
      />
    </section>
  );
};
