/* eslint-disable react-hooks/exhaustive-deps */
// pages/course.tsx

import { updateModuleKey } from "@/api/keys";
import { updateModule } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CourseProgress, UnitDetails } from "@/types/course";
import { AnimatePresence, motion } from "framer-motion";
// import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, {
  Dispatch,
  memo,
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

interface ThumbnailProps {
  page: number;
  pdfDoc: any;
  currentPage: number;
  onClick: (page: number) => void;
  pdfUrl: string;
}

type CourseMediaProps = {
  currentPage: number;
  pdfUrl: string | null;
  introHasPlayed: boolean;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setPdfUrl: Dispatch<SetStateAction<string | null>>;
  introVideoUrl?: string;
  courseProgress: CourseProgress;
  refetchCourse: VoidFunction;
  unitInfo?: UnitDetails;
  refetchUnitDetails: VoidFunction;
};

// Setup pdfjs worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CourseMedia: React.FC<CourseMediaProps> = ({
  currentPage,
  setCurrentPage,
  pdfUrl,
  introVideoUrl,
  setPdfUrl,
  courseProgress,
  introHasPlayed,
  refetchCourse,
  unitInfo,
  refetchUnitDetails,
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pdfDoc, setPdfDoc] = useState<any | null>(null);
  const [hasIntroPlayed, setHasIntroPlayed] = useState<boolean>(introHasPlayed);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState(600);

  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<ReactPlayer>(null);
  const processedUpdatesRef = useRef(new Set<string>());
  const prevPdfUrlRef = useRef<string | null>(pdfUrl);

  const { trigger } = useSWRMutation(updateModuleKey, updateModule);

  const isMobile = containerWidth <= 500;

  const { isUnitAccessible, isUnitCompleted } = useMemo(() => {
    return {
      isUnitCompleted: unitInfo
        ? unitInfo.index < courseProgress.unit.index
        : false,
      isUnitAccessible: unitInfo
        ? unitInfo.index <= courseProgress.unit.index
        : false,
    };
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

  // PDF load success - memoized
  const onDocumentLoadSuccess = useCallback((pdf: any) => {
    setNumPages(pdf.numPages);
    setPdfDoc(pdf);
    prevPdfUrlRef.current === pdfUrl;
    // setPdfLoading(false);
  }, []);

  // Find the module and moduleItem for a given page number - memoized
  const getModuleAndItemForPage = useCallback(
    (id: string) => {
      if (!unitInfo) return { module: undefined, moduleItem: undefined };
      for (const mod of unitInfo.modules) {
        for (const item of mod.moduleItems) {
          if (item.pages.some((p) => p.id === id)) {
            return { module: mod, moduleItem: item };
          }
        }
      }
      return { module: undefined, moduleItem: undefined };
    },
    [unitInfo]
  );

  // Get all pages in order for the current unit - memoized and stable
  const allPages = useMemo(() => {
    if (!unitInfo) return [];
    const pages = unitInfo.modules.flatMap((mod) =>
      mod.moduleItems.flatMap((item) =>
        item.pages.map((page) => ({
          ...page,
          moduleId: mod.id,
          moduleItemId: item.id,
          pdfUrl: item.signedPdfUrl,
        }))
      )
    );
    return pages.sort((a, b) => a.pageNumber - b.pageNumber);
  }, [unitInfo]);

  // Get the next and previous pages (if any) - fixed logic
  const nextPage = useMemo(() => {
    if (currentPage >= numPages) return undefined;
    return allPages[currentPage];
  }, [currentPage, numPages]);

  const prevPage = useMemo(() => {
    if (currentPage <= 1) return undefined;
    return allPages[currentPage - 2];
  }, [currentPage]);
  // Handle Next button - fixed logic
  const handleNext = async () => {
    if (!unitInfo || !nextPage) return;

    const updateKey = `next-${currentPage}-${nextPage.pageNumber}`;
    if (processedUpdatesRef.current.has(updateKey)) return;

    try {
      const currentPageItem = allPages[currentPage];
      const { module: currentMod } = getModuleAndItemForPage(
        currentPageItem?.id
      );
      const { module: nextMod } = getModuleAndItemForPage(nextPage.id);
      console.log({ currentMod, nextMod });
      console.log({ isUnitAccessible });
      console.log({ currentPage, currentPageItem });

      // If moving to a new module, update progress
      if (
        nextMod &&
        currentMod &&
        nextMod.id !== currentMod.id &&
        isUnitAccessible
      ) {
        processedUpdatesRef.current.add(updateKey);
        await trigger({ moduleId: nextMod.id });
        refetchCourse();
        refetchUnitDetails();
      }
      console.log({ nextPage, pdfUrl });
      // If moving to a new PDF, update PDF URL
      if (nextPage.pdfUrl && nextPage.pdfUrl !== pdfUrl) {
        setPdfUrl(nextPage.pdfUrl);
        // The page will be set when the PDF loads
      } else {
        console.log({ pdfUrl });
        // Same PDF, just change page
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.error("Error in handleNext:", error);
      processedUpdatesRef.current.delete(updateKey);
    }
  };

  // Handle Previous button - fixed logic
  const handlePrev = async () => {
    if (!unitInfo || !prevPage) return;

    const updateKey = `prev-${currentPage}-${prevPage.pageNumber}`;
    if (processedUpdatesRef.current.has(updateKey)) return;

    try {
      const currentPageItem = allPages[currentPage - 2];
      const { module: currentMod } = getModuleAndItemForPage(
        currentPageItem?.id
      );
      const { module: prevMod } = getModuleAndItemForPage(prevPage.id);

      // If moving to a previous module, update progress
      if (prevMod && currentMod && prevMod.id !== currentMod.id) {
        processedUpdatesRef.current.add(updateKey);
        await trigger({ moduleId: prevMod.id });
        refetchCourse();
        refetchUnitDetails();
      }

      // If moving to a previous PDF, update PDF URL
      if (prevPage.pdfUrl && prevPage.pdfUrl !== pdfUrl) {
        setPdfUrl(prevPage.pdfUrl);
        // The page will be set when the PDF loads
      } else {
        // Same PDF, just change page
        setCurrentPage(currentPage - 1);
      }
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

  // Progress percent - memoized
  const progressPercent = useMemo(() => {
    return numPages ? Math.min((currentPage / numPages) * 100, 100) : 0;
  }, [currentPage, numPages]);

  // Memoized click handler for thumbnails
  const handleThumbnailClick = (page: number) => {
    setCurrentPage(page);
  };

  // Memoized thumbnails - key issue was here
  const thumbnails = useMemo(() => {
    if (!pdfDoc || numPages === 0 || !pdfUrl) return null;

    return Array.from({ length: numPages }, (_, idx) => {
      const page = idx + 1;
      return (
        <Thumbnail
          key={`${pdfUrl}-${page}`} // Include pdfUrl in key to prevent cross-PDF issues
          page={page}
          pdfDoc={pdfDoc}
          currentPage={currentPage}
          onClick={handleThumbnailClick}
          pdfUrl={pdfUrl}
        />
      );
    });
  }, [pdfDoc, numPages, pdfUrl]);

  const isLoading = useMemo(() => {
    const hasChanged = pdfUrl !== prevPdfUrlRef.current;
    return hasChanged;
  }, [pdfUrl, prevPdfUrlRef]);

  useEffect(() => {
    prevPdfUrlRef.current = pdfUrl;
  });

  console.log({ isLoading });
  // Reset PDF state when file changes
  useEffect(() => {
    if (pdfUrl) {
      window.localStorage.setItem("lastPdf", pdfUrl);
      setPdfDoc(null);
      // setPdfLoading(true);
      setNumPages(0);
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
        isFullscreen ? "max-h-screen overflow-y-scroll xs:p-4 bg-white" : "",
        "col-span-3 h-fit space-y-3"
      )}
    >
      {hasIntroPlayed || !introVideoUrl ? (
        <>
          {/* Progress Bar */}
          <div
            className={cn(
              "w-full bg-gray-200 rounded-full h-2",
              isFullscreen ? "max-xs:hidden" : "hidden"
            )}
          >
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Main PDF Viewer */}
          <div
            ref={containerRef}
            className={cn(
              "relative rounded overflow-hidden min-h-[400px] bg-white flex items-center justify-center",
              isFullscreen ? "max-xs:h-screen" : ""
            )}
          >
            {pdfUrl && (
              <Document
                file={pdfUrl}
                key={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) => {
                  console.error("PDF load error:", error);
                  setPdfUrl(prevPdfUrlRef.current);
                }}
                className={cn(
                  isFullscreen
                    ? "max-xs:rotate-90 py-2"
                    : "max-h-[600px] object-cover",
                  isLoading ? "hidden" : "block"
                )}
                loading={
                  <div className="w-full h-96 bg-gray-200 animate-pulse rounded" />
                }
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${pdfUrl}-${currentPage}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-center max-h-[600px]"
                  >
                    {!isLoading && pdfDoc ? (
                      <Page
                        pdf={pdfDoc}
                        pageNumber={currentPage}
                        // className="max-h-[400px]"
                        height={
                          isMobile && isFullscreen
                            ? window?.innerWidth - 200
                            : undefined
                        }
                        width={
                          isMobile && isFullscreen
                            ? window?.innerHeight - 200
                            : containerWidth
                        }
                        loading={
                          <Skeleton className="w-full h-96 bg-gray-100" />
                        }
                      />
                    ) : (
                      <Skeleton className="w-full h-96 bg-gray-200" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Document>
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

          {/* Thumbnail Visualizer */}
          <div className="overflow-x-auto whitespace-nowrap py-2 space-x-2 max-xs:hidden">
            <div className="flex space-x-2 px-3">
              {isLoading || !thumbnails
                ? // Show skeleton loaders if PDF is still loading.
                  Array.from({ length: Math.min(numPages || 10, 10) }).map(
                    (_, idx) => (
                      <div
                        key={`skeleton-${idx}`}
                        className="inline-block p-1 border rounded opacity-50 shrink-0"
                      >
                        <div className="w-20 h-16 bg-gray-200 animate-pulse rounded" />
                        <div className="mt-1 h-4 bg-gray-200 animate-pulse rounded" />
                      </div>
                    )
                  )
                : thumbnails}
            </div>
          </div>

          {/* Navigation */}
          {/* <div className={cn("flex justify-between")}>
            <Button
              onClick={handlePrev}
              disabled={!prevPage}
              variant="secondary"
              className={cn(
                isFullscreen
                  ? "max-xs:fixed max-xs:top-3 max-xs:z-20 max-xs:left-2"
                  : ""
              )}
              type="button"
            >
              {isFullscreen && isMobile ? (
                <ChevronLeftIcon className="rotate-90" size={20} />
              ) : (
                <>
                  <ChevronLeftIcon className="mr-1" size={16} />
                  Previous page
                </>
              )}
            </Button>

            <div className="flex items-center text-sm text-gray-600">
              Page {currentPage} of {numPages}
            </div>

            <Button
              onClick={handleNext}
              disabled={!nextPage}
              className={cn(
                isFullscreen
                  ? "max-xs:fixed max-xs:bottom-3 max-xs:z-20 max-xs:left-2"
                  : ""
              )}
              type="button"
            >
              {isFullscreen && isMobile ? (
                <ChevronRightIcon className="rotate-90" size={20} />
              ) : (
                <>
                  Next page
                  <ChevronRightIcon className="ml-1" size={16} />
                </>
              )}
            </Button>
          </div> */}
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

// Memoized Thumbnail component - optimized to prevent unnecessary re-renders
const Thumbnail: React.FC<ThumbnailProps> = memo(
  function ThumbnailComponent({ page, pdfDoc, currentPage, onClick }) {
    const handleClick = useCallback(() => {
      onClick(page);
    }, [onClick, page]);

    return (
      <button
        onClick={handleClick}
        className={cn(
          "inline-block border rounded p-1 relative transition-all duration-200 shrink-0",
          "hover:scale-105 hover:shadow-md",
          page === currentPage
            ? "ring-2 ring-blue-500 bg-blue-50"
            : "hover:bg-gray-50"
        )}
        type="button"
        aria-label={`Go to page ${page}`}
      >
        {pdfDoc ? (
          <Page
            pdf={pdfDoc}
            pageNumber={page}
            scale={1}
            height={64}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="h-16 w-32"
            loading={<Skeleton className="w-20 h-16 bg-gray-200 rounded" />}
          />
        ) : (
          <Skeleton className="w-20 h-16 bg-gray-200 rounded" />
        )}
      </button>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function to prevent unnecessary re-renders
    return (
      prevProps.page === nextProps.page &&
      prevProps.currentPage === nextProps.currentPage &&
      prevProps.pdfDoc === nextProps.pdfDoc &&
      prevProps.pdfUrl === nextProps.pdfUrl
    );
  }
);
