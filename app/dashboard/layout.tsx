"use client";
export const dynamic = "force-static";
import Typography from "@/components/common/ui/Typography";
import { MedalStar, ProfileCircle, RouteSquare } from "iconsax-react";
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
    // { name: "Overview", path: "/overview", id: "overview", icon: <Home2 /> },
    {
      name: "Personal Development Plan (PDP)",
      path: "/personal-development-plan",
      id: "pdp",
      icon: <RouteSquare size={18} />,
    },
    {
      name: "Certification status",
      path: "/certification-status",
      id: "certification",
      icon: <MedalStar size={18} />,
    },
    {
      name: "Profile",
      id: "profile",
      path: "/profile",
      icon: <ProfileCircle size={18} />,
    },
    {
      name: "Quiz",
      id: "quiz",
      path: "/quiz",
      icon: <ProfileCircle size={18} />,
    },
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
      className={`transition-all duration-300 flex flex-col min-h-screen bg-gray-50`}
    >
      {/* Sidebar */}
      <div
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`sticky inset-x-0 w-full z-50 max-md:bg-black/20 h-fit shadow-sm transform transition-all duration-500 max-sm:fixed bottom-0`}
      >
        <div
          className={`flex items-center gap-12 bg-white py-3 px-4 max-sm:border-t border-grey-8/20 sm:px-8`}
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
            {/* <button
              className="p-2 border rounded-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <RxHamburgerMenu className="w-4 h-4 text-gray-600" />
            </button> */}
          </div>
          <nav className="flex items-center gap-3 max-sm:justify-between max-sm:w-full">
            {menuItems.map((item, index) => (
              <button
                key={item.name}
                id={item.id}
                onClick={() => handleNavigation(`/dashboard${item.path}`)}
                className={`w-full duration-300 flex max-sm:flex-col items-center px-3 gap-2 rounded-md py-2 text-left text-gray-700 hover:bg-blue-100 hover:text-brand-1002 ${
                  pathname.includes(item.path)
                    ? "bg-blue-50 !text-brand-1001"
                    : ""
                }`}
              >
                {item.icon}
                <Typography.P
                  weight="medium"
                  className="whitespace-nowrap max-sm:!text-sm max-sm:text-grey-11/90"
                >
                  {index === 0 &&
                  documentWindow &&
                  documentWindow.screen.width < 640
                    ? "PDP"
                    : item.name}
                </Typography.P>
              </button>
            ))}
          </nav>
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
          <div className="min-h-screen bg-white rounded-lg p-2 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
