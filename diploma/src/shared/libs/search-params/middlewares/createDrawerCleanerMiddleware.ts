import type { createFileRoute } from "@tanstack/react-router";

type SearchMiddleware = NonNullable<
  NonNullable<
    NonNullable<Parameters<ReturnType<typeof createFileRoute>>[0]>["search"]
  >["middlewares"]
>[number];

interface DrawerCleanerOptions<TModeKey extends string> {
  idKey: string;
  modeKey: string;
  drawerKeys: string[];
  modeDefaults: Record<string, Record<string, unknown>>;
  fallbackMode: TModeKey;
}

export function createDrawerCleanerMiddleware<TModeKey extends string>(
  options: DrawerCleanerOptions<TModeKey>,
): SearchMiddleware {
  const { idKey, modeKey, drawerKeys, modeDefaults, fallbackMode } = options;

  return ({ search, next }) => {
    const result = next(search);
    const id = result[idKey] as string | undefined;

    if (!id) {
      return Object.fromEntries(
        Object.entries(result).filter(([key]) => !drawerKeys.includes(key)),
      );
    }

    const mode = (result[modeKey] as TModeKey) ?? fallbackMode;
    const currentModeDefaults = modeDefaults[mode] ?? {};

    return Object.fromEntries(
      Object.entries(result).filter(([key, value]) => {
        if (key === idKey) return true;
        if (key === modeKey) return value !== fallbackMode;
        return (
          JSON.stringify(value) !== JSON.stringify(currentModeDefaults[key])
        );
      }),
    );
  };
}
