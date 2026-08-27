import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Organization } from "@entities/organization";
import {
  actionClassNames,
  itemVariants,
  menuVariants,
} from "../config/organizationFabPresentation";
import type { useOrganizationFabActions } from "../model/useOrganizationFabActions";
import styles from "../OrganizationFab.module.scss";

interface OrganizationFabActionStackProps {
  organization: Organization;
  model: ReturnType<typeof useOrganizationFabActions>;
}

export const OrganizationFabActionStack = ({
  organization,
  model,
}: OrganizationFabActionStackProps) => {
  const { t } = useTranslation("organizations");

  return (
    <motion.div
    className={styles.actionsStack}
    variants={menuVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {model.shouldShowContextBlock ? (
      <>
        <motion.button
          type="button"
          className={styles.contextBlock}
          custom={model.actions.length}
          variants={itemVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={model.openDashboard}
        >
          <span className={styles.contextAvatar}>
            {organization.logoUrl ? (
              <img
                src={organization.logoUrl}
                alt={t("fab.logoAlt", { name: organization.name })}
              />
            ) : (
              <span>{model.initials}</span>
            )}
          </span>
          <span className={styles.contextText}>
            <span className={styles.contextHint}>{t("fab.context")}</span>
            <span className={styles.contextName}>{organization.name}</span>
          </span>
          <ArrowRight size={16} color="#bbb" strokeWidth={2.4} />
        </motion.button>
        <motion.div
          className={styles.contextDivider}
          custom={model.actions.length - 0.5}
          variants={itemVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        />
      </>
    ) : null}

    {model.actions.map((action, index) => {
      const Icon = action.icon;
      const actionClassName = actionClassNames[action.id];

      return (
        <motion.div
          key={action.id}
          className={styles.actionRow}
          custom={index}
          variants={itemVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.button
            type="button"
            className={`${styles.actionPill} ${actionClassName}`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={action.onClick}
          >
            <Icon size={16} strokeWidth={2.4} />
            <span>{action.label}</span>
          </motion.button>

          <motion.button
            type="button"
            className={`${styles.actionCircle} ${actionClassName}`}
            aria-label={action.label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.96 }}
            onClick={action.onClick}
          >
            <Icon size={18} strokeWidth={2.5} />
          </motion.button>
        </motion.div>
      );
    })}
    </motion.div>
  );
};
