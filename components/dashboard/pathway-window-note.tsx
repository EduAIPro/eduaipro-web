"use client";

import { Button } from "@/components/ui/button";
import { TONE_STYLE, WindowInfo } from "@/lib/pathway-window";
import { LockIcon } from "lucide-react";

/** Pill used on pathway rows and the switcher. */
export const WindowPill = ({ info }: { info: WindowInfo }) => (
  <span
    className="inline-flex items-center gap-1 text-[10.5px] font-semibold rounded-full px-2 py-1"
    style={TONE_STYLE[info.tone]}
  >
    {info.closed ? <LockIcon size={10} /> : null}
    {info.label}
  </span>
);

/** Full sentence plus the action that reopens a closed pathway. */
export const WindowNote = ({
  info,
  onAction,
}: {
  info: WindowInfo;
  onAction?: () => void;
}) => (
  <div
    className="flex flex-wrap items-center gap-3 rounded-xl p-3.5 text-sm"
    style={{
      background: TONE_STYLE[info.tone].bg,
      color: TONE_STYLE[info.tone].color,
    }}
  >
    <span className="flex-1 min-w-[200px] font-medium">{info.detail}</span>
    {info.cta && onAction ? (
      <Button size="sm" onClick={onAction} className="bg-[#1A56DB] hover:bg-[#1A56DB]/90">
        {info.cta === "renew" ? "Renew your plan" : "Get Personal Pro"}
      </Button>
    ) : null}
  </div>
);
