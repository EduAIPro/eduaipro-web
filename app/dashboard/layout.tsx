"use client";
export const dynamic = "force-static";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home2,
  MedalStar,
  NotificationBing,
  ProfileCircle,
  RouteSquare,
} from "iconsax-react";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import Typography from "@/components/common/ui/Typography";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", path: "/overview", id: "overview", icon: <Home2 /> },
    {
      name: "Personal Development Plan (PDP)",
      path: "/personal-development-plan",
      id: "pdp",
      icon: <RouteSquare />,
    },
    {
      name: "Certification status",
      path: "/certification-status",
      id: "certification",
      icon: <MedalStar />,
    },
    {
      name: "Profile",
      id: "profile",
      path: "/profile",
      icon: <ProfileCircle />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      id: "notifications",
      icon: <NotificationBing />,
    },
    // { name: "Logout", path: "/logout" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setSidebarOpen(false); // Close the sidebar on mobile after navigation
  };

  return (
    <div
      className={`${
        sidebarOpen ? "lg:ml-64" : "lg:ml-20"
      } transition-all duration-700 flex h-screen bg-gray-50`}
    >
      {/* Sidebar */}
      <div
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed inset-y-0 left-0 z-50 max-md:w-full md:w-64 max-md:bg-black/20 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:w-20"
        }  transition-all lg:translate-x-0 duration-500`}
      >
        <div
          className={`h-full max-md:w-64 ${
            sidebarOpen ? "translate-x-0" : "lg:w-full"
          } bg-white`}
        >
          <div
            className={`flex items-center ${
              !sidebarOpen ? "justify-center" : "justify-between"
            } p-4 border-b`}
          >
            {sidebarOpen ? (
              <Image
                src="/assets/images/logo-outline.png"
                width={120}
                height={70}
                alt=""
              />
            ) : null}
            <button
              className="p-2 border rounded-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <RxHamburgerMenu className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <nav className="mt-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                id={item.id}
                onClick={() => handleNavigation(`/dashboard${item.path}`)}
                className={`w-full duration-300 flex items-center ${
                  !sidebarOpen ? "justify-center px-0" : "px-4 gap-4"
                } py-3 text-left text-gray-700 hover:bg-blue-100 hover:text-brand-1002 ${
                  pathname.includes(item.path)
                    ? "bg-blue-50 !text-brand-1001"
                    : ""
                }`}
              >
                {item.icon}
                <Typography.P weight="medium">
                  {sidebarOpen ? item.name : null}
                </Typography.P>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-1 flex-col transition-all duration-700`}>
        {/* Header */}
        <header className="flex items-center justify-between p-4 md:hidden bg-white">
          <Image
            src="/assets/images/logo-outline.png"
            width={120}
            height={70}
            alt=""
          />
          {!sidebarOpen ? (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 border rounded-lg"
            >
              <RxHamburgerMenu className="w-4 h-4 text-gray-600" />
            </button>
          ) : null}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="min-h-screen bg-white rounded-lg p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
