import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetailPage } from "@pages/categories";
import { z } from "zod";

const categorySearchSchema = z.object({
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  categories: z.array(z.string()).optional().catch([]),
  organizations: z.array(z.string()).optional().catch([]),
  distance: z.number().optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
});

export type CategorySearchParams = z.infer<typeof categorySearchSchema>;

export const Route = createFileRoute("/_masterLayout/categories/$name/")({
  component: CategoryDetailPageWrapper,
  validateSearch: (search) => categorySearchSchema.parse(search),
});

function CategoryDetailPageWrapper() {
  const { name } = Route.useParams();
  const search = Route.useSearch();

  return <CategoryDetailPage categoryName={name} />;
}
