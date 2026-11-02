import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Enrollment } from "@/types/enrollment";
import { claimDeadline } from "@/lib/pathway-window";
import { LockIcon } from "lucide-react";

export const PendingCertificateItem = ({
  enrollment,
  onSubscribe,
  generating = false,
}: {
  enrollment: Enrollment;
  onSubscribe: (enrollment: Enrollment) => void;
  /** the plan already covers it; the certificate is still being rendered */
  generating?: boolean;
}) => {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid #E5E7EB" }}
    >
      <div className="relative w-full h-[160px] bg-gray-100 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-500">
            <LockIcon size={18} />
          </div>
        </div>
        <div
          className="absolute top-2.5 right-2.5 text-[10px] font-semibold rounded-full px-2.5 py-1"
          style={{ color: "#B45309", background: "#FEF3C7" }}
        >
          {generating ? "Preparing" : "Ready to claim"}
        </div>
      </div>

      <div className="p-3.5 space-y-3">
        <div className="space-y-1.5">
          <h3 className="text-[13px] font-semibold capitalize text-gray-900 truncate">
            {enrollment.course.title.replaceAll("_", " ").toLowerCase()}{" "}
            Accreditation
          </h3>
          <p className="text-[10.5px] text-gray-500 leading-relaxed">
            You finished this pathway
            {enrollment.completedAt
              ? ` on ${new Date(enrollment.completedAt).toLocaleDateString(
                  "en-GB",
                  { day: "2-digit", month: "short", year: "numeric" },
                )}`
              : ""}
            {generating
              ? ". Your certificate is being prepared and will appear here shortly"
              : ". Upgrade to claim your certificate"}
            {!generating && claimDeadline(enrollment.completedAt)
              ? `. Claim by ${format(claimDeadline(enrollment.completedAt)!, "do MMM, yyyy")}; after that the final assessment must be retaken`
              : ""}
            .
          </p>
        </div>

        {generating ? null : (
          <Button
            className="w-full bg-[#1A56DB] hover:bg-[#1A56DB]/90"
            onClick={() => onSubscribe(enrollment)}
          >
            <LockIcon size={14} />
            Upgrade to claim
          </Button>
        )}
      </div>
    </div>
  );
};
