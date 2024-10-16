import React from "react";
import Typography from "./Typography";

export default function Pill({ text }: { text: string }) {
  return (
    <div className="w-fit mx-auto rounded-full py-2 px-5 bg-brand-200 border border-brand-600">
      <Typography.H3
        weight="medium"
        size="base"
        className="text-center text-brand-900 tracking-[5px]"
      >
        {text}
      </Typography.H3>
    </div>
  );
}
