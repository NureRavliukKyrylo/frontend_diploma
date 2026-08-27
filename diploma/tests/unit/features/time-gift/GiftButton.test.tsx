import { GiftMinutesButton } from "@features/time-bank";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@features/time-bank/gift/ui/modal/GiftMinutesModal", () => ({
  GiftMinutesModal: ({ isOpen, onClose, recipientUserId }: any) =>
    isOpen ? (
      <div data-testid="gift-modal">
        <span data-testid="recipient-id">{recipientUserId}</span>
        <button data-testid="close-modal" onClick={onClose}>
          Close
        </button>
      </div>
    ) : null,
}));

vi.mock("@shared/ui/buttons", () => ({
  BaseButtonWrapper: ({ children, onClick }: any) => (
    <button data-testid="gift-button" onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock("@shared/assets/icons/actions", () => ({
  GiftIcon: () => <span data-testid="gift-icon" />,
}));

describe("GiftMinutesButton", () => {
  it("renders gift button", () => {
    render(<GiftMinutesButton recipientUserId="user-1" />);
    expect(screen.getByTestId("gift-button")).toBeInTheDocument();
  });

  it("renders Gift minutes text", () => {
    render(<GiftMinutesButton recipientUserId="user-1" />);
    expect(screen.getByTestId("gift-button")).toHaveTextContent(
      "timeBank:gifts.labels.giftMinutes",
    );
  });

  it("does not show modal initially", () => {
    render(<GiftMinutesButton recipientUserId="user-1" />);
    expect(screen.queryByTestId("gift-modal")).not.toBeInTheDocument();
  });

  it("opens modal on button click", async () => {
    const user = userEvent.setup();
    render(<GiftMinutesButton recipientUserId="user-1" />);
    await user.click(screen.getByTestId("gift-button"));
    expect(screen.getByTestId("gift-modal")).toBeInTheDocument();
  });

  it("passes recipientUserId to modal", async () => {
    const user = userEvent.setup();
    render(<GiftMinutesButton recipientUserId="user-99" />);
    await user.click(screen.getByTestId("gift-button"));
    expect(screen.getByTestId("recipient-id")).toHaveTextContent("user-99");
  });

  it("closes modal when onClose is called", async () => {
    const user = userEvent.setup();
    render(<GiftMinutesButton recipientUserId="user-1" />);
    await user.click(screen.getByTestId("gift-button"));
    await user.click(screen.getByTestId("close-modal"));
    expect(screen.queryByTestId("gift-modal")).not.toBeInTheDocument();
  });
});
