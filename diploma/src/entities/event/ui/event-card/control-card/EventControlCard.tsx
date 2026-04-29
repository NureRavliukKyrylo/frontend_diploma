import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ActionsIcon } from "@shared/assets/icons/actions";
import type { Event } from "../../../model";
import styles from "./EventControlCard.module.scss";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import { getEntityStatusConfig } from "@shared/libs/entity";
import type { MenuItem } from "@shared/config/types";
import { EventCardBase } from "../base-card/EventCardBase";
import { EventDefaultBottomContent } from "../base-card/EventDefaultBottomContent";

interface EventControlCardProps {
  event: Event;
  menuItems: MenuItem<"default" | "leave">[];
}

export const EventControlCard = ({
  event,
  menuItems,
}: EventControlCardProps) => {
  const statusConfig = getEntityStatusConfig(event.status);

  return (
    <div
      className={`${styles.eventControlCardWrapper} ${styles[event.status]}`}
    >
      <Dropdown placement="top-start" shouldBlockScroll={false}>
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
      <EventCardBase
        event={event}
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
          <div className={styles.bottomEventContent}>
            <EventDefaultBottomContent event={event} />

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
                to="/events/$id"
                params={{ id: event.id }}
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
