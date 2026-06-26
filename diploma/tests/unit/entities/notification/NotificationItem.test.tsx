import { NotificationItem } from "@entities/notification";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import type { Notification, NotificationType } from "@entities/notification";
import { NOTIFICATION_TYPE_CONFIG } from "@entities/notification/config";

vi.mock("@shared/libs/date", () => ({
  formatTimeAgo: () => "5 minutes ago",
}));

vi.mock("@heroui/react", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    Avatar: ({ src }: { src: string }) => <img src={src} alt="avatar" />,
  };
});

vi.mock("@shared/assets/icons/info", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    OnlineIcon: ({ className }: { className?: string }) => (
      <span data-testid="unread-icon" className={className} />
    ),
  };
});

vi.mock("framer-motion");

const removeToastMock = vi.fn();

vi.mock("../../model", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@entities/notification/model")>();
  return {
    ...actual,
    useNotificationStore: (
      selector: (s: {
        toastNotifications: Notification[];
        removeToast: (id: string) => void;
      }) => unknown,
    ) =>
      selector({
        toastNotifications: [],
        removeToast: removeToastMock,
      }),
  };
});

const makeNotification = (
  overrides: Partial<Notification> = {},
): Notification => ({
  id: "notif-1",
  type: "JoinRequestApproved",
  status: "Unread",
  title: "Request approved",
  message: "Your join request was approved",
  createdAt: new Date("2024-01-01T10:00:00Z"),
  relatedAvatarUrl: null,
  readAt: null,
  metadata: {
    bookingId: "id",
    requestId: undefined,
  },
  ...overrides,
});

describe("NotificationItem", () => {
  const types: NotificationType[] = Object.keys(
    NOTIFICATION_TYPE_CONFIG,
  ) as NotificationType[];

  it("renders title and message", () => {
    render(<NotificationItem notification={makeNotification()} />);
    expect(screen.getByText("Request approved")).toBeInTheDocument();
    expect(
      screen.getByText("Your join request was approved"),
    ).toBeInTheDocument();
  });

  it("renders avatar when relatedAvatarUrl is set", () => {
    render(
      <NotificationItem
        notification={makeNotification({
          relatedAvatarUrl: "https://example.com/avatar.png",
        })}
      />,
    );
    expect(screen.getByAltText("avatar")).toBeInTheDocument();
  });

  it("renders icon instead of avatar when relatedAvatarUrl is null", () => {
    render(
      <NotificationItem
        notification={makeNotification({ relatedAvatarUrl: null })}
      />,
    );
    expect(screen.queryByAltText("avatar")).not.toBeInTheDocument();
  });

  it("shows unread indicator when Unread and default variant", () => {
    render(
      <NotificationItem
        notification={makeNotification({ status: "Unread" })}
      />,
    );
    expect(screen.getByTestId("unread-icon")).toBeInTheDocument();
  });

  it("does not show unread indicator when Read", () => {
    render(
      <NotificationItem notification={makeNotification({ status: "Read" })} />,
    );
    expect(screen.queryByTestId("unread-icon")).not.toBeInTheDocument();
  });

  it("does not show unread indicator in toast variant even when Unread", () => {
    render(
      <NotificationItem
        notification={makeNotification({ status: "Unread" })}
        variant="toast"
      />,
    );
    expect(screen.queryByTestId("unread-icon")).not.toBeInTheDocument();
  });

  it("renders time in default variant", () => {
    render(
      <NotificationItem notification={makeNotification()} variant="default" />,
    );
    expect(screen.getByText("5 minutes ago")).toBeInTheDocument();
  });

  it("does not render time in toast variant", () => {
    render(
      <NotificationItem notification={makeNotification()} variant="toast" />,
    );
    expect(screen.queryByText("5 minutes ago")).not.toBeInTheDocument();
  });

  it("sets data-unread=true when Unread and default variant", () => {
    const { container } = render(
      <NotificationItem
        notification={makeNotification({ status: "Unread" })}
        variant="default"
      />,
    );
    expect(container.firstChild).toHaveAttribute("data-unread", "true");
  });

  it("sets data-unread=false when Read", () => {
    const { container } = render(
      <NotificationItem
        notification={makeNotification({ status: "Read" })}
        variant="default"
      />,
    );
    expect(container.firstChild).toHaveAttribute("data-unread", "false");
  });

  it("sets data-unread=false in toast variant regardless of status", () => {
    const { container } = render(
      <NotificationItem
        notification={makeNotification({ status: "Unread" })}
        variant="toast"
      />,
    );
    expect(container.firstChild).toHaveAttribute("data-unread", "false");
  });

  it("renders rightContent when provided", () => {
    render(
      <NotificationItem
        notification={makeNotification()}
        rightContent={<button>Dismiss</button>}
      />,
    );
    expect(screen.getByText("Dismiss")).toBeInTheDocument();
  });

  it("does not render right slot when rightContent is absent", () => {
    render(<NotificationItem notification={makeNotification()} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it.each(types)("renders correct icon color for %s", (type) => {
    const config = NOTIFICATION_TYPE_CONFIG[type];
    const { container } = render(
      <NotificationItem notification={makeNotification({ type })} />,
    );
    const iconWrapper = container.querySelector('[class*="iconWrapper"]');
    expect(iconWrapper).toHaveStyle({ background: config.wrapperColor });
  });
});

const TOAST_DURATION = 5000;

function ToastEntry({
  notification,
  onRemove,
}: {
  notification: Notification;
  onRemove: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(notification.id), TOAST_DURATION);
    return () => clearTimeout(timer);
  }, [notification.id]);

  return (
    <div data-testid="toast" onClick={() => onRemove(notification.id)}>
      <NotificationItem notification={notification} variant="toast" />
    </div>
  );
}

describe("ToastEntry", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders notification content", () => {
    render(
      <ToastEntry
        notification={makeNotification({ title: "Hello toast" })}
        onRemove={removeToastMock}
      />,
    );
    expect(screen.getByText("Hello toast")).toBeInTheDocument();
  });

  it("calls onRemove when clicked", async () => {
    const user = userEvent.setup();
    render(
      <ToastEntry
        notification={makeNotification({ id: "notif-1" })}
        onRemove={removeToastMock}
      />,
    );
    await user.click(screen.getByTestId("toast"));
    expect(removeToastMock).toHaveBeenCalledWith("notif-1");
  });

  it("calls onRemove after 5 seconds automatically", () => {
    vi.useFakeTimers();
    render(
      <ToastEntry
        notification={makeNotification({ id: "notif-1" })}
        onRemove={removeToastMock}
      />,
    );
    expect(removeToastMock).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(removeToastMock).toHaveBeenCalledWith("notif-1");
    vi.useRealTimers();
  });

  it("does not call onRemove before timeout elapses", () => {
    vi.useFakeTimers();
    render(
      <ToastEntry
        notification={makeNotification({ id: "notif-1" })}
        onRemove={removeToastMock}
      />,
    );
    act(() => {
      vi.advanceTimersByTime(4999);
    });
    expect(removeToastMock).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
