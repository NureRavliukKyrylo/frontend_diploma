import {
  BadgeCard,
  BadgeCardDetailed,
  TierColors,
  type Badge,
} from "@entities/badge";
import { render, screen } from "@testing-library/react";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "badge:labels.rank": "RANK",
      };
      return translations[key] || key;
    },
  }),
}));

const makeBadge = (overrides: Partial<Badge> = {}): Badge => ({
  id: "1",
  title: "Test Badge",
  iconUrl: "https://example.com/icon.png",
  description: "Test description",
  rank: { value: 7, name: "S" },
  awardedCountTotal: 100,
  firstAwardedAt: "2024-01-01",
  isUnlocked: true,
  progressPercent: 100,
  ruleProgress: [],
  scopeEntityType: "project",
  scopeEntityId: "123",
  ...overrides,
});

describe("BadgeCard", () => {
  it("renders rank name", () => {
    render(<BadgeCard badge={makeBadge()} />);
    expect(screen.getByText("S")).toBeInTheDocument();
  });

  it("applies correct tier color for S rank", () => {
    render(<BadgeCard badge={makeBadge({ rank: { value: 7, name: "S" } })} />);
    const tierEl = screen.getByText("S").closest("div");
    expect(tierEl).toHaveStyle({ color: TierColors["S"] });
  });

  it("applies correct tier color for F rank", () => {
    render(<BadgeCard badge={makeBadge({ rank: { value: 1, name: "F" } })} />);
    const tierEl = screen.getByText("F").closest("div");
    expect(tierEl).toHaveStyle({ color: TierColors["F"] });
  });

  it("does not render locked overlay when unlocked", () => {
    render(<BadgeCard badge={makeBadge({ isUnlocked: true })} />);
    expect(screen.queryByTestId("locked-overlay")).not.toBeInTheDocument();
  });

  it("renders locked overlay when locked", () => {
    render(<BadgeCard badge={makeBadge({ isUnlocked: false })} />);
    expect(
      document.querySelector('[class*="lockedOverlay"]'),
    ).toBeInTheDocument();
  });

  it("does not apply locked class when unlocked", () => {
    const { container } = render(
      <BadgeCard badge={makeBadge({ isUnlocked: true })} />,
    );
    expect(container.firstChild).not.toHaveClass("locked");
  });
});

describe("BadgeCardDetailed", () => {
  it("renders badge title", () => {
    render(<BadgeCardDetailed badge={makeBadge({ title: "Hero Badge" })} />);
    expect(screen.getByText("Hero Badge")).toBeInTheDocument();
  });

  it("renders rank label with correct color", () => {
    render(
      <BadgeCardDetailed
        badge={makeBadge({ rank: { value: 6, name: "A" } })}
      />,
    );

    const rankLabelEl = screen.getByText("RANK");
    expect(rankLabelEl).toHaveStyle({ color: TierColors["A"] });

    const rankLetterEl = screen.getByText("A");
    expect(rankLetterEl.parentElement).toHaveStyle({ color: TierColors["A"] });
  });

  it("renders without onClick as plain div", () => {
    const { container } = render(<BadgeCardDetailed badge={makeBadge()} />);
    expect(
      container.querySelector('[class*="badgeCardWrapper"]'),
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<BadgeCardDetailed badge={makeBadge()} onClick={handleClick} />);
    const wrapper = document.querySelector('[class*="interactive"]')!;
    wrapper.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
