import type { Category } from "@entities/category";
import type { Event } from "@entities/event";
import type { Project } from "@entities/project";
import type { Task } from "@entities/task";
import type {
  CategoryAggregate,
  OrganizationCategoryActivityType,
  OrganizationCategoryCarouselItem,
} from "../model/categoryCarouselTypes";

type ActivityWithCategories = Pick<Project | Event | Task, "categories">;
type ActiveStatusActivity = Pick<Event | Task, "status" | "categories">;
type CategoryPreview = Pick<Category, "id" | "name" | "imageUrl">;
const CATEGORY_CARD_TONES = ["orange", "neutral", "red", "neutral"] as const;

const createCounts = (): Record<OrganizationCategoryActivityType, number> => ({
  projects: 0,
  events: 0,
  tasks: 0,
});

const ensureAggregate = (
  aggregates: Map<string, CategoryAggregate>,
  category: CategoryPreview,
) => {
  const existing = aggregates.get(category.id);

  if (existing) {
    existing.fallbackName ||= category.name || null;
    existing.fallbackImageSrc ||= category.imageUrl || null;
    return existing;
  }

  const aggregate: CategoryAggregate = {
    totalActivities: 0,
    activeActivities: 0,
    typeCounts: createCounts(),
    activeTypeCounts: createCounts(),
    fallbackName: category.name || null,
    fallbackImageSrc: category.imageUrl || null,
  };

  aggregates.set(category.id, aggregate);
  return aggregate;
};
const getUniqueCategories = (
  categories: ActivityWithCategories["categories"],
) => {
  const uniqueCategories = new Map<string, CategoryPreview>();

  if (!Array.isArray(categories)) {
    return [];
  }

  categories.forEach((category) => {
    if (category?.id && !uniqueCategories.has(category.id)) {
      uniqueCategories.set(category.id, {
        id: category.id,
        name: category.name,
        imageUrl: category.imageUrl,
      });
    }
  });

  return Array.from(uniqueCategories.values());
};
const registerActivities = (
  activities: ActivityWithCategories[],
  type: OrganizationCategoryActivityType,
  target: "total" | "active",
  aggregates: Map<string, CategoryAggregate>,
) => {
  activities.forEach((activity) => {
    getUniqueCategories(activity.categories).forEach((category) => {
      const aggregate = ensureAggregate(aggregates, category);
      aggregate[target === "total" ? "totalActivities" : "activeActivities"] += 1;
      aggregate[target === "total" ? "typeCounts" : "activeTypeCounts"][type] += 1;
    });
  });
};
export const filterActiveCategoryActivities = <
  TActivity extends ActiveStatusActivity,
>(
  activities: TActivity[],
) =>
  activities.filter(
    (activity) =>
      activity.status === "active" || activity.status === "endingSoon",
  );
export const aggregateCategoryActivities = ({
  projects,
  activeProjects,
  events,
  tasks,
}: {
  projects: Project[];
  activeProjects: Project[];
  events: Event[];
  tasks: Task[];
}) => {
  const aggregates = new Map<string, CategoryAggregate>();
  registerActivities(projects, "projects", "total", aggregates);
  registerActivities(events, "events", "total", aggregates);
  registerActivities(tasks, "tasks", "total", aggregates);
  registerActivities(activeProjects, "projects", "active", aggregates);
  registerActivities(
    filterActiveCategoryActivities(events),
    "events",
    "active",
    aggregates,
  );
  registerActivities(
    filterActiveCategoryActivities(tasks),
    "tasks",
    "active",
    aggregates,
  );
  return Array.from(aggregates.entries()).sort(([, left], [, right]) => {
    if (right.totalActivities !== left.totalActivities) {
      return right.totalActivities - left.totalActivities;
    }
    if (right.activeActivities !== left.activeActivities) {
      return right.activeActivities - left.activeActivities;
    }
    return (left.fallbackName ?? "").localeCompare(right.fallbackName ?? "");
  });
};
export const buildCategoryCarouselItems = (
  aggregates: Array<[string, CategoryAggregate]>,
  categoryDetails: Array<Category | null>,
  fallbackTitle: string,
): OrganizationCategoryCarouselItem[] =>
  aggregates.map(([id, aggregate], index) => ({
    id,
    title:
      categoryDetails[index]?.name ||
      aggregate.fallbackName ||
      fallbackTitle,
    imageSrc:
      categoryDetails[index]?.imageUrl || aggregate.fallbackImageSrc,
    totalActivities: aggregate.totalActivities,
    activeActivities: aggregate.activeActivities,
    typeCounts: aggregate.typeCounts,
    activeTypeCounts: aggregate.activeTypeCounts,
    tone: CATEGORY_CARD_TONES[index % CATEGORY_CARD_TONES.length],
  }));
