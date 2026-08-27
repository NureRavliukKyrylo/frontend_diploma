import { CalendarEventItem } from "@shared/ui/calendar";
import { render, screen } from "@testing-library/react";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    params,
    search,
    className,
    "data-view": dataView,
  }: any) => (
    <a
      href={to}
      data-testid="event-link"
      data-params={params ? JSON.stringify(params) : undefined}
      data-search={search ? JSON.stringify(search) : undefined}
      className={className}
      data-view={dataView}
    >
      {children}
    </a>
  ),
}));

vi.mock("@shared/config/constants", () => ({
  EVENT_COLOR: {
    event: "#4A90E2",
    task: "#7ED321",
    offer: "#F5A623",
  },
}));

vi.mock("@shared/libs/date", () => ({
  formatHourTime: vi.fn(() => "10:00"),
}));

vi.mock("./CalendarEventItem.module.scss", () => ({
  default: {
    eventCard: "eventCard",
    blockInfo: "blockInfo",
    titleMonth: "titleMonth",
    eventTitle: "eventTitle",
    wrapper: "wrapper",
    titleWrapper: "titleWrapper",
  },
}));

const buildInfo = ({
  type = "event",
  id = "abc-123",
  title = "Test Event",
  view = "dayGridMonth",
  start = new Date("2024-06-15T10:00:00"),
  allDay = false,
}: {
  type?: string;
  id?: string;
  title?: string;
  view?: string;
  start?: Date | null;
  allDay?: boolean;
} = {}) =>
  ({
    event: {
      id,
      title,
      start,
      allDay,
      extendedProps: { type },
    },
    view: { type: view },
  }) as any;

describe("CalendarEventItem", () => {
  describe("month view (dayGridMonth)", () => {
    it("renders the event title", () => {
      render(<CalendarEventItem info={buildInfo({ title: "My Event" })} />);
      expect(screen.getByText("My Event")).toBeInTheDocument();
    });

    it("renders colored block indicator", () => {
      const { container } = render(<CalendarEventItem info={buildInfo()} />);
      const block = container.querySelector(".blockInfo");
      expect(block).toHaveStyle({ background: "#4A90E2" });
    });

    it("renders formatted start time when start is set and not allDay", () => {
      render(
        <CalendarEventItem
          info={buildInfo({
            start: new Date("2024-06-15T10:00:00"),
            allDay: false,
          })}
        />,
      );
      expect(screen.getByText(/10:00/)).toBeInTheDocument();
    });

    it("does not render time when allDay is true", () => {
      render(<CalendarEventItem info={buildInfo({ allDay: true })} />);
      expect(screen.queryByText("10:00")).not.toBeInTheDocument();
    });

    it("does not render time when start is null", () => {
      render(<CalendarEventItem info={buildInfo({ start: null })} />);
      expect(screen.queryByText("10:00")).not.toBeInTheDocument();
    });

    it("does not render the week/day wrapper div", () => {
      const { container } = render(<CalendarEventItem info={buildInfo()} />);
      expect(container.querySelector(".wrapper")).not.toBeInTheDocument();
    });

    it("sets data-view attribute to view type", () => {
      render(<CalendarEventItem info={buildInfo({ view: "dayGridMonth" })} />);
      expect(screen.getByTestId("event-link")).toHaveAttribute(
        "data-view",
        "dayGridMonth",
      );
    });
  });

  describe("week / day view (non-month)", () => {
    it("renders event title in wrapper", () => {
      render(
        <CalendarEventItem
          info={buildInfo({ view: "timeGridWeek", title: "Weekly Task" })}
        />,
      );
      expect(screen.getByText("Weekly Task")).toBeInTheDocument();
    });

    it("renders colored wrapper background", () => {
      const { container } = render(
        <CalendarEventItem
          info={buildInfo({ view: "timeGridWeek", type: "task" })}
        />,
      );
      const wrapper = container.querySelector(".wrapper");
      expect(wrapper).toHaveStyle({ background: "#7ED321" });
    });

    it("does not render month-view block indicator", () => {
      const { container } = render(
        <CalendarEventItem info={buildInfo({ view: "timeGridWeek" })} />,
      );
      expect(container.querySelector(".blockInfo")).not.toBeInTheDocument();
    });

    it("does not render month title span", () => {
      const { container } = render(
        <CalendarEventItem info={buildInfo({ view: "timeGridWeek" })} />,
      );
      expect(container.querySelector(".titleMonth")).not.toBeInTheDocument();
    });

    it("sets data-view to non-month view type", () => {
      render(<CalendarEventItem info={buildInfo({ view: "timeGridDay" })} />);
      expect(screen.getByTestId("event-link")).toHaveAttribute(
        "data-view",
        "timeGridDay",
      );
    });
  });

  describe("link routing", () => {
    it("links to event route for type 'event'", () => {
      render(
        <CalendarEventItem info={buildInfo({ type: "event", id: "evt-1" })} />,
      );
      const link = screen.getByTestId("event-link");
      expect(link).toHaveAttribute("href", "/events/my/$id");
      expect(link).toHaveAttribute(
        "data-params",
        JSON.stringify({ id: "evt-1" }),
      );
    });

    it("links to activities route with task search params for type 'task'", () => {
      render(
        <CalendarEventItem info={buildInfo({ type: "task", id: "task-99" })} />,
      );
      const link = screen.getByTestId("event-link");
      expect(link).toHaveAttribute("href", "/activities/my");
      expect(link).toHaveAttribute(
        "data-search",
        JSON.stringify({ tab: "tasks", taskId: "task-99" }),
      );
    });

    it("links to offer route for type 'offer'", () => {
      render(
        <CalendarEventItem
          info={buildInfo({ type: "offer", id: "offer-42" })}
        />,
      );
      const link = screen.getByTestId("event-link");
      expect(link).toHaveAttribute("href", "/offers/$id");
      expect(link).toHaveAttribute(
        "data-params",
        JSON.stringify({ id: "offer-42" }),
      );
    });
  });

  describe("event colors", () => {
    it("applies event color for type 'event' in month view", () => {
      const { container } = render(
        <CalendarEventItem info={buildInfo({ type: "event" })} />,
      );
      expect(container.querySelector(".blockInfo")).toHaveStyle({
        background: "#4A90E2",
      });
    });

    it("applies task color for type 'task' in month view", () => {
      const { container } = render(
        <CalendarEventItem info={buildInfo({ type: "task" })} />,
      );
      expect(container.querySelector(".blockInfo")).toHaveStyle({
        background: "#7ED321",
      });
    });

    it("applies offer color for type 'offer' in month view", () => {
      const { container } = render(
        <CalendarEventItem info={buildInfo({ type: "offer" })} />,
      );
      expect(container.querySelector(".blockInfo")).toHaveStyle({
        background: "#F5A623",
      });
    });
  });
});
