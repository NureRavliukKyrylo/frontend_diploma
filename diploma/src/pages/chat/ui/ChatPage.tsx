import {
  ChatItem,
  chatQuery,
  MessageItem,
  messageQuery,
  relatedEntityTypeChatValues,
  SystemMessageItem,
  type Message,
} from "@entities/chat";
import { getFullName } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ChatSidebar,
  ChatsListWidget,
  MessagesListWidget,
} from "@widgets/chat";
import styles from "./ChatPage.module.scss";
import { Suspense, useState } from "react";
import { MessageForm } from "@features/chat";
import type { MenuItem } from "@shared/config/types";

export const ChatPage = () => {
  const { chatId, ...search } = useSearch({ from: "/_masterLayout/chat/" });
  const { data: user } = useSuspenseQuery(profileQuery.all());
  const navigate = useNavigate({ from: "/chat/" });

  const [openId, setOpenId] = useState<string | null>(null);

  const getMenuItems = (
    message: Message,
  ): MenuItem<"default" | "edit" | "delete" | "reply" | "report">[] =>
    message.isMine
      ? [
          {
            key: "edit",
            label: "Edit",
            onClick: () => console.log(message),
            variant: "edit" as const,
          },
          {
            key: "delete",
            label: "Delete",
            onClick: () => console.log(message),
            variant: "delete" as const,
          },
          {
            key: "reply",
            label: "Reply",
            onClick: () => console.log(message),
            variant: "default" as const,
          },
        ]
      : [
          {
            key: "reply",
            label: "Reply",
            onClick: () => console.log(message),
            variant: "default" as const,
          },
          {
            key: "report",
            label: "Report",
            onClick: () => console.log(message),
            variant: "report" as const,
          },
        ];

  const handleClickChat = (chatId: string) => {
    navigate({
      search: (prev) => ({ ...prev, chatId: chatId }),
      resetScroll: false,
    });
  };

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
                    isFetchingNextPage,
                    fetchNextPage,
                  };
                }}
                renderCard={(message) =>
                  message.isSystem ? (
                    <SystemMessageItem message={message} />
                  ) : (
                    <MessageItem
                      message={message}
                      menuItems={getMenuItems(message)}
                      openId={openId}
                      setOpenId={setOpenId}
                    />
                  )
                }
                className={styles.wrapperMessages}
                chatId={chatId}
              />
              <MessageForm
                replyToMessage={{ id: "asdadas", content: "adadad" }}
                chatId={chatId}
              />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};
