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
  CheckCircleIcon,
  CheckIcon,
  CircleDashedIcon,
  FileTextIcon,
  Loader2Icon,
  LockIcon,
  SparklesIcon,
} from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import useSWRMutation from "swr/mutation";
import Chatbot from "../chat";

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
};

// Color accent per document type for the thumbnail header strip
const TYPE_COLORS: Record<string, string> = {
  CONTENT: "bg-[#185FA5]",
  CASE_STUDY: "bg-[#0F6E56]",
  PRACTICAL_APPLICATION: "bg-[#534AB7]",
};

// Human-readable category label
const TYPE_LABELS: Record<string, string> = {
  CONTENT: "content",
  CASE_STUDY: "case study",
  PRACTICAL_APPLICATION: "practical application",
};

// Simulated page-line texture colours per type (light strip lines)
const LINE_COLORS: Record<string, string> = {
  CONTENT: "bg-blue-200",
  CASE_STUDY: "bg-teal-200",
  PRACTICAL_APPLICATION: "bg-violet-200",
};

function PdfThumbnail({ type }: { type: string }) {
  const header = TYPE_COLORS[type] ?? "bg-gray-400";
  const lines = LINE_COLORS[type] ?? "bg-gray-200";
  return (
    <div className="w-11 h-14 rounded border border-[#DBDBDB] overflow-hidden flex flex-col shrink-0">
      <div className={cn("h-3 flex items-center px-1", header)}>
        <span className="text-[5px] text-white font-medium tracking-wide truncate">
          {TYPE_LABELS[type]?.toUpperCase() ?? "DOC"}
        </span>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 flex flex-col gap-[3px]">
        {[100, 80, 100, 60, 100, 75, 100].map((w, i) => (
          <div
            key={i}
            className={cn("h-[2px] rounded-sm", lines)}
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </div>
  );
}

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

      return {
        ...unitModule,
        isCompleted,
        moduleItems,
      };
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

      if (index === 0 && !introHasPlayed) {
        handleIntroPlayed();
      }
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

  return (
    <div
      id="units-sidebar"
      className="max-lg:mt-6 min-[1600px]:col-span-2 bg-white rounded-xl border border-[#DBDBDB] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#DBDBDB]">
        <div>
          <h4 className="font-semibold text-sm text-gray-900">
            Course content
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Unit {courseProgress.unit.index} of {units.length}&nbsp;·&nbsp;
            {Math.round((courseProgress.unit.index / units.length) * 100)}%
            complete
          </p>
        </div>
        {!isQuizOn && !isMobileLandscape ? (
          <Chatbot moduleItemId={moduleId} />
        ) : null}
      </div>

      <ScrollArea className="h-full max-h-screen overflow-y-auto no-scrollbar">
        <div className="py-1">
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

              return (
                <AccordionItem
                  disabled={isLocked}
                  value={unit.id}
                  key={unit.id}
                  className="border-b border-[#DBDBDB] last:border-b-0"
                >
                  <AccordionTrigger
                    onClick={() => handleUnitClick(unit, i)}
                    className={cn(
                      "hover:no-underline px-4 py-2.5 transition-colors",
                      isActive
                        ? "bg-gray-50 border-l-[3px] border-l-[#378ADD] pl-[13px]"
                        : "border-l-[3px] border-l-transparent",
                      isLocked ? "opacity-40 cursor-not-allowed" : "",
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-4 h-4 flex items-center justify-center shrink-0">
                        {isLocked ? (
                          <LockIcon size={14} className="text-gray-400" />
                        ) : isCompleted ? (
                          <CheckIcon size={14} className="text-[#1D9E75]" />
                        ) : (
                          <BookOpenIcon size={14} className="text-[#378ADD]" />
                        )}
                      </div>
                      <div className="text-left">
                        <p
                          className={cn(
                            "text-sm font-medium",
                            isActive ? "text-gray-900" : "text-gray-600",
                            isCompleted && !isActive ? "text-gray-400" : "",
                          )}
                        >
                          Unit {unit.index}
                        </p>
                        {isActive && unitInfo && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {unitInfo.modules.length}{" "}
                            {unitInfo.modules.length === 1
                              ? "module"
                              : "modules"}
                          </p>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    {isLoading ? (
                      <div className="flex justify-center py-4">
                        <Loader2Icon className="animate-spin" size={20} />
                      </div>
                    ) : unitInfo && unit.id === values ? (
                      <div className="space-y-1 pb-1">
                        <Accordion
                          value={moduleValues[i]}
                          onValueChange={(v) => {
                            const newModule = moduleValues.map((m, mi) =>
                              mi === i ? v : m,
                            );
                            setModuleValues(newModule);
                          }}
                          type="multiple"
                          className="w-full"
                        >
                          {memoizedModules.map((unitModule) => {
                            const pages = unitModule.moduleItems.map(
                              (m) => m.items.length,
                            );
                            const totalSlides = pages.reduce(
                              (p, c) => p + c,
                              0,
                            );
                            const moduleSlides =
                              unitModule.moduleItems?.flatMap((mI) =>
                                mI.items.map((i) => i.signedPdfUrl),
                              );
                            const isActiveModule = pdfUrl
                              ? moduleSlides.some(
                                  (s) =>
                                    extractPublicId(s) ===
                                    extractPublicId(pdfUrl),
                                )
                              : false;

                            return (
                              <AccordionItem
                                value={`${unit.index}-${unitModule.index}`}
                                key={unitModule.id}
                                className="w-full border-none"
                              >
                                <AccordionTrigger
                                  className={cn(
                                    "hover:no-underline px-4 py-2 transition-colors",
                                    isActiveModule ? "bg-blue-50/60" : "",
                                  )}
                                >
                                  <div className="flex items-center gap-2 pl-5">
                                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                                      {unitModule.isCompleted ? (
                                        <CheckCircleIcon
                                          size={15}
                                          className="text-[#1D9E75]"
                                        />
                                      ) : (
                                        <CircleDashedIcon
                                          size={15}
                                          className="text-gray-400"
                                        />
                                      )}
                                    </div>
                                    <div
                                      className={cn(
                                        "text-left",
                                        unitModule.isCompleted
                                          ? "text-[#1D9E75]"
                                          : "text-gray-600",
                                      )}
                                    >
                                      <p className="text-sm font-medium">
                                        Module {unitModule.index}
                                      </p>
                                      <p className="text-xs text-gray-400">
                                        {totalSlides} slides
                                      </p>
                                    </div>
                                  </div>
                                </AccordionTrigger>

                                <AccordionContent className="pb-2">
                                  <ul className="space-y-3 px-4 pt-1">
                                    {[...unitModule.moduleItems]
                                      .sort((a, b) => {
                                        const order: Record<string, number> = {
                                          CONTENT: 0,
                                          CASE_STUDY: 1,
                                          PRACTICAL_APPLICATION: 2,
                                        };
                                        return (
                                          (order[a.title] ?? 99) -
                                          (order[b.title] ?? 99)
                                        );
                                      })
                                      .map((moduleItem) => (
                                        <li
                                          key={`${moduleItem.title}-${unitModule.id}`}
                                        >
                                          {/* Category label */}
                                          <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400 mb-2 pl-7">
                                            {TYPE_LABELS[moduleItem.title] ??
                                              moduleItem.title
                                                .replace(/_/g, " ")
                                                .toLowerCase()}
                                          </p>

                                          {/* Thumbnail cards */}
                                          {moduleItem.items.map(
                                            (contentItem) => {
                                              const isActiveSlide = pdfUrl
                                                ? extractPublicId(
                                                    contentItem.signedPdfUrl,
                                                  ) === extractPublicId(pdfUrl)
                                                : false;

                                              // Use first page title as the card title
                                              const cardTitle =
                                                contentItem.pages[0]
                                                  ?.pageTitle ?? "";
                                              const pageCount =
                                                contentItem.pages.length;

                                              return (
                                                <button
                                                  key={contentItem.id}
                                                  onClick={() => {
                                                    if (contentItem.pages[0]) {
                                                      handlePageClick(
                                                        contentItem.pages[0],
                                                        contentItem,
                                                      );
                                                    }
                                                  }}
                                                  disabled={isQuizOn}
                                                  type="button"
                                                  className={cn(
                                                    "w-full flex items-center gap-3 p-2 rounded-lg border text-left transition-colors mb-2",
                                                    "disabled:opacity-50 disabled:cursor-not-allowed",
                                                    isActiveSlide
                                                      ? "border-[#378ADD] bg-blue-50"
                                                      : "border-[#DBDBDB] bg-white hover:border-gray-300 hover:bg-gray-50",
                                                  )}
                                                >
                                                  <PdfThumbnail
                                                    type={moduleItem.title}
                                                  />
                                                  <div className="flex-1 min-w-0">
                                                    <p
                                                      className={cn(
                                                        "text-xs font-medium leading-snug line-clamp-2",
                                                        isActiveSlide
                                                          ? "text-[#185FA5]"
                                                          : "text-gray-800",
                                                      )}
                                                    >
                                                      {removeUnitModulePatternsExtended(
                                                        cardTitle,
                                                      )}
                                                    </p>
                                                    <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                                      <FileTextIcon size={10} />
                                                      {pageCount}{" "}
                                                      {pageCount === 1
                                                        ? "page"
                                                        : "pages"}
                                                    </p>
                                                  </div>
                                                </button>
                                              );
                                            },
                                          )}
                                        </li>
                                      ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            );
                          })}
                        </Accordion>

                        {/* Assessment / completion footer */}
                        <div className="px-4 pt-2">
                          {unit.isUnitCompleted &&
                          unitInfo?.assessmentRecord ? (
                            <div className="bg-green-50/60 p-3 rounded-lg border border-green-600/60">
                              <p className="text-sm font-medium flex items-center justify-between">
                                <span className="text-green-800">
                                  Unit completed
                                </span>
                                <span className="text-green-700 font-medium">
                                  Score:{" "}
                                  {unitInfo?.assessmentRecord?.gradePercentage}%
                                </span>
                              </p>
                            </div>
                          ) : (
                            <Button
                              id="start-assessment-btn"
                              loading={isGeneratingQuestions}
                              onClick={generateQuestions}
                              disabled={isQuizOn || isGeneratingQuestions}
                              className="w-full"
                              type="button"
                            >
                              <SparklesIcon className="mr-2" size={14} />
                              Start assessment
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-400 text-sm">
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
