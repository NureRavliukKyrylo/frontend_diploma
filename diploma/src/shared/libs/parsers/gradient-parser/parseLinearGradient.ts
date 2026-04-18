interface GradientStop {
  color: string;
  offset: string;
}

interface ParsedGradient {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  stops: GradientStop[];
}

export const parseLinearGradient = (
  gradient: string,
): ParsedGradient | null => {
  const match = gradient.match(/linear-gradient\((.+)\)/s);
  if (!match) return null;

  const parts = match[1].split(",").map((s) => s.trim());
  const angleDeg = parseFloat(parts[0]);
  const angle = (angleDeg * Math.PI) / 180;

  const stops = parts.slice(1).map((part) => {
    const stopMatch = part.match(/(.+?)\s+([\d.]+%)/);
    if (!stopMatch) return { color: part, offset: "0%" };
    return { color: stopMatch[1].trim(), offset: stopMatch[2] };
  });

  return {
    x1: (0.5 - Math.sin(angle) * 0.5).toFixed(3),
    y1: (0.5 + Math.cos(angle) * 0.5).toFixed(3),
    x2: (0.5 + Math.sin(angle) * 0.5).toFixed(3),
    y2: (0.5 - Math.cos(angle) * 0.5).toFixed(3),
    stops,
  };
};
