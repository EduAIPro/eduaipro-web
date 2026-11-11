"use client";

import { useState } from "react";

const MESSAGES = [
  "Reviewing your unit content",
  "Crafting questions just for you",
  "Balancing the difficulty",
  "Checking every answer option",
  "Almost ready, Good luck!",
];

/**
 * Centered, rotating status messages shown while assessment questions are
 * being generated. Each message fades in, holds, then fades out before the
 * next appears; the final message fades in and stays until loading ends.
 */
export function AssessmentLoading({
  messages = MESSAGES,
}: {
  messages?: string[];
}) {
  const [index, setIndex] = useState(0);
  const isLast = index === messages.length - 1;

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full min-h-[420px] flex items-center justify-center px-6"
    >
      <style>{`
        @keyframes al-cycle {
          0%   { opacity: 0; transform: translateY(6px); filter: blur(4px); }
          16%  { opacity: 1; transform: translateY(0);   filter: blur(0); }
          84%  { opacity: 1; transform: translateY(0);   filter: blur(0); }
          100% { opacity: 0; transform: translateY(-6px); filter: blur(4px); }
        }
        @keyframes al-in {
          0%   { opacity: 0; transform: translateY(6px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0);   filter: blur(0); }
        }
        @keyframes al-shimmer {
          0%   { background-position: 150% 0; }
          100% { background-position: -50% 0; }
        }
        @keyframes al-spin { to { transform: rotate(360deg); } }
        .al-msg      { animation: al-cycle 3.4s ease-in-out forwards; }
        .al-msg-last { animation: al-in 0.8s ease-out forwards; }
        .al-text {
          background-image: linear-gradient(
            110deg,
            #111827 30%,
            #9ca3af 50%,
            #111827 70%
          );
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: al-shimmer 2.4s linear infinite;
        }
        .al-spinner {
          width: 18px; height: 18px; border-radius: 9999px;
          border: 2px solid #e5e7eb; border-top-color: #111827;
          animation: al-spin 0.8s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .al-msg, .al-msg-last { animation-duration: 0.01s; }
          .al-text { animation: none; background: none; color: #111827; }
          .al-spinner { animation-duration: 2s; }
        }
      `}</style>

      <div
        key={index}
        className={`flex items-center gap-3 ${isLast ? "al-msg-last" : "al-msg"}`}
        onAnimationEnd={(e) => {
          if (e.target !== e.currentTarget || isLast) return;
          setIndex((i) => Math.min(i + 1, messages.length - 1));
        }}
      >
        <span className="al-spinner shrink-0" aria-hidden />
        <span className="al-text text-xl sm:text-2xl font-medium tracking-tight">
          {messages[index]}
        </span>
      </div>
    </div>
  );
}
