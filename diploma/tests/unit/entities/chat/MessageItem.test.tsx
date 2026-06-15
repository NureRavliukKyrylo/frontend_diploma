import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { MenuItem } from "@shared/config/types";
import { MessageItem, type Message } from "@entities/chat";

vi.mock("@shared/libs/date", () => ({
  formatDateToText: (_: string, __: boolean) => "2 hours ago",
}));

vi.mock("@entities/user", () => ({
  getFullName: (first: string, last: string) => `${first} ${last}`,
}));

vi.mock("@shared/ui", () => ({
  Avatar: ({ fallback, src }: { fallback?: string; src?: string }) => (
    <img src={src} alt={fallback} />
  ),
}));

vi.mock("@shared/assets/icons/actions", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    EditIcon: () => <span data-testid="edit-icon" />,
    ApproveIcon: () => <span data-testid="approve-icon" />,
  };
});

vi.mock("@shared/config/constants", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    getMentionColor: () => "#ccc",
  };
});

vi.mock("@heroui/react");

const makeMessage = (overrides: Partial<Message> = {}): Message => ({
  id: "msg-1",
  sender: {
    firstName: "John",
    lastName: "Doe",
    roleName: "Member",
    displayName: "John Doe",
    avatarUrl: "https://example.com/avatar.png",
  },
  message: "Hello world",
  timestamp: "2024-01-01T10:00:00Z",
  editedAt: "",
  replyTo: null as any,
  mentions: [],
  isMine: false,
  isRead: false,
  isSystem: false,
  ...overrides,
});

const makeMenuItems = (): MenuItem<
  "default" | "edit" | "delete" | "reply" | "report"
>[] => [
  { key: "reply", label: "Reply", onClick: vi.fn(), variant: "default" },
  { key: "delete", label: "Delete", onClick: vi.fn(), variant: "delete" },
];

describe("MessageItem", () => {
  it("renders message text", () => {
    render(
      <MessageItem
        message={makeMessage()}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={vi.fn()}
      />,
    );
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders sender avatar when message is not mine", () => {
    render(
      <MessageItem
        message={makeMessage({ isMine: false })}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={vi.fn()}
      />,
    );
    expect(screen.getByAltText("John Doe")).toBeInTheDocument();
  });

  it("does not render avatar when message is mine", () => {
    render(
      <MessageItem
        message={makeMessage({ isMine: true })}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={vi.fn()}
      />,
    );
    expect(screen.queryByAltText("John Doe")).not.toBeInTheDocument();
  });

  it("renders sender role when message is not mine", () => {
    render(
      <MessageItem
        message={makeMessage({ isMine: false })}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={vi.fn()}
      />,
    );
    expect(screen.getByText("Member")).toBeInTheDocument();
  });

  it("does not render role when message is mine", () => {
    render(
      <MessageItem
        message={makeMessage({ isMine: true })}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={vi.fn()}
      />,
    );
    expect(screen.queryByText("Member")).not.toBeInTheDocument();
  });

  it("renders reply block when replyTo is present", () => {
    render(
      <MessageItem
        message={makeMessage({
          replyTo: {
            firstName: "Jane",
            lastName: "Smith",
            message: "Original message",
          },
        })}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={vi.fn()}
      />,
    );
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Original message")).toBeInTheDocument();
  });

  it("does not render reply block when replyTo is null", () => {
    render(
      <MessageItem
        message={makeMessage({ replyTo: null as any })}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={vi.fn()}
      />,
    );
    expect(screen.queryByText("Original message")).not.toBeInTheDocument();
  });

  it("renders mentions when present", () => {
    render(
      <MessageItem
        message={makeMessage({
          mentions: [{ firstName: "Alice", lastName: "Brown" }],
        })}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={vi.fn()}
      />,
    );
    expect(screen.getByText("@Alice Brown")).toBeInTheDocument();
  });

  it("does not render mentions block when empty", () => {
    render(
      <MessageItem
        message={makeMessage({ mentions: [] })}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={vi.fn()}
      />,
    );
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();
  });

  it("renders edited timestamp when editedAt is set", () => {
    render(
      <MessageItem
        message={makeMessage({ editedAt: "2024-01-01T11:00:00Z" })}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={vi.fn()}
      />,
    );
    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
  });

  it("renders normal timestamp when editedAt is empty", () => {
    render(
      <MessageItem
        message={makeMessage({ editedAt: "" })}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={vi.fn()}
      />,
    );
    expect(screen.queryByTestId("edit-icon")).not.toBeInTheDocument();
    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
  });

  it("renders single approve icon when message is mine and unread", () => {
    render(
      <MessageItem
        message={makeMessage({ isMine: true, isRead: false })}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={vi.fn()}
      />,
    );
    expect(screen.getAllByTestId("approve-icon")).toHaveLength(1);
  });

  it("renders double approve icon when message is mine and read", () => {
    render(
      <MessageItem
        message={makeMessage({ isMine: true, isRead: true })}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={vi.fn()}
      />,
    );
    expect(screen.getAllByTestId("approve-icon")).toHaveLength(2);
  });

  it("does not render approve icons when message is not mine", () => {
    render(
      <MessageItem
        message={makeMessage({ isMine: false })}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={vi.fn()}
      />,
    );
    expect(screen.queryByTestId("approve-icon")).not.toBeInTheDocument();
  });

  it("calls setOpenId on context menu", async () => {
    const setOpenId = vi.fn();
    const user = userEvent.setup();
    render(
      <MessageItem
        message={makeMessage()}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={setOpenId}
      />,
    );
    await user.pointer({
      keys: "[MouseRight]",
      target: screen.getByText("Hello world"),
    });
    expect(setOpenId).toHaveBeenCalledWith("msg-1");
  });

  it("renders menu items", () => {
    render(
      <MessageItem
        message={makeMessage()}
        menuItems={makeMenuItems()}
        openId={null}
        setOpenId={vi.fn()}
      />,
    );
    expect(screen.getByText("Reply")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});
