"use client";
import { cn } from "@/lib/utils";
import { GraduationCapIcon, SchoolIcon } from "lucide-react";
import { useEffect, useState } from "react";

const OPTIONS = [
  { id: "teachers", label: "For teachers", Icon: GraduationCapIcon },
  { id: "schools", label: "For schools", Icon: SchoolIcon },
] as const;

type Audience = (typeof OPTIONS)[number]["id"];

// Plain in-page links, highlighted by whichever section is on screen.
export default function AudienceSwitch() {
  const [active, setActive] = useState<Audience>("teachers");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as Audience);
        }),
      { rootMargin: "-40% 0px -50% 0px" },
    );
    OPTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Who is paying?"
      className="mx-auto inline-flex rounded-full border border-grey-4 bg-grey-2 p-1"
    >
      {OPTIONS.map(({ id, label, Icon }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={() => setActive(id)}
          aria-current={active === id ? "true" : undefined}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors sm:px-5 sm:py-2.5 sm:text-[15px]",
            active === id
              ? "bg-white text-gray-800 shadow-sm"
              : "text-grey-11 hover:text-gray-800",
          )}
        >
          <Icon size={16} aria-hidden="true" />
          {label}
        </a>
      ))}
    </nav>
  );
}
