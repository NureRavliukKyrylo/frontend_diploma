import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { MoreActionsIcon } from "@shared/assets/icons/actions";
import type { Project } from "@entities/project/model/types/Project";
import { ProjectCardBase } from "../base/ProjectCardBase";
import { ProjectDefaultBottomContent } from "../base/ProjectDefaultBottomContent";
import styles from "./ProjectControlCard.module.scss";

interface MenuItem {
  key: string;
  label: string;
  onClick: () => void;
  variant?: "default" | "leave";
}

interface ProjectControlCardProps {
  project: Project;
  menuItems: MenuItem[];
}

export const ProjectControlCard = ({
  project,
  menuItems,
}: ProjectControlCardProps) => (
  <div className={styles.projectControlCardWrapper}>
    <Dropdown placement="top-start" shouldBlockScroll={false}>
      <DropdownTrigger>
        <button
          className={styles.moreActionsButton}
          onClick={(e) => e.stopPropagation()}
        >
          <img src={MoreActionsIcon} alt="more-actions" />
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
      bottomContent={<ProjectDefaultBottomContent project={project} />}
    />
  </div>
);
