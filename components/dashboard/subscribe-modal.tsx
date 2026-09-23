"use client";

import { subscribeKey } from "@/api/keys";
import { subscribeCheckout } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShieldCheckIcon } from "lucide-react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export type SubscribeTarget = {
  courseId?: string;
  title?: string;
  reason: "add_pathway" | "issue_certificate" | "general";
};

type SubscribeModalProps = {
  target: SubscribeTarget | null;
  onOpenChange: (open: boolean) => void;
};

export function SubscribeModal({ target, onOpenChange }: SubscribeModalProps) {
  const { trigger, isMutating } = useSWRMutation(
    subscribeKey,
    subscribeCheckout,
  );

  const handleSubscribe = async () => {
    if (!target) return;
    try {
      const { authorizationUrl } = await trigger(
        target.courseId ? { courseId: target.courseId } : {},
      );
      window.location.href = authorizationUrl;
    } catch (error) {
      toast.error(error as string);
    }
  };

  const title = target?.title?.replaceAll("_", " ").toLowerCase();
  const description =
    target?.reason === "issue_certificate"
      ? `You completed "${title}". An active subscription issues the accredited certificate and keeps it downloadable.`
      : target?.reason === "add_pathway"
        ? `Subscribing lets you enrol in "${title}" and every other CPD pathway, with certificates included when you finish.`
        : "Subscribing to EduAI Pro unlocks certificate issuance and every CPD pathway.";

  return (
    <Dialog open={!!target} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1A56DB] mb-2">
            <ShieldCheckIcon size={20} />
          </div>
          <DialogTitle>An active subscription is required</DialogTitle>
          <DialogDescription>{target ? description : ""}</DialogDescription>
        </DialogHeader>
        <p className="text-xs text-gray-500 leading-relaxed">
          Certificates already issued stay valid until their printed expiry
          date, whether or not the subscription is renewed.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Not now
          </Button>
          <Button
            className="bg-[#1A56DB] hover:bg-[#1A56DB]/90"
            loading={isMutating}
            onClick={handleSubscribe}
          >
            {target?.reason === "issue_certificate"
              ? "Subscribe and issue certificate"
              : target?.reason === "add_pathway"
                ? "Subscribe and start pathway"
                : "Subscribe"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
