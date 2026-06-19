import { render, screen } from "@testing-library/react";
import type {
  LevelProgress,
  Rating,
} from "@shared/config/types";
import type { ParticipationMember } from "@entities/participation";
import { EventCard, type Event } from "@entities/event";

vi.mock("@shared/ui", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    AvatarGroup: ({
      avatars,
      maxItems,
    }: {
      avatars: { src: string; name: string }[];
      maxItems?: number;
    }) => {
      const sliced = maxItems ? avatars.slice(0, maxItems) : avatars;
      const remaining = maxItems ? avatars.length - sliced.length : 0;
      return (
        <div data-testid="avatar-group">
          {sliced.map((a, i) => (
            <img key={i} src={a.src} alt={a.name} />
          ))}
          {remaining > 0 && <span data-testid="remaining">+{remaining}</span>}
        </div>
      );
    },
    ProgressCircle: ({ value }: { value: number }) => (
      <div data-testid="progress-circle" aria-valuenow={value} />
    ),
  };
});

vi.mock("@shared/assets/icons/info", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    Comment: () => <span data-testid="comment-icon" />,
    Reccurence: () => <span data-testid="recurrence-icon" />,
    Calendar: () => <span data-testid="calendar-icon" />,
  };
});

vi.mock("@shared/libs/date", () => ({
  formatDateToText: () => "Jan 1, 2024",
}));

vi.mock("@entities/user", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    memberPreviewToAvatar: (m: ParticipationMember) => ({
      src: m.avatarUrl,
      name: `${m.firstName} ${m.lastName}`,
    }),
  };
});

vi.mock("@shared/assets/images/user", () => ({
  DefaultAvatar: "default-avatar.png",
}));

const makeProgress = (
  overrides: Partial<LevelProgress> = {},
): LevelProgress => ({
  currentProgress: 50,
  maxProgress: 100,
  level: 1,
  percent: 50,
  expToNextLevel: 50,
  isMaxLevel: false,
  ...overrides,
});

const makeRating = (overrides: Partial<Rating> = {}): Rating => ({
  value: 4.5,
  totalVotes: 12,
  detailInfo: [],
  ...overrides,
});

const makeMember = (
  overrides: Partial<ParticipationMember> = {},
): ParticipationMember => ({
  userId: "user-1",
  firstName: "Alice",
  lastName: "Green",
  avatarUrl: "https://example.com/alice.png",
  role: { roleId: "role-1", name: "Volunteer" },
  ...overrides,
});

const makeEvent = (overrides: Partial<Event> = {}): Event => ({
  id: "event-1",
  title: "Beach Cleanup",
  description: "Help clean the local beach",
  startAt: "2024-06-01T09:00:00Z",
  endAt: "2024-06-01T17:00:00Z",
  progress: makeProgress(),
  tasksTotal: 10,
  activeTasks: 5,
  organization: {
    id: "org-1",
    name: "Green Earth",
    logoUrl: "https://example.com/logo.png",
  },
  location: { latitude: 0, longitude: 0 },
  memberCount: 3,
  type: "outdoor",
  rating: makeRating(),
  memberPreviews: [],
  recurrence: "",
  status: "active",
  locationInfo: { address: "123 Beach Ave" },
  joinPolicy: "open",
  categories: [],
  skills: [],
  isJoined: false,
  canSubmitFeedback: false,
  hasPendingJoinRequest: false,
  hasPendingLeaveRequest: false,
  ...overrides,
});

describe("EventCard", () => {
  it("renders event title", () => {
    render(<EventCard event={makeEvent()} />);
    expect(screen.getByText("Beach Cleanup")).toBeInTheDocument();
  });

  it("renders event description", () => {
    render(<EventCard event={makeEvent()} />);
    expect(screen.getByText("Help clean the local beach")).toBeInTheDocument();
  });

  it("renders organization name", () => {
    render(<EventCard event={makeEvent()} />);
    expect(screen.getByText("Green Earth")).toBeInTheDocument();
  });

  it("renders fallback organization name when organization is null", () => {
    render(<EventCard event={makeEvent({ organization: undefined })} />);
    expect(screen.getByText("Unknown Organization")).toBeInTheDocument();
  });

  it("renders organization logo", () => {
    render(<EventCard event={makeEvent()} />);
    expect(screen.getByAltText("image organization")).toHaveAttribute(
      "src",
      "https://example.com/logo.png",
    );
  });

  it("renders default avatar when organization logo is missing", () => {
    render(<EventCard event={makeEvent({ organization: undefined })} />);
    expect(screen.getByAltText("image organization")).toHaveAttribute(
      "src",
      "default-avatar.png",
    );
  });

  it("renders formatted end date", () => {
    render(<EventCard event={makeEvent()} />);
    expect(screen.getByText("Jan 1, 2024")).toBeInTheDocument();
  });

  it("renders progress percent", () => {
    render(
      <EventCard
        event={makeEvent({ progress: makeProgress({ percent: 75 }) })}
      />,
    );
    expect(screen.getByText("75 %")).toBeInTheDocument();
  });

  it("renders progress circle with correct value", () => {
    render(
      <EventCard
        event={makeEvent({ progress: makeProgress({ percent: 75 }) })}
      />,
    );
    expect(screen.getByTestId("progress-circle")).toHaveAttribute(
      "aria-valuenow",
      "75",
    );
  });

  it("renders total votes count", () => {
    render(
      <EventCard
        event={makeEvent({ rating: makeRating({ totalVotes: 8 }) })}
      />,
    );
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("renders avatar group when memberPreviews has items", () => {
    render(
      <EventCard
        event={makeEvent({
          memberPreviews: [
            makeMember(),
            makeMember({ userId: "user-2", firstName: "Bob" }),
          ],
        })}
      />,
    );
    expect(screen.getByTestId("avatar-group")).toBeInTheDocument();
  });

  it("renders no volunteers message when memberPreviews is empty", () => {
    render(<EventCard event={makeEvent({ memberPreviews: [] })} />);
    expect(screen.getByText("No volunteers joined yet")).toBeInTheDocument();
  });

  it("does not render avatar group when memberPreviews is empty", () => {
    render(<EventCard event={makeEvent({ memberPreviews: [] })} />);
    expect(screen.queryByTestId("avatar-group")).not.toBeInTheDocument();
  });

  it("slices memberPreviews to max 3 avatars", () => {
    const members = Array.from({ length: 5 }, (_, i) =>
      makeMember({ userId: `user-${i}`, firstName: `User${i}` }),
    );
    render(<EventCard event={makeEvent({ memberPreviews: members })} />);
    expect(screen.getByTestId("remaining")).toHaveTextContent("+2");
  });

  it("renders recurrence info when recurrence is set", () => {
    render(<EventCard event={makeEvent({ recurrence: "Weekly" })} />);
    expect(screen.getByText("Weekly")).toBeInTheDocument();
    expect(screen.getByTestId("recurrence-icon")).toBeInTheDocument();
  });

  it("does not render recurrence info when recurrence is empty", () => {
    render(<EventCard event={makeEvent({ recurrence: "" })} />);
    expect(screen.queryByTestId("recurrence-icon")).not.toBeInTheDocument();
  });
});
