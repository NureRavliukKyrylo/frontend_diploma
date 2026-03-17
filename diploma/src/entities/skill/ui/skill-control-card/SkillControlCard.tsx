import type { Skill } from "@entities/skill/model";
import styles from "./SkillControlCard.module.scss";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { MoreActionsIcon } from "@shared/assets/icons/actions";
import type { SkillProfile } from "@entities/skill";

interface MenuItem {
  key: string;
  label: string;
  onClick: () => void;
  variant?: "assign" | "update" | "delete";
}

interface SkillControlCardProps<TSkill = Skill> {
  skill: TSkill;
  menuItems: MenuItem[];
}

export const SkillControlCard = <TSkill extends Skill | SkillProfile>({
  skill,
  menuItems,
}: SkillControlCardProps<TSkill>) => {
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
            <DropdownItem
              key={item.key}
              onClick={item.onClick}
              classNames={{
                base: `${styles.menuItem} ${styles[item.variant ?? "assign"]}`,
                title: styles.menuItemTitle,
              }}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <div className={styles.skillControlInfo}>
        <img src={skill.iconUrl} alt="skill-image" />
        <h1>{skill.name}</h1>
      </div>
    </div>
  );
};
