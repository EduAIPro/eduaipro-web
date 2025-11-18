import { getSchoolInviteLinkKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SchoolInviteToken } from "@/types/school/invites";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import useSWR from "swr";

export const Referral = () => {
  const { data, isLoading } = useSWR<SchoolInviteToken>(
    getSchoolInviteLinkKey,
    generalFetcher
  );
  return (
    <div className="bg-white p-5 border border-grey-400 rounded-xl space-y-5">
      <div>
        <h2 className="font-semibold text-lg">Referral</h2>
        <p className="font-medium text-grey-500">
          Encourage other schools to become part of the EduAI Pro community
        </p>
      </div>
      <div>
        <div className="border px-2 py-1 flex items-center justify-between w-full rounded-lg">
          {isLoading ? (
            <Skeleton className="w-full h-6 rounded-lg mr-3" />
          ) : (
            <p className="truncate mr-3">
              {process.env.NEXT_PUBLIC_TEACHER_SIGNUP_LINK}&token={data?.token}
            </p>
          )}
          <Button
            disabled={isLoading}
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_TEACHER_SIGNUP_LINK}&token=${data?.token}`
              );
              toast.success("Invite link copied successfully");
            }}
          >
            <CopyIcon className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};
