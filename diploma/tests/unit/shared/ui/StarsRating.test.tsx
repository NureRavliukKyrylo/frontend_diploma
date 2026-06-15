import { Stars } from "@shared/ui/stars";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@shared/ui/stars/star-icon/StarIcon", () => ({
  StarIcon: ({ fillPercentage, gradient, className, gradientId }: any) => (
    <svg
      data-testid="star-icon"
      data-fill={fillPercentage}
      data-gradient={gradient}
      data-gradient-id={gradientId}
      className={className}
    />
  ),
}));

describe("StarsRating", () => {
  describe("rendering", () => {
    it("renders 5 stars by default", () => {
      render(<Stars value={3} />);
      expect(screen.getAllByTestId("star-icon")).toHaveLength(5);
    });

    it("renders custom maxStars count", () => {
      render(<Stars value={3} maxStars={10} />);
      expect(screen.getAllByTestId("star-icon")).toHaveLength(10);
    });

    it("passes default gradient color to each StarIcon", () => {
      render(<Stars value={3} />);
      screen.getAllByTestId("star-icon").forEach((icon) => {
        expect(icon).toHaveAttribute("data-gradient", "#8C0000");
      });
    });

    it("passes custom gradient to each StarIcon", () => {
      render(<Stars value={3} gradient="#FFD700" />);
      screen.getAllByTestId("star-icon").forEach((icon) => {
        expect(icon).toHaveAttribute("data-gradient", "#FFD700");
      });
    });

    it("passes unique gradientId to each StarIcon", () => {
      render(<Stars value={3} />);
      const ids = screen
        .getAllByTestId("star-icon")
        .map((icon) => icon.getAttribute("data-gradient-id"));
      expect(new Set(ids).size).toBe(5);
    });

    it("applies classNameStar to each StarIcon", () => {
      render(<Stars value={3} classNameStar="gold-star" />);
      screen.getAllByTestId("star-icon").forEach((icon) => {
        expect(icon).toHaveClass("gold-star");
      });
    });
  });

  describe("fill percentages", () => {
    it("fills first star 100% when value >= 1", () => {
      render(<Stars value={3} />);
      expect(screen.getAllByTestId("star-icon")[0]).toHaveAttribute(
        "data-fill",
        "100",
      );
    });

    it("fills a star 0% when value does not reach it", () => {
      render(<Stars value={2} />);
      expect(screen.getAllByTestId("star-icon")[2]).toHaveAttribute(
        "data-fill",
        "0",
      );
    });

    it("clamps negative value to 0% on all stars", () => {
      render(<Stars value={-1} />);
      screen.getAllByTestId("star-icon").forEach((icon) => {
        expect(icon).toHaveAttribute("data-fill", "0");
      });
    });

    it("clamps value above maxStars to 100% on all stars", () => {
      render(<Stars value={99} maxStars={5} />);
      screen.getAllByTestId("star-icon").forEach((icon) => {
        expect(icon).toHaveAttribute("data-fill", "100");
      });
    });

    it("computes 50% fill for a half-star value", () => {
      render(<Stars value={1.5} />);
      expect(screen.getAllByTestId("star-icon")[1]).toHaveAttribute(
        "data-fill",
        "50",
      );
    });
  });

  describe("interactive mode", () => {
    it("does not apply interactive class without onChange", () => {
      const { container } = render(<Stars value={3} />);
      expect(container.firstChild).not.toHaveClass("interactive");
    });

    it("applies interactive class when onChange is provided", () => {
      const { container } = render(<Stars value={3} onChange={vi.fn()} />);
      expect(container.firstChild).toHaveClass("interactive");
    });

    it("calls onChange with correct whole-star value on click", async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Stars value={0} onChange={onChange} />);
      const wrappers = document.querySelectorAll(".starWrapper");
      await user.click(wrappers[2] as HTMLElement);
      expect(onChange).toHaveBeenCalledWith(3);
    });

    it("does not throw when clicked without onChange", async () => {
      const user = userEvent.setup();
      render(<Stars value={3} />);
      const wrappers = document.querySelectorAll(".starWrapper");
      await expect(
        user.click(wrappers[0] as HTMLElement),
      ).resolves.not.toThrow();
    });
  });

  describe("hover behaviour", () => {
    it("updates fill on mouse move over a star", () => {
      const { container } = render(<Stars value={0} onChange={vi.fn()} />);
      const wrappers = container.querySelectorAll(".starWrapper");
      fireEvent.mouseMove(wrappers[2], { clientX: 80 });
      expect(
        Number(screen.getAllByTestId("star-icon")[2].getAttribute("data-fill")),
      ).toBeGreaterThan(0);
    });

    it("resets fill to original value on mouse leave", () => {
      const { container } = render(<Stars value={2} onChange={vi.fn()} />);
      fireEvent.mouseMove(container.querySelectorAll(".starWrapper")[4], {
        clientX: 80,
      });
      fireEvent.mouseLeave(container.querySelector(".stars")!);
      expect(screen.getAllByTestId("star-icon")[2]).toHaveAttribute(
        "data-fill",
        "0",
      );
    });

    it("does not change fill on hover when not interactive", () => {
      const { container } = render(<Stars value={1} />);
      fireEvent.mouseMove(container.querySelectorAll(".starWrapper")[4], {
        clientX: 80,
      });
      expect(screen.getAllByTestId("star-icon")[1]).toHaveAttribute(
        "data-fill",
        "0",
      );
    });
  });

  describe("allowHalf prop", () => {
    const mockStarRect = (el: Element) => {
      vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
        left: 0,
        width: 100,
        top: 0,
        right: 100,
        bottom: 100,
        height: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      });
    };

    it("resolves half value when clicking left half of a star", () => {
      const onChange = vi.fn();
      const { container } = render(
        <Stars value={0} onChange={onChange} allowHalf />,
      );
      const star = container.querySelectorAll(".starWrapper")[1];
      mockStarRect(star);
      fireEvent.click(star, { clientX: 10 });
      expect(onChange).toHaveBeenCalledWith(1.5);
    });

    it("resolves full value when clicking right half of a star", () => {
      const onChange = vi.fn();
      const { container } = render(
        <Stars value={0} onChange={onChange} allowHalf />,
      );
      const star = container.querySelectorAll(".starWrapper")[1];
      mockStarRect(star);
      fireEvent.click(star, { clientX: 60 });
      expect(onChange).toHaveBeenCalledWith(2);
    });

    it("always resolves whole star value when allowHalf is false", () => {
      const onChange = vi.fn();
      const { container } = render(
        <Stars value={0} onChange={onChange} allowHalf={false} />,
      );
      const star = container.querySelectorAll(".starWrapper")[1];
      mockStarRect(star);
      fireEvent.click(star, { clientX: 10 });
      expect(onChange).toHaveBeenCalledWith(2);
    });
  });
});
