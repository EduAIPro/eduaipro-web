"use client";

import * as Sentry from "@sentry/nextjs";
import { RefreshCwIcon, ServerCrashIcon } from "lucide-react";
import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
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
    <html lang="en">
      <body>
        <main className="min-h-screen w-full bg-[linear-gradient(180deg,_#FFF1F0_0%,_#FFFFFF_100%)] flex flex-col items-center justify-center px-5 text-center">
          <div className="size-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-6">
            <ServerCrashIcon className="size-7 text-red-500" />
          </div>

          <h1 className="text-grey-800 font-semibold text-3xl md:text-4xl mb-3">
            Something went wrong
          </h1>

          <p className="text-base text-grey-500 font-medium max-w-md mb-8">
            EduAI Pro ran into an unexpected error. Our team has been
            notified — please try reloading the page.
            {error.digest && (
              <span className="block text-xs text-grey-400 mt-2">
                Reference: {error.digest}
              </span>
            )}
          </p>

          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-400 text-white px-4 py-2.5 text-sm font-medium hover:bg-primary-400/90 transition-colors"
          >
            <RefreshCwIcon className="size-4" />
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
