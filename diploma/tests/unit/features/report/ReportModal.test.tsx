import { ReportModal } from "@features/moderation";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const setFieldValueMock = vi.fn();
const handleSubmitMock = vi.fn((e) => e?.preventDefault());
const handleChangeMock = vi.fn();
const handleBlurMock = vi.fn();
const resetFormMock = vi.fn();

const { useSendReportMock } = vi.hoisted(() => ({
  useSendReportMock: {
    formik: {
      values: { reason: "Spam", details: "" },
      errors: {} as Record<string, string>,
      submitCount: 0,
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      handleSubmit: vi.fn((e) => e?.preventDefault()),
      setFieldValue: vi.fn(),
      resetForm: vi.fn(),
    },
    isLoading: false,
  },
}));

vi.mock("@features/moderation/report/model/useSendReport", () => ({
  useSendReport: () => useSendReportMock,
}));

vi.mock("@shared/ui/modals", () => ({
  BaseModal: ({ children, isOpen }: any) =>
    isOpen ? <div data-testid="modal">{children}</div> : null,
}));

vi.mock("@shared/ui/buttons", () => ({
  BaseButtonWrapper: ({
    children,
    loading,
    onClick,
    type,
    dataTestId,
  }: any) => (
    <button
      data-testid={
        dataTestId || (type === "submit" ? "submit-button" : "cancel-button")
      }
      disabled={loading}
      onClick={onClick}
      type={type ?? "button"}
    >
      {loading ? "Loading..." : children}
    </button>
  ),
}));

vi.mock("@shared/ui/inputs", () => ({
  TextAreaForm: ({ value, onChange, onBlur, name, placeholder }: any) => (
    <textarea
      data-testid="details-input"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  ),
}));

vi.mock("@shared/ui/drop-down", () => ({
  SortDropDown: ({ value, onSelect, options }: any) => (
    <select
      data-testid="reason-select"
      value={value}
      onChange={(e) => onSelect(e.target.value)}
    >
      {options?.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (key === "moderation:report.title") {
        return `Report ${options?.subject || "Content"}`;
      }
      if (key === "moderation:report.subjects.Project") {
        return "Project";
      }
      if (key === "moderation:report.actions.cancel") {
        return "Cancel";
      }
      if (key === "moderation:report.actions.submit") {
        return "Submit Report";
      }
      return options?.defaultValue || key;
    },
  }),
}));

vi.mock("@entities/report", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    getModerationSubjectKey: (subjectType: string) =>
      subjectType.charAt(0).toUpperCase() + subjectType.slice(1),
    getReportReasonOptions: () => [
      { value: "0", label: "spam" },
      { value: "1", label: "harassment" },
    ],
  };
});

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  subjectType: "project" as any,
  subjectId: "subject-123",
};

describe("ReportModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSendReportMock.isLoading = false;
    useSendReportMock.formik.submitCount = 0;
    useSendReportMock.formik.errors = {};
    useSendReportMock.formik.values = { reason: "Spam", details: "" };
    useSendReportMock.formik.handleSubmit = handleSubmitMock;
    useSendReportMock.formik.handleChange = handleChangeMock;
    useSendReportMock.formik.handleBlur = handleBlurMock;
    useSendReportMock.formik.setFieldValue = setFieldValueMock;
    useSendReportMock.formik.resetForm = resetFormMock;
  });

  it("renders modal when isOpen is true", () => {
    render(<ReportModal {...defaultProps} />);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("does not render modal when isOpen is false", () => {
    render(<ReportModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("renders modal title with subject type label", () => {
    render(<ReportModal {...defaultProps} />);
    expect(screen.getByText("Report Project")).toBeInTheDocument();
  });

  it("renders reason dropdown", () => {
    render(<ReportModal {...defaultProps} />);
    expect(screen.getByTestId("reason-select")).toBeInTheDocument();
  });

  it("renders details textarea", () => {
    render(<ReportModal {...defaultProps} />);
    expect(screen.getByTestId("details-input")).toBeInTheDocument();
  });

  it("renders cancel button", () => {
    render(<ReportModal {...defaultProps} />);
    expect(screen.getByTestId("cancel-button")).toHaveTextContent("Cancel");
  });

  it("renders submit button", () => {
    render(<ReportModal {...defaultProps} />);
    expect(screen.getByTestId("submit-button")).toHaveTextContent(
      "Submit Report",
    );
  });

  it("submit button is disabled when loading", () => {
    useSendReportMock.isLoading = true;
    render(<ReportModal {...defaultProps} />);
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  it("calls handleSubmit on form submit", async () => {
    const user = userEvent.setup();
    render(<ReportModal {...defaultProps} />);
    await user.click(screen.getByTestId("submit-button"));
    expect(handleSubmitMock).toHaveBeenCalled();
  });

  it("calls resetForm and onClose when cancel is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ReportModal {...defaultProps} onClose={onClose} />);
    await user.click(screen.getByTestId("cancel-button"));
    expect(resetFormMock).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("shows reason validation error after submit", () => {
    useSendReportMock.formik.submitCount = 1;
    useSendReportMock.formik.errors = { reason: "Reason is required" };
    render(<ReportModal {...defaultProps} />);
    expect(screen.getByText("Reason is required")).toBeInTheDocument();
  });

  it("shows details validation error after submit", () => {
    useSendReportMock.formik.submitCount = 1;
    useSendReportMock.formik.errors = { details: "Details are required" };
    render(<ReportModal {...defaultProps} />);
    expect(screen.getByText("Details are required")).toBeInTheDocument();
  });

  it("does not show validation errors before submit", () => {
    useSendReportMock.formik.submitCount = 0;
    useSendReportMock.formik.errors = {
      reason: "Reason is required",
      details: "Details are required",
    };
    render(<ReportModal {...defaultProps} />);
    expect(screen.queryByText("Reason is required")).not.toBeInTheDocument();
    expect(screen.queryByText("Details are required")).not.toBeInTheDocument();
  });

  it("calls setFieldValue when reason is changed", async () => {
    const user = userEvent.setup();
    render(<ReportModal {...defaultProps} />);

    const option = screen
      .getAllByRole("option")
      .find((opt) =>
        opt.textContent?.includes("harassment"),
      ) as HTMLOptionElement;
    const targetValue = option ? option.value : "1";

    await user.selectOptions(screen.getByTestId("reason-select"), targetValue);
    expect(setFieldValueMock).toHaveBeenCalledWith("reason", targetValue);
  });
});
