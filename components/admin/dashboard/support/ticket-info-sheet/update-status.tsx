import { ticketsKey } from "@/api/keys";
import { updateTicket } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TicketResolutionStatus } from "@/utils/validation/admin/support";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export const UpdateTicketStatus = ({
  code,
  onSuccess,
}: {
  code: string | undefined;
  onSuccess: VoidFunction;
}) => {
  const [response, setResponse] = useState("");
  const { trigger, isMutating } = useSWRMutation(ticketsKey, updateTicket);
  const { mutate } = useSWRConfig();

  async function onSubmit() {
    try {
      if (code) {
        await trigger({
          code,
          resolutionStatus: TicketResolutionStatus.RESOLVED,
          response,
        });

        toast.success("Ticket resolved successfully");
        setResponse("");
        mutate(ticketsKey);
        onSuccess();
      } else {
        toast.error("Code is missing, please close and reopen this modal");
      }
    } catch (error) {
      toast.error((error as any).toString());
    }
  }
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm text-grey-650">
        Update ticket status
      </h3>
      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-grey-500">Response</p>
          <Input
            placeholder="Add a reply to this ticket"
            value={response}
            className="text-sm"
            onChange={(e) => setResponse(e.target.value)}
          />
        </div>

        <Button
          onClick={onSubmit}
          loading={isMutating}
          disabled={!response || !code}
        >
          Mark as resolved
        </Button>
      </div>
    </div>
  );
};
