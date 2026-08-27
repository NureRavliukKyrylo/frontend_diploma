import { LogoutButton } from "@features/auth";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const { logoutMock } = vi.hoisted(() => ({
  logoutMock: {
    handleLogout: vi.fn(),
    isLoading: false,
    errorMessage: null as string | null,
  },
}));

vi.mock("@features/auth/logout/model/useLogout", () => ({
  useLogout: (onSuccessCallback?: () => void) => ({
    ...logoutMock,
    handleLogout: () => {
      logoutMock.handleLogout();
      onSuccessCallback?.();
    },
  }),
}));

vi.mock("@shared/ui/buttons", () => ({
  BaseButtonWrapper: ({ children, onClick }: any) => (
    <button data-testid="logout-button" onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock("@shared/ui/modals/confirmation-modal/ConfirmationModal", () => ({
  ConfirmationModal: ({
    isOpen,
    title,
    text,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    isLoading,
    error,
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
        {error && <span data-testid="modal-error">{error}</span>}
      </div>
    ) : null,
}));

vi.mock("framer-motion", () => ({
  motion: {
    img: ({ src, alt, className }: any) => (
      <img src={src} alt={alt} className={className} />
    ),
  },
}));

vi.mock("@shared/assets/icons/actions", () => ({
  Power: "power-icon.svg",
}));

vi.mock("@shared/assets/images/actions", () => ({
  LogOutImage: "logout-image.svg",
}));

describe("LogoutButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    logoutMock.isLoading = false;
    logoutMock.errorMessage = null;
    logoutMock.handleLogout = vi.fn();
  });

  it("renders logout button", () => {
    render(<LogoutButton />);
    expect(screen.getByTestId("logout-button")).toBeInTheDocument();
  });

  it("does not show confirmation modal initially", () => {
    render(<LogoutButton />);
    expect(screen.queryByTestId("confirmation-modal")).not.toBeInTheDocument();
  });

  it("opens confirmation modal on logout button click", async () => {
    const user = userEvent.setup();
    render(<LogoutButton />);
    await user.click(screen.getByTestId("logout-button"));
    expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();
  });

  it("renders correct modal title", async () => {
    const user = userEvent.setup();
    render(<LogoutButton />);
    await user.click(screen.getByTestId("logout-button"));
    expect(screen.getByTestId("modal-title")).toHaveTextContent(
      "logout.modal.title",
    );
  });

  it("renders correct modal text", async () => {
    const user = userEvent.setup();
    render(<LogoutButton />);
    await user.click(screen.getByTestId("logout-button"));
    expect(screen.getByTestId("modal-text")).toHaveTextContent(
      "logout.modal.text",
    );
  });

  it("closes modal on cancel", async () => {
    const user = userEvent.setup();
    render(<LogoutButton />);
    await user.click(screen.getByTestId("logout-button"));
    await user.click(screen.getByTestId("cancel-button"));
    expect(screen.queryByTestId("confirmation-modal")).not.toBeInTheDocument();
  });

  it("calls handleLogout on confirm", async () => {
    const user = userEvent.setup();
    render(<LogoutButton />);
    await user.click(screen.getByTestId("logout-button"));
    await user.click(screen.getByTestId("confirm-button"));
    expect(logoutMock.handleLogout).toHaveBeenCalled();
  });

  it("closes modal after successful logout", async () => {
    const user = userEvent.setup();
    render(<LogoutButton />);
    await user.click(screen.getByTestId("logout-button"));
    await user.click(screen.getByTestId("confirm-button"));
    expect(screen.queryByTestId("confirmation-modal")).not.toBeInTheDocument();
  });

  it("shows loading state on confirm button during logout", async () => {
    const user = userEvent.setup();
    logoutMock.isLoading = true;
    render(<LogoutButton />);
    await user.click(screen.getByTestId("logout-button"));
    expect(screen.getByTestId("confirm-button")).toBeDisabled();
  });

  it("shows error in modal when logout fails", async () => {
    const user = userEvent.setup();
    logoutMock.errorMessage = "Network error";
    render(<LogoutButton />);
    await user.click(screen.getByTestId("logout-button"));
    expect(screen.getByTestId("modal-error")).toHaveTextContent(
      "Network error",
    );
  });
});
