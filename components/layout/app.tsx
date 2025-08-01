"use client";
import Container from "@/components/common/ui/Container";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function AppLayoutBase({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const AUTH_PATHS = ["/login", "/register"];
  const LANDING_PATHS = ["/", "/faq", "/courses"];
  const DefaultLayout = ({ children }: { children: ReactNode }) => (
    <main>{children}</main>
  );
  let AppLayout: ({
    children,
  }: {
    children: React.ReactNode;
  }) => React.JSX.Element = Container;
  if (LANDING_PATHS.includes(pathname)) {
    AppLayout = Container;
  }
  if (AUTH_PATHS.includes(pathname)) {
    DefaultLayout.displayName = "LoginLayout";
    AppLayout = DefaultLayout;
  }
  if (pathname.includes("/dashboard")) {
    DefaultLayout.displayName = "DashboardLayout";
    AppLayout = DefaultLayout;
  }
  return (
    <Theme>
      <AppLayout>{children}</AppLayout>
    </Theme>
  );
}
