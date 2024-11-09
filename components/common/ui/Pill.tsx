import React from "react";
import Typography from "./Typography";

export default function Pill({
  text,
  variant,
}: {
  text: string;
  variant?: "dark";
}) {
  return (
    <div
      className={`w-fit mx-auto rounded-full bg-brand-200 border ${
        variant
          ? "border-brand-900 border-2 py-1 px-4"
          : "border-brand-600 py-2 px-5"
      } `}
    >
      <Typography.H3
        weight={variant === "dark" ? "semibold" : "medium"}
        size="base"
        className="text-center text-brand-900 tracking-[3px] sm:tracking-[5px] !text-sm sm:!text-base"
      >
        {text}
      </Typography.H3>
    </div>
  );
}
