export type Position = "topleft" | "topright" | "bottomleft" | "bottomright";

export const positionStyles: Record<Position, React.CSSProperties> = {
  topleft: { top: 20, left: 20 },
  topright: { top: 20, right: 20 },
  bottomleft: { bottom: 20, left: 20 },
  bottomright: { bottom: 20, right: 20 },
};
