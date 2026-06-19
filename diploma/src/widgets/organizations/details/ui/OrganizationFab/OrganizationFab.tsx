import { AnimatePresence, motion } from "framer-motion";
import type { Organization } from "@entities/organization";
import { CreateTaskDrawer } from "@features/task/create-task";
import type { OrganizationDetailsTab } from "../../info/config/tabs";
import { useOrganizationFabActions } from "./model/useOrganizationFabActions";
import { OrganizationFabActionStack } from "./ui/OrganizationFabActionStack";
import { OrganizationFabMainButton } from "./ui/OrganizationFabMainButton";
import styles from "./OrganizationFab.module.scss";

interface OrganizationFabProps {
  organizationId: string;
  organization: Organization;
  canViewMembersTab?: boolean;
  activeTab?: OrganizationDetailsTab;
  onTabChange?: (nextTab: OrganizationDetailsTab) => void;
}

export const OrganizationFab = (props: OrganizationFabProps) => {
  const model = useOrganizationFabActions(props);

  if (!model.isVisible) return null;

  return (
    <>
      <AnimatePresence>
        {model.isOpen ? (
          <motion.button
            type="button"
            className={styles.backdrop}
            aria-label="Close organization actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={model.closeMenu}
          />
        ) : null}
      </AnimatePresence>

      <div className={styles.fabRoot}>
        <AnimatePresence>
          {model.isOpen ? (
            <OrganizationFabActionStack
              organization={props.organization}
              model={model}
            />
          ) : null}
        </AnimatePresence>

        <OrganizationFabMainButton
          isOpen={model.isOpen}
          onClick={() => model.setIsOpen((current) => !current)}
        />
      </div>

      <CreateTaskDrawer
        isOpen={model.isTaskDrawerOpen}
        onClose={model.closeTaskDrawer}
        organizationId={props.organizationId}
        orgName={props.organization.name}
      />
    </>
  );
};
