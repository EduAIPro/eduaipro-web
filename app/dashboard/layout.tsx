"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CloseSquare, Menu } from "iconsax-react";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Settings", path: "/settings" },
    { name: "Profile", path: "/profile" },
    { name: "Logout", path: "/logout" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setSidebarOpen(false); // Close the sidebar on mobile after navigation
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h1 className="text-lg font-semibold text-blue-600">EduAiPro</h1>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <CloseSquare className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <nav className="mt-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`block w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
                pathname === item.path && "bg-blue-100 text-blue-600"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-4 bg-white shadow-md lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-blue-600">EduAiPro</h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
