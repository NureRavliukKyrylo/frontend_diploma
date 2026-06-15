import { ReportButton } from "@features/moderation";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock("@shared/ui/buttons", () => ({
  BaseButtonWrapper: ({ children, onClick, className }: any) => (
    <button data-testid="report-button" onClick={onClick} className={className}>
      {children}
    </button>
  ),
}));

vi.mock("@shared/assets/icons/info", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    Report: ({ className }: any) => (
      <svg data-testid="report-icon" className={className} />
    ),
  };
});

vi.mock("@features/moderation/report/ui/modal/ReportModal", () => ({
  ReportModal: ({ isOpen, onClose, subjectType, subjectId }: any) => (
    <div
      data-testid="report-modal"
      data-open={String(isOpen)}
      data-subject-type={subjectType}
      data-subject-id={subjectId}
    >
      <button data-testid="modal-close" onClick={onClose}>
        Close
      </button>
    </div>
  ),
}));

const defaultProps = {
  subjectType: "project" as any,
  subjectId: "subject-123",
};

describe("ReportButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders report button", () => {
    render(<ReportButton {...defaultProps} />);
    expect(screen.getByTestId("report-button")).toBeInTheDocument();
  });

  it("renders report icon inside button", () => {
    render(<ReportButton {...defaultProps} />);
    expect(screen.getByTestId("report-icon")).toBeInTheDocument();
  });

  it("renders modal initially closed", () => {
    render(<ReportButton {...defaultProps} />);
    expect(screen.getByTestId("report-modal")).toHaveAttribute(
      "data-open",
      "false",
    );
  });

  it("opens modal when report button is clicked", async () => {
    const user = userEvent.setup();
    render(<ReportButton {...defaultProps} />);
    await user.click(screen.getByTestId("report-button"));
    expect(screen.getByTestId("report-modal")).toHaveAttribute(
      "data-open",
      "true",
    );
  });

  it("closes modal when onClose is called", async () => {
    const user = userEvent.setup();
    render(<ReportButton {...defaultProps} />);
    await user.click(screen.getByTestId("report-button"));
    expect(screen.getByTestId("report-modal")).toHaveAttribute(
      "data-open",
      "true",
    );
    await user.click(screen.getByTestId("modal-close"));
    expect(screen.getByTestId("report-modal")).toHaveAttribute(
      "data-open",
      "false",
    );
  });

  it("passes subjectType to modal", () => {
    render(<ReportButton {...defaultProps} />);
    expect(screen.getByTestId("report-modal")).toHaveAttribute(
      "data-subject-type",
      "project",
    );
  });

  it("passes subjectId to modal", () => {
    render(<ReportButton {...defaultProps} />);
    expect(screen.getByTestId("report-modal")).toHaveAttribute(
      "data-subject-id",
      "subject-123",
    );
  });

  it("applies custom buttonClassName to report button", () => {
    render(<ReportButton {...defaultProps} buttonClassName="custom-btn" />);
    expect(screen.getByTestId("report-button").className).toContain(
      "custom-btn",
    );
  });

  it("applies custom iconClassName to report icon", () => {
    render(<ReportButton {...defaultProps} iconClassName="custom-icon" />);
    expect(screen.getByTestId("report-icon").className).toContain(
      "custom-icon",
    );
  });
});
