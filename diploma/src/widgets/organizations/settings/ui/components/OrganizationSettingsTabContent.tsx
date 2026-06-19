import { AnimatePresence, motion } from "framer-motion";
import type { useOrganizationSettingsForm } from "@features/organization/settings-form";
import { AccessTab } from "../tabs/AccessTab";
import { DangerTab } from "../tabs/DangerTab";
import { GeneralTab } from "../tabs/GeneralTab";
import type { SettingsTab } from "../config/settingsTabs";

type Form = ReturnType<typeof useOrganizationSettingsForm>;

interface OrganizationSettingsTabContentProps {
  activeTab: SettingsTab;
  organizationId: string;
  form: Form;
}

export const OrganizationSettingsTabContent = ({
  activeTab,
  organizationId,
  form,
}: OrganizationSettingsTabContentProps) => {
  if (!form.organization || !form.values) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {activeTab === "general" ? (
          <GeneralTab
            organizationId={organizationId}
            organization={form.organization}
            values={form.values}
            errors={form.errors}
            logoUrl={form.logoPreviewUrl}
            initials={form.initials}
            isLogoUploading={form.isLogoUploading}
            isLogoRemoving={form.isLogoRemoving}
            onChange={form.handleChange}
            onLocationTextChange={form.handleLocationTextChange}
            onLocationChange={form.handleLocationChange}
            onLogoSelect={form.handleLogoSelect}
            onLogoRemove={form.handleLogoRemove}
          />
        ) : activeTab === "access" ? (
          <AccessTab
            organizationId={organizationId}
            organization={form.organization}
            values={form.values}
            onPolicyChange={form.handlePolicyChange}
          />
        ) : (
          <DangerTab
            organizationId={organizationId}
            organization={form.organization}
            isArchivePending={form.isArchivePending}
            onArchiveClick={() => form.setIsArchiveModalOpen(true)}
            onDeleteClick={() => form.setIsDeleteModalOpen(true)}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
