/* eslint-disable react-hooks/exhaustive-deps */
import { updateModuleKey } from "@/api/keys";
import { updateModule } from "@/api/mutations";
import ModuleDoc from "@/components/svgs/module-doc.svg";
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
import {
  CircleCheckIcon,
  Loader2Icon,
  LockIcon,
  SparklesIcon,
  UnlockIcon,
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
  setValues: Dispatch<SetStateAction<string[]>>;
  setModuleValues: Dispatch<SetStateAction<string[][]>>;
  setIntroHasPlayed: Dispatch<SetStateAction<boolean>>;
  setPdfUrl: Dispatch<SetStateAction<string | null>>;
  setModuleId: Dispatch<SetStateAction<string | null>>;
  setActiveUnitId: Dispatch<SetStateAction<string | null>>;
  courseProgress: CourseProgress;
  units: CourseUnit[];
  pdfUrl: string | null;
  generateQuestions: VoidFunction;
  isGeneratingQuestions: boolean;
  isQuizOn: boolean;
  unitInfo?: UnitDetails;
  isLoading: boolean;
  introHasPlayed: boolean;
  values: string[];
  moduleValues: string[][];
  moduleId: string | null;
};

export function UnitsContent({
  setCurrentPage,
  setIntroHasPlayed,
  setPdfUrl,
  pdfUrl,
  setModuleId,
  units,
  courseProgress,
  generateQuestions,
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
}: UnitsContentProps) {
  const { trigger } = useSWRMutation(updateModuleKey, updateModule);
  const processedModulesRef = useRef(new Set<string>());

  // Memoize expensive calculations
  const memoizedUnits = useMemo(() => {
    return units.map((unit) => ({
      ...unit,
      isUnitCompleted: unit.index < courseProgress.unit.index,
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

  // Optimize module updates with better dependency tracking
  useEffect(() => {
    if (!unitInfo || !pdfUrl) return;

    const modulesToUpdate: string[] = [];

    unitInfo.modules.forEach((m) => {
      // Skip if already processed
      if (processedModulesRef.current.has(`${m.id}-${pdfUrl}`)) return;

      const activeModule = m.moduleItems.find(
        (item) => item.signedPdfUrl === pdfUrl
      );

      if (
        activeModule &&
        (!courseProgress.module || m.index > courseProgress.module?.index)
      ) {
        modulesToUpdate.push(m.id);
        processedModulesRef.current.add(`${m.id}-${pdfUrl}`);
      }
    });

    // Batch update modules
    if (modulesToUpdate.length > 0) {
      Promise.all(
        modulesToUpdate.map((moduleId) => trigger({ moduleId }))
      ).catch(console.error);
    }
  }, [pdfUrl, unitInfo?.modules, courseProgress.module?.index]);

  // Memoized handlers to prevent unnecessary re-renders
  const handleUnitClick = useCallback(
    (unit: CourseUnit, index: number) => {
      if (unit.index > courseProgress.unit.index) return;

      setActiveUnitId(unit.id);

      if (index === 0 && !introHasPlayed) {
        setIntroHasPlayed(true);
        try {
          window.localStorage.setItem("hasIntroPlayed", "true");
        } catch (error) {
          console.warn("Failed to save intro state:", error);
        }
      }
    },
    [courseProgress.unit.index, introHasPlayed]
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
    <div className="max-lg:mt-6 min-[1600px]:col-span-2 bg-white rounded-xl border border-[#DBDBDB] p-5">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold !text-base">Course content</h4>
        {moduleId ? <Chatbot moduleItemId={moduleId} /> : null}
      </div>
      <ScrollArea className="h-full mt-6 max-h-screen overflow-y-auto no-scrollbar">
        <Accordion
          value={values}
          onValueChange={(v) => {
            setValues(v);
          }}
          type="multiple"
          className="border rounded-lg p-2.5 pt-0"
        >
          {memoizedUnits.map((unit, i) => (
            <AccordionItem
              disabled={!unit.isUnitAccessible}
              value={unit.index.toString()}
              key={unit.id} // Use ID instead of index for better key stability
            >
              <AccordionTrigger
                onClick={() => handleUnitClick(unit, i)}
                className="hover:no-underline" // Prevent default hover underline that might cause layout shift
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    {!unit.isUnitAccessible ? (
                      <LockIcon size={20} className="text-gray-600" />
                    ) : (
                      <UnlockIcon size={20} className="text-primary-300" />
                    )}
                  </div>
                  <div className="text-left">
                    <h5 className="font-semibold text-sm text-grey-12/90">
                      Unit {unit.index}
                    </h5>
                    {unitInfo && (
                      <span className="text-xs lg:text-sm line-clamp-1 text-grey-10 w-full">
                        {unitInfo.modules.length}{" "}
                        {unitInfo.modules.length === 1 ? "module" : "modules"}
                      </span>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2Icon className="animate-spin" size={24} />
                  </div>
                ) : unitInfo ? (
                  <div className="space-y-2">
                    <Accordion
                      value={moduleValues[i]}
                      onValueChange={(v) => {
                        const newModule = moduleValues.map((m, mi) =>
                          mi === i ? v : m
                        );
                        setModuleValues(newModule);
                      }}
                      type="multiple"
                      className="w-full"
                    >
                      {memoizedModules.map((unitModule) => {
                        const pages = unitModule.moduleItems.map(
                          (m) => m.items.length
                        );
                        const totalSlides = pages.reduce((p, c) => p + c, 0);
                        return (
                          <AccordionItem
                            value={`${unit.index}-${unitModule.index}`}
                            key={unitModule.id}
                            className="w-full"
                          >
                            <AccordionTrigger className="hover:no-underline">
                              <div className="text-sm lg:text-base cursor-pointer flex items-start gap-2">
                                <div className="shrink-0 w-4 h-4 flex items-center justify-center mt-0.5">
                                  {unitModule.isCompleted ? (
                                    <CircleCheckIcon
                                      size={17}
                                      className="text-primary-300"
                                    />
                                  ) : (
                                    <ModuleDoc width={16} height={16} />
                                  )}
                                </div>
                                <div
                                  className={cn(
                                    "text-left",
                                    unitModule.isCompleted
                                      ? "text-primary-300"
                                      : "text-grey-500"
                                  )}
                                >
                                  <h4 className="text-sm font-semibold">
                                    Module {unitModule.index}
                                  </h4>
                                  <p className="text-xs">
                                    {totalSlides} slides
                                  </p>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2">
                              <ul className="space-y-2">
                                {unitModule.moduleItems.map((moduleItem) => (
                                  <li
                                    key={`${moduleItem.title}-${unitModule.id}`}
                                  >
                                    <h2 className="font-semibold text-sm capitalize mb-1">
                                      {moduleItem.title
                                        .replace("_", " ")
                                        .toLowerCase()}
                                    </h2>
                                    {moduleItem.items.map((contentItem) => (
                                      <ul
                                        key={contentItem.id}
                                        className="space-y-1"
                                      >
                                        {contentItem.pages.map((item) => (
                                          <li key={item.id}>
                                            <button
                                              onClick={() =>
                                                handlePageClick(
                                                  item,
                                                  contentItem
                                                )
                                              }
                                              disabled={isQuizOn}
                                              className="cursor-pointer pl-6 w-full text-left disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 py-1 px-2 rounded transition-colors"
                                              type="button"
                                            >
                                              <p
                                                className={cn(
                                                  "hover:underline hover:text-black text-sm",
                                                  courseProgress.module?.id ===
                                                    contentItem.id
                                                    ? "text-primary-400"
                                                    : ""
                                                )}
                                              >
                                                -
                                                {removeUnitModulePatternsExtended(
                                                  item.pageTitle
                                                )}
                                              </p>
                                            </button>
                                          </li>
                                        ))}
                                      </ul>
                                    ))}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>

                    <div className="mt-4 pt-3">
                      {unit.isUnitCompleted ? (
                        <div className="bg-green-50 p-3 rounded-lg border-green-600 border">
                          <p className="text-sm font-medium flex items-center justify-between">
                            <span>Unit Completed</span>
                            <span className="text-green-600 font-semibold">
                              Score: 50%
                            </span>
                          </p>
                        </div>
                      ) : (
                        <Button
                          loading={isGeneratingQuestions}
                          onClick={generateQuestions}
                          disabled={isQuizOn || isGeneratingQuestions}
                          className="w-full"
                          type="button"
                        >
                          <SparklesIcon className="mr-2" size={16} />
                          Start assessment
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>No content available</p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}
