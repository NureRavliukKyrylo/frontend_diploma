import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MentionButton } from "@features/chat/message-form/ui/mention-button/MentionButton";

vi.mock("@entities/user", () => ({
  getFullName: (first: string, last: string) => `${first} ${last}`,
}));

vi.mock("@shared/config/constants", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    getMentionColor: () => "#ccc",
  };
});

vi.mock("@shared/ui", () => ({
  Avatar: () => <span data-testid="avatar" />,
}));

vi.mock("@shared/libs/hooks", () => ({
  useOutsideClick: vi.fn(),
}));

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get:
        (_target, tag) =>
        ({ children, ...props }: any) => {
          const Tag = tag as string;
          return <Tag {...props}>{children}</Tag>;
        },
    },
  ),
  AnimatePresence: ({ children }: any) => children ?? null,
}));

vi.mock("@shared/assets/icons/actions", () => ({
  MentionIcon: () => <span data-testid="mention-icon" />,
}));

const participants = [
  { id: "u1", firstName: "Alice", lastName: "Smith", roleName: "Member" },
  { id: "u2", firstName: "Bob", lastName: "Jones", roleName: "Admin" },
];

const getToggleBtn = () =>
  screen.getByTestId("mention-icon").closest("button")!;

const getNameEl = (name: string) =>
  screen.getAllByText(name).find((el) => el.className === "name")!;

describe("MentionButton", () => {
  it("renders the trigger button", () => {
    render(
      <MentionButton
        participants={participants}
        mentionIds={[]}
        onToggle={vi.fn()}
      />,
    );
    expect(getToggleBtn()).toBeInTheDocument();
  });

  it("popover is hidden initially", () => {
    render(
      <MentionButton
        participants={participants}
        mentionIds={[]}
        onToggle={vi.fn()}
      />,
    );
    expect(screen.queryByText("Alice Smith")).not.toBeInTheDocument();
  });

  it("opens popover and lists participants", async () => {
    const user = userEvent.setup();
    render(
      <MentionButton
        participants={participants}
        mentionIds={[]}
        onToggle={vi.fn()}
      />,
    );
    await user.click(getToggleBtn());
    expect(getNameEl("Alice Smith")).toBeInTheDocument();
    expect(getNameEl("Bob Jones")).toBeInTheDocument();
  });

  it("shows roles in popover", async () => {
    const user = userEvent.setup();
    render(
      <MentionButton
        participants={participants}
        mentionIds={[]}
        onToggle={vi.fn()}
      />,
    );
    await user.click(getToggleBtn());
    expect(screen.getByText("Member")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("shows empty state when no participants", async () => {
    const user = userEvent.setup();
    render(
      <MentionButton participants={[]} mentionIds={[]} onToggle={vi.fn()} />,
    );
    await user.click(getToggleBtn());
    expect(screen.getByText("No participants")).toBeInTheDocument();
  });

  it("shows badge with count when mentions are active", () => {
    render(
      <MentionButton
        participants={participants}
        mentionIds={["u1", "u2"]}
        onToggle={vi.fn()}
      />,
    );
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("hides badge when no mentions", () => {
    render(
      <MentionButton
        participants={participants}
        mentionIds={[]}
        onToggle={vi.fn()}
      />,
    );
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("calls onToggle with correct id on participant click", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <MentionButton
        participants={participants}
        mentionIds={[]}
        onToggle={onToggle}
      />,
    );
    await user.click(getToggleBtn());
    await user.click(getNameEl("Alice Smith").closest("button")!);
    expect(onToggle).toHaveBeenCalledWith("u1");
  });

  it("closes popover on second toggle click", async () => {
    const user = userEvent.setup();
    render(
      <MentionButton
        participants={participants}
        mentionIds={[]}
        onToggle={vi.fn()}
      />,
    );
    await user.click(getToggleBtn());
    expect(getNameEl("Alice Smith")).toBeInTheDocument();
    await user.click(getToggleBtn());
    expect(screen.queryByText("Alice Smith")).not.toBeInTheDocument();
  });

  it("applies selected style to already-mentioned participant", async () => {
    const user = userEvent.setup();
    render(
      <MentionButton
        participants={participants}
        mentionIds={["u1"]}
        onToggle={vi.fn()}
      />,
    );
    await user.click(getToggleBtn());
    const aliceBtn = getNameEl("Alice Smith").closest("button")!;
    expect(aliceBtn.className).toMatch(/selected/);
  });
});
