import type { Skill } from "../../../model";
import styles from "./SkillControlCard.module.scss";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ActionsIcon } from "@shared/assets/icons/actions";
import type { SkillProfile } from "@entities/skill";
import { SkillCardBase } from "../base/SkillCardBase";
import type { MenuItem } from "@shared/config/types";
import { VerifiedIcon } from "@shared/assets/icons/info";

interface SkillControlCardProps<TSkill extends Skill | SkillProfile> {
  skill: TSkill;
  menuItems: MenuItem<"assign" | "update" | "delete">[];
  className?: string;
  bottomSlot?: (skill: TSkill) => React.ReactNode;
}

const isSkillProfile = (skill: Skill | SkillProfile): skill is SkillProfile =>
  "verified" in skill;

export const SkillControlCard = <TSkill extends Skill | SkillProfile>({
  skill,
  menuItems,
  bottomSlot,
  className,
}: SkillControlCardProps<TSkill>) => (
  <div className={`${styles.skillControlCardWrapper} ${className ?? ""}`}>
    {isSkillProfile(skill) && skill.verified && (
      <span title="Verified">
        <VerifiedIcon className={styles.verified} />
      </span>
    )}
    <Dropdown
      placement="top-start"
      shouldBlockScroll={false}
      classNames={{ content: styles.dropdownContent }}
    >
      <DropdownTrigger>
        <button className={styles.moreActionsButton}>
          <ActionsIcon className={styles.actionsIcon} />
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
    <SkillCardBase
      iconUrl={skill.iconUrl}
      name={skill.name}
      className={styles.skillControlInfo}
      bottomSlot={bottomSlot?.(skill)}
    />
  </div>
);
