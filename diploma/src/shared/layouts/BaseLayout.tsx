import type { ReactNode } from "react";
import { AlertComponent } from "../components";

interface BaseLayoutProps {
  children: ReactNode;
}
export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      {children}
      <AlertComponent />
    </>
  );
}
