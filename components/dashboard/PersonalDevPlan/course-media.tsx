/* eslint-disable react-hooks/exhaustive-deps */
import { updateModuleKey } from "@/api/keys";
import { updateModule } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CourseProgress, UnitDetails } from "@/types/course";
import { extractPublicId } from "@/utils/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2,
  Maximize2,
  Minimize2,
  RotateCw,
  SparklesIcon,
} from "lucide-react";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  handleIntroPlayed: VoidFunction;
  startAssessment: VoidFunction;
  navigateToPreviousUnit?: () => Promise<string | null>;
  isMobileLandscape?: boolean;
  setIsMobileLandscape?: Dispatch<SetStateAction<boolean>>;
};

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
  handleIntroPlayed,
  navigateToPreviousUnit,
  isMobileLandscape = false,
  setIsMobileLandscape,
}) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState(600);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [shouldLoadToLastPage, setShouldLoadToLastPage] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<ReactPlayer>(null);
  const processedUpdatesRef = useRef(new Set<string>());

  const { trigger } = useSWRMutation(updateModuleKey, updateModule);
  const isMobile = containerWidth <= 500;

  const isUnitAccessible = useMemo(() => {
    return unitInfo ? unitInfo.index <= courseProgress.unit?.index : false;
  }, [unitInfo, courseProgress.unit?.index]);

  const updateWidth = useCallback(() => {
    if (isMobileLandscape && typeof window !== "undefined") {
      setContainerWidth(window.innerHeight - 40);
    } else if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, [isMobileLandscape]);

  const toggleMobileLandscape = () => {
    setIsMobileLandscape?.((prev) => !prev);
    setTimeout(updateWidth, 100);
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  // Sync intro state: only fire if not yet played and unit progress exists
  useEffect(() => {
    let cancelled = false;
    if (!introHasPlayed && courseProgress.unit?.id && !cancelled) {
      handleIntroPlayed();
    }
    return () => {
      cancelled = true;
    };
  }, [courseProgress.unit?.id]);

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
    [unitInfo],
  );

  const allModules = useMemo(() => {
    if (!unitInfo) return [];
    const modules = unitInfo.modules.flatMap((mod) =>
      mod.moduleItems.map((item) => ({
        ...item,
        moduleId: mod.id,
      })),
    );
    return modules.map((m, i) => ({ ...m, idx: i }));
  }, [unitInfo]);

  const currentModuleData = useMemo(() => {
    if (!pdfUrl) return;
    return allModules.find(
      (p) => extractPublicId(p.signedPdfUrl) === extractPublicId(pdfUrl),
    );
  }, [allModules, pdfUrl]);

  const nextModuleData = useMemo(() => {
    if (!currentModuleData) return null;
    const idx = currentModuleData.idx;
    if (idx === -1 || idx >= allModules.length - 1) return null;
    return allModules[idx + 1];
  }, [currentModuleData, allModules]);

  const prevModuleData = useMemo(() => {
    if (!currentModuleData) return null;
    const idx = currentModuleData.idx;
    if (idx <= 0) return null;
    return allModules[idx - 1];
  }, [currentModuleData, allModules]);

  const isOnLastModule = useMemo(() => {
    if (!allModules?.length || !pdfUrl) return false;
    const last = allModules[allModules.length - 1];
    return extractPublicId(pdfUrl) === extractPublicId(last?.signedPdfUrl);
  }, [unitInfo, pdfUrl, allModules]);

  const isOnFirstModule = useMemo(() => {
    if (!allModules?.length || !pdfUrl) return false;
    const first = allModules[0];
    return extractPublicId(pdfUrl) === extractPublicId(first?.signedPdfUrl);
  }, [unitInfo, pdfUrl, allModules]);

  const isOnFirstUnit = useMemo(() => {
    return unitInfo?.index === 1;
  }, [unitInfo?.index]);

  // Derived: whether the next button should trigger assessment
  const isAtAssessmentGate = useMemo(() => {
    return (
      isOnLastModule &&
      pageNumber === numPages &&
      (!unitInfo?.assessmentRecord ||
        unitInfo.assessmentRecord.gradePercentage <
          parseInt(process.env.NEXT_PUBLIC_ASSESSMENT_PASS_MARK || "70"))
    );
  }, [isOnLastModule, pageNumber, numPages, unitInfo?.assessmentRecord]);

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
    if (pageNumber < numPages) {
      setPageNumber((prev) => prev + 1);
      return;
    }

    if (isOnLastModule) {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
      if (isMobileLandscape) {
        setIsMobileLandscape?.(false);
      }
      startAssessment();
      return;
    }

    if (!unitInfo || !nextModuleData || !currentModuleData) return;

    const updateKey = `next-${currentModuleData.id}-${nextModuleData.id}`;
    if (processedUpdatesRef.current.has(updateKey)) return;

    try {
      const { module: nextMod } = getModuleAndItemForPage(nextModuleData.id);

      if (
        nextMod &&
        currentModuleData &&
        nextMod.id !== currentModuleData.moduleId &&
        isUnitAccessible
      ) {
        processedUpdatesRef.current.add(updateKey);
        await trigger({ moduleId: nextMod.id });
        refetchCourse();
        refetchUnitDetails();
      }

      if (
        nextModuleData.signedPdfUrl &&
        nextModuleData.signedPdfUrl !== pdfUrl
      ) {
        setShouldLoadToLastPage(false);
        setModuleId(nextModuleData.id);
        setPdfUrl(nextModuleData.signedPdfUrl);
      }
    } catch (error) {
      console.error("Error in handleNext:", error);
      processedUpdatesRef.current.delete(updateKey);
    }
  };

  const handlePrev = async () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
      return;
    }

    if (isOnFirstModule && !isOnFirstUnit && navigateToPreviousUnit) {
      try {
        const previousUnitLastModulePdfUrl = await navigateToPreviousUnit();
        if (previousUnitLastModulePdfUrl) {
          setShouldLoadToLastPage(true);
          setPdfUrl(previousUnitLastModulePdfUrl);
        }
      } catch (error) {
        console.error("Error navigating to previous unit:", error);
      }
      return;
    }

    if (!unitInfo || !prevModuleData || !currentModuleData) return;

    try {
      setShouldLoadToLastPage(true);
      setModuleId(prevModuleData.id);
      setPdfUrl(prevModuleData.signedPdfUrl);
    } catch (error) {
      console.error("Error in handlePrev:", error);
      setShouldLoadToLastPage(false); // reset on failure
    }
  };

  const toggleFullScreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } else if (viewerRef.current) {
        await viewerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  }, []);

  // Sync fullscreen state if user presses Escape
  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    if (pdfUrl) {
      window.localStorage.setItem("lastPdf", pdfUrl);
    }
  }, [pdfUrl]);

  const handleStartCourse = useCallback(() => {
    handleIntroPlayed();
  }, [handleIntroPlayed]);

  // Disable logic for Prev button
  const isPrevDisabled =
    (isOnFirstUnit && isOnFirstModule && pageNumber === 1) ||
    (!isOnFirstUnit &&
      isOnFirstModule &&
      pageNumber === 1 &&
      !navigateToPreviousUnit) ||
    (!prevModuleData &&
      pageNumber === 1 &&
      !navigateToPreviousUnit &&
      !(!isOnFirstUnit && isOnFirstModule));

  // PDF page width — consistent between normal and fullscreen
  const pdfPageWidth = isFullscreen
    ? Math.min(containerWidth, 1000)
    : containerWidth;

  return (
    <div
      ref={viewerRef}
      className={cn(
        isFullscreen
          ? "max-h-screen overflow-y-scroll xs:p-4 bg-white"
          : isMobileLandscape
            ? "fixed inset-0 z-[100] bg-white w-full h-full p-0 overflow-hidden"
            : "min-h-[70vh]",
        isMobileLandscape ? "" : "col-span-3 h-fit space-y-3 xs:space-y-6",
      )}
    >
      <div
        className={cn(
          "w-full h-full flex flex-col gap-3 transition-all duration-300",
          isMobileLandscape
            ? "origin-top-left rotate-90 absolute top-0 left-[100vw] w-[100vh] h-[100vw] bg-white p-4"
            : "",
        )}
      >
        {introHasPlayed || !introVideoUrl ? (
          <>
            {/* PDF Viewer */}
            <div
              ref={containerRef}
              className={cn(
                "relative rounded-xl overflow-hidden bg-white flex flex-col items-center justify-center border border-[#DBDBDB]",
                isFullscreen || isMobileLandscape
                  ? "flex-1 min-h-0"
                  : "min-h-[520px]",
              )}
            >
              {/* Mobile rotate button */}
              <div className="absolute top-3 left-3 z-50 md:hidden">
                <button
                  onClick={toggleMobileLandscape}
                  className="bg-white/90 hover:bg-white p-2 rounded-lg transition-colors border border-[#DBDBDB] text-gray-600 shadow-sm"
                  type="button"
                  aria-label="Rotate view"
                >
                  <RotateCw size={18} />
                </button>
              </div>

              {pdfUrl ? (
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="flex flex-col items-center gap-3 py-16">
                      <Loader2
                        className="animate-spin text-primary"
                        size={28}
                      />
                      <p className="text-sm text-gray-400">Loading document…</p>
                    </div>
                  }
                  error={
                    <div className="flex flex-col items-center gap-2 py-16">
                      <p className="text-sm font-medium text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
                        Failed to load document. Please try refreshing.
                      </p>
                    </div>
                  }
                  className="max-h-full flex justify-center"
                >
                  <Page
                    pageNumber={pageNumber}
                    width={pdfPageWidth}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    className="shadow-sm"
                    loading={
                      <div
                        className="flex items-center justify-center bg-gray-50"
                        style={{ width: pdfPageWidth, height: 520 }}
                      >
                        <Loader2
                          className="animate-spin text-primary"
                          size={22}
                        />
                      </div>
                    }
                  />
                </Document>
              ) : (
                <div className="flex flex-col items-center justify-center h-[520px] gap-2 text-gray-400">
                  <p className="text-sm">No document selected</p>
                </div>
              )}

              {/* Fullscreen toggle — desktop only */}
              <button
                onClick={toggleFullScreen}
                className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-lg z-10 transition-colors border border-[#DBDBDB] text-gray-600 shadow-sm hidden md:flex items-center justify-center"
                type="button"
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                {isFullscreen ? (
                  <Minimize2 size={18} />
                ) : (
                  <Maximize2 size={18} />
                )}
              </button>
            </div>

            {/* Thumbnail strip — desktop only */}
            {pdfUrl && numPages > 0 && (
              <div className="w-full overflow-x-auto py-3 px-3 bg-gray-50 rounded-xl border border-[#DBDBDB] hidden md:block">
                <Document
                  file={pdfUrl}
                  className="flex gap-2.5 min-w-min mx-auto"
                >
                  {Array.from({ length: numPages }, (_, index) => (
                    <button
                      key={`thumb_${index + 1}`}
                      type="button"
                      onClick={() => setPageNumber(index + 1)}
                      className={cn(
                        "relative shrink-0 rounded overflow-hidden transition-all duration-150 border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                        pageNumber === index + 1
                          ? "border-primary scale-[1.04] opacity-100"
                          : "border-transparent opacity-50 hover:opacity-80 hover:border-gray-300",
                      )}
                    >
                      <Page
                        pageNumber={index + 1}
                        width={88}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                      />
                      {/* Always-visible page number on active; hover on others */}
                      <div
                        className={cn(
                          "absolute inset-x-0 bottom-0 text-white text-[10px] text-center py-0.5 transition-opacity",
                          pageNumber === index + 1
                            ? "bg-primary/80 opacity-100"
                            : "bg-black/50 opacity-0 group-hover:opacity-100",
                        )}
                      >
                        {index + 1}
                      </div>
                    </button>
                  ))}
                </Document>
              </div>
            )}

            {/* Navigation bar */}
            <div className="flex items-center justify-between gap-3">
              <Button
                id="nav-prev"
                onClick={handlePrev}
                variant="outline"
                className={cn(
                  "gap-1.5 min-w-[110px]",
                  isFullscreen
                    ? "max-xs:fixed max-xs:top-3 max-xs:z-20 max-xs:left-2"
                    : "",
                )}
                disabled={isPrevDisabled}
                type="button"
              >
                {isFullscreen && isMobile ? (
                  <ChevronLeftIcon className="rotate-90" size={18} />
                ) : (
                  <>
                    <ChevronLeftIcon size={15} />
                    {pageNumber === 1 && !isOnFirstModule
                      ? "Prev module"
                      : "Previous"}
                  </>
                )}
              </Button>

              {/* Page counter pill */}
              <span className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1 tabular-nums whitespace-nowrap">
                {pageNumber} / {numPages || "—"}
              </span>

              {isAtAssessmentGate ? (
                <Button
                  id="nav-next"
                  onClick={handleNext}
                  className={cn(
                    "gap-1.5 min-w-[110px] bg-primary hover:bg-primary/90",
                    isFullscreen
                      ? "max-xs:fixed max-xs:bottom-3 max-xs:z-20 max-xs:left-2"
                      : "",
                  )}
                  type="button"
                >
                  <SparklesIcon size={14} />
                  Start assessment
                </Button>
              ) : (
                <Button
                  id="nav-next"
                  onClick={handleNext}
                  className={cn(
                    "gap-1.5 min-w-[110px]",
                    isFullscreen
                      ? "max-xs:fixed max-xs:bottom-3 max-xs:z-20 max-xs:left-2"
                      : "",
                  )}
                  disabled={
                    !isOnLastModule &&
                    !nextModuleData &&
                    pageNumber === numPages
                  }
                  type="button"
                >
                  {isFullscreen && isMobile ? (
                    <ChevronRightIcon className="rotate-90" size={18} />
                  ) : (
                    <>
                      {pageNumber === numPages && !isOnLastModule
                        ? "Next module"
                        : "Next"}
                      <ChevronRightIcon size={15} />
                    </>
                  )}
                </Button>
              )}
            </div>
          </>
        ) : (
          /* Intro video */
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-[#DBDBDB] bg-black shadow-sm aspect-video">
              <ReactPlayer
                ref={playerRef}
                controls
                width="100%"
                height="100%"
                url={introVideoUrl}
                fallback={
                  <div className="w-full h-full animate-pulse bg-gray-200" />
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
