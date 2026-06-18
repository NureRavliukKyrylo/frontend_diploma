import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@app/routeTree.gen";
import { BaseSpinner } from "@shared/ui";
import { queryClient } from "@shared/api";
import "@entities/user/auth/api/refreshToken";
import { getHttpErrorInfo } from "@shared/libs/error";
import { useTranslation } from "react-i18next";

const router = createRouter({
  routeTree,
  defaultPendingMs: 0,
  defaultPreload: "intent",
  defaultPreloadDelay: 300,
  defaultPendingComponent: () => (
    <div className="flex justify-center items-center w-full h-full min-h-screen">
      <BaseSpinner
        classNames={{
          svg: "w-5 h-5 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-18 lg:h-18 text-purple-400",
        }}
      />
    </div>
  ),
  defaultErrorComponent: ({ error }) => {
    const { t } = useTranslation("common");
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-screen gap-4">
        <p className="text-[#dc2626] font-extrabold text-4xl md:text-3xl sm:text-2xl leading-tight">
          {getHttpErrorInfo(error, t)}
        </p>

        <p className="text-gray-500 font-medium text-lg md:text-base max-w-md">
          {t("common:errors.errorHint")}
        </p>
      </div>
    );
  },
  context: {
    queryClient: queryClient,
    auth: undefined!,
  },
  scrollRestoration: true,
  scrollRestorationBehavior: "smooth",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function AppRouterProvider() {
  return <RouterProvider router={router} context={{ auth: {} }} />;
}
