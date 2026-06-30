import { adminGetCourseUnit, getCoursesKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { Course, UnitDetails } from "@/types/course";
import { UpdateCourseSummaryFormValue } from "@/utils/validation/admin";
import { format } from "date-fns";
import { Loader2Icon } from "lucide-react";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { NewUnitModal, UpdateCourseSummary } from "../modals";

export const ViewCourse = ({
  isOpen,
  toggleOpen,
  courseId,
}: {
  isOpen: boolean;
  toggleOpen: (v: boolean) => void;
  courseId: string;
}) => {
  const [activeUnitId, setActiveUnitId] = useState<null | string>(null);
  const { data, isLoading } = useSWR<Course>(
    courseId ? `${getCoursesKey}/${courseId}` : null,
    generalFetcher,
  );
  const { data: unitInfo, isLoading: unitLoading } = useSWR<UnitDetails>(
    activeUnitId ? adminGetCourseUnit(activeUnitId) : null,
    generalFetcher,
  );

  const courseSummary = useMemo(
    () => [
      {
        label: "Course title",
        value: data?.title ?? "",
      },
      {
        label: "Course description",
        value: data?.description ?? "",
      },
      {
        label: "Access period",
        value: data?.validityPeriodDays
          ? `${data?.validityPeriodDays} days`
          : "",
      },
      {
        label: "Teaching level",
        value: data?.level ?? "",
      },
      {
        label: "Date created",
        value: format(data?.createdAt ?? new Date(), "dd/MM/yyyy"),
      },
    ],
    [data],
  );

  const updatePayload: UpdateCourseSummaryFormValue = useMemo(() => {
    return {
      courseName: data?.title ?? "",
      introductoryVideo: data?.introductoryVideoUrl ?? "",
      description: data?.description ?? "",
      completionPeriod: data?.completionPeriod?.toString() ?? "90",
      teachingLevel: data?.level ?? "",
      validityPeriod: data?.validityPeriodDays?.toString() ?? "360",
    };
  }, [data]);

  return (
    <Sheet open={isOpen} onOpenChange={toggleOpen}>
      <SheetContent className="w-full md:min-w-[60vw] xl:min-w-[40vw] max-sm:p-3 overflow-y-scroll">
        <SheetHeader>
          <h2 className="font-semibold text-lg text-left">
            Course Information
          </h2>
        </SheetHeader>

        <div className="pr-5 space-y-6">
          <div className="mt-5">
            <div className="flex items-center justify-between pr-5">
              <h3 className="font-semibold text-base">Course summary</h3>

              {data ? (
                <UpdateCourseSummary
                  courseId={courseId}
                  defaultValues={updatePayload}
                />
              ) : null}
            </div>
            <ul className="space-y-2 mt-3">
              {courseSummary.map((section) => (
                <li
                  key={section.label}
                  className="flex items-start max-sm:flex-col"
                >
                  <p className="font-medium text-grey-500 min-w-44 text-[15px]">
                    {section.label}:
                  </p>
                  {isLoading ? (
                    <Skeleton className="w-full rounded-full h-3" />
                  ) : (
                    <p className="text-grey-800 font-medium text-base">
                      {section.value}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between pr-5">
              <h3 className="font-semibold text-base">Course units</h3>
              {data?.units ? (
                <NewUnitModal
                  courseId={courseId}
                  lastIndex={data?.units[data?.units.length - 1].index}
                />
              ) : null}
            </div>
            <ul className="space-y-2 mt-3 pr-5">
              {isLoading ? (
                new Array(10)
                  .fill("")
                  .map((_, i) => (
                    <Skeleton key={i} className="w-full h-3 rounded-full" />
                  ))
              ) : (
                <Accordion type="single">
                  {data?.units.map((unit) => (
                    <AccordionItem key={unit.id} value={unit.id}>
                      <AccordionTrigger
                        onClick={() => setActiveUnitId(unit.id)}
                      >
                        <div className="w-full items-center justify-between flex">
                          <p className="font-medium text-grey-500 text-[15px]">
                            {unit.title}
                          </p>
                          <NewUnitModal
                            unitId={unit.id}
                            prevTitle={unit.title}
                          />
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {unitLoading ? (
                          <div className="min-h-40 flex items-center justify-center">
                            <Loader2Icon size={18} className="animate-spin" />
                          </div>
                        ) : (
                          <div className="mt-4">
                            {unitInfo?.modules?.map((moduleItem) => {
                              const grouped = moduleItem.moduleItems?.reduce(
                                (acc, item) => {
                                  if (!acc[item.type]) acc[item.type] = [];
                                  acc[item.type].push(item);
                                  return acc;
                                },
                                {} as Record<
                                  string,
                                  typeof moduleItem.moduleItems
                                >,
                              );

                              return (
                                <div
                                  key={moduleItem.id}
                                  className="mb-6 last:mb-0"
                                >
                                  <h4 className="font-semibold text-grey-800 mb-3">
                                    {moduleItem.title}
                                  </h4>

                                  <div className="space-y-4 pl-3">
                                    {grouped?.["CONTENT"]?.length ? (
                                      <div>
                                        <p className="text-sm font-medium text-grey-500 mb-2">
                                          Content
                                        </p>
                                        <ul className="space-y-2 pl-3">
                                          {grouped["CONTENT"].map((item) => (
                                            <li
                                              key={item.id}
                                              className="flex items-center justify-between"
                                            >
                                              <p className="text-sm text-grey-11">
                                                {item.pages[0]?.pageTitle}
                                              </p>
                                              <Modal
                                                title="View PDF"
                                                trigger={
                                                  <button className="text-sm font-medium text-primary underline">
                                                    View PDF
                                                  </button>
                                                }
                                                containerClassName="max-w-7xl h-[85vh]"
                                                className="w-full h-full p-0"
                                              >
                                                <iframe
                                                  src={item.signedPdfUrl}
                                                  className="w-full h-full border-0"
                                                />
                                              </Modal>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ) : null}

                                    {grouped?.["PRACTICAL_APPLICATION"]
                                      ?.length ? (
                                      <div>
                                        <p className="text-sm font-medium text-grey-500 mb-2">
                                          Practical Applications
                                        </p>
                                        <ul className="space-y-2 pl-3">
                                          {grouped["PRACTICAL_APPLICATION"].map(
                                            (item) => (
                                              <li
                                                key={item.id}
                                                className="flex items-center justify-between"
                                              >
                                                <p className="text-sm text-grey-11">
                                                  {item.pages[0]?.pageTitle}
                                                </p>
                                                <Modal
                                                  title="View PDF"
                                                  trigger={
                                                    <button className="text-sm font-medium text-primary underline">
                                                      View PDF
                                                    </button>
                                                  }
                                                  containerClassName="max-w-7xl h-[85vh]"
                                                  className="w-full p-0"
                                                >
                                                  <iframe
                                                    src={item.signedPdfUrl}
                                                    className="w-full h-full border-0"
                                                  />
                                                </Modal>
                                              </li>
                                            ),
                                          )}
                                        </ul>
                                      </div>
                                    ) : null}

                                    {grouped?.["CASE_STUDY"]?.length ? (
                                      <div>
                                        <p className="text-sm font-medium text-grey-500 mb-2">
                                          Case Study
                                        </p>
                                        <ul className="space-y-2 pl-3">
                                          {grouped["CASE_STUDY"].map((item) => (
                                            <li
                                              key={item.id}
                                              className="flex items-center justify-between"
                                            >
                                              <p className="text-sm text-grey-11">
                                                {item.pages[0]?.pageTitle}
                                              </p>
                                              <Modal
                                                title="View PDF"
                                                trigger={
                                                  <button className="text-sm font-medium text-primary underline">
                                                    View PDF
                                                  </button>
                                                }
                                                containerClassName="max-w-7xl h-[85vh]"
                                                className="w-full p-0"
                                              >
                                                <iframe
                                                  src={item.signedPdfUrl}
                                                  className="w-full h-full border-0"
                                                />
                                              </Modal>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
