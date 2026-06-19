import { FaqPage } from "@pages/faq";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/faq/")({
  component: FaqPage,
});
