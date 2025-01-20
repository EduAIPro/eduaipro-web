import React from "react";
import NotificationItems from "@/components/dashboard/Notification/NotificationItems";

const NotificationLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex justify-between h-screen">
      {/* notificaiton items */}
      <div className="hidden md:flex w-full md:w-[35%] lg:w-[30%]">
        <NotificationItems />
      </div>
      <div className="flex w-full md:w-[60%] lg:w-[65%]">{children}</div>
    </div>
  );
};

export default NotificationLayout;
