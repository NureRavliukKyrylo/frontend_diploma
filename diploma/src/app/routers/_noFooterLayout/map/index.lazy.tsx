import { createLazyFileRoute } from "@tanstack/react-router";
import { MapPage } from "@pages/map";

export const Route = createLazyFileRoute("/_noFooterLayout/map/")({
  component: MapPage,
});
