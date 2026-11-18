"use client";

import { Button } from "@/components/ui/button";
import * as Sentry from "@sentry/nextjs";
import { RefreshCwIcon, TriangleAlertIcon } from "lucide-react";
import { ReactNode } from "react";

type ErrorFallbackProps = {
  onReset: () => void;
  title?: string;
  description?: string;
  reference?: string;
};

/** Inline fallback card. Keeps the surrounding layout (nav, sidebar) intact. */
export function ErrorFallback({
  onReset,
  title = "Something went wrong",
  description = "This section ran into an unexpected error. Our team has been notified.",
  reference,
}: ErrorFallbackProps) {
  return (
    <div
      role="alert"
      className="flex w-full flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50/40 px-5 py-12 text-center"
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
        <TriangleAlertIcon className="size-5 text-red-500" />
      </div>
      <h2 className="mb-2 text-lg font-semibold text-grey-800">{title}</h2>
      <p className="mb-5 max-w-md text-sm font-medium text-grey-500">
        {description}
        {reference && (
          <span className="mt-2 block text-xs text-grey-400">
            Reference: {reference}
          </span>
        )}
      </p>
      <Button onClick={onReset} size="sm" className="gap-2">
        <RefreshCwIcon className="size-4" />
        Try again
      </Button>
    </div>
  );
}

type ErrorBoundaryProps = {
  /** Shows up in Sentry as the `error_boundary` tag, so you can tell which boundary caught it. */
  name: string;
  children: ReactNode;
  /** Custom fallback. Defaults to <ErrorFallback />. */
  fallback?: (args: { reset: () => void; eventId: string }) => ReactNode;
};

/**
 * Catches render errors in its subtree, reports them to Sentry (with the React
 * component stack attached) and shows a fallback instead of unmounting the page.
 *
 * Use it around risky widgets so one failure doesn't take down the whole screen:
 *   <ErrorBoundary name="pdp-units-content"><UnitsContent … /></ErrorBoundary>
 *
 * Note: error boundaries only catch errors thrown while rendering. Errors in
 * event handlers, timers and promises still need try/catch (or reach Sentry via
 * its global handlers).
 */
export function ErrorBoundary({
  name,
  children,
  fallback,
}: ErrorBoundaryProps) {
  return (
    <Sentry.ErrorBoundary
      beforeCapture={(scope) => {
        scope.setTag("error_boundary", name);
      }}
      fallback={({ resetError, eventId }) => (
        <>
          {fallback ? (
            fallback({ reset: resetError, eventId })
          ) : (
            <ErrorFallback onReset={resetError} reference={eventId} />
          )}
        </>
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
