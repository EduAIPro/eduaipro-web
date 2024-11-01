"use client";
import React, { ReactNode } from "react";

export default function FormInput({
  rightIcon,
  leftIcon,
  placeholder,
  onChange,
}: {
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="max-sm:w-full shadow-lg !shadow-grey-2 flex items-center gap-x-3 py-2 px-3 w-[300px] border border-grey-8/50 rounded-lg">
      {leftIcon}
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="outline-none text-base text-grey-11"
      />
      {rightIcon}
    </div>
  );
}
