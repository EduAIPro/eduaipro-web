/* eslint-disable react-hooks/exhaustive-deps */
import { updateModuleKey } from "@/api/keys";
import { updateModule } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CourseProgress, UnitDetails } from "@/types/course";
import { extractPublicId } from "@/utils/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BiCollapseAlt } from "react-icons/bi";
import { IoIosExpand } from "react-icons/io";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import ReactPlayer from "react-player";
import useSWRMutation from "swr/mutation";

type CourseMediaProps = {
  pdfUrl: string | null;
  introHasPlayed: boolean;
  setPdfUrl: Dispatch<SetStateAction<string | null>>;
  introVideoUrl?: string;
  courseProgress: CourseProgress;
  refetchCourse: VoidFunction;
  unitInfo?: UnitDetails;
  refetchUnitDetails: VoidFunction;
  startAssessment: VoidFunction;
  navigateToPreviousUnit?: () => Promise<string | null>; // Returns the last module's PDF URL of previous unit
};

// Setup pdfjs worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CourseMedia: React.FC<CourseMediaProps> = ({
  pdfUrl,
  introVideoUrl,
  setPdfUrl,
  courseProgress,
  introHasPlayed,
  refetchCourse,
  unitInfo,
  refetchUnitDetails,
  startAssessment,
  navigateToPreviousUnit,
}) => {
  const [hasIntroPlayed, setHasIntroPlayed] = useState<boolean>(introHasPlayed);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState(600);

  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<ReactPlayer>(null);
  const processedUpdatesRef = useRef(new Set<string>());

  const { trigger } = useSWRMutation(updateModuleKey, updateModule);

  const isMobile = containerWidth <= 500;

  const isUnitAccessible = useMemo(() => {
    return unitInfo ? unitInfo.index <= courseProgress.unit.index : false;
  }, [unitInfo, courseProgress.unit.index]);

  // Memoized resize handler
  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  // Sync intro video state with localStorage
  useEffect(() => {
    const introPlayed = window.localStorage.getItem("hasIntroPlayed");
    if (introPlayed) setHasIntroPlayed(true);
  }, [introHasPlayed]);

  // Find the module and moduleItem for a given page number - memoized
  const getModuleAndItemForPage = useCallback(
    (id: string) => {
      if (!unitInfo) return { module: undefined };
      for (const mod of unitInfo.modules) {
        if (mod.moduleItems.some((p) => p.id === id)) {
          return { module: mod };
        }
      }
      return { module: undefined };
    },
    [unitInfo]
  );

  const allModules = useMemo(() => {
    if (!unitInfo) return [];
    const modules = unitInfo.modules.flatMap((mod) =>
      mod.moduleItems.map((item) => ({
        ...item,
        moduleId: mod.id,
      }))
    );
    return modules.map((m, i) => ({ ...m, idx: i }));
  }, [unitInfo]);

  // Get pages for current PDF
  const currentModuleData = useMemo(() => {
    if (!pdfUrl) return;
    const current = allModules.find(
      (p) => extractPublicId(p.signedPdfUrl) === extractPublicId(pdfUrl)
    );
    return current;
  }, [allModules, pdfUrl]);

  // Get the next and previous pages (if any) - fixed logic
  const nextPageData = useMemo(() => {
    if (!currentModuleData) return null;
    const currentIndex = currentModuleData.idx;
    if (currentIndex === -1 || currentIndex >= allModules.length - 1)
      return null;
    return allModules[currentIndex + 1];
  }, [currentModuleData]);

  const prevPageData = useMemo(() => {
    if (!currentModuleData) return null;
    const currentIndex = currentModuleData.idx;
    if (currentIndex <= 0) return null;
    return allModules[currentIndex - 1];
  }, [currentModuleData]);

  // Check if current PDF is the last module in the current unit
  const isOnLastModule = useMemo(() => {
    if (!allModules || !pdfUrl) return false;
    const lastModuleItem = allModules[allModules.length - 1];
    return (
      extractPublicId(pdfUrl) === extractPublicId(lastModuleItem.signedPdfUrl)
    );
  }, [unitInfo, pdfUrl]);

  // Check if current PDF is the first module of the current unit
  const isOnFirstModule = useMemo(() => {
    if (!allModules || !pdfUrl) return false;
    const firstModuleItem = allModules[0];
    return (
      extractPublicId(pdfUrl) === extractPublicId(firstModuleItem.signedPdfUrl)
    );
  }, [unitInfo, pdfUrl]);

  // Check if we're on the first unit (unit index = 1)
  const isOnFirstUnit = useMemo(() => {
    return unitInfo?.index === 1;
  }, [unitInfo?.index]);

  // Handle Next button - fixed logic
  const handleNext = async () => {
    // If on last module and next button clicked, start assessment
    if (isOnLastModule) {
      startAssessment();
      return;
    }

    if (!unitInfo || !nextPageData || !currentModuleData) return;

    const updateKey = `next-${currentModuleData.id}-${nextPageData.id}`;
    if (processedUpdatesRef.current.has(updateKey)) return;

    try {
      const { module: nextMod } = getModuleAndItemForPage(nextPageData.id);

      // If moving to a new module, update progress
      if (
        nextMod &&
        currentModuleData &&
        nextMod.id !== currentModuleData.id &&
        isUnitAccessible
      ) {
        processedUpdatesRef.current.add(updateKey);
        await trigger({ moduleId: nextMod.id });
        refetchCourse();
        refetchUnitDetails();
      }

      // If moving to a new PDF, update PDF URL
      if (nextPageData.signedPdfUrl && nextPageData.signedPdfUrl !== pdfUrl) {
        setPdfUrl(nextPageData.signedPdfUrl);
      }
    } catch (error) {
      console.error("Error in handleNext:", error);
      processedUpdatesRef.current.delete(updateKey);
    }
  };

  // Handle Previous button - fixed logic
  const handlePrev = async () => {
    // If on first module of current unit, navigate to last module of previous unit
    if (isOnFirstModule && !isOnFirstUnit && navigateToPreviousUnit) {
      try {
        const previousUnitLastModulePdfUrl = await navigateToPreviousUnit();
        if (previousUnitLastModulePdfUrl) {
          setPdfUrl(previousUnitLastModulePdfUrl);
        }
      } catch (error) {
        console.error("Error navigating to previous unit:", error);
      }
      return;
    }

    if (!unitInfo || !prevPageData || !currentModuleData) return;

    const updateKey = `prev-${currentModuleData.id}-${prevPageData.id}`;
    if (processedUpdatesRef.current.has(updateKey)) return;

    try {
      setPdfUrl(prevPageData.signedPdfUrl);
    } catch (error) {
      console.error("Error in handlePrev:", error);
      processedUpdatesRef.current.delete(updateKey);
    }
  };
  // Fullscreen toggle - memoized
  const toggleFullScreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else if (viewerRef.current) {
      setIsFullscreen(true);
      viewerRef.current.requestFullscreen();
    }
  }, []);

  // Reset PDF state when file changes
  useEffect(() => {
    if (pdfUrl) {
      window.localStorage.setItem("lastPdf", pdfUrl);
    }
  }, [pdfUrl]);

  // Handle intro video completion
  const handleStartCourse = useCallback(() => {
    setHasIntroPlayed(true);
    try {
      window.localStorage.setItem("hasIntroPlayed", "true");
    } catch (error) {
      console.warn("Failed to save intro state:", error);
    }
  }, []);
  return (
    <div
      ref={viewerRef}
      className={cn(
        "xs:space-y-6",
        isFullscreen
          ? "max-h-screen overflow-y-scroll xs:p-4 bg-white"
          : "min-h-[70vh]",
        "col-span-3 h-fit space-y-3"
      )}
    >
      {hasIntroPlayed || !introVideoUrl ? (
        <>
          {/* Main PDF Viewer */}
          <div
            ref={containerRef}
            className={cn(
              "relative rounded overflow-hidden bg-white flex items-center justify-center",
              isFullscreen ? "max-xs:h-screen min-h-[80vh]" : "min-h-[600px]"
            )}
          >
            {pdfUrl && (
              <iframe
                src={pdfUrl}
                title="PDF Preview"
                className={cn(
                  "w-full object-cover",
                  isFullscreen ? "min-h-[90vh]" : "min-h-[700px]"
                )}
                style={{ border: "none" }}
              />
            )}

            <button
              onClick={toggleFullScreen}
              className="absolute bottom-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-md z-50 transition-colors"
              type="button"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <BiCollapseAlt size={20} />
              ) : (
                <IoIosExpand size={20} />
              )}
            </button>
          </div>

          {/* Navigation */}
          <div className={cn("flex justify-between")}>
            <Button
              onClick={handlePrev}
              variant="secondary"
              className={cn(
                isFullscreen
                  ? "max-xs:fixed max-xs:top-3 max-xs:z-20 max-xs:left-2"
                  : ""
              )}
              disabled={(isOnFirstUnit && isOnFirstModule) || !prevPageData}
              type="button"
            >
              {isFullscreen && isMobile ? (
                <ChevronLeftIcon className="rotate-90" size={20} />
              ) : (
                <>
                  <ChevronLeftIcon className="mr-1" size={16} />
                  Previous slide
                </>
              )}
            </Button>

            <Button
              onClick={handleNext}
              className={cn(
                isFullscreen
                  ? "max-xs:fixed max-xs:bottom-3 max-xs:z-20 max-xs:left-2"
                  : ""
              )}
              disabled={!isOnLastModule && !nextPageData}
              type="button"
            >
              {isFullscreen && isMobile ? (
                <ChevronRightIcon className="rotate-90" size={20} />
              ) : (
                <>
                  {isOnLastModule ? "Start Assessment" : "Next slide"}
                  <ChevronRightIcon className="ml-1" size={16} />
                </>
              )}
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="rounded-lg overflow-hidden">
            <ReactPlayer
              ref={playerRef}
              playing={!hasIntroPlayed}
              controls
              width="100%"
              height="400px"
              url={introVideoUrl}
              fallback={
                <div className="w-full h-96 rounded-lg animate-pulse bg-gray-200"></div>
              }
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleStartCourse} type="button">
              Start course
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseMedia;
