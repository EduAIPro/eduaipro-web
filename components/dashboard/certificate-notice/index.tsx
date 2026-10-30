"use client";

import {
  SubscribeModal,
  SubscribeTarget,
} from "@/components/dashboard/subscribe-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { capitalizeAll } from "@/utils/text";
import { PartyPopperIcon, ShieldCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Milestone = "start" | "halfway" | "almost" | "complete";

const ORDER: Milestone[] = ["start", "halfway", "almost", "complete"];

const milestoneFor = (progress: number, completed: boolean): Milestone =>
  completed
    ? "complete"
    : progress >= 90
      ? "almost"
      : progress >= 50
        ? "halfway"
        : "start";

const storageKey = (userId: string, courseId: string, m: Milestone) =>
  `eduaipro:cert-notice:${userId}:${courseId}:${m}`;

const hasSeen = (key: string) => {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
};

const markSeen = (key: string) => {
  try {
    localStorage.setItem(key, "1");
  } catch {}
};

const NOTICE_COPY: Record<
  Exclude<Milestone, "complete">,
  { title: string; body: string; primary: "dismiss" | "subscribe" }
> = {
  start: {
    title: "Your course content is free",
    body: "You can learn every unit at no cost. To be issued your certificate when you finish this course, you will need a subscription.",
    primary: "dismiss",
  },
  halfway: {
    title: "You're past halfway",
    body: "All your course content stays free. When you finish, you will need a subscription to be issued your certificate.",
    primary: "dismiss",
  },
  almost: {
    title: "Almost there",
    body: "You're on the final stretch. You will need a subscription to be issued your certificate, so set it up now and it's ready the moment you finish.",
    primary: "subscribe",
  },
};

type CertificateNoticeGateProps = {
  userId?: string;
  courseId: string;
  courseTitle: string;
  /** 0–100, from the active enrolment */
  progress: number;
  completed: boolean;
  hasCertificate: boolean;
  /** user, enrolment and subscription have all loaded */
  ready: boolean;
  /** true when the plan will not issue a certificate for this course */
  needsSubscription: boolean;
  /** incremented when the teacher finishes the last unit in this session */
  finishSignal: number;
};

export const CertificateNoticeGate = ({
  userId,
  courseId,
  courseTitle,
  progress,
  completed,
  hasCertificate,
  ready,
  needsSubscription,
  finishSignal,
}: CertificateNoticeGateProps) => {
  const router = useRouter();
  const [notice, setNotice] = useState<Exclude<Milestone, "complete"> | null>(
    null,
  );
  const [congratsOpen, setCongratsOpen] = useState(false);
  const [subscribeTarget, setSubscribeTarget] =
    useState<SubscribeTarget | null>(null);
  // Whether the course was already complete when the page first loaded.
  const baselineCompleted = useRef<boolean | null>(null);

  const title = capitalizeAll(courseTitle.replaceAll("_", " ").toLowerCase());

  const markUpTo = useCallback(
    (m: Milestone) => {
      if (!userId) return;
      ORDER.slice(0, ORDER.indexOf(m) + 1).forEach((x) =>
        markSeen(storageKey(userId, courseId, x)),
      );
    },
    [userId, courseId],
  );

  const finish = useCallback(() => {
    markUpTo("complete");
    if (needsSubscription) {
      setCongratsOpen(true);
    } else {
      toast.success(`Congratulations on finishing ${title}!`);
      router.push("/dashboard/certificates");
    }
  }, [markUpTo, needsSubscription, router, title]);

  // Milestones reached on load, or as progress moves between visits.
  useEffect(() => {
    if (!ready || !userId) return;
    if (baselineCompleted.current === null) {
      baselineCompleted.current = completed;
    }

    const reached = milestoneFor(progress, completed);

    if (reached === "complete") {
      // Finishing in this session is handled by finishSignal, so the
      // congratulation never lands on top of the results screen.
      if (!baselineCompleted.current || hasCertificate) return;
    } else if (!needsSubscription) {
      return;
    }

    if (hasSeen(storageKey(userId, courseId, reached))) return;

    if (reached === "complete") {
      finish();
    } else {
      markUpTo(reached);
      setNotice(reached);
    }
  }, [
    ready,
    userId,
    courseId,
    progress,
    completed,
    hasCertificate,
    needsSubscription,
    finish,
    markUpTo,
  ]);

  // Teacher just passed the last unit.
  useEffect(() => {
    if (finishSignal > 0 && ready) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishSignal]);

  const openSubscribe = () =>
    setSubscribeTarget({
      courseId,
      title: courseTitle,
      reason: "issue_certificate",
    });

  const copy = notice ? NOTICE_COPY[notice] : null;

  return (
    <>
      <Dialog open={!!notice} onOpenChange={(v) => !v && setNotice(null)}>
        <DialogContent>
          <DialogHeader>
            <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#1A56DB]">
              <ShieldCheckIcon size={20} />
            </div>
            <DialogTitle>{copy?.title}</DialogTitle>
            <DialogDescription>{copy?.body}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={copy?.primary === "subscribe" ? "outline" : "default"}
              onClick={() => setNotice(null)}
            >
              {copy?.primary === "subscribe" ? "Maybe later" : "Got it"}
            </Button>
            <Button
              variant={copy?.primary === "subscribe" ? "default" : "outline"}
              onClick={() => {
                setNotice(null);
                openSubscribe();
              }}
            >
              Subscribe now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={congratsOpen} onOpenChange={setCongratsOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <PartyPopperIcon size={20} />
            </div>
            <DialogTitle>Congratulations, you finished the course!</DialogTitle>
            <DialogDescription>
              You completed “{title}”. Subscribe to be issued your accredited
              certificate.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCongratsOpen(false)}>
              Maybe later
            </Button>
            <Button
              onClick={() => {
                setCongratsOpen(false);
                openSubscribe();
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SubscribeModal
        target={subscribeTarget}
        onOpenChange={(v) => !v && setSubscribeTarget(null)}
      />
    </>
  );
};
