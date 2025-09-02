import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import SearchWithActions from "../shared-components/shared-search-input";
import AddTicketModal from "./notification-modal";
import { Support } from "@/app/types/support";

interface SupportSearchProps {
  supports: Support[];
  onSearch: (filtered: Support[]) => void;
}

export default function SupportSearch({
  supports,
  onSearch,
}: SupportSearchProps) {
  const handleAddTicket = (message: string) => {
    console.log("Added Ticket:", message);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 w-full">
      
      <div className="flex-1">
        <SearchWithActions<Support>
          data={supports}
          searchKeys={["ticketName", "requester", "assignee"]}
          placeholder="Search Ticket"
          onSearch={onSearch}
        />
      </div>

  
      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
        <Button
          variant="ghost"
          className="p-[10px] flex items-center text-[#656565] border"
        >
          <Image
            src="/assets/images/Vector.svg"
            alt="filter"
            width={15}
            height={13.5}
          />
          Filter
        </Button>

        <AddTicketModal
          triggerButtonText={
            <div className="flex items-center gap-1">
              <Plus className="w-4 h-4" />
              <span>Add Ticket</span>
            </div>
          }
          onSend={handleAddTicket}
        />
      </div>
    </div>
  );
}
