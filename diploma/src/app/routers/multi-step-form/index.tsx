import { FillingInfoFormPage } from "@pages/multi-step-filling-info";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/multi-step-form/")({
  component: FillingInfoFormPage,
});
