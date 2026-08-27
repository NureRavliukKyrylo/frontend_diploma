export const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";

export const isNavItemActive = (pathname: string, href: string) => {
  const current = normalizePath(pathname);
  const target = normalizePath(href);

  if (target === "/admin") {
    return current === target;
  }

  return current === target || current.startsWith(`${target}/`);
};

export const getInitials = (value: string) => {
  const initials = value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "IF";
};
