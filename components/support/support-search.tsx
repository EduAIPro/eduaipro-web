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
    <SearchWithActions<Support>
      data={supports}
      searchKeys={["ticketName", "requester", "assignee"]}
      placeholder="Search Ticket"
      onSearch={onSearch}
      extraActions={
        <>
          <Button
            variant="ghost"
            className="p-[10px] flex items-center text-[#656565]">
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
              <>
                {/* <Button variant="default"> */}
                  <Plus />
                  Add Ticket
                {/* </Button> */}
              </>
            }
            onSend={handleAddTicket}
          />
        </>
      }
    />
  );
}
