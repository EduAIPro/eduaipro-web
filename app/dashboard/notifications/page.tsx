import React from "react";
import { NotificationBing } from "iconsax-react";
import NotificationItems from "@/components/dashboard/Notification/NotificationItems";
import Typography from "@/components/common/ui/Typography";

const NotificationsPage = () => {
  return (
    <div className="flex flex-col gap-1 w-full h-full">
      <div className="flex md:hidden h-full">
        <NotificationItems />
      </div>

      <div className="hidden md:flex flex-col gap-3 items-center justify-center h-full -mt-10">
        <div className="flex items-center justify-center border-2 border-brand-1001 w-28 h-28 rounded-full">
          <NotificationBing size={50} className="text-brand-1001" />
        </div>
        <Typography.P>Your Notification details will show here</Typography.P>
      </div>
    </div>
  );
};

export default NotificationsPage;
