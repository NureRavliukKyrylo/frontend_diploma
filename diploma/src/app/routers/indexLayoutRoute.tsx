import { rootRoute } from "./__root";
import { createRoute } from "@tanstack/react-router";
import { Header, Footer } from "@widgets/common";
import { Outlet } from "@tanstack/react-router";
import styles from "./indexLayout.module.scss";

export const indexLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "index-layout",
  component: () => (
    <>
      <Header />
      <main className={styles.layoutMain}>
        <Outlet />
      </main>
      <Footer />
    </>
  ),
});
