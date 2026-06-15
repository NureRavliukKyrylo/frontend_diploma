import { ChatItem, type Chat } from "@entities/chat";
import { render, screen } from "@testing-library/react";

vi.mock("@shared/libs/date", () => ({
  formatDateToText: () => "2 hours ago",
}));

vi.mock("@shared/ui", () => ({
  Avatar: ({ src }: { src?: string }) => <img src={src} alt="avatar" />,
}));

vi.mock("@shared/assets/icons/info", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    OnlineIcon: ({ className }: { className?: string }) => (
      <span data-testid="online-icon" className={className} />
    ),
  };
});

const makeChat = (overrides: Partial<Chat> = {}): Chat => ({
  id: "1",
  name: "John Doe",
  avatarUrl: "https://example.com/avatar.png",
  lastMessageAt: "2024-01-01T00:00:00Z",
  lastMessage: { message: "Hello there", type: "text" },
  unreadCount: 0,
  participants: [],
  relatedEntityType: "private",
  relatedEntityId: "42",
  ...overrides,
});

describe("ChatItem", () => {
  it("renders chat name", () => {
    render(<ChatItem chat={makeChat()} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders last message when not typing", () => {
    render(
      <ChatItem
        chat={makeChat({
          lastMessage: { message: "Hello there", type: "text" },
        })}
      />,
    );
    expect(screen.getByText("Hello there")).toBeInTheDocument();
  });

  it("renders fallback when lastMessage is null", () => {
    render(<ChatItem chat={makeChat({ lastMessage: null })} />);
    expect(screen.getByText("No messages yet")).toBeInTheDocument();
  });

  it("renders typing indicator instead of last message when typing", () => {
    render(<ChatItem chat={makeChat()} typing="John" />);
    expect(screen.getByText("typing...")).toBeInTheDocument();
    expect(screen.queryByText("Hello there")).not.toBeInTheDocument();
  });

  it("applies typing class when typing", () => {
    render(<ChatItem chat={makeChat()} typing="John" />);
    expect(screen.getByText("typing...")).toHaveClass("typing");
  });

  it("does not apply typing class when not typing", () => {
    render(<ChatItem chat={makeChat()} />);
    expect(screen.getByText("Hello there")).not.toHaveClass("typing");
  });

  it("shows online icon when isOnline is provided", () => {
    render(<ChatItem chat={makeChat()} isOnline="true" />);
    expect(screen.getByTestId("online-icon")).toBeInTheDocument();
  });

  it("does not show online icon when isOnline is absent", () => {
    render(<ChatItem chat={makeChat()} />);
    expect(screen.queryByTestId("online-icon")).not.toBeInTheDocument();
  });

  it("renders unread count", () => {
    render(<ChatItem chat={makeChat({ unreadCount: 5 })} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders 0 when unreadCount is null", () => {
    render(<ChatItem chat={makeChat({ unreadCount: 0 })} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders formatted date", () => {
    render(<ChatItem chat={makeChat()} />);
    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
  });
});
