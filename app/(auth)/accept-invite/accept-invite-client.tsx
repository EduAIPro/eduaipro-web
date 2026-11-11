/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { acceptInviteKey } from "@/api/keys";
import { acceptInvite } from "@/api/mutations";
import LoginForm from "@/components/auth/LoginForm";
import TeacherSignup from "@/components/auth/TeacherSignup";
import useUser from "@/hooks/use-user";
import { AcceptInvitePayload } from "@/types/auth";
import { hasSession, setRoleCookie } from "@/utils/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

function AcceptInviteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { trigger: acceptInviteTrigger } = useSWRMutation(
    acceptInviteKey,
    acceptInvite,
  );

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(null);
  const [sessionCheckFailed, setSessionCheckFailed] = useState(false);
  const {
    user,
    isError: isUserError,
    error: userError,
  } = useUser(!!isUserLoggedIn);

  useEffect(() => {
    hasSession()
      .then(setIsUserLoggedIn)
      .catch((err) => {
        console.error("[accept-invite] session check failed:", err);
        setSessionCheckFailed(true);
        setIsUserLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    if (userError) {
      console.error("[accept-invite] /school/staff failed:", userError);
    }
  }, [userError]);

  // Identity unknown: never auto-accept; manual login path only.
  const identityUnknown = sessionCheckFailed || isUserError;

  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const target = searchParams.get("target");
  const type = searchParams.get("type");
  const isNew = searchParams.get("isNew") === "true";

  const [inviteAccepted, setInviteAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [emailMismatch, setEmailMismatch] = useState(false);
  const hasAttemptedAccept = useRef(false);

  useEffect(() => {
    // If we've already attempted, accepted, or can't confirm who is signed in, do nothing
    if (hasAttemptedAccept.current || inviteAccepted || identityUnknown) return;

    // If logged in and the user record has loaded, accept invite (once)
    if (isUserLoggedIn && user && token && email && target && type) {
      const invitedEmail = decodeURIComponent(email).trim().toLowerCase();
      const currentEmail = (user.email || "").trim().toLowerCase();

      if (invitedEmail !== currentEmail) {
        setEmailMismatch(true);
        return;
      }

      hasAttemptedAccept.current = true;
      setIsProcessing(true);
      acceptInviteTrigger({
        token,
        email: decodeURIComponent(email),
        schoolId: target,
      })
        .then(async () => {
          toast.success("Invitation accepted successfully!");
          await setRoleCookie("TEACHER");
          setInviteAccepted(true);
          router.replace("/dashboard");
        })
        .catch((err: any) => {
          toast.error(
            "Failed to accept invitation: " + (err.message || "Unknown error"),
          );
          router.replace("/dashboard");
        });
    }
  }, [isUserLoggedIn, user, isUserError]);

  // If parameters are missing
  if (!token || !email || !target || !type) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-red-500 text-xl font-bold mb-2">
            Invalid Invitation Link
          </h2>
          <p className="text-gray-600">
            The invitation link you used seems to be missing required
            information.
          </p>
        </div>
      </div>
    );
  }

  // Loading state handling:
  // 1. Fetching user session
  // 2. Processing the invite (if logged in)
  if (
    isUserLoggedIn === null ||
    isProcessing ||
    (isUserLoggedIn && !inviteAccepted && !emailMismatch && !isUserError)
  ) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
          <p className="text-gray-500 font-medium animate-pulse">
            Processing invitation...
          </p>
        </div>
      </div>
    );
  }

  // Logged in, but this invite was sent to a different account
  if (emailMismatch) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-red-500 text-xl font-bold mb-2">
            Wrong Account
          </h2>
          <p className="text-gray-600">
            This invitation was sent to a different account. Sign out and
            open the link again.
          </p>
        </div>
      </div>
    );
  }

  // Prepared data for login form
  const invitationData: AcceptInvitePayload = {
    token,
    email: decodeURIComponent(email),
    schoolId: target,
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>

        <div className="relative z-10">
          {isNew && !identityUnknown ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  Join EduAI Pro
                </h1>
                <p className="text-gray-500 mt-2">
                  Create your account to accept the invitation
                </p>
              </div>
              <TeacherSignup
                isNested={true}
                invitationCode={token}
                email={email}
              />
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome Back
                </h2>
                <p className="text-gray-500 mt-2">
                  Login to your account to accept the invitation
                </p>
              </div>
              <LoginForm invitationData={invitationData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AcceptInvitePageClient() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center bg-gray-50">
          <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <AcceptInviteContent />
    </Suspense>
  );
}
