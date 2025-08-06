"use client";
export const dynamic = "force-static";
import { ConfirmLogoutModal } from "@/components/dashboard/common";
import CertIcon from "@/components/svgs/cert-two.svg";
import PDPIcon from "@/components/svgs/pdp.svg";
import { cn } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [documentWindow, setDocumentWindow] = useState<
    null | (Window & typeof globalThis)
  >(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (window && typeof window !== undefined) {
      setDocumentWindow(window);
    }
  }, []);

  const menuItems = [
    {
      name: "Personal Development Plan (PDP)",
      path: "/dashboard",
      id: "dashboard",
      icon: PDPIcon,
    },
    {
      name: "Certificates",
      path: "/dashboard/certificates",
      id: "certification",
      icon: CertIcon,
    },
    {
      name: "Profile",
      id: "profile",
      path: "/dashboard/profile",
      icon: UserIcon,
    },
    // {
    //   name: "Quiz",
    //   id: "quiz",
    //   path: "/quiz",
    //   icon: ProfileCircle,
    // },
    // {
    //   name: "Notifications",
    //   path: "/notifications",
    //   id: "notifications",
    //   icon: <NotificationBing />,
    // },
    // { name: "Logout", path: "/logout" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setSidebarOpen(false); // Close the sidebar on mobile after navigation
  };

  return (
    <div
      className={`transition-all duration-300 flex flex-col min-h-screen bg-[#F9FAFC]`}
    >
      <div
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`relative inset-x-0 w-full z-50 max-md:bg-black/20 h-fit transform transition-all duration-500 max-sm:fixed bottom-0`}
      >
        <div
          className={`flex items-center justify-between gap-12 py-3 px-4 max-sm:border-t border-grey-8/20 sm:px-8`}
        >
          <div className="max-sm:hidden">
            <Link href="/">
              <Image
                src="/assets/images/logo-outline.png"
                width={120}
                height={70}
                alt=""
              />
            </Link>
          </div>
          <nav className="flex items-center gap-3 max-sm:justify-between max-sm:w-full">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.name}
                  id={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "w-full duration-300 flex max-sm:flex-col items-center px-3 gap-2 rounded-md py-2 text-left transition-all hover:bg-primary-100 hover:border hover:border-primary-200",
                    isActive
                      ? "border-primary-200  bg-primary-300/20 !text-primary-400"
                      : ""
                  )}
                >
                  <item.icon
                    color={isActive ? "#0043BE" : "#656565"}
                    size={18}
                  />
                  <p className="font-medium whitespace-nowrap max-sm:!text-sm max-sm:text-grey-650">
                    {index === 0 &&
                    documentWindow &&
                    documentWindow.screen.width < 640
                      ? "PDP"
                      : item.name}
                  </p>
                </button>
              );
            })}
          </nav>

          <ConfirmLogoutModal />
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-1 flex-col transition-all duration-300`}>
        {/* Header */}
        <header className="flex items-center justify-between p-4 md:hidden bg-white">
          <Link href="/">
            <Image
              src="/assets/images/logo-outline.png"
              width={120}
              height={70}
              alt=""
            />
          </Link>
          {/* {!sidebarOpen ? (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 border rounded-lg"
            >
              <RxHamburgerMenu className="w-4 h-4 text-gray-600" />
            </button>
          ) : null} */}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 max-sm:pb-14">
          <div className="p-2 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
