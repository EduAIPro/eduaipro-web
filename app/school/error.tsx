"use client";

import { SegmentError } from "@/components/segment-error";

export default function SchoolError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <SegmentError {...props} area="school" />;
}
