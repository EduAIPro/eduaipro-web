"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type Step = {
  targetId: string;
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right" | "center";
};

type OnboardingWalkthroughProps = {
  open: boolean;
  onClose: () => void;
  onFinish: () => void;
  steps: Step[];
};

export function OnboardingWalkthrough({
  open,
  onClose,
  onFinish,
  steps,
}: OnboardingWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;

    const updateRect = () => {
      // If showing succcess, we might not need rect, or center it?
      // Actually, let's clear rect for success view
      if (showSuccess) {
        setTargetRect(null);
        return;
      }

      const step = steps[currentStep];
      if (step?.targetId === "center") {
        setTargetRect(null);
        return;
      }

      const element = document.getElementById(step?.targetId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
      } else {
        setTargetRect(null);
      }
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);

    const interval = setInterval(updateRect, 500);

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
      clearInterval(interval);
    };
  }, [open, currentStep, steps, showSuccess]);

  if (!open) return null;

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      setShowSuccess(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Calculate tooltip position
  const getTooltipStyle = () => {
    if (!targetRect || step?.targetId === "center" || showSuccess) {
      return {
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
      };
    }

    const gap = 16;
    let top = 0;
    let left = 0;
    let x = "0%";
    let y = "0%";

    const screenW = typeof window !== "undefined" ? window.innerWidth : 1000;
    const margin = 16;
    const cardWidth = 360; // Base width, though it might shrink on mobile

    switch (step.position) {
      case "top":
        top = targetRect.top - gap;
        left = targetRect.left + targetRect.width / 2;
        x = "-50%";
        y = "-100%";
        break;
      case "bottom":
        top = targetRect.bottom + gap;
        left = targetRect.left + targetRect.width / 2;
        x = "-50%";
        y = "0%";
        break;
      case "left":
        top = targetRect.top + targetRect.height / 2;
        left = targetRect.left - gap;
        x = "-100%";
        y = "-50%";
        break;
      case "right":
        top = targetRect.top + targetRect.height / 2;
        left = targetRect.right + gap;
        x = "0%";
        y = "-50%";
        break;
      default:
        top = window.innerHeight / 2;
        left = window.innerWidth / 2;
        x = "-50%";
        y = "-50%";
    }

    // Horizontal clamping logic
    // We calculate the *desired* left projected edge, and if it's off screen, we shift 'left'.
    // Note: 'x' transform affects the final position.

    let effectiveWidth = cardWidth;
    if (screenW < cardWidth + margin * 2) {
      effectiveWidth = screenW - margin * 2;
    }

    if (x === "-50%") {
      // Centered: left is center of card
      const minLeft = effectiveWidth / 2 + margin;
      const maxLeft = screenW - effectiveWidth / 2 - margin;
      left = Math.max(minLeft, Math.min(left, maxLeft));
    } else if (x === "-100%") {
      // Left aligned: left is right edge of card
      // min: cardWidth + margin
      const minLeft = effectiveWidth + margin;
      const maxLeft = screenW - margin; // Should default to this but clamping helps if target is way off
      left = Math.max(minLeft, Math.min(left, maxLeft));
    } else {
      // Right aligned (x=0%): left is left edge of card
      const minLeft = margin;
      const maxLeft = screenW - effectiveWidth - margin;
      left = Math.max(minLeft, Math.min(left, maxLeft));
    }

    // Vertical clamping (Basic safe-guard)
    const screenH = typeof window !== "undefined" ? window.innerHeight : 800;
    if (top < margin) top = margin;
    if (top > screenH - margin) top = screenH - margin;

    return {
      top,
      left,
      x,
      y,
    };
  };

  const tooltipStyle = getTooltipStyle();

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] isolate pointer-events-none">
        {/* SVG Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[50]"
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <mask id="hole">
                <rect width="100%" height="100%" fill="white" />
                {targetRect && !showSuccess && (
                  <motion.rect
                    initial={false}
                    animate={{
                      x: targetRect.left - 8,
                      y: targetRect.top - 8,
                      width: targetRect.width + 16,
                      height: targetRect.height + 16,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    rx="12"
                    fill="black"
                  />
                )}
              </mask>
              <linearGradient
                id="gradient-border"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="rgba(0,0,0,0.7)"
              mask="url(#hole)"
              className="backdrop-blur-[2px]" // Optional: if using SVG-only blur is problematic, rely on opacity. User snippet had opacity.
            />
            {/* Animated Glow Border around cutout */}
            {targetRect && !showSuccess && (
              <motion.rect
                initial={false}
                animate={{
                  x: targetRect.left - 8,
                  y: targetRect.top - 8,
                  width: targetRect.width + 16,
                  height: targetRect.height + 16,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                rx="12"
                fill="none"
                stroke="url(#gradient-border)"
                strokeWidth="3"
                className="drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              />
            )}
          </svg>
        </motion.div>

        {/* Content Layer (Cards) */}
        {!showSuccess ? (
          <motion.div
            key="step-card"
            initial={{ opacity: 0, scale: 0.95, ...tooltipStyle }}
            animate={{ opacity: 1, scale: 1, ...tooltipStyle }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
            className="absolute w-[360px] max-w-[calc(100vw-32px)] rounded-xl bg-white p-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 pointer-events-auto z-[60]"
            style={{ position: "absolute" }}
          >
            {/* Header Image or Gradient */}
            <div className="h-2 w-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-t-xl" />

            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-900">
                  {step.title}
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {step.description}
              </p>

              <div className="flex items-center justify-between">
                {/* Progress Dots */}
                <div className="flex gap-1.5">
                  {steps.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentStep
                          ? "w-4 bg-primary"
                          : "w-1.5 bg-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFinish()}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    Skip
                  </Button>

                  <div className="flex gap-2">
                    {!isFirst && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        onClick={handlePrev}
                      >
                        <ChevronLeft size={16} />
                      </Button>
                    )}
                    <Button
                      size={isLast ? "default" : "icon"}
                      className={`h-9 ${isLast ? "px-4 w-auto" : "w-9"}`}
                      onClick={handleNext}
                    >
                      {isLast ? (
                        <span className="flex items-center gap-2">
                          Next <ChevronRight size={14} />
                        </span>
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-card"
            initial={{
              opacity: 0,
              scale: 0.95,
              x: "-50%",
              y: "calc(-50% + 20px)",
            }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{
              opacity: 0,
              scale: 0.95,
              x: "-50%",
              y: "calc(-50% + 20px)",
            }}
            className="absolute top-1/2 left-1/2 w-[420px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 text-center pointer-events-auto z-[60]"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {"You're"} All Set!
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
              Welcome to the <strong>EduAI Pro</strong> learning platform. You
              now have the tools to track your progress, access modules, and
              take assessments.
            </p>
            <Button onClick={onFinish} size="lg" className="w-full text-lg">
              <p className="text-base lg:text-lg font-medium">Get Started</p>
            </Button>
          </motion.div>
        )}
      </div>
    </AnimatePresence>,
    document.body
  );
}
