import { rootRoute } from "./__root";
import { createRoute } from "@tanstack/react-router";
import { Footer, Header } from "@widgets/common";
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <>
      <Header />
      <Footer />
    </>
  ),
});
