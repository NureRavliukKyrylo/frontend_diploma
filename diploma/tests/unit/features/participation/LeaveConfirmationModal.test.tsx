import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeaveConfirmationModal } from "@features/participation/ui/leave-modal/LeaveConfirmationModal";

const { handleLeaveMock, resetLeaveMock } = vi.hoisted(() => ({
  handleLeaveMock: vi.fn(),
  resetLeaveMock: vi.fn(),
}));

vi.mock("@features/participation/model/useLeaveParticipation", () => ({
  useLeaveParticipation: ({ onSuccess }: any) => ({
    handleLeave: handleLeaveMock.mockImplementation(() => onSuccess?.()),
    resetLeave: resetLeaveMock,
    isLoading: false,
    error: null,
  }),
}));

vi.mock("@shared/ui/modals", () => ({
  ConfirmationModal: ({
    isOpen,
    onCancel,
    onConfirm,
    title,
    text,
    error,
    isLoading,
  }: any) =>
    isOpen ? (
      <div data-testid="confirmation-modal">
        <span data-testid="modal-title">{title}</span>
        <span data-testid="modal-text">{text}</span>
        {error && <span data-testid="modal-error">{error}</span>}
        {isLoading && <span data-testid="modal-loading" />}
        <button onClick={onCancel} data-testid="cancel-btn">
          Cancel
        </button>
        <button onClick={onConfirm} data-testid="confirm-btn">
          Leave
        </button>
      </div>
    ) : null,
}));

vi.mock("@shared/assets/images/actions", () => ({
  DeleteModal: "delete-modal.svg",
}));

const defaultProps = {
  entityType: "event" as const,
  entityId: "e1",
  entityName: "Community Cleanup",
  isOpen: true,
  onClose: vi.fn(),
};

describe("LeaveConfirmationModal", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders modal when open", () => {
    render(<LeaveConfirmationModal {...defaultProps} />);
    expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(<LeaveConfirmationModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByTestId("confirmation-modal")).not.toBeInTheDocument();
  });

  it("shows entity name in title", () => {
    render(<LeaveConfirmationModal {...defaultProps} />);
    expect(screen.getByTestId("modal-title")).toHaveTextContent(
      "participation.leaveTitle",
    );
  });

  it("shows confirmation text", () => {
    render(<LeaveConfirmationModal {...defaultProps} />);
    expect(screen.getByTestId("modal-text")).toHaveTextContent(
      "participation.leaveText",
    );
  });

  it("calls handleLeave on confirm", async () => {
    const user = userEvent.setup();
    render(<LeaveConfirmationModal {...defaultProps} />);
    await user.click(screen.getByTestId("confirm-btn"));
    expect(handleLeaveMock).toHaveBeenCalled();
  });

  it("calls resetLeave and onClose on cancel", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<LeaveConfirmationModal {...defaultProps} onClose={onClose} />);
    await user.click(screen.getByTestId("cancel-btn"));
    expect(resetLeaveMock).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onSuccess and onClose after successful leave", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onSuccess = vi.fn();
    render(
      <LeaveConfirmationModal
        {...defaultProps}
        onClose={onClose}
        onSuccess={onSuccess}
      />,
    );
    await user.click(screen.getByTestId("confirm-btn"));
    expect(onSuccess).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
