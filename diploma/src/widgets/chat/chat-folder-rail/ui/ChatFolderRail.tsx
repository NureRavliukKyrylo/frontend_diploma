import type { RelatedEntityTypeChatValue } from "@entities/chat";
import {
  Building2,
  CalendarDays,
  CheckSquare,
  FolderKanban,
  MessageCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./ChatFolderRail.module.scss";

interface ChatFolderRailProps {
  entityTypes: RelatedEntityTypeChatValue[];
  activeType: RelatedEntityTypeChatValue;
  onChange: (type: RelatedEntityTypeChatValue) => void;
  counts: Partial<Record<RelatedEntityTypeChatValue, number>>;
}

const folderIcons = {
  event: CalendarDays,
  private: MessageCircle,
  task: CheckSquare,
  project: FolderKanban,
  organization: Building2,
} satisfies Record<RelatedEntityTypeChatValue, typeof CalendarDays>;

export const ChatFolderRail = ({
  entityTypes,
  activeType,
  onChange,
  counts,
}: ChatFolderRailProps) => {
  const { t } = useTranslation(["chat"]);

  return (
    <nav className={styles.rail} aria-label="Chat folders">
      {entityTypes.map((type) => {
        const Icon = folderIcons[type];
        const isActive = type === activeType;
        const count = counts[type] ?? 0;

        return (
          <button
            key={type}
            type="button"
            className={`${styles.folderButton} ${isActive ? styles.folderButtonActive : ""}`}
            onClick={() => onChange(type)}
          >
            <Icon
              className={`${styles.folderIcon} ${isActive ? styles.folderIconActive : ""}`}
              strokeWidth={2.2}
              aria-hidden="true"
            />
            <span
              className={`${styles.folderLabel} ${isActive ? styles.folderLabelActive : ""}`}
            >
              {t(`chat:categories.${type}`, { defaultValue: type })}
            </span>
            {count > 0 && (
              <span className={styles.folderBadge}>
                {count >= 100 ? "99+" : count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
