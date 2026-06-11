import styles from "./ChatsListWidget.module.scss";
import type { QueryResult } from "@shared/config/types";
import {
  ChatItemSkeleton,
  type Chat,
  type RelatedEntityTypeChatValue,
} from "@entities/chat";
import { Accordion, AccordionItem } from "@heroui/react";
import { capitalize } from "@shared/libs/text";
import { Suspense } from "react";
import { ChatSection } from "./ChatSection";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";

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
  const wrapperClass =
    `${styles.categoriesWidgetBlock} ${className ?? ""}`.trim();

  return (
    <div className={styles.wrapperListChats}>
      <Accordion
        selectionMode="multiple"
        motionProps={{
          initial: { opacity: 0, y: -4 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -4 },
          transition: { duration: 0.18, ease: "easeInOut" },
        }}
        itemClasses={{
          title: styles.title,
          base: styles.base,
          indicator: styles.indicator,
          trigger: styles.trigger,
          content: styles.content,
          heading: styles.heading,
        }}
        className={styles.accordionWrapper}
        defaultExpandedKeys={entityTypes}
      >
        {entityTypes.map((entityType) => (
          <AccordionItem key={entityType} title={capitalize(entityType)}>
            <ErrorBoundary
              fallbackRender={({ error }) => (
                <div className={styles.errorState}>
                  <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
                  <p className="errorHint">
                    Try reloading the page or come back later.
                  </p>
                </div>
              )}
            >
              <Suspense
                fallback={
                  <ListWidgetSkeleton
                    renderSkeleton={() => <ChatItemSkeleton />}
                  />
                }
              >
                <ChatSection
                  useChatsQuery={useChatsQuery}
                  entityType={entityType}
                  renderCard={renderCard}
                  wrapperClass={wrapperClass}
                />
              </Suspense>
            </ErrorBoundary>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
