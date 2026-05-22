import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ActionsIcon } from "@shared/assets/icons/actions";
import type { Project } from "../../../model";
import { ProjectCardBase } from "../base/ProjectCardBase";
import { ProjectDefaultBottomContent } from "../base/ProjectDefaultBottomContent";
import styles from "./ProjectControlCard.module.scss";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import { getEntityStatusConfig } from "@shared/libs/entity";
import type { MenuItem } from "@shared/config/types";

interface ProjectControlCardProps {
  project: Project;
  menuItems: MenuItem<"default" | "leave">[];
}

export const ProjectControlCard = ({
  project,
  menuItems,
}: ProjectControlCardProps) => {
  const statusConfig = getEntityStatusConfig(project.volunteerProjectState);

  return (
    <div
      className={`${styles.projectControlCardWrapper} ${styles[project.volunteerProjectState]}`}
    >
      <Dropdown
        placement="top-start"
        classNames={{ content: styles.dropdownContent }}
        shouldBlockScroll={false}
      >
        <DropdownTrigger>
          <button
            className={styles.moreActionsButton}
            onClick={(e) => e.stopPropagation()}
          >
            <ActionsIcon className={styles.actionsIcon} />
          </button>
        </DropdownTrigger>
        <DropdownMenu>
          {menuItems.map((item) => (
            <DropdownItem
              key={item.key}
              onClick={item.onClick}
              classNames={{
                base: `${styles.menuItem} ${styles[item.variant ?? "default"]}`,
                title: styles.menuItemTitle,
              }}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <ProjectCardBase
        project={project}
        topContent={
          <div
            className={styles.statusBadge}
            style={{ background: statusConfig.bg, color: statusConfig.color }}
          >
            <span className={styles.statusDot} />
            {statusConfig.label}
          </div>
        }
        bottomContent={
          <div className={styles.bottomProjectContent}>
            <div className={styles.defaultBottomContent}>
              <ProjectDefaultBottomContent project={project} />
            </div>
            <motion.div
              whileHover={{
                scale: 1.03,
                backgroundColor: "#000000",
                color: "#ffffff",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={styles.learnMoreMyProject}
            >
              <LinkButtonWrapper
                to="/projects/$id"
                params={{ id: project.id }}
                className={styles.btnLink}
              >
                Get Started
              </LinkButtonWrapper>
            </motion.div>
          </div>
        }
      />
    </div>
  );
};
