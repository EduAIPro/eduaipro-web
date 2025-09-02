import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import SearchWithActions from "../shared-components/shared-search-input";
import AdminModal from "./admin-modal";
import { Admin } from "@/app/types/admin";

interface AdminSearchProps {
  admins: Admin[];
  onSearch: (filtered: Admin[]) => void;
}

export default function AdminSearch({ admins, onSearch }: AdminSearchProps) {
  const handleSendNotification = (message: string) => {
    console.log("Notification sent:", message);
  };

  return (
    <SearchWithActions<Admin>
      data={admins}
      searchKeys={["name", "position", "schoolAffiliation"]}
      placeholder="Search Admin"
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

          <AdminModal
            triggerButtonText={
              <>
                <Plus />
                Invite Admin
              </>
            }
            onSend={handleSendNotification}
          />
        </>
      }
    />
  );
}
