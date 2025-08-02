"use client";
import { confirmVerifyEmailKey } from "@/api/keys";
import { confirmEmailVerification } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(
    confirmVerifyEmailKey,
    confirmEmailVerification
  );

  async function onSubmit() {
    if (!otp.trim() || otp.length < 6) {
      toast.error("Invalid OTP");
      return;
    }
    try {
      await trigger({ token: otp });

      toast.success("Email verification successful 🎉");

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <div className="max-xs:mt-10 max-lg:mt-20 h-full sm:justify-center flex flex-col space-y-6 lg:max-w-xl mx-auto">
      <div>
        <h2 className="font-semibold text-grey-800 text-2xl">
          Verify your email
        </h2>
        <p className="text-base font-medium text-grey-650 mt-2">
          We sent you an email containing your email verification code. Enter it
          here to verify your email address.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <InputOTP
            onChange={(value) => {
              setOtp(value);
            }}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          >
            <InputOTPGroup className="w-full">
              {new Array(6).fill("").map((_, i) => (
                <InputOTPSlot
                  index={i}
                  key={i}
                  className="w-1/6 sm:w-16 h-12 font-medium max-sm:text-lg"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button
          loading={isMutating}
          className="w-full"
          disabled={!otp || otp.length < 6}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
