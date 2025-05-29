import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";

type ReferralProps = {};

export const Referral = ({}: ReferralProps) => {
  return (
    <div className="bg-white p-5 border border-grey-400 rounded-xl space-y-5">
      <div>
        <h2 className="font-semibold text-lg">Referral</h2>
        <p className="font-medium text-grey-500">
          Encourage other schools to become part of the EduAI Pro community
        </p>
      </div>
      <div>
        <div className="border px-2 py-1 flex items-center justify-between w-full rounded-lg">
          <p>https://eduaipro.com?love/1334dikjla4jn</p>
          <Button>
            <CopyIcon className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};
