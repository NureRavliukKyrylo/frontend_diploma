import { ChatPageSkeleton } from "@pages/chat";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_masterLayout/chat/")({
  pendingComponent: ChatPageSkeleton,
});
