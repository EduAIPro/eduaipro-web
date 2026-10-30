"use client";

import { cn } from "@/lib/utils";
import { type ReactNode, useCallback, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type SimpleTooltipProps = {
  content: ReactNode;
  children: ReactNode;
  className?: string;
  tipClassName?: string;
};

type Pos = { top: number; left: number; below: boolean };

/**
 * Hover and keyboard-focus tooltip. Rendered in a portal with fixed
 * positioning so scrolling table wrappers never clip it.
 */
export const SimpleTooltip = ({
  content,
  children,
  className,
  tipClassName,
}: SimpleTooltipProps) => {
  const id = useId();
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState<Pos | null>(null);

  const show = useCallback(() => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const below = r.top < 160;
    setPos({
      top: below ? r.bottom + 8 : r.top - 8,
      left: Math.min(Math.max(r.left + r.width / 2, 126), window.innerWidth - 126),
      below,
    });
  }, []);
  const hide = useCallback(() => setPos(null), []);

  return (
    <span
      ref={ref}
      tabIndex={0}
      aria-describedby={pos ? id : undefined}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={(e) => e.key === "Escape" && hide()}
      className={cn("inline-flex rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand-900", className)}
    >
      {children}
      {pos
        ? createPortal(
            <span
              id={id}
              role="tooltip"
              style={{
                top: pos.top,
                left: pos.left,
                transform: `translate(-50%, ${pos.below ? "0" : "-100%"})`,
              }}
              className={cn(
                "pointer-events-none fixed z-[100] w-60 rounded-lg bg-[#0F172A] px-3 py-2 text-left text-[11px] font-normal leading-relaxed text-slate-200 shadow-xl",
                tipClassName,
              )}
            >
              {content}
            </span>,
            document.body,
          )
        : null}
    </span>
  );
};
