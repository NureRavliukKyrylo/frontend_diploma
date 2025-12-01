import { CategoryDetailWidget } from "@widgets/categories";
import { useParams } from "@tanstack/react-router";
import { categoryDetailRoute } from "@app/routers/categories/$name";

export function CategoryDetailPage() {
  const { categoryName } = useParams({ from: categoryDetailRoute.id });

  const demoCategory = {
    imageCategory: "https://placehold.co/600x300",
    titleCategory: categoryName,
    descriptionCategory:
      "Projects focused on psychological well-being, emotional balance, and building a culture of mutual support. This category includes initiatives that provide psychological assistance, raise awareness about mental health, prevent stress, and create safe spaces for open communication.",
    allProjects: 32,
    activeProjects: 7,
    completedProjects: 25,
    skills: [
      { name: "Communication" },
      { name: "Empathy" },
      { name: "Conflict Resolution" },
      { name: "Stress Management" },
      { name: "Teamwork" },
      { name: "Critical Thinking" },
      { name: "Leadership" },
      { name: "Emotional Intelligence" },
      { name: "Active Listening" },
      { name: "Problem Solving" },
    ],
  };

  return (
    <CategoryDetailWidget
      imageCategory={demoCategory.imageCategory}
      titleCategory={demoCategory.titleCategory}
      descriptionCategory={demoCategory.descriptionCategory}
      allProjects={demoCategory.allProjects}
      activeProjects={demoCategory.activeProjects}
      completedProjects={demoCategory.completedProjects}
      skills={demoCategory.skills}
    />
  );
}
