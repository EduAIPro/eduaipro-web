import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import SearchWithActions from "../shared-components/shared-search-input";
import NotificationModal from "./notification-modal";
import { Teacher } from "@/app/types/teacher";

interface TeacherSearchProps {
  teachers: Teacher[];
  onSearch: (filtered: Teacher[]) => void;
}

export default function TeacherSearch({
  teachers,
  onSearch,
}: TeacherSearchProps) {
  const handleSendNotification = (message: string) => {
    console.log("Notification sent:", message);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">

      <div className="w-full md:flex-1">
        <SearchWithActions<Teacher>
          data={teachers}
          searchKeys={["name", "email", "school"]}
          placeholder="Search Teacher"
          onSearch={onSearch}
        />
      </div>

      
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
        <Button
          variant="ghost"
          className="p-[10px] flex items-center text-[#656565] w-full md:w-auto border">
          <Image
            src="/assets/images/Vector.svg"
            alt="filter"
            width={15}
            height={13.5}
          />
          Filter
        </Button>

        <NotificationModal
          triggerButtonText={
            <div className="flex items-center gap-2">
              <Image
                src="/assets/images/Group.svg"
                alt="group"
                width={15}
                height={16}
              />
              Send Notification
            </div>
          }
          onSend={handleSendNotification}
        />

        <Button variant="default" className="w-full md:w-auto">
          <Plus />
          Invite Teacher
        </Button>
      </div>
    </div>
  );
}
