import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeleteMessageModal } from "@features/chat/delete-message/ui/DeleteMessageModal";
import type { Message } from "@entities/chat";

const { deleteMessageMock } = vi.hoisted(() => ({
  deleteMessageMock: vi.fn(),
}));

vi.mock("@features/chat/delete-message/model/useDeleteMessage", () => ({
  useDeleteMessage: (_chatId: string) => ({
    deleteMessage: deleteMessageMock,
    isLoading: false,
  }),
}));

vi.mock("@shared/ui/modals", () => ({
  ConfirmationModal: ({
    isOpen,
    title,
    text,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
    isLoading,
  }: any) =>
    isOpen ? (
      <div data-testid="confirmation-modal">
        <p data-testid="modal-title">{title}</p>
        <p data-testid="modal-text">{text}</p>
        <button
          data-testid="confirm-button"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {confirmText}
        </button>
        <button data-testid="cancel-button" onClick={onCancel}>
          {cancelText}
        </button>
      </div>
    ) : null,
}));

vi.mock("@shared/assets/images/actions", () => ({
  DeleteModal: "delete-modal.svg",
}));

const message: Message = {
  id: "msg-1",
  message: "Hello world this is a long message",
  sender: {
    firstName: "John",
    lastName: "Doe",
    roleName: "Volunteer",
    displayName: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?u=john-doe",
  },
  timestamp: "2026-06-15T10:23:00.000Z",
  editedAt: "",
  replyTo: {
    firstName: "Jane",
    lastName: "Smith",
    message: "Hey, is anyone available today?",
  },
  mentions: [{ firstName: "Alice", lastName: "Brown" }],
  isMine: false,
  isRead: true,
  isSystem: false,
};

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  message,
  chatId: "chat-1",
};

describe("DeleteMessageModal", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders modal when open", () => {
    render(<DeleteMessageModal {...defaultProps} />);
    expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(<DeleteMessageModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByTestId("confirmation-modal")).not.toBeInTheDocument();
  });

  it("renders correct title", () => {
    render(<DeleteMessageModal {...defaultProps} />);
    expect(screen.getByTestId("modal-title")).toHaveTextContent(
      "Delete Message",
    );
  });

  it("truncates message preview to 20 chars", () => {
    render(<DeleteMessageModal {...defaultProps} />);
    expect(screen.getByTestId("modal-text")).toHaveTextContent(
      ' "Hello world this is ..."',
    );
  });

  it("shows full message when 20 chars or less", () => {
    const shortMsg = { ...message, message: "Short msg" };
    render(<DeleteMessageModal {...defaultProps} message={shortMsg} />);
    expect(screen.getByTestId("modal-text")).toHaveTextContent('"Short msg"');
  });

  it("calls deleteMessage with message id on confirm", async () => {
    const user = userEvent.setup();
    render(<DeleteMessageModal {...defaultProps} />);
    await user.click(screen.getByTestId("confirm-button"));
    expect(deleteMessageMock).toHaveBeenCalledWith("msg-1");
  });

  it("calls onClose on cancel", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<DeleteMessageModal {...defaultProps} onClose={onClose} />);
    await user.click(screen.getByTestId("cancel-button"));
    expect(onClose).toHaveBeenCalled();
  });
});
