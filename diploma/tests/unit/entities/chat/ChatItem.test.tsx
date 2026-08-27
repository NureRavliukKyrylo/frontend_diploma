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

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      language: "en",
    },
    t: (key: string) => {
      const translations: Record<string, string> = {
        "chat:states.noMessages": "No messages yet",
      };
      return translations[key] || key;
    },
  }),
}));

const makeChat = (overrides: Partial<Chat> = {}): Chat => ({
  id: "1",
  name: "John Doe",
  avatarUrl: "https://example.com/avatar.png",
  lastMessage: { message: "Hello there", timestamp: "2024-01-01T00:00:00Z" },
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
          lastMessage: {
            message: "Hello there",
            timestamp: "2024-01-01T00:00:00Z",
          },
        })}
      />,
    );
    expect(screen.getByText("Hello there")).toBeInTheDocument();
  });

  it("renders fallback when lastMessage is null", () => {
    render(<ChatItem chat={makeChat({ lastMessage: null })} />);
    expect(screen.getByText(/No messages yet/i)).toBeInTheDocument();
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

  it("does not render count when unreadCount is 0", () => {
    render(<ChatItem chat={makeChat({ unreadCount: 0 })} />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("renders formatted date", () => {
    render(<ChatItem chat={makeChat()} />);
    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
  });
});
