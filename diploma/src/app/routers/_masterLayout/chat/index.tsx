import { chatDefaults, chatSearchSchema } from "@entities/chat";
import { ChatPage } from "@pages/chat";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/chat/")({
  validateSearch: chatSearchSchema,
  search: { middlewares: [stripSearchParams(chatDefaults)] },
  component: ChatPage,
});
