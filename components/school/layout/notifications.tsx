import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { BellIcon } from "lucide-react";

type HeaderNotificationsProps = {};

const notifications = [
  {
    title: "Elmer Boyle has just been accredited",
    time: "5 mins ago",
    isRead: false,
  },
  {
    title: "Elmer Boyle has just been accredited",
    time: "5 mins ago",
    isRead: true,
  },
  {
    title: "Elmer Boyle has accepted the invite",
    time: "5 mins ago",
    isRead: false,
  },
  {
    title: "Elmer Boyle has just been accredited",
    time: "5 mins ago",
    isRead: false,
  },
  {
    title: "Elmer Boyle has accepted the invite",
    time: "5 mins ago",
    isRead: true,
  },
];

export const HeaderNotifications = ({}: HeaderNotificationsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="shadow-none max-md:border-none min-w-fit"
        >
          <BellIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:min-w-[450pc]">
        <h2 className="text-base font-semibold text-grey-800/80">
          Notifications
        </h2>
        <ul className="space-y-3">
          {notifications.map((n, i) => (
            <li
              key={i}
              className={cn(
                "flex items-center justify-between",
                n.isRead ? "opacity-50" : "opacity-100"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="bg-grey-700 rounded-full flex-shrink-0 size-8 flex items-center justify-center">
                  <BellIcon className="size-4 text-grey-500" />
                </div>
                <div className="">
                  <h3 className="text-sm font-medium text-gray-800/70">
                    {n.title}
                  </h3>
                  <p>{n.time}</p>
                </div>
              </div>
              <div className="size-2 bg-green-700 rounded-full"></div>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
