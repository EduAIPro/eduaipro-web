"use client";

import { ErrorFallback } from "@/components/error-boundary";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

/**
 * Shared body for route-segment `error.tsx` files. Because a segment's
 * error.tsx renders *inside* that segment's layout, the nav/header stay put
 * and only the page content is replaced.
 */
export function SegmentError({
  error,
  reset,
  area,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  area: string;
}) {
  useEffect(() => {
    Sentry.captureException(error, { tags: { error_boundary: area } });
  }, [error, area]);

  return (
    <ErrorFallback
      onReset={reset}
      description="This page ran into an unexpected error. Our team has been notified — you can try again or use the navigation to go elsewhere."
      reference={error.digest}
    />
  );
}
