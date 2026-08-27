import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ParticipationLeaveButton } from "@features/participation/ui/leave-button/ParticipationLeaveButton";

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
}));

vi.mock("@shared/ui/buttons", () => ({
  BaseButtonWrapper: ({ children, onClick }: any) => (
    <button onClick={onClick} data-testid="leave-btn">
      {children}
    </button>
  ),
}));

vi.mock(
  "@features/participation/ui/leave-modal/LeaveConfirmationModal",
  () => ({
    LeaveConfirmationModal: ({ isOpen, onClose, entityName }: any) =>
      isOpen ? (
        <div data-testid="leave-modal">
          <span>{entityName}</span>
          <button onClick={onClose} data-testid="close-modal">
            Close
          </button>
        </div>
      ) : null,
  }),
);

const defaultProps = {
  entityType: "event" as const,
  entityId: "e1",
  entityName: "Community Cleanup",
};

describe("ParticipationLeaveButton", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders leave button", () => {
    render(<ParticipationLeaveButton {...defaultProps} />);
    expect(screen.getByTestId("leave-btn")).toBeInTheDocument();
  });

  it("displays entity type label", () => {
    render(<ParticipationLeaveButton {...defaultProps} />);
    expect(screen.getByText("participation.leave")).toBeInTheDocument();
  });

  it("modal is closed initially", () => {
    render(<ParticipationLeaveButton {...defaultProps} />);
    expect(screen.queryByTestId("leave-modal")).not.toBeInTheDocument();
  });

  it("opens modal on button click", async () => {
    const user = userEvent.setup();
    render(<ParticipationLeaveButton {...defaultProps} />);
    await user.click(screen.getByTestId("leave-btn"));
    expect(screen.getByTestId("leave-modal")).toBeInTheDocument();
  });

  it("passes entityName to modal", async () => {
    const user = userEvent.setup();
    render(<ParticipationLeaveButton {...defaultProps} />);
    await user.click(screen.getByTestId("leave-btn"));
    expect(screen.getByText("Community Cleanup")).toBeInTheDocument();
  });

  it("closes modal when onClose is called", async () => {
    const user = userEvent.setup();
    render(<ParticipationLeaveButton {...defaultProps} />);
    await user.click(screen.getByTestId("leave-btn"));
    await user.click(screen.getByTestId("close-modal"));
    expect(screen.queryByTestId("leave-modal")).not.toBeInTheDocument();
  });
});
