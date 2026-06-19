import { BannedPage } from "@pages/banned";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/banned")({
  component: BannedPage,
});
