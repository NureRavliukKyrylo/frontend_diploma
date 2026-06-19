import { IndexLayout } from "@app/layouts";
import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout")({
  component: MasterLayoutComponent,
});

function MasterLayoutComponent() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const hidePlatformChrome =
    /^\/(?:faq|privacy|terms|terms-of-service|cookies)\/?$/.test(pathname);
  const hideFooter =
    hidePlatformChrome ||
    pathname === "/organizations/create" ||
    /^\/organizations\/[^/]+\/settings\/?$/.test(pathname) ||
    /^\/organizations\/[^/]+\/members\/?$/.test(pathname) ||
    /^\/organizations\/[^/]+\/roles\/?$/.test(pathname);

  return (
    <IndexLayout showHeader={!hidePlatformChrome} showFooter={!hideFooter}>
      <Outlet />
    </IndexLayout>
  );
}
