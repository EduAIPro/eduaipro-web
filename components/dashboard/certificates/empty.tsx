import { Button } from "@/components/ui/button";
import { FileBadgeIcon } from "lucide-react";
import Link from "next/link";

export const EmptyCertificates = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center gap-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1A56DB] shrink-0">
        <FileBadgeIcon size={28} strokeWidth={1.5} />
      </div>
      <div className="max-w-sm space-y-1">
        <h3 className="text-sm font-bold text-gray-900">
          No certificates yet
        </h3>
        <p className="text-[12.5px] text-gray-500">
          You {"haven't"} earned any certificates yet. Get back to learning
          and receive one when you finish a course.
        </p>
      </div>
      <Link href="/dashboard">
        <Button className="bg-[#1A56DB] hover:bg-[#1A56DB]/90">
          Go back to course
        </Button>
      </Link>
    </div>
  );
};
