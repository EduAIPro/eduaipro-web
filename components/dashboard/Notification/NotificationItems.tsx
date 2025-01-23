"use client";
import Typography from "@/components/common/ui/Typography";
import React from "react";
import { useRouter } from "next/navigation";

const NotificationItems = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 w-full h-full border-r p-2">
      <Typography.H4 className="font-semibold">NOTIFICATIONS</Typography.H4>
      <ul className="flex flex-col gap-3 ">
        {notificationList.map((notification) => (
          <li
            key={notification.id}
            onClick={() =>
              router.push(`/dashboard/notifications/${notification.id}`)
            }
            className="light_shadow p-2 cursor-pointer"
          >
            <p className="font-semibold">{notification.title}</p>
            <span className="line-clamp-1 text-sm">{notification.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationItems;

const notificationList = [
  {
    id: "1",
    title: "First Notification",
    content:
      "Some message about timeline or notificaition Some message about timeline or notificaition Some message about timeline or notificaition Some message about timeline or notificaition Some message about timeline or notificaition Some message about timeline or notificaition",
  },
  {
    id: "2",
    title: "Second Notification",
    content:
      "Some message about timeline or notificaition Some message about timeline or notificaition Some message about timeline or notificaition Some message about timeline or notificaition Some message about timeline or notificaition Some message about timeline or notificaition",
  },
  {
    id: "3",
    title: "Third Notification",
    content:
      "Some message about timeline or notificaition Some message about timeline or notificaition Some message about timeline or notificaition Some message about timeline or notificaition Some message about timeline or notificaition Some message about timeline or notificaition",
  },
];
