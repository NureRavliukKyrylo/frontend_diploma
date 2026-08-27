import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  SkillControlCard,
  type Skill,
  type SkillProfile,
} from "@entities/skill";
import type { MenuItem } from "@shared/config/types";

vi.mock("@heroui/react");

vi.mock("@shared/assets/icons/actions", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    ActionsIcon: () => <span data-testid="actions-icon" />,
  };
});

vi.mock("@shared/assets/icons/info", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    VerifiedIcon: ({ className }: { className?: string }) => (
      <span data-testid="verified-icon" className={className} />
    ),
  };
});

const makeSkill = (overrides: Partial<Skill> = {}): Skill => ({
  id: "skill-1",
  name: "First Aid",
  iconUrl: "https://example.com/first-aid.png",
  description: "Basic first aid and emergency response",
  categories: [],
  level: "beginner",
  ...overrides,
});

const makeSkillProfile = (
  overrides: Partial<SkillProfile> = {},
): SkillProfile => ({
  skillId: "skill-1",
  name: "First Aid",
  iconUrl: "https://example.com/first-aid.png",
  description: "Basic first aid and emergency response",
  categories: [],
  level: "beginner",
  verified: false,
  ...overrides,
});

const makeMenuItems = (): MenuItem<"assign" | "update" | "delete">[] => [
  { key: "assign", label: "Assign", onClick: vi.fn(), variant: "assign" },
  { key: "update", label: "Update", onClick: vi.fn(), variant: "update" },
  { key: "delete", label: "Delete", onClick: vi.fn(), variant: "delete" },
];

describe("SkillControlCard", () => {
  it("renders skill name", () => {
    render(
      <SkillControlCard skill={makeSkill()} menuItems={makeMenuItems()} />,
    );
    expect(screen.getByText("First Aid")).toBeInTheDocument();
  });

  it("renders skill icon", () => {
    render(
      <SkillControlCard skill={makeSkill()} menuItems={makeMenuItems()} />,
    );
    expect(screen.getByAltText("First Aid")).toHaveAttribute(
      "src",
      "https://example.com/first-aid.png",
    );
  });

  it("renders actions icon button", () => {
    render(
      <SkillControlCard skill={makeSkill()} menuItems={makeMenuItems()} />,
    );
    expect(screen.getByTestId("actions-icon")).toBeInTheDocument();
  });

  it("renders all menu items", () => {
    render(
      <SkillControlCard skill={makeSkill()} menuItems={makeMenuItems()} />,
    );
    expect(screen.getByText("Assign")).toBeInTheDocument();
    expect(screen.getByText("Update")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls menu item onClick when clicked", async () => {
    const user = userEvent.setup();
    const items = makeMenuItems();
    render(<SkillControlCard skill={makeSkill()} menuItems={items} />);
    await user.click(screen.getByText("Assign"));
    expect(items[0].onClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const { container } = render(
      <SkillControlCard
        skill={makeSkill()}
        menuItems={makeMenuItems()}
        className="custom-class"
      />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders bottomSlot when provided", () => {
    render(
      <SkillControlCard
        skill={makeSkill()}
        menuItems={makeMenuItems()}
        bottomSlot={() => <span>Level: intermediate</span>}
      />,
    );
    expect(screen.getByText("Level: intermediate")).toBeInTheDocument();
  });

  it("passes skill to bottomSlot", () => {
    const skill = makeSkill({ level: "advanced" });
    render(
      <SkillControlCard
        skill={skill}
        menuItems={makeMenuItems()}
        bottomSlot={(s) => <span>{s.level}</span>}
      />,
    );
    expect(screen.getByText("advanced")).toBeInTheDocument();
  });

  describe("with plain Skill", () => {
    it("does not render verified icon", () => {
      render(
        <SkillControlCard skill={makeSkill()} menuItems={makeMenuItems()} />,
      );
      expect(screen.queryByTestId("verified-icon")).not.toBeInTheDocument();
    });
  });

  describe("with SkillProfile", () => {
    it("does not render verified icon when verified is false", () => {
      render(
        <SkillControlCard
          skill={makeSkillProfile({ verified: false })}
          menuItems={makeMenuItems()}
        />,
      );
      expect(screen.queryByTestId("verified-icon")).not.toBeInTheDocument();
    });

    it("renders verified icon when verified is true", () => {
      render(
        <SkillControlCard
          skill={makeSkillProfile({ verified: true })}
          menuItems={makeMenuItems()}
        />,
      );
      expect(screen.getByTestId("verified-icon")).toBeInTheDocument();
    });

    it("renders verified icon with correct title", () => {
      render(
        <SkillControlCard
          skill={makeSkillProfile({ verified: true })}
          menuItems={makeMenuItems()}
        />,
      );
      expect(screen.getByTitle("Verified")).toBeInTheDocument();
    });
  });
});
