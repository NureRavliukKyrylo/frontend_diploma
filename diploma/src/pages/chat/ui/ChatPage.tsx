import {
  ChatItem,
  chatQuery,
  MessageItem,
  messageQuery,
  relatedEntityTypeChatValues,
  SystemMessageItem,
} from "@entities/chat";
import { getFullName } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import {
  useQuery,
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
import { ChatInput } from "@features/chat";
import { Suspense } from "react";

export const ChatPage = () => {
  const { chatId, ...search } = useSearch({ from: "/_masterLayout/chat/" });
  const { data: user } = useSuspenseQuery(profileQuery.all());
  const navigate = useNavigate({ from: "/chat/" });

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
                    <MessageItem message={message} />
                  )
                }
                className={styles.wrapperMessages}
                chatId={chatId}
              />
              <ChatInput chatId={chatId} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};
