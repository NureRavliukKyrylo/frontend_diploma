import { TasksPage } from "@pages/tasks";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_masterLayout/tasks/")({
  component: TasksPage,
});
