import { NotFoundPage } from "@pages/not-found";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  component: NotFoundPage,
});
