/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { generateUnitQuestions } from "@/api/keys";
import { fetchUnitQuestions } from "@/api/queries";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useGetUnit from "@/hooks/use-get-unit";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  AssessmentSubmitResponse,
  GeneratedQuestions,
} from "@/types/assessment";
import { CourseProgress, CourseUnit } from "@/types/course";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { Assessment } from "./assessment";
import { AssessmentCompletedModal } from "./assessment/completed-modal";
import { AssessmentResults } from "./assessment/results";
import CourseMedia from "./course-media";
import { UnitsContent } from "./units-content";

type PersonalDevPlanProps = {
  introVideoUrl?: string;
  courseProgress: CourseProgress;
  refetchCourse: VoidFunction;
  units: CourseUnit[];
};

const PersonalDevPlan = ({ units, ...props }: PersonalDevPlanProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isQuizOn, setIsQuizOn] = useState(false);
  const [introHasPlayed, setIntroHasPlayed] = useState(false);
  const [isViewingResults, setIsViewingResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assessmentResults, setAssessmentResults] =
    useState<null | AssessmentSubmitResponse>(null);
  const [pdfUrl, setPdfUrl] = useState<null | string>(null);
  const [accordionValues, setAccordionValues] = useState<string[]>(["1"]);
  const [moduleAccValues, setModuleAccValues] = useState<string[][]>(
    units.map((_, i) => (i === 0 ? ["1"] : []))
  );
  const { courseProgress } = props;
  const [activeUnitId, setActiveUnitId] = useState<null | string>(
    courseProgress.unit.id
  );

  const isMobile = useIsMobile();

  const {
    trigger: triggerQuestions,
    data: questions,
    error,
    isMutating,
  } = useSWRMutation<GeneratedQuestions>(
    generateUnitQuestions,
    fetchUnitQuestions
  );

  const {
    data: unitInfo,
    isLoading,
    mutate,
  } = useGetUnit({
    unitId: activeUnitId,
  });

  useEffect(() => {
    if (window && !introHasPlayed) {
      const hasIntroPlayed = window.localStorage.getItem("hasIntroPlayed");
      if (hasIntroPlayed || !!unitInfo) {
        setIntroHasPlayed(true);
      }
    }
  }, [unitInfo]);

  useEffect(() => {
    if (window && !pdfUrl) {
      const lastPdf = window.localStorage.getItem("lastPdf");
      if (lastPdf) {
        setPdfUrl(lastPdf);
      } else if (unitInfo) {
        const mostRecentPdf = unitInfo.modules[0].moduleItems[0].signedPdfUrl;
        setPdfUrl(mostRecentPdf);
      }
    }
  }, []);

  function startAssessment() {
    setIsQuizOn(true);
    triggerQuestions().then(() => {
      setIsViewingResults(false);
      setAssessmentResults(null);
    });
  }

  function removeAssessmentScreen() {
    setIsQuizOn(false);
    setIsModalOpen(true);
    setIsViewingResults(true);
  }

  const LeftPanel = () => {
    return isQuizOn ? (
      <Assessment
        isLoading={isMutating}
        data={questions}
        error={error}
        removeAssessmentScreen={removeAssessmentScreen}
        onSubmisson={(v: AssessmentSubmitResponse) => setAssessmentResults(v)}
      />
    ) : (
      <CourseMedia
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        introHasPlayed={introHasPlayed}
        pdfUrl={pdfUrl}
        setPdfUrl={setPdfUrl}
        unitInfo={unitInfo}
        refetchUnitDetails={() => mutate(unitInfo)}
        {...props}
      />
    );
  };

  const RightPanel = () => {
    return (
      <UnitsContent
        setCurrentPage={setCurrentPage}
        setIntroHasPlayed={setIntroHasPlayed}
        introHasPlayed={introHasPlayed}
        units={units}
        pdfUrl={pdfUrl}
        setPdfUrl={setPdfUrl}
        values={accordionValues}
        moduleValues={moduleAccValues}
        setModuleValues={setModuleAccValues}
        setValues={setAccordionValues}
        courseProgress={props.courseProgress}
        generateQuestions={startAssessment}
        isGeneratingQuestions={isMutating}
        isQuizOn={isQuizOn}
        setActiveUnitId={setActiveUnitId}
        unitInfo={unitInfo}
        isLoading={isLoading}
      />
    );
  };

  return (
    <>
      {isViewingResults && assessmentResults ? (
        <AssessmentResults
          response={assessmentResults}
          retakeAssessment={startAssessment}
          questionsLoading={isMutating}
        />
      ) : (
        <div>
          {isMobile ? (
            <div className="lg:grid grid-cols-4 min-[1600px]:grid-cols-5 gap-6 w-full justify-between">
              <LeftPanel />
              <RightPanel />
            </div>
          ) : (
            <ResizablePanelGroup direction="horizontal" className="space-x-3">
              <ResizablePanel defaultSize={65}>
                <LeftPanel />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={35}>
                <RightPanel />
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
        </div>
      )}

      <AssessmentCompletedModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </>
  );
};

export default PersonalDevPlan;
