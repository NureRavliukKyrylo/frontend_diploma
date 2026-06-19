import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { RoleCard } from "@widgets/organizations/roles";
import type { OrganizationRolesPageModel } from "../../model/pageModel";
import styles from "./RoleSections.module.scss";

interface RoleSectionsProps {
  model: OrganizationRolesPageModel;
}

export const RoleSections = ({ model }: RoleSectionsProps) => {
  const activeSections = [
    {
      title: "System",
      roles: model.systemRoles,
      type: "system" as const,
    },
    {
      title: "Templates",
      roles: model.templateRoles,
      type: "template" as const,
    },
    {
      title: "Custom",
      roles: model.customRoles,
      type: "custom" as const,
    },
  ];

  if (model.activeTab === "archived") {
    return (
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SectionHeader title="Archived roles" count={model.archivedRoles.length} />
        <div className={styles.cardsGrid}>
          {model.archivedRoles.map((role, index) => (
            <RoleCard
              key={role.id}
              role={role}
              index={index}
              type="custom"
              archived
              memberCount={model.getMemberCountForRole(role.id)}
              onClick={() => model.openRoleCard(role, "custom", index)}
              onRestore={() => model.openAction(role, "custom", "restore")}
              onDelete={() => model.openAction(role, "custom", "delete")}
            />
          ))}
        </div>
      </motion.section>
    );
  }

  return (
    <div className={styles.sections}>
      {activeSections.map((section, sectionIndex) => (
        <motion.section
          key={section.title}
          className={styles.section}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sectionIndex * 0.05, duration: 0.3 }}
        >
          <SectionHeader title={section.title} count={section.roles.length} />
          <div className={styles.cardsGrid}>
            {section.roles.map((role, index) => (
              <RoleCard
                key={role.id}
                role={role}
                index={index}
                type={section.type}
                memberCount={model.getMemberCountForRole(role.id)}
                onClick={() => model.openRoleCard(role, section.type, index)}
                onEdit={
                  section.type === "custom"
                    ? () => model.setFormState({ mode: "edit", role })
                    : undefined
                }
                onUse={
                  section.type === "template"
                    ? () => model.setFormState({ mode: "template", role })
                    : undefined
                }
                onArchive={
                  section.type === "custom"
                    ? () => model.openAction(role, section.type, "archive")
                    : undefined
                }
                onDelete={
                  section.type === "custom"
                    ? () => model.openAction(role, section.type, "delete")
                    : undefined
                }
                onSetDefault={
                  section.type === "custom"
                    ? () => model.toggleDefaultMutation.mutate(role)
                    : undefined
                }
              />
            ))}

            {section.type === "custom" ? (
              <motion.button
                type="button"
                className={styles.createCard}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                variants={{
                  rest: { y: 0 },
                  hover: { y: -3 },
                }}
                onClick={() => model.setFormState({ mode: "create", role: null })}
              >
                <motion.span
                  className={styles.createIcon}
                  variants={{
                    rest: { rotate: 0 },
                    hover: { rotate: 90 },
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Plus size={20} strokeWidth={2.6} />
                </motion.span>
                <strong>Create new role</strong>
                <span>Build a custom permission set for your team.</span>
              </motion.button>
            ) : null}
          </div>
        </motion.section>
      ))}
    </div>
  );
};

const SectionHeader = ({
  title,
  count,
}: {
  title: string;
  count: number;
}) => (
  <div className={styles.sectionHeader}>
    <span className={styles.sectionTitle}>{title}</span>
    <span className={styles.sectionLine} />
    <span className={styles.sectionBadge}>{count}</span>
  </div>
);
