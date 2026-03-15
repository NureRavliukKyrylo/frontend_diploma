import type { Skill } from "@entities/skill/model";
import styles from "./SkillControlCard.module.scss";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { MoreActionsIcon } from "@shared/assets/icons/actions";

interface MenuItem {
  key: string;
  label: string;
  onClick: () => void;
}

interface SkillControlCardProps {
  skill: Skill;
  menuItems: MenuItem[];
}

export const SkillControlCard = ({
  skill,
  menuItems,
}: SkillControlCardProps) => {
  return (
    <div className={styles.skilControlCardWrapper}>
      <Dropdown placement="top-start" shouldBlockScroll={false}>
        <DropdownTrigger>
          <button className={styles.moreActionsButton}>
            <img src={MoreActionsIcon} alt="more-actions" />
          </button>
        </DropdownTrigger>
        <DropdownMenu>
          {menuItems.map((item) => (
            <DropdownItem key={item.key} onClick={item.onClick}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <div className={styles.skillControlInfo}>
        <img src={skill.image} alt="skill-image" />
        <h1>{skill.name}</h1>
      </div>
    </div>
  );
};
