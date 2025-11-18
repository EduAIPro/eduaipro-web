import { Link2Icon, PlusIcon } from "lucide-react";

import { getSchoolInviteLinkKey, schoolInviteKey } from "@/api/keys";
import { sendInvitation } from "@/api/mutations";
import { generalFetcher } from "@/api/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { SchoolInviteToken } from "@/types/school/invites";
import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const InviteSchoolModal = () => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useSWR<SchoolInviteToken>(
    getSchoolInviteLinkKey,
    generalFetcher
  );

  const { trigger, isMutating } = useSWRMutation(
    schoolInviteKey,
    sendInvitation
  );

  async function handleSendInvite() {
    try {
      if (email) {
        await trigger({ email });
        toast.success("Invitation email sent successfully");
        setEmail("");
        setIsOpen(false);
      } else {
        toast.error("An email is required");
      }
    } catch (error) {
      toast.error(error as string);
    }
  }
  return (
    <Modal
      open={isOpen}
      title="Invite school"
      trigger={
        <Button onClick={() => setIsOpen(!isOpen)} className="max-sm:w-full">
          <PlusIcon strokeWidth={2} />
          <p className="font-medium">Invite school</p>
        </Button>
      }
      toggleModal={(v) => setIsOpen(v)}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="relative w-full">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="h-11"
              disabled={isMutating}
            />
            <Button
              size="sm"
              disabled={!email}
              loading={isMutating}
              onClick={handleSendInvite}
              className="absolute right-1 top-1 bottom-0.5 !scale-100"
            >
              Send invite
            </Button>
          </div>
          <Button
            variant="ghost"
            loading={isLoading}
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_SCHOOL_SIGNUP_LINK}&token=${data?.token}`
              );
              toast.success("Invite link copied successfully");
            }}
          >
            <div className="flex items-center gap-1 text-primary-400 hover:underline cursor-pointer">
              <Link2Icon className="-rotate-45 size-4" />
              <p className="text-sm">Copy invite link</p>
            </div>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
