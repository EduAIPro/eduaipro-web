import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2Icon } from "lucide-react";

type SurveySuccessProps = {
  onClose: () => void;
};

export const SurveySuccess: React.FC<SurveySuccessProps> = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center gap-6">
      <div className="bg-green-50 p-4 rounded-full">
        <CheckCircle2Icon className="w-16 h-16 text-green-500" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-zinc-800">Thank You!</h2>
        <p className="text-zinc-500 max-w-xs mx-auto text-sm">
          Your feedback has been successfully submitted. We appreciate your
          time.
        </p>
      </div>
      <Button onClick={onClose} size="lg" className="min-w-[150px]">
        Close
      </Button>
    </div>
  );
};
