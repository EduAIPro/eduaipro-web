/* eslint-disable react-hooks/exhaustive-deps */
import { updateModuleKey } from "@/api/keys";
import { updateModule } from "@/api/mutations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ContentPage,
  CourseProgress,
  CourseUnit,
  ModuleItem,
  UnitDetails,
} from "@/types/course";
import { groupByType } from "@/utils/helpers";
import { removeUnitModulePatternsExtended } from "@/utils/text";
import { extractPublicId } from "@/utils/link";
import {
  BookOpenIcon,
  CheckIcon,
  ClipboardListIcon,
  FolderOpenIcon,
  GraduationCapIcon,
  Loader2Icon,
  LockIcon,
  PlayIcon,
  SparklesIcon,
  WrenchIcon,
} from "lucide-react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useSWRMutation from "swr/mutation";
import Image from "next/image";
import Chatbot from "../chat";

// ─── Section config by module item type ───────────────────────────────────────
const SECTION_CFG: Record<
  string,
  {
    label: string;
    icon: ReactNode;
    color: string;
    bg: string;
    defaultOpen: boolean;
  }
> = {
  CONTENT: {
    label: "Core CPD Content",
    icon: <BookOpenIcon size={14} />,
    color: "#1A56DB",
    bg: "#EFF6FF",
    defaultOpen: true,
  },
  PRACTICAL_APPLICATION: {
    label: "Practical Application",
    icon: <WrenchIcon size={14} />,
    color: "#16A34A",
    bg: "#F0FDF4",
    defaultOpen: false,
  },
  CASE_STUDY: {
    label: "Case Studies",
    icon: <FolderOpenIcon size={14} />,
    color: "#EA580C",
    bg: "#FFF7ED",
    defaultOpen: false,
  },
};

const SECTION_TYPE_ORDER: Record<string, number> = {
  CONTENT: 0,
  PRACTICAL_APPLICATION: 1,
  CASE_STUDY: 2,
};

// ─── Slide thumbnail ──────────────────────────────────────────────────────────
const THUMBNAIL_SIZES = {
  sm: { width: 44, height: 32, radius: 5 },
  lg: { width: 96, height: 68, radius: 8 },
};

function SlideThumbnail({
  type,
  isActive,
  isCompleted,
  thumbnailUrl,
  size = "sm",
}: {
  type: string;
  isActive: boolean;
  isCompleted: boolean;
  thumbnailUrl?: string;
  size?: "sm" | "lg";
}) {
  const colorMap: Record<string, { bg: string; accent: string }> = {
    CONTENT: { bg: "#EFF6FF", accent: "#1A56DB" },
    PRACTICAL_APPLICATION: { bg: "#F0FDF4", accent: "#16A34A" },
    CASE_STUDY: { bg: "#FFF7ED", accent: "#EA580C" },
  };
  const c = colorMap[type] ?? colorMap.CONTENT;
  const { width, height, radius } = THUMBNAIL_SIZES[size];

  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        flexShrink: 0,
        background: c.bg,
        border: `1px solid ${isActive ? c.accent + "80" : isCompleted ? c.accent + "40" : "#E5E7EB"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt=""
          width={width}
          height={height}
          className="w-full h-full object-cover"
        />
      ) : (
        <svg width="34" height="24" viewBox="0 0 34 24" fill="none">
          <rect
            x="2"
            y="3"
            width="30"
            height="3"
            rx="1"
            fill={c.accent}
            opacity="0.5"
          />
          <rect
            x="2"
            y="8"
            width="22"
            height="2"
            rx="1"
            fill={c.accent}
            opacity="0.25"
          />
          <rect
            x="2"
            y="12"
            width="26"
            height="2"
            rx="1"
            fill={c.accent}
            opacity="0.2"
          />
          <rect
            x="2"
            y="16"
            width="18"
            height="2"
            rx="1"
            fill={c.accent}
            opacity="0.15"
          />
        </svg>
      )}
    </div>
  );
}

// ─── Section accordion with local open/close state ────────────────────────────
function SectionAccordion({
  label,
  icon,
  color,
  bg,
  count,
  children,
  defaultOpen = false,
}: {
  label: string;
  icon: ReactNode;
  color: string;
  bg: string;
  count: number;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-1.5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all"
        style={{
          background: open ? bg : "transparent",
          border: `1px solid ${open ? color + "30" : "transparent"}`,
        }}
      >
        <div className="shrink-0" style={{ color }}>
          {icon}
        </div>
        <span
          className="flex-1 text-[11px] font-bold uppercase"
          style={{ color, letterSpacing: "0.07em" }}
        >
          {label}
        </span>
        <span
          className="text-[10px] font-semibold rounded-full px-1.5 py-0.5"
          style={{ color, background: color + "18" }}
        >
          {count}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        >
          <path
            d="M3 5L7 9L11 5"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="mt-1"
          style={{
            paddingLeft: 10,
            paddingRight: 4,
            borderLeft: `2px solid ${color}30`,
            marginLeft: 17,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
type UnitsContentProps = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setValues: Dispatch<SetStateAction<string>>;
  setModuleValues: Dispatch<SetStateAction<string[][]>>;
  setPdfUrl: Dispatch<SetStateAction<string | null>>;
  setModuleId: Dispatch<SetStateAction<string | null>>;
  setActiveUnitId: Dispatch<SetStateAction<string | null>>;
  courseProgress: CourseProgress;
  units: CourseUnit[];
  pdfUrl: string | null;
  generateQuestions: VoidFunction;
  handleIntroPlayed: VoidFunction;
  isGeneratingQuestions: boolean;
  isQuizOn: boolean;
  unitInfo?: UnitDetails;
  isLoading: boolean;
  introHasPlayed: boolean;
  values: string;
  moduleValues: string[][];
  moduleId: string | null;
  isMobileLandscape?: boolean;
  currentPage: number;
};

export function UnitsContent({
  setCurrentPage,
  setPdfUrl,
  pdfUrl,
  setModuleId,
  units,
  courseProgress,
  generateQuestions,
  handleIntroPlayed,
  isGeneratingQuestions,
  isQuizOn,
  setActiveUnitId,
  isLoading,
  values,
  setValues,
  unitInfo,
  introHasPlayed,
  moduleValues,
  setModuleValues,
  moduleId,
  isMobileLandscape,
  currentPage,
}: UnitsContentProps) {
  const { trigger } = useSWRMutation(updateModuleKey, updateModule);
  const processedModulesRef = useRef(new Set<string>());

  const memoizedUnits = useMemo(() => {
    return units.map((unit) => ({
      ...unit,
      isUnitCompleted:
        unit.index < courseProgress.unit.index ||
        courseProgress.isCompleted === true,
      isUnitAccessible: unit.index <= courseProgress.unit.index,
    }));
  }, [units, courseProgress.unit.index]);

  const memoizedModules = useMemo(() => {
    if (!unitInfo) return [];
    return unitInfo.modules.map((unitModule) => {
      const isCompleted = courseProgress.module
        ? unitModule.index <= courseProgress.module?.index
        : false;
      const moduleItems = groupByType(unitModule.moduleItems);
      return { ...unitModule, isCompleted, moduleItems };
    });
  }, [unitInfo, courseProgress.module]);

  useEffect(() => {
    if (!unitInfo || !pdfUrl) return;
    const modulesToUpdate: string[] = [];
    unitInfo.modules.forEach((m) => {
      if (processedModulesRef.current.has(`${m.id}-${pdfUrl}`)) return;
      const activeModule = m.moduleItems.find(
        (item) => item.signedPdfUrl === pdfUrl,
      );
      if (
        activeModule &&
        (!courseProgress.module || m.index > courseProgress.module?.index)
      ) {
        modulesToUpdate.push(m.id);
        processedModulesRef.current.add(`${m.id}-${pdfUrl}`);
      }
    });
    if (modulesToUpdate.length > 0) {
      Promise.all(
        modulesToUpdate.map((moduleId) => trigger({ moduleId })),
      ).catch(console.error);
    }
  }, [pdfUrl, unitInfo?.modules, courseProgress.module?.index]);

  const handleUnitClick = useCallback(
    (unit: CourseUnit, index: number) => {
      if (unit.index > courseProgress.unit.index) return;
      if (index === 0 && !introHasPlayed) handleIntroPlayed();
    },
    [courseProgress.unit.index, introHasPlayed],
  );

  const handlePageClick = (item: ContentPage, contentItem: ModuleItem) => {
    if (!item.pageNumber) return;
    if (pdfUrl === contentItem.signedPdfUrl) {
      setCurrentPage(item.pageNumber);
    } else {
      setModuleId(item.moduleItemId);
      setPdfUrl(contentItem.signedPdfUrl);
      setCurrentPage(item.pageNumber);
    }
  };

  const progressPct = Math.min(
    100,
    Math.round((courseProgress.unit.index / units.length) * 100),
  );

  return (
    <div
      id="units-sidebar"
      className="max-lg:mt-6 min-[1600px]:col-span-2 bg-white rounded-xl overflow-hidden"
      style={{
        border: "1px solid #E5E7EB",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* ── Header ── */}
      <div
        className="px-4 py-4 bg-white"
        style={{ borderBottom: "1px solid #F3F4F6" }}
      >
        {/* Title row */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-[#1A56DB]">
            <GraduationCapIcon size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-gray-900">Course content</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {units.length} unit{units.length !== 1 ? "s" : ""} · CPD
              Accredited
            </p>
          </div>
          {!isQuizOn && !isMobileLandscape && (
            <Chatbot moduleItemId={moduleId} />
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-[11px] text-gray-500">Overall progress</span>
            <span className="text-[11px] font-bold text-[#1A56DB]">
              Unit {courseProgress.unit.index} of {units.length} · {progressPct}
              %
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: "#F3F4F6" }}
          >
            <div
              className="h-full rounded-full bg-[#1A56DB] transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-3">
          {[
            { color: "#16A34A", bg: "#DCFCE7", label: "Completed" },
            { color: "#1A56DB", bg: "#EFF6FF", label: "In progress" },
            { color: "#9CA3AF", bg: "#F3F4F6", label: "Locked" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: l.bg,
                  border: `1.5px solid ${l.color}`,
                  flexShrink: 0,
                }}
              />
              <span className="text-[10.5px] text-gray-500">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Units list ── */}
      <ScrollArea className="h-full max-h-screen overflow-y-auto no-scrollbar">
        <div className="p-3.5">
          <Accordion
            value={values}
            onValueChange={(v) => {
              setValues(v);
              if (v) setActiveUnitId(v);
            }}
            type="single"
            collapsible
          >
            {memoizedUnits.map((unit, i) => {
              const isActive = unit.id === values;
              const isCompleted = unit.isUnitCompleted;
              const isLocked = !unit.isUnitAccessible;

              const statusColor = isCompleted
                ? "#16A34A"
                : isLocked
                  ? "#9CA3AF"
                  : "#1A56DB";
              const statusBg = isCompleted
                ? "#DCFCE7"
                : isLocked
                  ? "#F3F4F6"
                  : "#EFF6FF";
              const statusLabel = isCompleted
                ? "Completed"
                : isLocked
                  ? "Locked"
                  : "In Progress";
              const unitNum = String(unit.index).padStart(2, "0");

              return (
                <AccordionItem
                  disabled={isLocked}
                  value={unit.id}
                  key={unit.id}
                  className="border-b-0 rounded-xl mb-2.5 overflow-hidden last:mb-0"
                  style={{
                    border: `1px solid ${isActive && !isCompleted ? "#1A56DB40" : "#E5E7EB"}`,
                    boxShadow:
                      isActive && !isCompleted ? "0 0 0 1px #1A56DB20" : "none",
                  }}
                >
                  <AccordionTrigger
                    onClick={() => handleUnitClick(unit, i)}
                    className={cn(
                      "hover:no-underline px-4 py-3 transition-colors",
                      isActive ? "bg-[#F8FAFF]" : "bg-white",
                      isLocked
                        ? "[&>svg:last-child]:hidden cursor-not-allowed"
                        : "",
                    )}
                  >
                    <div className="flex items-center gap-2.5 w-full mr-2">
                      {/* Unit number badge */}
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                        style={{
                          background: isLocked ? "#F3F4F6" : "#1A56DB15",
                          color: isLocked ? "#9CA3AF" : "#1A56DB",
                        }}
                      >
                        {unitNum}
                      </div>

                      <div className="flex-1 min-w-0 text-left">
                        <p
                          className="text-[13px] font-semibold truncate"
                          style={{ color: isLocked ? "#9CA3AF" : "#111827" }}
                        >
                          Unit {unit.index}
                        </p>
                        <p className="text-[10.5px] text-gray-400 mt-0.5">
                          {isActive && unitInfo
                            ? `${unitInfo.modules.length} module${unitInfo.modules.length !== 1 ? "s" : ""}`
                            : isLocked
                              ? "Locked"
                              : "Available"}
                        </p>
                      </div>

                      {/* Status pill */}
                      <div
                        className="text-[10px] font-semibold rounded-full px-2.5 py-1 shrink-0 flex items-center gap-1"
                        style={{ color: statusColor, background: statusBg }}
                      >
                        {isLocked && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <rect
                              x="3"
                              y="6"
                              width="8"
                              height="6"
                              rx="1.5"
                              stroke="currentColor"
                              strokeWidth="1"
                            />
                            <path
                              d="M5 6V4.5a2 2 0 114 0V6"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                        {statusLabel}
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pb-0">
                    {isLoading ? (
                      <div className="flex justify-center py-6">
                        <Loader2Icon className="animate-spin" size={20} />
                      </div>
                    ) : unitInfo && unit.id === values ? (
                      <div
                        style={{
                          padding: "0 14px 14px",
                          borderTop: "1px solid #F3F4F6",
                          background: "#FAFAFA",
                        }}
                      >
                        {/* Module list */}
                        <div className="pt-2.5">
                          <Accordion
                            value={moduleValues[i]}
                            onValueChange={(v) => {
                              const updated = moduleValues.map((m, mi) =>
                                mi === i ? v : m,
                              );
                              setModuleValues(updated);
                            }}
                            type="multiple"
                            className="w-full space-y-2"
                          >
                            {memoizedModules.map((unitModule) => {
                              const isActiveModule = pdfUrl
                                ? unitModule.moduleItems.some((mi) =>
                                    mi.items.some(
                                      (item) =>
                                        extractPublicId(item.signedPdfUrl) ===
                                        extractPublicId(pdfUrl),
                                    ),
                                  )
                                : false;

                              const contentGroup = unitModule.moduleItems.find(
                                (m) => m.title === "CONTENT",
                              );
                              const practicalGroup =
                                unitModule.moduleItems.find(
                                  (m) => m.title === "PRACTICAL_APPLICATION",
                                );
                              const caseStudyGroup =
                                unitModule.moduleItems.find(
                                  (m) => m.title === "CASE_STUDY",
                                );
                              const cpdSlides =
                                contentGroup?.items.reduce(
                                  (s, it) => s + it.pages.length,
                                  0,
                                ) ?? 0;
                              const practicalCount =
                                practicalGroup?.items.length ?? 0;
                              const caseStudyCount =
                                caseStudyGroup?.items.length ?? 0;

                              return (
                                <AccordionItem
                                  value={`${unit.index}-${unitModule.index}`}
                                  key={unitModule.id}
                                  className="border-b-0 rounded-[10px] overflow-hidden"
                                  style={{
                                    border: "1px solid #F3F4F6",
                                    background: "white",
                                  }}
                                >
                                  <AccordionTrigger
                                    className={cn(
                                      "hover:no-underline px-3.5 py-2.5 transition-colors",
                                      isActiveModule
                                        ? "bg-blue-50/60"
                                        : "bg-white",
                                    )}
                                  >
                                    <div className="flex items-center gap-2 w-full mr-2">
                                      {/* Module label badge */}
                                      <div
                                        className="text-[10px] font-bold rounded px-2 py-0.5 shrink-0"
                                        style={{
                                          color: "#1A56DB",
                                          background: "#1A56DB15",
                                          letterSpacing: "0.03em",
                                        }}
                                      >
                                        Module {unitModule.index}
                                      </div>

                                      <div className="flex-1 min-w-0 text-left">
                                        <p className="text-[12.5px] font-semibold text-gray-900">
                                          Module {unitModule.index}
                                        </p>
                                        <p className="text-[10.5px] text-gray-400 mt-0.5">
                                          {cpdSlides > 0 &&
                                            `${cpdSlides} CPD slides`}
                                          {practicalCount > 0 &&
                                            ` · ${practicalCount} practical`}
                                          {caseStudyCount > 0 &&
                                            ` · ${caseStudyCount} case ${caseStudyCount === 1 ? "study" : "studies"}`}
                                        </p>
                                      </div>

                                      {/* Done / Upcoming pill */}
                                      <div
                                        className="text-[10px] font-semibold rounded-full px-2 py-0.5 shrink-0"
                                        style={{
                                          color: unitModule.isCompleted
                                            ? "#16A34A"
                                            : "#9CA3AF",
                                          background: unitModule.isCompleted
                                            ? "#DCFCE7"
                                            : "#F3F4F6",
                                        }}
                                      >
                                        {unitModule.isCompleted
                                          ? "✓ Done"
                                          : "Upcoming"}
                                      </div>
                                    </div>
                                  </AccordionTrigger>

                                  <AccordionContent className="pb-0">
                                    <div
                                      className="px-3.5 pt-2 pb-3.5"
                                      style={{
                                        borderTop: "1px solid #F3F4F6",
                                      }}
                                    >
                                      {[...unitModule.moduleItems]
                                        .sort(
                                          (a, b) =>
                                            (SECTION_TYPE_ORDER[a.title] ??
                                              99) -
                                            (SECTION_TYPE_ORDER[b.title] ?? 99),
                                        )
                                        .map((moduleItem) => {
                                          const cfg =
                                            SECTION_CFG[moduleItem.title];
                                          if (!cfg) return null;

                                          return (
                                            <SectionAccordion
                                              key={moduleItem.title}
                                              label={cfg.label}
                                              icon={cfg.icon}
                                              color={cfg.color}
                                              bg={cfg.bg}
                                              count={moduleItem.items.length}
                                              defaultOpen={cfg.defaultOpen}
                                            >
                                              {moduleItem.items.map(
                                                (contentItem) => {
                                                  const isActiveDocument =
                                                    pdfUrl
                                                      ? extractPublicId(
                                                          contentItem.signedPdfUrl,
                                                        ) ===
                                                        extractPublicId(pdfUrl)
                                                      : false;
                                                  const docTitle =
                                                    removeUnitModulePatternsExtended(
                                                      contentItem.pages[0]
                                                        ?.pageTitle ?? "",
                                                    );

                                                  return (
                                                    <div
                                                      key={contentItem.id}
                                                      className="mb-3 last:mb-0"
                                                    >
                                                      {/* Document header */}
                                                      <div className="flex items-center gap-2 mb-2">
                                                        <div className="shrink-0 flex items-center justify-center w-[18px]">
                                                          {unitModule.isCompleted ? (
                                                            <svg
                                                              width="18"
                                                              height="18"
                                                              viewBox="0 0 18 18"
                                                              fill="none"
                                                            >
                                                              <circle
                                                                cx="9"
                                                                cy="9"
                                                                r="8.5"
                                                                fill="#1A56DB"
                                                                stroke="#1A56DB"
                                                              />
                                                              <path
                                                                d="M5.5 9L7.5 11L12.5 6.5"
                                                                stroke="white"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                              />
                                                            </svg>
                                                          ) : isActiveDocument ? (
                                                            <svg
                                                              width="18"
                                                              height="18"
                                                              viewBox="0 0 18 18"
                                                              fill="none"
                                                            >
                                                              <circle
                                                                cx="9"
                                                                cy="9"
                                                                r="8.5"
                                                                stroke="#1A56DB"
                                                                strokeWidth="1.5"
                                                              />
                                                              <circle
                                                                cx="9"
                                                                cy="9"
                                                                r="4"
                                                                fill="#1A56DB"
                                                              />
                                                            </svg>
                                                          ) : (
                                                            <svg
                                                              width="18"
                                                              height="18"
                                                              viewBox="0 0 18 18"
                                                              fill="none"
                                                            >
                                                              <circle
                                                                cx="9"
                                                                cy="9"
                                                                r="8.5"
                                                                stroke="#D1D5DB"
                                                                strokeWidth="1"
                                                              />
                                                            </svg>
                                                          )}
                                                        </div>
                                                        <span
                                                          className={cn(
                                                            "flex-1 text-[12.5px] font-semibold leading-snug line-clamp-1",
                                                            isActiveDocument
                                                              ? "text-gray-900"
                                                              : unitModule.isCompleted
                                                                ? "text-gray-500"
                                                                : "text-gray-700",
                                                          )}
                                                        >
                                                          {docTitle}
                                                        </span>
                                                      </div>

                                                      {/* Page roadmap */}
                                                      <div className="pl-[26px]">
                                                        {contentItem.pages.map(
                                                          (page, pageIdx) => {
                                                            const isLastPage =
                                                              pageIdx ===
                                                              contentItem.pages
                                                                .length -
                                                                1;

                                                            const pageStatus =
                                                              unitModule.isCompleted
                                                                ? "done"
                                                                : isActiveDocument
                                                                  ? page.pageNumber <
                                                                    currentPage
                                                                    ? "done"
                                                                    : page.pageNumber ===
                                                                        currentPage
                                                                      ? "active"
                                                                      : "locked"
                                                                  : "locked";

                                                            const accentColor =
                                                              cfg.color;

                                                            return (
                                                              <div
                                                                key={page.id}
                                                                className="flex items-center"
                                                              >
                                                                {/* Node + connector column */}
                                                                <div className="flex flex-col items-center w-[18px] shrink-0 self-stretch">
                                                                  {/* Node */}
                                                                  <div
                                                                    className="shrink-0 mt-[11px]"
                                                                    style={{
                                                                      width: 10,
                                                                      height: 10,
                                                                      borderRadius:
                                                                        "50%",
                                                                      background:
                                                                        pageStatus ===
                                                                        "done"
                                                                          ? accentColor
                                                                          : "white",
                                                                      border: `2px solid ${
                                                                        pageStatus ===
                                                                        "locked"
                                                                          ? "#E5E7EB"
                                                                          : accentColor
                                                                      }`,
                                                                      boxShadow:
                                                                        pageStatus ===
                                                                        "active"
                                                                          ? `0 0 0 3px ${accentColor}40`
                                                                          : "none",
                                                                      flexShrink: 0,
                                                                    }}
                                                                  />
                                                                  {/* Connector */}
                                                                  {!isLastPage && (
                                                                    <div
                                                                      className="flex-1 mt-1"
                                                                      style={{
                                                                        width: 1,
                                                                        background:
                                                                          "repeating-linear-gradient(to bottom,#94A3B8 0,#94A3B8 3px,transparent 3px,transparent 6px)",
                                                                      }}
                                                                    />
                                                                  )}
                                                                </div>

                                                                {/* Row: thumbnail + title + badge */}
                                                                <button
                                                                  type="button"
                                                                  onClick={() =>
                                                                    handlePageClick(
                                                                      page,
                                                                      contentItem,
                                                                    )
                                                                  }
                                                                  disabled={
                                                                    isQuizOn ||
                                                                    pageStatus ===
                                                                      "locked"
                                                                  }
                                                                  className="flex-1 flex items-center gap-2.5 py-1.5 pl-2 text-left disabled:cursor-default"
                                                                >
                                                                  <SlideThumbnail
                                                                    type={
                                                                      moduleItem.title
                                                                    }
                                                                    isActive={
                                                                      pageStatus ===
                                                                      "active"
                                                                    }
                                                                    isCompleted={
                                                                      pageStatus ===
                                                                      "done"
                                                                    }
                                                                    thumbnailUrl={
                                                                      page.thumbnailUrl
                                                                    }
                                                                  />

                                                                  <span
                                                                    className={cn(
                                                                      "flex-1 text-[12px] leading-snug line-clamp-2",
                                                                      pageStatus ===
                                                                        "active"
                                                                        ? "font-medium text-[#1E40AF]"
                                                                        : pageStatus ===
                                                                            "done"
                                                                          ? "text-gray-500"
                                                                          : "text-gray-400",
                                                                    )}
                                                                  >
                                                                    {removeUnitModulePatternsExtended(
                                                                      page.pageTitle,
                                                                    )}
                                                                  </span>

                                                                  {pageStatus ===
                                                                    "active" && (
                                                                    <span className="flex items-center gap-1 bg-[#EFF6FF] text-[#1E40AF] text-[10px] font-medium rounded px-1.5 py-0.5 shrink-0">
                                                                      <PlayIcon
                                                                        size={8}
                                                                        fill="currentColor"
                                                                      />
                                                                      Now
                                                                    </span>
                                                                  )}
                                                                  {pageStatus ===
                                                                    "done" && (
                                                                    <CheckIcon
                                                                      size={13}
                                                                      className="shrink-0 text-[#1A56DB]"
                                                                    />
                                                                  )}
                                                                  {pageStatus ===
                                                                    "locked" && (
                                                                    <LockIcon
                                                                      size={11}
                                                                      className="shrink-0 text-gray-400"
                                                                    />
                                                                  )}
                                                                </button>
                                                              </div>
                                                            );
                                                          },
                                                        )}
                                                      </div>
                                                    </div>
                                                  );
                                                },
                                              )}
                                            </SectionAccordion>
                                          );
                                        })}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              );
                            })}
                          </Accordion>
                        </div>

                        {/* Assessment banner */}
                        <div className="mt-3">
                          {unit.isUnitCompleted &&
                          unitInfo?.assessmentRecord ? (
                            <div
                              className="flex items-center gap-2.5 p-3 rounded-[10px]"
                              style={{
                                background: "#F0FDF4",
                                border: "1px solid #BBF7D0",
                              }}
                            >
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-[#16A34A]"
                                style={{ background: "#16A34A15" }}
                              >
                                <ClipboardListIcon size={18} />
                              </div>
                              <div className="flex-1">
                                <p className="text-[12.5px] font-semibold text-[#15803D]">
                                  Unit Assessment
                                </p>
                                <p className="text-[11px] text-gray-500">
                                  Score:{" "}
                                  {unitInfo.assessmentRecord.gradePercentage}% ✓
                                </p>
                              </div>
                              <div
                                className="text-[11px] font-semibold rounded-lg px-3 py-1.5 shrink-0"
                                style={{
                                  color: "#16A34A",
                                  background: "#DCFCE7",
                                }}
                              >
                                Passed ✓
                              </div>
                            </div>
                          ) : (
                            <div
                              className="flex items-center gap-2.5 p-3 rounded-[10px]"
                              style={{
                                background: "#F8FAFF",
                                border: "1px solid #1A56DB30",
                              }}
                            >
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-[#1A56DB]"
                                style={{ background: "#1A56DB15" }}
                              >
                                <ClipboardListIcon size={18} />
                              </div>
                              <div className="flex-1">
                                <p className="text-[12.5px] font-semibold text-[#1E40AF]">
                                  Unit Assessment
                                </p>
                                <p className="text-[11px] text-gray-500">
                                  Complete all modules to unlock
                                </p>
                              </div>
                              <Button
                                id="start-assessment-btn"
                                loading={isGeneratingQuestions}
                                onClick={generateQuestions}
                                disabled={isQuizOn || isGeneratingQuestions}
                                type="button"
                                size="sm"
                                className="shrink-0"
                              >
                                <SparklesIcon size={12} className="mr-1" />
                                Start
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-400 text-sm">
                        No content available
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}
