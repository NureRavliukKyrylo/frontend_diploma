import { CategoryDetailWidget } from "@widgets/categories";
import { FilterButton } from "@shared/ui/buttons";

export function CategoryDetailPage() {
  return (
    <>
      <CategoryDetailWidget
        imageCategory={demoCategory.imageCategory}
        titleCategory={demoCategory.titleCategory}
        descriptionCategory={demoCategory.descriptionCategory}
        allProjects={demoCategory.allProjects}
        activeProjects={demoCategory.activeProjects}
        completedProjects={demoCategory.completedProjects}
        skills={demoCategory.skills}
      />
      <FilterButton>hi</FilterButton>
    </>
  );
}
