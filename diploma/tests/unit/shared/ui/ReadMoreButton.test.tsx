import { ReadMoreButton } from "@shared/ui/buttons";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, style, animate, ref }: any) => (
      <div
        ref={ref}
        className={className}
        style={style}
        data-animate={JSON.stringify(animate)}
      >
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const SHORT_CONTENT = <p>Short text</p>;
const LONG_CONTENT = <p>Long text that exceeds collapsed height</p>;

const mockTallContent = (scrollHeight: number) => {
  Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
    configurable: true,
    get: () => scrollHeight,
  });
};

const mockShortContent = () => mockTallContent(40);
const mockLongContent = (collapsedHeight = 80) =>
  mockTallContent(collapsedHeight + 50);

describe("ReadMoreButton", () => {
  afterEach(() => {
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      get: () => 0,
    });
  });

  describe("rendering", () => {
    it("renders children", () => {
      render(<ReadMoreButton>Short text</ReadMoreButton>);
      expect(screen.getByText("Short text")).toBeInTheDocument();
    });

    it("applies className to container", () => {
      const { container } = render(
        <ReadMoreButton className="custom-class">content</ReadMoreButton>,
      );
      expect(container.firstChild).toHaveClass("readMoreContainer");
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("sets --gradient-color CSS variable with default value", () => {
      const { container } = render(<ReadMoreButton>content</ReadMoreButton>);
      expect(container.firstChild).toHaveStyle({
        "--gradient-color": "255, 255, 255",
      });
    });

    it("sets custom --gradient-color CSS variable", () => {
      const { container } = render(
        <ReadMoreButton gradientColor="0, 0, 0">content</ReadMoreButton>,
      );
      expect(container.firstChild).toHaveStyle({
        "--gradient-color": "0, 0, 0",
      });
    });
  });

  describe("button visibility", () => {
    it("does not show button when content is shorter than collapsedHeight", () => {
      mockShortContent();
      render(<ReadMoreButton>{SHORT_CONTENT}</ReadMoreButton>);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("shows button when content exceeds collapsedHeight", () => {
      mockLongContent();
      render(<ReadMoreButton>{LONG_CONTENT}</ReadMoreButton>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("shows button with custom collapsedHeight", () => {
      mockTallContent(200);
      render(
        <ReadMoreButton collapsedHeight={150}>{LONG_CONTENT}</ReadMoreButton>,
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("does not show button when content equals collapsedHeight exactly", () => {
      mockTallContent(80);
      render(
        <ReadMoreButton collapsedHeight={80}>{SHORT_CONTENT}</ReadMoreButton>,
      );
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("button text", () => {
    it("shows default 'Read more' text when collapsed", () => {
      mockLongContent();
      render(<ReadMoreButton>{LONG_CONTENT}</ReadMoreButton>);
      expect(screen.getByRole("button")).toHaveTextContent("Read more");
    });

    it("shows custom buttonText when collapsed", () => {
      mockLongContent();
      render(
        <ReadMoreButton buttonText="Show more">{LONG_CONTENT}</ReadMoreButton>,
      );
      expect(screen.getByRole("button")).toHaveTextContent("Show more");
    });

    it("shows default 'Read less' text when expanded", async () => {
      mockLongContent();
      const user = userEvent.setup();
      render(<ReadMoreButton>{LONG_CONTENT}</ReadMoreButton>);
      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("button")).toHaveTextContent("Read less");
    });

    it("shows custom buttonTextCollapsed when expanded", async () => {
      mockLongContent();
      const user = userEvent.setup();
      render(
        <ReadMoreButton buttonTextCollapsed="Show less">
          {LONG_CONTENT}
        </ReadMoreButton>,
      );
      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("button")).toHaveTextContent("Show less");
    });
  });

  describe("expand / collapse interaction", () => {
    it("toggles to expanded state on button click", async () => {
      mockLongContent();
      const user = userEvent.setup();
      render(<ReadMoreButton>{LONG_CONTENT}</ReadMoreButton>);
      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("button")).toHaveTextContent("Read less");
    });

    it("toggles back to collapsed state on second click", async () => {
      mockLongContent();
      const user = userEvent.setup();
      render(<ReadMoreButton>{LONG_CONTENT}</ReadMoreButton>);
      await user.click(screen.getByRole("button"));
      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("button")).toHaveTextContent("Read more");
    });

    it("applies custom classNameButton to button", () => {
      mockLongContent();
      render(
        <ReadMoreButton classNameButton="btn-custom">
          {LONG_CONTENT}
        </ReadMoreButton>,
      );
      expect(screen.getByRole("button")).toHaveClass("readMoreButton");
      expect(screen.getByRole("button")).toHaveClass("btn-custom");
    });

    it("button has type='button' to prevent form submission", () => {
      mockLongContent();
      render(<ReadMoreButton>{LONG_CONTENT}</ReadMoreButton>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("button click stops event propagation", async () => {
      mockLongContent();
      const parentClick = vi.fn();
      const user = userEvent.setup();
      render(
        <div onClick={parentClick}>
          <ReadMoreButton>{LONG_CONTENT}</ReadMoreButton>
        </div>,
      );
      await user.click(screen.getByRole("button"));
      expect(parentClick).not.toHaveBeenCalled();
    });
  });

  describe("gradient overlay", () => {
    it("shows gradient when content is tall and collapsed", () => {
      mockLongContent();
      const { container } = render(
        <ReadMoreButton>{LONG_CONTENT}</ReadMoreButton>,
      );
      expect(container.querySelector(".gradient")).toBeInTheDocument();
    });

    it("hides gradient when expanded", async () => {
      mockLongContent();
      const user = userEvent.setup();
      const { container } = render(
        <ReadMoreButton>{LONG_CONTENT}</ReadMoreButton>,
      );
      await user.click(screen.getByRole("button"));
      expect(container.querySelector(".gradient")).not.toBeInTheDocument();
    });

    it("does not render gradient when content is short", () => {
      mockShortContent();
      const { container } = render(
        <ReadMoreButton>{SHORT_CONTENT}</ReadMoreButton>,
      );
      expect(container.querySelector(".gradient")).not.toBeInTheDocument();
    });
  });

  describe("resize listener", () => {
    it("adds resize listener on mount", () => {
      const addSpy = vi.spyOn(window, "addEventListener");
      render(<ReadMoreButton>{LONG_CONTENT}</ReadMoreButton>);
      expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    });

    it("removes resize listener on unmount", () => {
      const removeSpy = vi.spyOn(window, "removeEventListener");
      const { unmount } = render(
        <ReadMoreButton>{LONG_CONTENT}</ReadMoreButton>,
      );
      unmount();
      expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    });

    it("re-evaluates button visibility on window resize", () => {
      mockShortContent();
      render(<ReadMoreButton>{LONG_CONTENT}</ReadMoreButton>);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();

      mockLongContent();
      act(() => {
        window.dispatchEvent(new Event("resize"));
      });
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });
});
