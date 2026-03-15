import { useNavigate, useSearch } from "@tanstack/react-router";
import styles from "./SkillsPage.module.scss";
import { SearchBar } from "@shared/ui/inputs";
import { sortingItems } from "./config/sortingItems";
import { SortDropDown } from "@shared/ui/drop-down";
import { SkillsListWidget } from "@widgets/skills";
import {
  SkillControlCard,
  skillsQuery,
  useSkillsListQuery,
  type Skill,
} from "@entities/skill";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "@shared/ui";
import { DropdownItem } from "@heroui/react";
import { AssingSkillModal } from "@features/skills";
import { useState } from "react";

export const mockSkills: Skill[] = [
  {
    id: "1",
    name: "Communication",
    description:
      "The ability to convey information clearly and effectively across different audiences and formats.",
    image: "https://picsum.photos/seed/communication/100/100",
    categoryIds: [{ id: "cat-1", name: "Soft Skills" }],
  },
  {
    id: "2",
    name: "First Aid",
    description:
      "Knowledge of emergency medical procedures to provide immediate care before professional help arrives.",
    image: "https://picsum.photos/seed/firstaid/100/100",
    categoryIds: [{ id: "cat-2", name: "Health & Safety" }],
  },
  {
    id: "3",
    name: "Photography",
    description:
      "The skill of capturing compelling images through composition, lighting, and technical camera knowledge.",
    image: "https://picsum.photos/seed/photography/100/100",
    categoryIds: [{ id: "cat-3", name: "Creative Arts" }],
  },
  {
    id: "4",
    name: "Logistics Coordination",
    description:
      "Planning and managing the flow of resources, people, and materials to ensure smooth operations.",
    image: "https://picsum.photos/seed/logistics/100/100",
    categoryIds: [{ id: "cat-4", name: "Operations" }],
  },
  {
    id: "5",
    name: "Medical Assistance",
    description:
      "Supporting healthcare professionals in delivering patient care and managing medical procedures.",
    image: "https://picsum.photos/seed/medical/100/100",
    categoryIds: [
      { id: "cat-2", name: "Health & Safety" },
      { id: "cat-6", name: "Technology" },
    ],
  },
  {
    id: "6",
    name: "Environmental Cleanup",
    description:
      "Organizing and executing activities to restore and maintain the cleanliness of natural environments.",
    image: "https://picsum.photos/seed/environmental/100/100",
    categoryIds: [{ id: "cat-5", name: "Environment" }],
  },
  {
    id: "7",
    name: "Event Planning",
    description:
      "Coordinating all aspects of events from concept to execution, ensuring seamless experiences.",
    image: "https://picsum.photos/seed/events/100/100",
    categoryIds: [
      { id: "cat-4", name: "Operations" },
      { id: "cat-1", name: "Soft Skills" },
    ],
  },
  {
    id: "8",
    name: "Public Speaking",
    description:
      "Delivering engaging and persuasive presentations to audiences of any size with confidence.",
    image: "https://picsum.photos/seed/speaking/100/100",
    categoryIds: [{ id: "cat-1", name: "Soft Skills" }],
  },
  {
    id: "9",
    name: "Data Analysis",
    description:
      "Interpreting complex datasets to extract actionable insights and support data-driven decisions.",
    image: "https://picsum.photos/seed/data/100/100",
    categoryIds: [{ id: "cat-6", name: "Technology" }],
  },
  {
    id: "10",
    name: "Graphic Design",
    description:
      "Creating visual content to communicate messages through typography, imagery, and layout.",
    image: "https://picsum.photos/seed/design/100/100",
    categoryIds: [
      { id: "cat-3", name: "Creative Arts" },
      { id: "cat-6", name: "Technology" },
    ],
  },
];

export const SkillsPage = () => {
  const search = useSearch({ from: "/_masterLayout/skills/" });
  const navigate = useNavigate({ from: "/skills/" });
  const { data } = useQuery(skillsQuery.list(search));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePageChange = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, Page: page }) });
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <div className={styles.skillsPageWrapper}>
      <div className={styles.skillsPageHeader}>
        <h1 className={styles.titleSkillsPage}>Create with your persona</h1>
        <div className={styles.filterControlBlock}>
          <SearchBar
            value={search.Search}
            variant="projects"
            onChange={(value) => {
              navigate({
                search: (prev) => ({
                  ...prev,
                  Search: value || undefined,
                  Page: 1,
                }),
              });
            }}
          />
          <SortDropDown
            options={sortingItems}
            onSelect={(value) => {
              navigate({
                search: (prev) => ({
                  ...prev,
                  OrderBy: value,
                  Page: 1,
                }),
              });
            }}
            value={search.OrderBy ?? "Default"}
          />
        </div>
      </div>
      <div className={styles.pageSkillsMainContent}>
        <h1 className={styles.skillStats}>
          Skills {data?.pagination.totalCount}
        </h1>
        <SkillsListWidget
          renderCard={(skill) => (
            <SkillControlCard
              skill={skill}
              menuItems={[
                {
                  key: "assign",
                  label: "Assign skill",
                  onClick: () => {
                    setIsModalOpen(true);
                    setSelectedSkill(skill);
                  },
                },
              ]}
            />
          )}
          className={styles.skillsListWrapper}
          skills={mockSkills}
        />
      </div>
      <div className={styles.paginationWrapper}>
        {data && data.pagination.totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              total={data.pagination.totalPages}
              page={search.Page}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
      {selectedSkill && (
        <AssingSkillModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          skill={selectedSkill}
        />
      )}
    </div>
  );
};
