import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { NotificationBing } from "iconsax-react";
import React, { useEffect, useState } from "react";

interface Notification {
  id: number;
  title: string;
  description: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  onExpand: (id: number) => void;
  onReadStateChange: (id: number, read: boolean) => void;
  isExpanded: boolean;
}

// Dummy data
const dummyNotifications: Notification[] = [
  {
    id: 1,
    title: "Upcoming Exam",
    description: "You've got an exam coming up",
    content:
      "You have an upcoming exam on the 7th of August 2025. Prepare yourself, revise your learnings and get ready to ace it!",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 11,
    title: "Upcoming Exam",
    description: "You've got an exam coming up",
    content:
      "You have an upcoming exam on the 7th of August 2025. Prepare yourself, revise your learnings and get ready to ace it!",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "System Update",
    description: "Important system changes have been applied",
    content:
      "We've updated our core systems to provide better performance and security. The changes include improved database optimization, enhanced security protocols, and better user authentication mechanisms.",
    timestamp: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Upcoming Exam",
    description: "You've got an exam coming up",
    content:
      "You have an upcoming exam on the 7th of August 2025. Prepare yourself, revise your learnings and get ready to ace it!",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: 4,
    title: "Upcoming Exam",
    description: "You've got an exam coming up",
    content:
      "You have an upcoming exam on the 7th of August 2025. Prepare yourself, revise your learnings and get ready to ace it!",
    timestamp: "2 days ago",
    read: true,
  },
];

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onExpand,
  onReadStateChange,
  isExpanded,
}) => {
  const [isLeaving, setIsLeaving] = useState<boolean>(false);

  useEffect(() => {
    if (!isExpanded && !isLeaving) {
      // Start the leaving timer when notification is collapsed
      setIsLeaving(true);
      const timer = setTimeout(() => {
        onReadStateChange(notification.id, true);
      }, 300); // Delay matches animation duration
      return () => clearTimeout(timer);
    }
  }, [isExpanded, notification.id, onReadStateChange, isLeaving]);

  useEffect(() => {
    // Reset leaving state when expanded
    if (isExpanded) {
      setIsLeaving(false);
    }
  }, [isExpanded]);

  return (
    <motion.div
      layout
      onClick={() => onExpand(notification.id)}
      className={`cursor-pointer p-4 border-b last:border-b-0 hover:bg-gray-50 ${
        notification.read ? "bg-white" : "bg-blue-50"
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-sm">{notification.title}</h3>
        <span className="text-xs text-gray-500">{notification.timestamp}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{notification.description}</p>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2"
          >
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
              {notification.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Notifications: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [notifications, setNotifications] =
    useState<Notification[]>(dummyNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const readNotifications = notifications.filter((n) => n.read);
  const unreadNotifications = notifications.filter((n) => !n.read);

  const handleExpand = (id: number): void => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleReadStateChange = (id: number, read: boolean): void => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read } : n))
    );
  };

  const tabsClass =
    "relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 text-sm font-semibold text-gray-500 shadow-none transition-none data-[state=active]:border-b-accent-900 data-[state=active]:bg-transparent data-[state=active]:text-gray-800 data-[state=active]:shadow-none";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <NotificationBing size={20} className="h-14 w-14" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className="w-96 p-0 border-gray-100 xs:mr-10 rounded-lg"
      >
        <Tabs defaultValue="unread" className="w-full">
          <div className="flex flex-col justify-between px-4 pt-3 border-b">
            <h2 className="font-medium text-lg mb-2 text-center">
              Notifications
            </h2>
            <TabsList className="grid grid-cols-2 bg-transparent rounded-none">
              <TabsTrigger value="unread" className={tabsClass}>
                Unread
                {unreadCount > 0 && (
                  <span className="ml-3 text-xs bg-blue-100 text-blue-600 px-1.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="read" className={tabsClass}>
                Read
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="unread" className="mt-0">
            <ScrollArea className="h-[300px]">
              {unreadNotifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No unread notifications
                </div>
              ) : (
                unreadNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onExpand={handleExpand}
                    onReadStateChange={handleReadStateChange}
                    isExpanded={expandedId === notification.id}
                  />
                ))
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="read" className="mt-0">
            <ScrollArea className="h-[300px]">
              {readNotifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No read notifications
                </div>
              ) : (
                readNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onExpand={handleExpand}
                    onReadStateChange={handleReadStateChange}
                    isExpanded={expandedId === notification.id}
                  />
                ))
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
