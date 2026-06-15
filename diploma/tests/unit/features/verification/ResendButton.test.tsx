import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResendButton } from "@shared/ui/buttons";

describe("ResendButton", () => {
  const defaultProps = {
    seconds: 0,
    onResend: vi.fn().mockResolvedValue(undefined),
    resetTimer: vi.fn(),
    decrementTimer: vi.fn(),
    serverError: null,
    isLoading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders resend button", () => {
    render(<ResendButton {...defaultProps} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows Resend Code text when seconds is 0", () => {
    render(<ResendButton {...defaultProps} seconds={0} />);
    expect(screen.getByRole("button")).toHaveTextContent("Resend Code");
  });

  it("shows countdown text when seconds > 0", () => {
    render(<ResendButton {...defaultProps} seconds={60} />);
    expect(screen.getByRole("button")).toHaveTextContent("Resend code in");
  });

  it("formats countdown correctly", () => {
    render(<ResendButton {...defaultProps} seconds={90} />);
    expect(screen.getByRole("button")).toHaveTextContent("1:30");
  });

  it("is enabled when seconds is 0", () => {
    render(<ResendButton {...defaultProps} seconds={0} />);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("is disabled when seconds > 0", () => {
    render(<ResendButton {...defaultProps} seconds={30} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onResend when clicked and canResend", async () => {
    const user = userEvent.setup();
    const onResend = vi.fn().mockResolvedValue(undefined);
    render(<ResendButton {...defaultProps} onResend={onResend} seconds={0} />);
    await user.click(screen.getByRole("button"));
    expect(onResend).toHaveBeenCalled();
  });

  it("does not call onResend when seconds > 0", async () => {
    const user = userEvent.setup();
    const onResend = vi.fn().mockResolvedValue(undefined);
    render(<ResendButton {...defaultProps} onResend={onResend} seconds={30} />);
    await user.click(screen.getByRole("button"));
    expect(onResend).not.toHaveBeenCalled();
  });

  it("calls resetTimer after successful resend", async () => {
    const user = userEvent.setup();
    const resetTimer = vi.fn();
    const onResend = vi.fn().mockResolvedValue(undefined);
    render(
      <ResendButton
        {...defaultProps}
        onResend={onResend}
        resetTimer={resetTimer}
        seconds={0}
        serverError={null}
      />,
    );
    await user.click(screen.getByRole("button"));
    expect(resetTimer).toHaveBeenCalled();
  });

  it("does not call resetTimer when serverError is present", async () => {
    const user = userEvent.setup();
    const resetTimer = vi.fn();
    const onResend = vi.fn().mockResolvedValue(undefined);
    render(
      <ResendButton
        {...defaultProps}
        onResend={onResend}
        resetTimer={resetTimer}
        seconds={0}
        serverError="Too many requests"
      />,
    );
    await user.click(screen.getByRole("button"));
    expect(resetTimer).not.toHaveBeenCalled();
  });

  describe("countdown timer", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("calls decrementTimer after 1 second when seconds > 0", () => {
      const decrementTimer = vi.fn();
      render(
        <ResendButton
          {...defaultProps}
          seconds={30}
          decrementTimer={decrementTimer}
        />,
      );
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(decrementTimer).toHaveBeenCalled();
    });

    it("does not call decrementTimer when seconds is 0", () => {
      const decrementTimer = vi.fn();
      render(
        <ResendButton
          {...defaultProps}
          seconds={0}
          decrementTimer={decrementTimer}
        />,
      );
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(decrementTimer).not.toHaveBeenCalled();
    });
  });

  it("applies profile variant class", () => {
    render(<ResendButton {...defaultProps} variant="profile" />);
    expect(screen.getByRole("button").className).toMatch(/profile/);
  });
});
