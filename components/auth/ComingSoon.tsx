import { Clock2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const ComingSoon = () => {
  return (
    <div className="h-full flex flex-col justify-center max-lg:h-[90vh]">
      <div className="max-w-xl mx-auto px-3 text-center space-y-4">
        <Clock2Icon className="size-12 mx-auto text-primary-300" />
        <div className="space-y-2">
          <h2 className="font-semibold text-2xl">Coming Soon</h2>

          <p>
            Registration and onboarding will commence in September. We
            appreciate your patience as we work diligently to provide you with
            the best possible experience.
          </p>
        </div>

        <Link href="/">
          <Button className="mt-4">Go home</Button>
        </Link>
      </div>
    </div>
  );
};
