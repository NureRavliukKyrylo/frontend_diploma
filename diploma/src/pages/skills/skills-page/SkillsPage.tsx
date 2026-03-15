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
    image: "https://picsum.photos/seed/communication/100/100",
  },
  {
    id: "2",
    name: "First Aid",
    image: "https://picsum.photos/seed/firstaid/100/100",
  },
  {
    id: "3",
    name: "Photography",
    image: "https://picsum.photos/seed/photography/100/100",
  },
  {
    id: "4",
    name: "Logistics Coordination",
    image: "https://picsum.photos/seed/logistics/100/100",
  },
  {
    id: "5",
    name: "Medical Assistance",
    image: "https://picsum.photos/seed/medical/100/100",
  },
  {
    id: "6",
    name: "Environmental Cleanup",
    image: "https://picsum.photos/seed/environmental/100/100",
  },
  {
    id: "7",
    name: "Event Planning",
    image: "https://picsum.photos/seed/events/100/100",
  },
  {
    id: "8",
    name: "Public Speaking",
    image: "https://picsum.photos/seed/speaking/100/100",
  },
  {
    id: "9",
    name: "Data Analysis",
    image: "https://picsum.photos/seed/data/100/100",
  },
  {
    id: "10",
    name: "Graphic Design",
    image: "https://picsum.photos/seed/design/100/100",
  },
];

export const SkillsPage = () => {
  const search = useSearch({ from: "/_masterLayout/skills/" });
  const navigate = useNavigate({ from: "/skills/" });
  const { data } = useQuery(skillsQuery.list(search));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePageChange = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, Page: page }) });
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

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
                    setSelectedSkillId(skill.id);
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
      {selectedSkillId && (
        <AssingSkillModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          skillId={selectedSkillId}
        />
      )}
    </div>
  );
};
