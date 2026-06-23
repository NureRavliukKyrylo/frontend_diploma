import {
  chatDefaults,
  chatQuery,
  chatSearchSchema,
  messageQuery,
  relatedEntityTypeChatValues,
} from "@entities/chat";
import { ChatPage } from "@pages/chat";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/chat/")({
  validateSearch: chatSearchSchema,
  search: { middlewares: [stripSearchParams(chatDefaults)] },
  component: ChatPage,
  loader: async ({ context: { queryClient }, location }) => {
    const { chatId, ...search } = chatSearchSchema.parse(location.search);

    const promises: Promise<unknown>[] = [
      ...relatedEntityTypeChatValues.map((entityType) =>
        queryClient.ensureInfiniteQueryData(
          chatQuery.list({ ...search, RelatedEntityType: entityType }),
        ),
      ),
    ];

    if (chatId) {
      const anchorData = await queryClient.ensureQueryData(
        messageQuery.anchor(chatId, { pageSize: 40 }),
      );

      const page =
        anchorData?.pagination.firstUnreadPage ??
        anchorData?.pagination.totalPages;

      const queryOptions = messageQuery.list(chatId, { pageSize: 40, page });
      await queryClient.ensureInfiniteQueryData(queryOptions);
    }
    await Promise.all(promises);
  },
});
