import { Button } from "@/components/ui/button";
import { FileBadgeIcon } from "lucide-react";
import Link from "next/link";

export const EmptyCertificates = () => {
  return (
    <div className="col-span-full space-y-6 h-[60vh] flex flex-col justify-center">
      <div className="w-fit mx-auto">
        <FileBadgeIcon
          size={120}
          className="text-primary-300"
          strokeWidth={1.5}
        />
      </div>
      <div className="text-center max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold">No certificates</h2>
        <p className="font-medium text-grey-650">
          You {"haven't"} earned any certificates yet. Get back to learning and
          received one when you finish a course.
        </p>
      </div>
      <div className="w-fit mx-auto">
        <Link href="/dashboard">
          <Button>Go back to course</Button>
        </Link>
      </div>
    </div>
  );
};
