import type { createFileRoute } from "@tanstack/react-router";

type SearchMiddleware = NonNullable<
  NonNullable<
    NonNullable<Parameters<ReturnType<typeof createFileRoute>>[0]>["search"]
  >["middlewares"]
>[number];

type DefaultsMap = Record<string, Record<string, unknown>>;

export function createTabCleanerMiddleware<
  TDefaults extends DefaultsMap,
  TGlobalTab extends keyof TDefaults & string,
>(defaults: TDefaults, globalTab: TGlobalTab): SearchMiddleware {
  return ({ search, next }) => {
    const result = next(search);
    const tab = ((result.tab as string) ?? globalTab) as keyof TDefaults;
    const tabDefaults = defaults[tab] ?? {};

    return Object.fromEntries(
      Object.entries(result).filter(([key, value]) => {
        if (key === "tab") return value !== globalTab;
        return JSON.stringify(value) !== JSON.stringify(tabDefaults[key]);
      }),
    );
  };
}
