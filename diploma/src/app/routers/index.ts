import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { indexRoute } from "./indexRoute";

const routeTree = rootRoute.addChildren({
  indexRoute,
});

export const router = createRouter({ routeTree });
