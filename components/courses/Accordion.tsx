"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Typography from "../common/ui/Typography";
import Link from "next/link";

export default function CourseContentAccordion({
  children,
  title,
  unitCount,
  unitLength,
  courseName,
  unitId,
  isModule = false,
}: {
  children: ReactNode;
  title: string;
  courseName?: string;
  unitId?: number;
  unitCount: number;
  unitLength: number;
  isModule?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const contentHeight = contentRef.current?.scrollHeight;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200/50 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-2 px-5 text-left text-lg font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
      >
        <div>
          <Link legacyBehavior href={`/courses/${courseName}/${unitId}`}>
            <a
              onClick={(e) => {
                if (isModule) {
                  e.preventDefault();
                }
              }}
              style={isModule ? { pointerEvents: "none" } : {}}
              href=""
            >
              <Typography.H2
                weight="semibold"
                className="!text-base lg:!text-[20px] hover:underline hover:!text-black"
              >
                {title}
              </Typography.H2>
            </a>
          </Link>
          <div className="flex items-center gap-2">
            <Typography.P fontColor="grey" weight="medium" size="small">
              Unit {unitId}
            </Typography.P>
            <Typography.P>•</Typography.P>
            <Typography.P fontColor="grey" weight="medium" size="small">
              {unitLength} hours
            </Typography.P>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
