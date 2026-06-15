import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ParticipationJoinButton } from "@features/participation/ui/join-button/ParticipationJoinButton";

const { handleJoinMock } = vi.hoisted(() => ({ handleJoinMock: vi.fn() }));

vi.mock("@features/participation/model/useJoinParticipation", () => ({
  useJoinParticipation: () => ({
    handleJoin: handleJoinMock,
    isLoading: false,
  }),
}));

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
  BaseButtonWrapper: ({ children, onClick, loading }: any) => (
    <button onClick={onClick} disabled={loading} data-testid="join-btn">
      {children}
    </button>
  ),
}));

const defaultProps = { entityType: "event" as const, entityId: "e1" };

describe("ParticipationJoinButton", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders join button", () => {
    render(<ParticipationJoinButton {...defaultProps} />);
    expect(screen.getByTestId("join-btn")).toBeInTheDocument();
  });

  it("displays entity type label", () => {
    render(<ParticipationJoinButton {...defaultProps} />);
    expect(screen.getByText("Join EVENT")).toBeInTheDocument();
  });

  it("calls handleJoin on click", async () => {
    const user = userEvent.setup();
    render(<ParticipationJoinButton {...defaultProps} />);
    await user.click(screen.getByTestId("join-btn"));
    expect(handleJoinMock).toHaveBeenCalled();
  });

  it("disables button while loading", () => {
    vi.mock("@features/participation/model/useJoinParticipation", () => ({
      useJoinParticipation: () => ({
        handleJoin: handleJoinMock,
        isLoading: true,
      }),
    }));
    render(<ParticipationJoinButton {...defaultProps} />);
  });

  it("calls onSuccess when provided", async () => {
    const onSuccess = vi.fn();
    render(<ParticipationJoinButton {...defaultProps} onSuccess={onSuccess} />);
    expect(screen.getByTestId("join-btn")).toBeInTheDocument();
  });
});
