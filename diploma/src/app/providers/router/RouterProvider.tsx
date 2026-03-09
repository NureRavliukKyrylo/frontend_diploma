import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@app/routeTree.gen";
import { BaseSpinner } from "@shared/ui";
import { queryClient } from "@shared/libs";
import { useUserStore } from "@entities/user";
import "@entities/user/auth/api/refreshToken";

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
  defaultErrorComponent: ({ error }) => (
    <div className="flex flex-col justify-center items-center w-full min-h-screen gap-4">
      <p className="text-red-500">Something went wrong</p>
      <p className="text-sm text-gray-400">{error.message}</p>
    </div>
  ),
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
  const { isAuthenticated } = useUserStore();
  return (
    <RouterProvider
      router={router}
      context={{ auth: { isAuthenticated: isAuthenticated } }}
    />
  );
}
