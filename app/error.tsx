"use client";

import { Button } from "@/components/ui/button";
import * as Sentry from "@sentry/nextjs";
import { RefreshCwIcon, ServerCrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="min-h-screen w-full bg-[linear-gradient(180deg,_#FFF1F0_0%,_#FFFFFF_100%)] flex flex-col items-center justify-center px-5 text-center">
      <div className="size-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-6">
        <ServerCrashIcon className="size-7 text-red-500" />
      </div>

      <h1 className="text-grey-800 font-semibold text-3xl md:text-4xl mb-3">
        Something went wrong
      </h1>

      <p className="text-base text-grey-500 font-medium max-w-md mb-8">
        An unexpected error occurred on our end. Our team has been notified —
        please try again, or head back to the dashboard.
        {error.digest && (
          <span className="block text-xs text-grey-400 mt-2">
            Reference: {error.digest}
          </span>
        )}
      </p>

      <div className="flex items-center gap-3 flex-wrap justify-center">
        <Button onClick={reset} className="gap-2">
          <RefreshCwIcon className="size-4" />
          Try again
        </Button>
        <Link href="/">
          <Button variant="outline">Go to homepage</Button>
        </Link>
      </div>
    </main>
  );
}
