import { Avatar } from "@shared/ui";
import styles from "./ChatSidebar.module.scss";
import { SearchBar } from "@shared/ui/inputs";
import { useChatSidebar } from "../model/useChatSidebar";
import { FilterIcon } from "@shared/assets/icons/actions";
import { useRef, useState } from "react";
import { relatedEntityTypeChatValues } from "@entities/chat";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useOutsideClick } from "@shared/libs/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ChatSidebarProps {
  avatarUrl?: string;
  children: React.ReactNode;
  initials?: string;
}

export const ChatSidebar = ({
  children,
  initials,
  avatarUrl,
}: ChatSidebarProps) => {
  const { t } = useTranslation(["chat"]);
  const { search, onSearchChange, onChatTypeChange } = useChatSidebar();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLButtonElement>(null);

  useOutsideClick([popoverRef, filterRef], () => setIsPopoverOpen(false));

  const selectedTypes = search.RelatedEntityType ?? [];

  return (
    <>
      <div className={styles.headerContent}>
        <div className={styles.leftContent}>
          <div className={styles.avatarSearch}>
            <Avatar
              className={styles.avatarHeader}
              fallback={initials}
              src={avatarUrl}
            />
            <SearchBar
              onChange={onSearchChange}
              value={search.Search}
              variant="chat"
            />
          </div>
          <div className={styles.filterWrapper}>
            <motion.button
              ref={filterRef}
              className={styles.filterButton}
              onClick={() => setIsPopoverOpen((p) => !p)}
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <motion.div
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <FilterIcon className={styles.filterIcon} />
              </motion.div>
              <AnimatePresence>
                {selectedTypes.length > 0 && (
                  <motion.span
                    className={styles.filterBadge}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {selectedTypes.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <AnimatePresence>
              {isPopoverOpen && (
                <motion.div
                  ref={popoverRef}
                  className={styles.popover}
                  initial={{ opacity: 0, scale: 0.92, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -6 }}
                  transition={{ type: "spring", stiffness: 340, damping: 24 }}
                  style={{ originX: 1, originY: 0 }}
                >
                  {relatedEntityTypeChatValues.map((type, i) => (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <BaseButtonWrapper
                        className={`${styles.popoverItem} ${selectedTypes.includes(type) ? styles.selected : ""}`}
                        onClick={() => onChatTypeChange(type)}
                      >
                        {t(`chat:categories.${type}`, { defaultValue: type })}
                      </BaseButtonWrapper>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};
