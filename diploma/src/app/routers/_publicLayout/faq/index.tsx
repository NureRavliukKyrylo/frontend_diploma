import { FaqPage } from "@pages/faq";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_publicLayout/faq/")({
  component: FaqPage,
});
