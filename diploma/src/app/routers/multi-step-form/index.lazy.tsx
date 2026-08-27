import { FillingInfoFormPage } from "@pages/multi-step-filling-info";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/multi-step-form/")({
  component: FillingInfoFormPage,
});
