"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ClosingCta() {
  const router = useRouter();

  return (
    <section
      aria-labelledby="close-heading"
      className="rounded-2xl border border-primary-150 bg-gradient-to-b from-accent-100 to-primary-100 p-6 md:p-10 flex max-md:flex-col justify-between items-center gap-6 max-md:text-center"
    >
      <div className="space-y-2">
        <h2
          id="close-heading"
          className="font-semibold text-2xl md:text-3xl tracking-tight text-gray-800"
        >
          Ready to get certified?
        </h2>
        <p className="text-sm font-medium text-grey-11">
          Get Personal Pro for yourself, or buy seats for your whole school.
        </p>
      </div>
      {/* Side by side at every width: the labels are short enough to fit. */}
      <div className="flex w-full max-w-md flex-row gap-3">
        <Button
          className="flex-1 h-auto min-h-10 whitespace-normal px-3 py-2.5 text-center leading-tight"
          onClick={() => router.push("/dashboard/profile")}
        >
          Get Personal Pro
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-auto min-h-10 whitespace-normal px-3 py-2.5 text-center leading-tight"
          onClick={() => router.push("#schools")}
        >
          Get seats for my school
        </Button>
      </div>
    </section>
  );
}
