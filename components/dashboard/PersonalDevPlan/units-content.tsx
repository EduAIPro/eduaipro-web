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
import { CourseProgress, CourseUnit, UnitDetails } from "@/types/course";
import { groupByType } from "@/utils/helpers";
import {
  CircleCheckIcon,
  Loader2Icon,
  LockIcon,
  SparklesIcon,
  UnlockIcon,
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useSWRMutation from "swr/mutation";

type UnitsContentProps = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setIntroHasPlayed: Dispatch<SetStateAction<boolean>>;
  setPdfUrl: Dispatch<SetStateAction<string | null>>;
  setActiveUnitId: Dispatch<SetStateAction<string | null>>;
  courseProgress: CourseProgress;
  units: CourseUnit[];
  pdfUrl: string | null;
  generateQuestions: VoidFunction;
  isGeneratingQuestions: boolean;
  isQuizOn: boolean;
  unitInfo?: UnitDetails;
  isLoading: boolean;
};

export function UnitsContent({
  setCurrentPage,
  setIntroHasPlayed,
  setPdfUrl,
  pdfUrl,
  units,
  courseProgress,
  generateQuestions,
  isGeneratingQuestions,
  isQuizOn,
  setActiveUnitId,
  isLoading,
  unitInfo,
}: UnitsContentProps) {
  const { trigger } = useSWRMutation(updateModuleKey, updateModule);

  useEffect(() => {
    if (unitInfo) {
      unitInfo.modules.forEach((m) => {
        const activeModule = m.moduleItems.find(
          (item) => item.pdfUrl === pdfUrl
        );
        if (
          !courseProgress.module ||
          (activeModule && m.index > courseProgress.module?.index)
        ) {
          trigger({
            moduleId: m.id,
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfUrl, unitInfo]);

  return (
    <div className="max-lg:mt-6 min-[1600px]:col-span-2 bg-white rounded-xl border border-[#DBDBDB] p-5">
      <h4 className="font-semibold !text-base">Course content</h4>
      <ScrollArea className="h-full mt-6">
        <Accordion type="single" className="border rounded-lg p-2.5 pt-0">
          {units.map((unit, i) => {
            const isUnitCompleted = unit.index < courseProgress.unit.index;

            return (
              <AccordionItem
                disabled={unit.index > courseProgress.unit.index}
                value={unit.index.toString()}
                key={unit.index}
              >
                <AccordionTrigger
                  onClick={() => {
                    setActiveUnitId(unit.id);
                    setIntroHasPlayed(true);
                    window.localStorage.setItem("hasIntroPlayed", "true");
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-fit">
                      {unit.index > courseProgress.unit.index ? (
                        <LockIcon size={20} className="text-gray-600" />
                      ) : (
                        <UnlockIcon size={20} className="text-primary-300" />
                      )}
                    </div>
                    <div className="">
                      <h5 className="font-semibold text-sm text-grey-12/90 text-left">
                        Unit {unit.index} - {unit.title}
                      </h5>
                      {unitInfo ? (
                        <span className="text-xs lg:text-sm line-clamp-1 text-grey-10 w-full text-left">
                          {unitInfo.modules.length}{" "}
                          {unitInfo.modules.length === 1 ? "module" : "modules"}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {isLoading ? (
                    <Loader2Icon className="animate-spin mx-auto" />
                  ) : (
                    unitInfo && (
                      <div className="overflow-hidden transition-all duration-500 ease-in-out overflow-y-auto">
                        <ul className="space-y-2">
                          <Accordion type="single" className="w-full">
                            {unitInfo.modules.map((unitModule, index) => {
                              const isCompleted = courseProgress.module
                                ? unit.index <= courseProgress.unit.index &&
                                  unitModule.index <=
                                    courseProgress.module?.index
                                : null;

                              const moduleItems = groupByType(
                                unitModule.moduleItems
                              );
                              return (
                                <li
                                  key={unitModule.id}
                                  role="button"
                                  className="text-sm lg:text-base cursor-pointer flex items-center gap-2 w-full"
                                >
                                  <AccordionItem
                                    value={`${unit.index.toString()}-${unitModule.index.toString()}`}
                                    key={index}
                                    className="w-full"
                                  >
                                    <AccordionTrigger>
                                      <div className="text-sm lg:text-base cursor-pointer flex items-start gap-2">
                                        <div className="shrink-0">
                                          {isCompleted ? (
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
                                            isCompleted
                                              ? "text-primary-300"
                                              : "text-grey-500"
                                          )}
                                        >
                                          <h4 className="text-sm font-semibold text-left">
                                            Module {unitModule.index} -{" "}
                                            {unitModule.title}
                                          </h4>
                                          <p className="text-left">
                                            {unitModule.moduleItems.length}{" "}
                                            slides
                                          </p>
                                        </div>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-2">
                                      <ul className="space-y-2">
                                        {moduleItems.map((moduleItem) => (
                                          <li key={moduleItem.title}>
                                            <h2 className="font-semibold text-sm capitalize">
                                              {moduleItem.title
                                                .replace("_", " ")
                                                .toLowerCase()}
                                            </h2>
                                            {moduleItem.items.map(
                                              (contentItem) => (
                                                <ul key={contentItem.id}>
                                                  {contentItem.pages.map(
                                                    (item) => (
                                                      <li key={item.id}>
                                                        <button
                                                          onClick={() => {
                                                            if (
                                                              item.pageNumber &&
                                                              pdfUrl ===
                                                                contentItem.pdfUrl
                                                            ) {
                                                              setCurrentPage(
                                                                item.pageNumber
                                                              );
                                                            } else if (
                                                              item.pageNumber
                                                            ) {
                                                              setCurrentPage(
                                                                item.pageNumber
                                                              );
                                                              setPdfUrl(
                                                                contentItem.pdfUrl
                                                              );
                                                            }
                                                          }}
                                                          role="button"
                                                          className="cursor-pointer pl-6"
                                                        >
                                                          <p className="hover:underline hover:text-black">
                                                            - {item.pageTitle}
                                                          </p>
                                                        </button>
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              )
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    </AccordionContent>
                                  </AccordionItem>
                                </li>
                              );
                            })}
                          </Accordion>
                        </ul>
                        <div className="mt-3">
                          {isUnitCompleted ? (
                            <div>
                              <p className="text-lg font-medium flex items-center justify-between">
                                Score:{" "}
                                <span className="text-green-600">50%</span>
                              </p>
                            </div>
                          ) : (
                            <Button
                              loading={isGeneratingQuestions}
                              onClick={generateQuestions}
                              disabled={isQuizOn}
                              className="w-full"
                            >
                              <SparklesIcon /> Start assessment
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollArea>
    </div>
  );
}
