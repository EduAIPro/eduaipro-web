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
import { useState } from "react";
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
        units={units}
        pdfUrl={pdfUrl}
        setPdfUrl={setPdfUrl}
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
            <ResizablePanelGroup direction="horizontal" className="space-x-5">
              <ResizablePanel defaultSize={75}>
                <LeftPanel />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25}>
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
