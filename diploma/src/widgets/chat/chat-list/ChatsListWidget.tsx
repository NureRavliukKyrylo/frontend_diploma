import styles from "./ChatsListWidget.module.scss";
import type { QueryResult } from "@shared/config/types";
import {
  ChatItemSkeleton,
  type Chat,
  type RelatedEntityTypeChatValue,
} from "@entities/chat";
import { Suspense, useCallback, useMemo, useState } from "react";
import { ChatSection } from "./ChatSection";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";
import { useTranslation } from "react-i18next";
import { ChatFolderRail } from "../chat-folder-rail/ui/ChatFolderRail";
import { useChatFolderRail } from "../chat-folder-rail/model/useChatFolderRail";

interface ChatsListWidgetProps {
  useChatsQuery: (entityType: RelatedEntityTypeChatValue) => QueryResult<Chat>;
  renderCard: (chat: Chat, index: number) => React.ReactNode;
  entityTypes: RelatedEntityTypeChatValue[];
  className?: string;
}

export const ChatsListWidget = ({
  useChatsQuery,
  renderCard,
  className,
  entityTypes,
}: ChatsListWidgetProps) => {
  const { t } = useTranslation(["chat", "common"]);
  const wrapperClass = `${styles.chatsWidgetBlock} ${className ?? ""}`.trim();
  const { activeType, setActiveType } = useChatFolderRail(entityTypes);
  const [counts, setCounts] = useState<
    Partial<Record<RelatedEntityTypeChatValue, number>>
  >({});

  const handleCountChange = useCallback(
    (entityType: RelatedEntityTypeChatValue, count: number) => {
      setCounts((prev) =>
        prev[entityType] === count ? prev : { ...prev, [entityType]: count },
      );
    },
    [],
  );

  const activeLabel = useMemo(
    () =>
      t(`chat:categories.${activeType}`, {
        defaultValue: activeType,
      }).toUpperCase(),
    [activeType, t],
  );

  const activeCount = counts[activeType] ?? 0;

  return (
    <div className={styles.wrapperListChats}>
      <ChatFolderRail
        entityTypes={entityTypes}
        activeType={activeType}
        onChange={setActiveType}
        counts={counts}
      />
      <div className={styles.activeFolderPanel}>
        <div className={styles.activeSectionHeader}>
          <span className={styles.activeSectionLabel}>{activeLabel}</span>
          <span className={styles.activeSectionCount}>
            {t("chat:labels.chatsCount", { count: activeCount })}
          </span>
        </div>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div className={styles.errorState}>
              <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
              <p className="errorHint">{t("common:errors.errorHint")}</p>
            </div>
          )}
        >
          <Suspense
            fallback={
              <ListWidgetSkeleton
                renderSkeleton={() => <ChatItemSkeleton />}
                items={5}
              />
            }
          >
            <ChatSection
              useChatsQuery={useChatsQuery}
              entityType={activeType}
              renderCard={renderCard}
              wrapperClass={wrapperClass}
              onCountChange={handleCountChange}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};
