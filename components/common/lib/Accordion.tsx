import { Add } from "iconsax-react";
import React from "react";
import Typography from "../ui/Typography";

interface AccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export default function Accordion({
  question,
  answer,
  isOpen,
  onClick,
}: AccordionProps) {
  return (
    <article className="border-t border-gray-300/60 pt-4 h-fit">
      <button
        className="flex justify-between items-center w-full text-left group"
        onClick={onClick}
      >
        <Typography.H3 weight="medium" className="text-blue-800">
          {question}
        </Typography.H3>
        <div className="relative w-6 h-6">
          {/* Vertical line */}
          <div
            className={`absolute top-1/2 left-1/2 w-0.5 h-4 bg-brand -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              isOpen ? "rotate-[135deg] scale-75" : ""
            }`}
          />
          {/* Horizontal line */}
          <div
            className={`absolute top-1/2 left-1/2 w-4 h-0.5 bg-brand -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              isOpen ? "rotate-[135deg] scale-75" : ""
            }`}
          />
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="mt-2 text-gray-600">{answer}</p>
      </div>
    </article>
  );
}
