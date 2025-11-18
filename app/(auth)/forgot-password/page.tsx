"use client";
import { requestPasswordResetKey } from "@/api/keys";
import { requestPasswordReset } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { trigger, isMutating } = useSWRMutation(
    requestPasswordResetKey,
    requestPasswordReset
  );

  async function onSubmit() {
    try {
      await trigger({ email: email.trim() });

      setIsSuccess(true);
    } catch (error: any) {
      toast.error(error);
    }
  }

  return (
    <div className="max-xs:mt-10 max-lg:mt-20 h-full">
      {isSuccess ? (
        <EmailSent />
      ) : (
        <div className="sm:justify-center flex flex-col h-full lg:max-w-xl mx-auto">
          <div className="w-full space-y-6">
            <div>
              <h2 className="font-semibold text-grey-800 text-2xl">
                Forgot your password?
              </h2>
              <p className="text-base font-medium text-grey-650">
                Enter your email address and {"we'll"} send you a confirmation
                code.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>
                  <p className="font-medium text-base mb-1 text-grey-650">
                    Email
                  </p>
                </Label>
                <Input onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button
                className="w-full"
                loading={isMutating}
                disabled={!email}
                onClick={onSubmit}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const EmailSent = () => {
  return (
    <div className="flex flex-col text-center h-full min-h-[50vh] justify-center max-w-md mx-auto">
      <div className="bg-primary-100 rounded-full size-24 md:size-32 mx-auto flex items-center justify-center">
        <CheckIcon
          strokeWidth={2}
          className="text-primary size-12 md:size-16"
        />
      </div>
      <h2 className="text-2xl font-medium mb-3 mt-6">Email sent</h2>
      <p className="font-medium text-base">
        Check your inbox, {"we've"} sent you instructions (and a link) to reset
        your password. You can safely close this tab.
      </p>
    </div>
  );
};
