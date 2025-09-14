"use client";
import { confirmVerifyEmailKey, requestVerifyEmailKey } from "@/api/keys";
import { confirmEmailVerification, requestVerifyEmail } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const userEmail = searchParams.get("email");
  const userRole = searchParams.get("role");

  const { trigger, isMutating } = useSWRMutation(
    confirmVerifyEmailKey,
    confirmEmailVerification
  );

  const { trigger: resendVerification, isMutating: isResendingVerification } =
    useSWRMutation(requestVerifyEmailKey, requestVerifyEmail);

  async function onSubmit() {
    if (!otp.trim() || otp.length < 6) {
      toast.error("Invalid OTP");
      return;
    }
    try {
      await trigger({ token: otp });

      toast.success("Email verification successful 🎉");

      if (userRole === "TEACHER") {
        router.push("/dashboard");
      } else if (userRole === "OWNER") {
        router.push("/school");
      } else {
        router.push("/admin");
      }
    } catch (error: any) {
      toast.error(error);
    }
  }

  const handleResendCode = async () => {
    // Start the timer again
    const timer = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);

    // Resend the verification code
    if (userEmail) {
      await resendVerification({ email: decodeURIComponent(userEmail) });
      setCanResend(false);
      setCounter(60);
      setOtp("");
    }
  };

  useEffect(() => {
    // Start countdown for OTP expiry
    const timer = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
        <div className={cn("flex items-center gap-3 mt-6")}>
          <p className="">
            {canResend ? "" : `Didn't get the code? resend in ${counter}s`}
          </p>

          <Button
            loading={isResendingVerification}
            disabled={!canResend}
            onClick={handleResendCode}
            variant="ghost"
            className={cn(
              "flex items-center gap-2",
              canResend ? "" : "opacity-50"
            )}
          >
            <p className={cn(canResend ? "text-primary-400" : "text-grey-500")}>
              Resend Code
            </p>
          </Button>
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

const WrappedComponent = () => {
  return (
    <Suspense>
      <VerifyEmail />
    </Suspense>
  );
};

export default WrappedComponent;
