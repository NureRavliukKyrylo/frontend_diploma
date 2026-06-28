import { IndexLayout } from "@app/layouts";
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouterState,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/auth",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: MasterLayoutComponent,
});

function MasterLayoutComponent() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const hidePlatformChrome =
    /^\/(?:faq|privacy|terms|terms-of-service|cookies)\/?$/.test(pathname);
  const isChatRoute = /^\/chat(?:\/.*)?$/.test(pathname);
  const hideFooter =
    hidePlatformChrome ||
    pathname === "/organizations/create" ||
    /^\/organizations\/[^/]+\/settings\/?$/.test(pathname) ||
    /^\/organizations\/[^/]+\/members\/?$/.test(pathname) ||
    /^\/organizations\/[^/]+\/roles\/?$/.test(pathname) ||
    isChatRoute;

  return (
    <IndexLayout
      showHeader={!hidePlatformChrome}
      showFooter={!hideFooter}
      noFooterVariant={isChatRoute ? "fullscreen" : "content"}
    >
      <Outlet />
    </IndexLayout>
  );
}
