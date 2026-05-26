import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export const AssessmentError = ({
  error,
  removeAssessmentScreen,
}: {
  error: string;
  removeAssessmentScreen: () => void;
}) => {
  return (
    <div className="assessment-wrap w-full mx-auto mt-10 flex justify-center py-8">
      <div className="flex flex-col items-center text-center max-w-sm w-full bg-background border border-border/50 rounded-2xl p-10">
        {/* Icon ring */}
        <div className="w-14 h-14 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-destructive"
            aria-hidden="true"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        </div>

        {/* Heading + message */}
        <p className="assessment-title-serif text-[17px] text-foreground mb-2">
          {"Couldn't load the quiz"}
        </p>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-4 max-w-[280px]">
          Something went wrong on our end while fetching your assessment. Your
          progress is safe — this is a temporary hiccup.
        </p>

        {/* Error detail */}
        <div className="w-full text-left font-mono text-[11px] text-destructive bg-destructive/8 border border-destructive/15 rounded-lg px-3.5 py-2.5 mb-6 break-all">
          {error}
        </div>

        <div className="w-full h-px bg-border/40 mb-5" />

        {/* Actions */}
        <div className="flex gap-2 w-full">
          <Button
            type="button"
            onClick={removeAssessmentScreen}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[13px] font-medium border border-border/60 rounded-lg bg-transparent text-foreground hover:bg-muted/40 transition-colors"
          >
            <ArrowLeftIcon />
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};
