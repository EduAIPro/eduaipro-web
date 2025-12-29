/* eslint-disable react-hooks/exhaustive-deps */
import { updateModuleKey } from "@/api/keys";
import { updateModule } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CourseProgress, UnitDetails } from "@/types/course";
import { extractPublicId } from "@/utils/link";
import { ChevronLeftIcon, ChevronRightIcon, Loader2, RotateCw } from "lucide-react";
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
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import ReactPlayer from "react-player";
import useSWRMutation from "swr/mutation";

type CourseMediaProps = {
  pdfUrl: string | null;
  introHasPlayed: boolean;
  setPdfUrl: Dispatch<SetStateAction<string | null>>;
  setModuleId: Dispatch<SetStateAction<string | null>>;
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
  setModuleId,
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
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [shouldLoadToLastPage, setShouldLoadToLastPage] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

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
    if (isMobileLandscape && typeof window !== "undefined") {
      setContainerWidth(window.innerHeight - 40);
    } else if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, [isMobileLandscape]);

  const toggleMobileLandscape = () => {
    setIsMobileLandscape((prev) => !prev);
    setTimeout(updateWidth, 100);
  };

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

  // Get current PDF module item
  const currentModuleData = useMemo(() => {
    if (!pdfUrl) return;
    const current = allModules.find(
      (p) => extractPublicId(p.signedPdfUrl) === extractPublicId(pdfUrl)
    );
    return current;
  }, [allModules, pdfUrl]);

  // Get the next and previous pages (if any)
  const nextModuleData = useMemo(() => {
    if (!currentModuleData) return null;
    const currentIndex = currentModuleData.idx;
    if (currentIndex === -1 || currentIndex >= allModules.length - 1)
      return null;
    return allModules[currentIndex + 1];
  }, [currentModuleData]);

  const prevModuleData = useMemo(() => {
    if (!currentModuleData) return null;
    const currentIndex = currentModuleData.idx;
    if (currentIndex <= 0) return null;
    return allModules[currentIndex - 1];
  }, [currentModuleData]);

  // Check if current PDF is the last module in the current unit
  const isOnLastModule = useMemo(() => {
    if (!allModules?.length || !pdfUrl) return false;
    const lastModuleItem = allModules[allModules.length - 1];
    return (
      extractPublicId(pdfUrl) === extractPublicId(lastModuleItem?.signedPdfUrl)
    );
  }, [unitInfo, pdfUrl]);

  // Check if current PDF is the first module of the current unit
  const isOnFirstModule = useMemo(() => {
    if (!allModules || !pdfUrl) return false;
    const firstModuleItem = allModules[0];
    return (
      extractPublicId(pdfUrl) === extractPublicId(firstModuleItem?.signedPdfUrl)
    );
  }, [unitInfo, pdfUrl]);

  // Check if we're on the first unit (unit index = 1)
  const isOnFirstUnit = useMemo(() => {
    return unitInfo?.index === 1;
  }, [unitInfo?.index]);

  // PDF Load Success Handler
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    if (shouldLoadToLastPage) {
      setPageNumber(numPages);
      setShouldLoadToLastPage(false);
    } else {
      setPageNumber(1);
    }
  };

  const handleNext = async () => {
    // 1. Check if there are more pages in current PDF
    if (pageNumber < numPages) {
      setPageNumber((prev) => prev + 1);
      return;
    }

    // 2. If on last page of last module, start assessment
    if (isOnLastModule) {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
      if (isMobileLandscape) {
        setIsMobileLandscape(false);
      }
      startAssessment();
      return;
    }

    // 3. Navigate to next module
    if (!unitInfo || !nextModuleData || !currentModuleData) return;

    const updateKey = `next-${currentModuleData.id}-${nextModuleData.id}`;
    if (processedUpdatesRef.current.has(updateKey)) return;

    try {
      const { module: nextMod } = getModuleAndItemForPage(nextModuleData.id);

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

      // Move to next PDF
      if (
        nextModuleData.signedPdfUrl &&
        nextModuleData.signedPdfUrl !== pdfUrl
      ) {
        setShouldLoadToLastPage(false); // Reset this just in case
        setModuleId(nextModuleData.id);
        setPdfUrl(nextModuleData.signedPdfUrl);
      }
    } catch (error) {
      console.error("Error in handleNext:", error);
      processedUpdatesRef.current.delete(updateKey);
    }
  };

  const handlePrev = async () => {
    // 1. Check if we can go back a page in current PDF
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
      return;
    }

    // 2. Navigate to previous module (and go to its last page)
    // If on first module of current unit, navigate to last module of previous unit
    if (isOnFirstModule && !isOnFirstUnit && navigateToPreviousUnit) {
      try {
        const previousUnitLastModulePdfUrl = await navigateToPreviousUnit();
        if (previousUnitLastModulePdfUrl) {
          setShouldLoadToLastPage(true); // Flag to load last page of incoming PDF
          setPdfUrl(previousUnitLastModulePdfUrl);
        }
      } catch (error) {
        console.error("Error navigating to previous unit:", error);
      }
      return;
    }

    if (!unitInfo || !prevModuleData || !currentModuleData) return;

    // Normal prev module logic
    const updateKey = `prev-${currentModuleData.id}-${prevModuleData.id}`;
    // No need to block updates for prev usually, but consistent locking is fine.
    // However, we usually just read for prev.

    try {
      setShouldLoadToLastPage(true); // Flag to load last page
      setModuleId(prevModuleData.id);
      setPdfUrl(prevModuleData.signedPdfUrl);
    } catch (error) {
      console.error("Error in handlePrev:", error);
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
          : isMobileLandscape
            ? "fixed inset-0 z-[100] bg-white w-full h-full p-0 overflow-hidden"
            : "min-h-[70vh]",
        isMobileLandscape ? "" : "col-span-3 h-fit space-y-3"
      )}
    >
      <div
        className={cn(
          "w-full h-full flex flex-col transition-all duration-300",
          isMobileLandscape
            ? "origin-top-left rotate-90 absolute top-0 left-[100vw] w-[100vh] h-[100vw] bg-white p-4"
            : ""
        )}
      >
        {hasIntroPlayed || !introVideoUrl ? (
          <>
            {/* Main PDF Viewer */}
            <div
              ref={containerRef}
              className={cn(
                "relative rounded overflow-hidden bg-white flex flex-col items-center justify-center border border-gray-100",
                isFullscreen || isMobileLandscape
                  ? "flex-1 min-h-0"
                  : "min-h-[500px]"
              )}
            >
              <div className="absolute top-4 left-4 z-50 md:hidden flex gap-2">
                <button
                  onClick={toggleMobileLandscape}
                  className="bg-white/80 hover:bg-white backdrop-blur-sm p-2 rounded-md transition-colors shadow-sm border text-primary"
                  type="button"
                >
                  <RotateCw size={20} />
                  <span className="sr-only">Rotate</span>
                </button>
              </div>
            {pdfUrl ? (
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin text-primary" size={32} />
                    <p className="text-sm text-muted-foreground">
                      Loading Document...
                    </p>
                  </div>
                }
                error={
                  <div className="text-red-500 font-medium bg-red-50 p-4 rounded-lg">
                    Failed to load PDF.
                  </div>
                }
                className="max-h-full flex justify-center"
              >
                <Page
                  pageNumber={pageNumber}
                  width={
                    isFullscreen
                      ? Math.min(containerWidth, 1000)
                      : containerWidth - 2
                  } // Slight padding adjustment
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className="shadow-sm"
                  loading={
                    <div className="w-full h-[500px] flex items-center justify-center bg-gray-50">
                      <Loader2
                        className="animate-spin text-primary"
                        size={24}
                      />
                    </div>
                  }
                />
              </Document>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] text-muted-foreground">
                <p>No PDF selected</p>
              </div>
            )}

            {/* Fullscreen Toggle - Desktop Only */}
            <button
              onClick={toggleFullScreen}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white backdrop-blur-sm p-2 rounded-md z-10 transition-colors shadow-sm border hidden md:block"
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

          {/* Thumbnails Strip - Desktop Only */}
          {pdfUrl && numPages > 0 && (
            <div className="w-full overflow-x-auto py-4 px-2 bg-gray-50/50 rounded-lg border border-gray-100 hidden md:block">
              <Document file={pdfUrl} className="flex gap-4 min-w-min mx-auto">
                {Array.from(new Array(numPages), (el, index) => (
                  <div
                    key={`thumb_${index + 1}`}
                    className={cn(
                      "cursor-pointer transition-all duration-200 border-2 rounded overflow-hidden hover:opacity-100 relative group shrink-0",
                      pageNumber === index + 1
                        ? "border-primary ring-2 ring-primary/20 opacity-100 scale-105"
                        : "border-transparent opacity-60 hover:border-gray-300"
                    )}
                    onClick={() => setPageNumber(index + 1)}
                  >
                    <Page
                      pageNumber={index + 1}
                      width={100}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[10px] text-center py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </Document>
            </div>
          )}

          {/* Navigation Controls */}
          <div className={cn("flex justify-between items-center")}>
            <Button
              onClick={handlePrev}
              variant="outline"
              className={cn(
                "gap-2",
                isFullscreen
                  ? "max-xs:fixed max-xs:top-3 max-xs:z-20 max-xs:left-2"
                  : ""
              )}
              disabled={
                (isOnFirstUnit && isOnFirstModule && pageNumber === 1) ||
                (!prevModuleData && pageNumber === 1 && !navigateToPreviousUnit)
              }
              type="button"
            >
              {isFullscreen && isMobile ? (
                <ChevronLeftIcon className="rotate-90" size={20} />
              ) : (
                <>
                  <ChevronLeftIcon size={16} />
                  {pageNumber === 1 && !isOnFirstModule
                    ? "Previous Module"
                    : "Previous"}
                </>
              )}
            </Button>

            <span className="text-sm font-medium text-muted-foreground">
              Page {pageNumber} of {numPages}
            </span>

            <Button
              onClick={handleNext}
              className={cn(
                "gap-2",
                isFullscreen
                  ? "max-xs:fixed max-xs:bottom-3 max-xs:z-20 max-xs:left-2"
                  : ""
              )}
              disabled={
                !isOnLastModule && !nextModuleData && pageNumber === numPages
              }
              type="button"
            >
              {isFullscreen && isMobile ? (
                <ChevronRightIcon className="rotate-90" size={20} />
              ) : (
                <>
                  {isOnLastModule && pageNumber === numPages
                    ? "Start Assessment"
                    : pageNumber === numPages
                      ? "Next Module"
                      : "Next"}
                  <ChevronRightIcon size={16} />
                </>
              )}
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="rounded-lg overflow-hidden border border-gray-100 bg-black shadow-sm">
            <ReactPlayer
              ref={playerRef}
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
            <Button onClick={handleStartCourse} type="button" size="lg">
              Start course
            </Button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default CourseMedia;
