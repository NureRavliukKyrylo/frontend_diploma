import {
  ChatItem,
  chatQuery,
  relatedEntityTypeChatValues,
  useChatChangedEvent,
} from "@entities/chat";
import { getFullName } from "@entities/user";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import {
  ChatContentWidget,
  ChatContentWidgetSkeleton,
  ChatSidebar,
  ChatsListWidget,
} from "@widgets/chat";
import styles from "./ChatPage.module.scss";
import { DeleteMessageModal } from "@features/chat";
import { useChatPage } from "../model/useChatPage";
import { ReportModal } from "@features/moderation";
import { ModerationSubjectType } from "@entities/report";
import { useMediaQuery } from "usehooks-ts";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import { Arrow } from "@shared/assets/icons/actions";
import { AnimatePresence, motion } from "framer-motion";
import { ChatMessagesSection } from "./ChatMessagesSection";
import { ChatEmptyState } from "./ChatEmptyState";
import { Suspense } from "react";

export const ChatPage = () => {
  const {
    chatId,
    handleClickChat,
    search,
    user,
    clearModeType,
    mode,
    getMenuItems,
    openId,
    setOpenId,
  } = useChatPage();
  const isMobile = useMediaQuery("(max-width: 850px)");
  const showList = !isMobile || !chatId;
  const showChat = !isMobile || !!chatId;
  useChatChangedEvent();

  return (
    <div className={styles.chatPageWrapper}>
      <AnimatePresence mode="popLayout">
        {showList && (
          <motion.div
            key="chats-list"
            className={styles.chatsListWrapper}
            initial={isMobile ? { opacity: 0, x: -24 } : false}
            animate={{ opacity: 1, x: 0 }}
            exit={isMobile ? { opacity: 0, x: -24 } : undefined}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          >
            <ChatSidebar
              avatarUrl={user.profile?.avatarUrl}
              initials={getFullName(user.firstName, user.lastName)}
            >
              <ChatsListWidget
                renderCard={(chat) => (
                  <div
                    className={styles.chatItemWrapper}
                    onClick={() => handleClickChat(chat.id)}
                  >
                    <ChatItem chat={chat} isActive={chat.id === chatId} />
                  </div>
                )}
                useChatsQuery={(entityType) => {
                  const {
                    data,
                    hasNextPage,
                    isFetchingNextPage,
                    fetchNextPage,
                  } = useSuspenseInfiniteQuery(
                    chatQuery.list({
                      ...search,
                      RelatedEntityType: entityType,
                    }),
                  );
                  return {
                    data,
                    hasNextPage,
                    isFetchingNextPage,
                    fetchNextPage,
                  };
                }}
                entityTypes={
                  search.RelatedEntityType
                    ? search.RelatedEntityType
                    : relatedEntityTypeChatValues
                }
                className={styles.chatList}
              />
            </ChatSidebar>
          </motion.div>
        )}

        {showChat && (
          <motion.div
            key="chat-content"
            className={styles.chatWrapper}
            initial={isMobile ? { opacity: 0, x: 24 } : false}
            animate={{ opacity: 1, x: 0 }}
            exit={isMobile ? { opacity: 0, x: 24 } : undefined}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          >
            {chatId ? (
              <Suspense fallback={<ChatContentWidgetSkeleton />}>
                <ChatContentWidget
                  chatId={chatId}
                  mode={mode}
                  onCancel={() => {
                    clearModeType("reply");
                    clearModeType("edit");
                  }}
                  leftContent={
                    isMobile && (
                      <LinkButtonWrapper
                        to="/chat"
                        className={styles.backToChats}
                      >
                        <motion.div
                          whileTap={{ scale: 0.85 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                          }}
                          className={styles.wrapper}
                        >
                          <Arrow className={styles.arrowIcon} />
                        </motion.div>
                      </LinkButtonWrapper>
                    )
                  }
                >
                  <ChatMessagesSection
                    chatId={chatId}
                    getMenuItems={getMenuItems}
                    openId={openId}
                    setOpenId={setOpenId}
                  />
                </ChatContentWidget>
              </Suspense>
            ) : (
              <ChatEmptyState />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {mode.report.message && (
        <ReportModal
          isOpen={mode.report.isActive}
          onClose={() => clearModeType("report")}
          subjectType={ModerationSubjectType.chatMessage}
          subjectId={mode.report.message.id}
        />
      )}
      {mode.delete.message && chatId && (
        <DeleteMessageModal
          isOpen={mode.delete.isActive}
          onClose={() => clearModeType("delete")}
          message={mode.delete.message}
          chatId={chatId}
        />
      )}
    </div>
  );
};
