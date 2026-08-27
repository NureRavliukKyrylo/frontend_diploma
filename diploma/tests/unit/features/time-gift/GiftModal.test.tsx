import { GiftMinutesModal } from "@features/time-bank/gift/ui/modal/GiftMinutesModal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { giftMock } = vi.hoisted(() => ({
  giftMock: {
    formik: {
      values: { amountMinutes: "", message: "" },
      errors: {} as Record<string, string>,
      touched: {} as Record<string, boolean>,
      handleSubmit: vi.fn((e) => e.preventDefault()),
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      resetForm: vi.fn(),
    },
    isLoading: false,
  },
}));

vi.mock("@features/time-bank/gift/model/useSendGiftMinutes", () => ({
  useSendGiftMinutes: () => giftMock,
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "timeBank:gifts.labels.giftMinutes": "Gift minutes",
        "timeBank:gifts.labels.minutesPlaceholder": "minutes",
        "timeBank:gifts.actions.sendGift": "Send gift",
        "timeBank:gifts.actions.cancel": "Cancel",
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock("@shared/ui/modals", () => ({
  BaseModal: ({ isOpen, children }: any) =>
    isOpen ? <div data-testid="modal">{children}</div> : null,
}));

vi.mock("@shared/ui/buttons", () => ({
  BaseButtonWrapper: ({ children, onClick, loading }: any) => (
    <button
      data-testid={loading !== undefined ? "submit-button" : "cancel-button"}
      onClick={onClick}
      disabled={loading}
      type={onClick ? "button" : "submit"}
    >
      {children}
    </button>
  ),
}));

vi.mock("@shared/ui/inputs", () => ({
  TextAreaForm: ({ value, onChange, onBlur, name }: any) => (
    <textarea
      data-testid="message-input"
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  ),
}));

vi.mock("@shared/assets/icons/actions", () => ({
  GiftIcon: () => <span data-testid="gift-icon" />,
}));

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  recipientUserId: "recipient-1",
};

describe("GiftMinutesModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    giftMock.isLoading = false;
    giftMock.formik.errors = {};
    giftMock.formik.touched = {};
    giftMock.formik.handleSubmit = vi.fn((e) => e.preventDefault());
    giftMock.formik.handleChange = vi.fn();
    giftMock.formik.handleBlur = vi.fn();
    giftMock.formik.resetForm = vi.fn();
  });

  it("renders modal when open", () => {
    render(<GiftMinutesModal {...defaultProps} />);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("does not render modal when closed", () => {
    render(<GiftMinutesModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("renders title", () => {
    render(<GiftMinutesModal {...defaultProps} />);
    expect(
      screen.getByRole("heading", { name: "Gift minutes" }),
    ).toBeInTheDocument();
  });

  it("renders amount input", () => {
    render(<GiftMinutesModal {...defaultProps} />);
    expect(screen.getByPlaceholderText("minutes")).toBeInTheDocument();
  });

  it("renders message textarea", () => {
    render(<GiftMinutesModal {...defaultProps} />);
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
  });

  it("renders send gift button", () => {
    render(<GiftMinutesModal {...defaultProps} />);
    expect(screen.getByTestId("submit-button")).toHaveTextContent("Send gift");
  });

  it("shows loading state on submit button", () => {
    giftMock.isLoading = true;
    render(<GiftMinutesModal {...defaultProps} />);
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  it("calls onClose and resets form on cancel", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<GiftMinutesModal {...defaultProps} onClose={onClose} />);
    await user.click(screen.getByTestId("cancel-button"));
    expect(giftMock.formik.resetForm).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("shows amountMinutes error when touched", () => {
    giftMock.formik.touched = { amountMinutes: true };
    giftMock.formik.errors = { amountMinutes: "Amount is required" };
    render(<GiftMinutesModal {...defaultProps} />);
    expect(screen.getByText("Amount is required")).toBeInTheDocument();
  });

  it("shows message error when touched", () => {
    giftMock.formik.touched = { message: true };
    giftMock.formik.errors = { message: "Message is required" };
    render(<GiftMinutesModal {...defaultProps} />);
    expect(screen.getByText("Message is required")).toBeInTheDocument();
  });

  it("does not show errors when not touched", () => {
    giftMock.formik.touched = {};
    giftMock.formik.errors = {
      amountMinutes: "Amount is required",
      message: "Message is required",
    };
    render(<GiftMinutesModal {...defaultProps} />);
    expect(screen.queryByText("Amount is required")).not.toBeInTheDocument();
    expect(screen.queryByText("Message is required")).not.toBeInTheDocument();
  });
});
