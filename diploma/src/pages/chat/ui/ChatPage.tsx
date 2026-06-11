import {
  ChatItem,
  chatQuery,
  MessageItem,
  messageQuery,
  relatedEntityTypeChatValues,
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
import { ChatInput } from "@features/chat";

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
          <>
            <MessagesListWidget
              useMessagesQuery={() => {
                const { data } = useSuspenseInfiniteQuery(
                  messageQuery.list(chatId, { pageSize: 50 }),
                );
                return { data };
              }}
              renderCard={(message) => <MessageItem message={message} />}
            />
            <ChatInput chatId={chatId} />
          </>
        )}
      </div>
    </div>
  );
};
