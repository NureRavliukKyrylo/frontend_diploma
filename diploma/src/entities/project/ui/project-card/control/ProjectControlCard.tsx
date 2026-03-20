import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { MoreActionsIcon } from "@shared/assets/icons/actions";
import type { AvatarItem } from "@shared/config/types";
import type { Project } from "@entities/project/model/types/Project";
import { ProjectCardBase } from "../base/ProjectCardBase";
import styles from "./ProjectControlCard.module.scss";

interface MenuItem {
  key: string;
  label: string;
  onClick: () => void;
  variant?: "default" | "delete";
}

interface ProjectControlCardProps {
  project: Project;
  avatars: AvatarItem[];
  menuItems: MenuItem[];
  className?: string;
}

export const ProjectControlCard = ({
  project,
  avatars,
  menuItems,
  className,
}: ProjectControlCardProps) => (
  <div className={`${styles.projectControlCardWrapper} ${className ?? ""}`}>
    <Dropdown placement="top-start" shouldBlockScroll={false}>
      <DropdownTrigger>
        <button className={styles.moreActionsButton}>
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
    <ProjectCardBase project={project} avatars={avatars} />
  </div>
);
