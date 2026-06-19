import {
  ChatItem,
  chatQuery,
  MessageItem,
  messageQuery,
  relatedEntityTypeChatValues,
  SystemMessageItem,
} from "@entities/chat";
import { getFullName } from "@entities/user";
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  ChatSidebar,
  ChatsListWidget,
  MessagesListWidget,
} from "@widgets/chat";
import styles from "./ChatPage.module.scss";
import { Suspense } from "react";
import { DeleteMessageModal, MessageForm } from "@features/chat";
import { useChatPage } from "../model/useChatPage";
import { ReportModal } from "@features/moderation";
import { ModerationSubjectType } from "@entities/report";
import { useTranslation } from "react-i18next";

const participants = [
  {
    id: "22ce7e4d-63ff-425a-ad2e-40b2faada051",
    firstName: "Kyrylo",
    lastName: "Ravliuk",
    avatarUrl:
      "https://impactflowstorage2026.blob.core.windows.net/impactflow-public/avatars/22ce7e4d-63ff-425a-ad2e-40b2faada051.jpg",
    roleName: "Participant",
  },
  {
    id: "11ab2c3d-44ee-55ff-66aa-77bb88cc99dd",
    firstName: "Anna",
    lastName: "Kovalenko",
    avatarUrl: undefined,
    roleName: "Organizer",
  },
  {
    id: "99ff8e7d-12ab-34cd-56ef-78901234abcd",
    firstName: "Ivan",
    lastName: "Petrenko",
    avatarUrl:
      "https://impactflowstorage2026.blob.core.windows.net/impactflow-public/avatars/some-other-uuid.jpg",
    roleName: "Volunteer",
  },
];

export const ChatPage = () => {
  const {
    chatId,
    getMenuItems,
    handleClickChat,
    openId,
    search,
    setOpenId,
    user,
    clearModeType,
    mode,
  } = useChatPage();
  const { t } = useTranslation(["chat"]);

  return (
    <div className={styles.chatPageWrapper}>
      <div className={styles.chatsListWrapper}>
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
                <ChatItem chat={chat} />
              </div>
            )}
            useChatsQuery={(entityType) => {
              const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
                useSuspenseInfiniteQuery(
                  chatQuery.list({
                    ...search,
                    RelatedEntityType: entityType,
                  }),
                );
              return { data, hasNextPage, isFetchingNextPage, fetchNextPage };
            }}
            entityTypes={
              search.RelatedEntityType
                ? search.RelatedEntityType
                : relatedEntityTypeChatValues
            }
            className={styles.chatList}
          />
        </ChatSidebar>
      </div>
      <div className={styles.chatWrapper}>
        {chatId && (
          <div className={styles.wrapperExactChat}>
            <Suspense fallback={<div>Loading..</div>}>
              <MessagesListWidget
                useMessagesQuery={() => {
                  const { data: anchorPage } = useSuspenseQuery(
                    messageQuery.anchor(chatId, { pageSize: 30 }),
                  );
                  const {
                    data,
                    hasNextPage,
                    hasPreviousPage,
                    isFetchingNextPage,
                    isFetchingPreviousPage,
                    fetchNextPage,
                    fetchPreviousPage,
                  } = useSuspenseInfiniteQuery({
                    ...messageQuery.list(chatId, {
                      pageSize: 30,
                      page: anchorPage?.pagination.page,
                    }),
                    initialData: {
                      pages: [anchorPage],
                      pageParams: [anchorPage?.pagination.page],
                    },
                  });
                  return {
                    data,
                    hasNextPage,
                    hasPreviousPage,
                    isFetchingNextPage,
                    isFetchingPreviousPage,
                    fetchNextPage,
                    fetchPreviousPage,
                  };
                }}
                renderCard={(message) =>
                  message.isSystem ? (
                    <SystemMessageItem message={message} />
                  ) : (
                    <MessageItem
                      message={message}
                      menuItems={getMenuItems(message, t)}
                      openId={openId}
                      setOpenId={setOpenId}
                    />
                  )
                }
                className={styles.wrapperMessages}
                chatId={chatId}
              />
            </Suspense>
            <MessageForm
              replyToMessage={
                mode.reply.isActive
                  ? {
                      id: mode.reply.message!.id,
                      content: mode.reply.message!.message,
                      sender: getFullName(
                        mode.reply.message?.sender.firstName,
                        mode.reply.message?.sender.lastName,
                      ),
                    }
                  : null
              }
              editingMessage={
                mode.edit.isActive
                  ? {
                      id: mode.edit.message!.id,
                      content: mode.edit.message!.message,
                    }
                  : null
              }
              onCancel={() => {
                clearModeType("reply");
                clearModeType("edit");
              }}
              participants={participants}
              chatId={chatId}
            />
          </div>
        )}
      </div>
      {mode.report.message && (
        <ReportModal
          isOpen={mode.report.isActive}
          onClose={() => clearModeType("report")}
          subjectType={ModerationSubjectType.ChatMessage}
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
