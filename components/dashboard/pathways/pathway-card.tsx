"use client";

import { Button } from "@/components/ui/button";
import { Pathway } from "@/types/enrollment";
import { teachingLevels } from "@/utils/data";
import { BookOpenIcon, CheckIcon, ClockIcon, LockIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type PathwayCardProps = {
  pathway: Pathway;
  onEnroll: (pathway: Pathway) => void;
  onUpgrade: (pathway: Pathway) => void;
  isEnrolling: boolean;
};

export function PathwayCard({
  pathway,
  onEnroll,
  onUpgrade,
  isEnrolling,
}: PathwayCardProps) {
  const router = useRouter();
  const levelLabel =
    teachingLevels.find((l) => l.value === pathway.level)?.label ??
    pathway.level;

  return (
    <div
      className="rounded-xl overflow-hidden transition-shadow hover:shadow-md flex flex-col"
      style={{ border: "1px solid #E5E7EB" }}
    >
      <div className="relative w-full h-[140px] bg-gray-50">
        {pathway.imageUrl ? (
          <Image
            fill
            src={pathway.imageUrl}
            className="object-cover"
            alt={pathway.title}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#1A56DB] bg-blue-50">
            <BookOpenIcon size={28} strokeWidth={1.5} />
          </div>
        )}
        {pathway.completed && (
          <div
            className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[10px] font-semibold rounded-full px-2.5 py-1"
            style={{ color: "#16A34A", background: "#DCFCE7" }}
          >
            <CheckIcon size={11} />
            Completed
          </div>
        )}
        {!pathway.completed && pathway.enrolled && (
          <div
            className="absolute top-2.5 right-2.5 text-[10px] font-semibold rounded-full px-2.5 py-1"
            style={{ color: "#1A56DB", background: "#DBEAFE" }}
          >
            In progress
          </div>
        )}
      </div>

      <div className="p-3.5 space-y-3 flex flex-col flex-1">
        <div className="space-y-1.5">
          <h3 className="text-[13px] font-semibold capitalize text-gray-900 line-clamp-2">
            {pathway.title.replaceAll("_", " ").toLowerCase()}
          </h3>
          <p className="text-[11px] text-gray-500 line-clamp-2">
            {pathway.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-[11px] text-gray-400">
          <span>{levelLabel}</span>
          <span className="flex items-center gap-1">
            <ClockIcon size={11} />
            {pathway.cpdHours} CPD hours
          </span>
        </div>

        <div className="mt-auto pt-1">
          {pathway.enrolled ? (
            <Button
              className="w-full"
              onClick={() => router.push("/dashboard")}
              variant="secondary"
            >
              Continue
            </Button>
          ) : pathway.entitled ? (
            <Button
              className="w-full"
              loading={isEnrolling}
              onClick={() => onEnroll(pathway)}
            >
              Enroll
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onUpgrade(pathway)}
            >
              <LockIcon size={13} />
              Upgrade to unlock
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
