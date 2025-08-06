/* eslint-disable react-hooks/exhaustive-deps */
// pages/course.tsx

import { updateModuleKey } from "@/api/keys";
import { updateModule } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CourseProgress, UnitDetails } from "@/types/course";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
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
}

type CourseMediaProps = {
  currentPage: number;
  pdfUrl?: string | null;
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
  const [pdfLoading, setPdfLoading] = useState<boolean>(true);
  const [hasIntroPlayed, setHasIntroPlayed] = useState<boolean>(introHasPlayed);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState(600);

  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<ReactPlayer>(null);

  const { trigger } = useSWRMutation(updateModuleKey, updateModule);

  const isMobile = containerWidth <= 500;

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Sync intro video state with localStorage
  useEffect(() => {
    const introPlayed = window.localStorage.getItem("hasIntroPlayed");
    if (introPlayed) setHasIntroPlayed(true);
  }, [introHasPlayed]);

  // PDF load success
  const onDocumentLoadSuccess = useCallback((pdf: any) => {
    setNumPages(pdf.numPages);
    setPdfDoc(pdf);
    setPdfLoading(false);
  }, []);

  // Find the module and moduleItem for a given page number
  const getModuleAndItemForPage = useCallback(
    (page: number) => {
      if (!unitInfo) return { module: undefined, moduleItem: undefined };
      for (const mod of unitInfo.modules) {
        for (const item of mod.moduleItems) {
          if (item.pages.some((p) => p.pageNumber === page)) {
            return { module: mod, moduleItem: item };
          }
        }
      }
      return { module: undefined, moduleItem: undefined };
    },
    [unitInfo]
  );

  // Get all pages in order for the current unit
  const allPages = useMemo(() => {
    if (!unitInfo) return [];
    return unitInfo.modules.flatMap((mod) =>
      mod.moduleItems.flatMap((item) => item.pages)
    );
  }, [unitInfo]);

  // Get the index of the current page in allPages
  const currentPageIndex = useMemo(() => {
    return allPages.findIndex((p) => p.pageNumber === currentPage);
  }, [allPages, currentPage]);

  console.log({ allPages, currentPageIndex });
  // Get the next and previous pages (if any)
  const nextPage = useMemo(() => {
    if (currentPageIndex === -1 || currentPageIndex + 1 >= allPages.length)
      return undefined;
    return allPages[currentPageIndex + 1];
  }, [allPages, currentPageIndex]);

  const prevPage = useMemo(() => {
    if (currentPageIndex <= 0) return undefined;
    return allPages[currentPageIndex - 1];
  }, [allPages, currentPageIndex]);

  console.log({ nextPage, prevPage });

  // Handle Next button
  const handleNext = useCallback(async () => {
    if (!unitInfo || !nextPage) return;

    const { module: currentMod } = getModuleAndItemForPage(currentPage);
    const { module: nextMod, moduleItem: nextItem } = getModuleAndItemForPage(
      nextPage.pageNumber
    );

    console.log({ currentMod, nextMod, nextItem });

    // If moving to a new module, update progress
    if (nextMod && currentMod && nextMod.id !== currentMod.id) {
      console.log("trigerring update");
      await trigger({ moduleId: nextMod.id });
      refetchCourse();
      refetchUnitDetails();
      return;
    }

    console.log({ currentPage, pdfUrl });

    // If moving to a new moduleItem (i.e., new PDF), update PDF url
    if (nextItem && nextItem.signedPdfUrl !== pdfUrl) {
      console.log("going to the next pdf");
      setPdfUrl(nextItem.signedPdfUrl);
      return;
    }
    console.log("going to the next page");
    setCurrentPage(nextPage.pageNumber);
    return;
  }, [unitInfo, prevPage, currentPage]);

  // Handle Previous button
  const handlePrev = useCallback(async () => {
    if (!unitInfo || !prevPage) return;

    const { module: currentMod } = getModuleAndItemForPage(currentPage);
    const { module: prevMod, moduleItem: prevItem } = getModuleAndItemForPage(
      prevPage.pageNumber
    );

    // If moving to a previous module, update progress
    if (prevMod && currentMod && prevMod.id !== currentMod.id) {
      await trigger({ moduleId: prevMod.id });
      refetchCourse();
      refetchUnitDetails();
      // refetchUnitDetails(unitInfo);
    }

    // If moving to a previous moduleItem (i.e., new PDF), update PDF url
    if (prevItem && prevItem.signedPdfUrl !== pdfUrl) {
      setPdfUrl(prevItem.signedPdfUrl);
    }

    setCurrentPage(prevPage.pageNumber);
  }, [unitInfo, prevPage, currentPage]);

  // Fullscreen toggle
  const toggleFullScreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else if (viewerRef.current) {
      setIsFullscreen(true);
      viewerRef.current.requestFullscreen();
    }
  }, []);

  // Progress percent
  const progressPercent = numPages
    ? Math.min((currentPage / numPages) * 100, 100)
    : 0;

  // Memoized thumbnails
  const thumbnails = useMemo(() => {
    if (!pdfDoc || numPages === 0) return null;
    return Array.from({ length: numPages }, (_, idx) => {
      const page = idx + 1;
      return (
        <Thumbnail
          key={page}
          page={page}
          pdfDoc={pdfDoc}
          currentPage={currentPage}
          onClick={setCurrentPage}
        />
      );
    });
  }, [pdfDoc, numPages, currentPage, setCurrentPage]);

  // Reset PDF state when file changes
  useEffect(() => {
    setPdfDoc(null);
    setPdfLoading(true);
  }, [pdfUrl]);

  // Sync current page and PDF with courseProgress on mount or when courseProgress changes
  useEffect(() => {
    if (!unitInfo) return;
    // Find the current module and moduleItem
    const currentMod = unitInfo.modules.find(
      (m) => m.index === courseProgress.module?.index
    );
    if (!currentMod) return;
    const currentItem = currentMod.moduleItems[0];
    if (!currentItem) return;
    setPdfUrl(currentItem.signedPdfUrl);
    setCurrentPage(currentItem.pages[0]?.pageNumber || 1);
  }, [unitInfo]);

  return (
    <div
      ref={viewerRef}
      className={cn(
        "xs:space-y-6",
        isFullscreen ? "max-h-screen overflow-y-scroll xs:p-4" : "",
        "col-span-3 h-fit space-y-3"
      )}
    >
      {hasIntroPlayed || !introVideoUrl ? (
        <>
          {/* Progress Bar */}
          <div
            className={cn(
              "w-full bg-gray-200 rounded-full h-2",
              isFullscreen ? "max-xs:hidden bg-white" : "hidden"
            )}
          >
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {/* Main PDF Viewer */}
          <div
            ref={containerRef}
            className={cn(
              "relative rounded overflow-hidden min-h-[400px] flex items-center justify-center",
              isFullscreen ? "max-xs:h-screen" : ""
            )}
          >
            <Document
              file={pdfUrl}
              key={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              className={cn(
                isFullscreen ? "max-xs:rotate-90 py-2" : "",
                pdfLoading ? "hidden" : "block"
              )}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex justify-center"
                >
                  {pdfLoading || !pdfDoc ? (
                    <div className="w-full h-96 bg-gray-200 animate-pulse" />
                  ) : (
                    <Page
                      pdf={pdfDoc}
                      pageNumber={currentPage}
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
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </Document>
            <div
              role="button"
              onClick={toggleFullScreen}
              className="absolute bottom-4 right-4 bg-gray-100 p-1 rounded-md z-50"
            >
              {isFullscreen ? <BiCollapseAlt /> : <IoIosExpand size={20} />}
            </div>
          </div>

          {/* Navigation */}
          <div className={cn("flex justify-between")}>
            <Button
              onClick={handlePrev}
              disabled={!prevPage}
              variant="secondary"
              className={cn(
                isFullscreen
                  ? "max-xs:fixed max-xs:top-3 max-xs:z-20 max-xs:left-2"
                  : ""
              )}
            >
              {isFullscreen && isMobile ? (
                <ChevronLeftIcon className="rotate-90" />
              ) : (
                <p>Previous page</p>
              )}
            </Button>
            <Button
              onClick={handleNext}
              disabled={!nextPage}
              className={cn(
                isFullscreen
                  ? "max-xs:fixed max-xs:bottom-3 max-xs:z-20 max-xs:left-2"
                  : ""
              )}
            >
              {isFullscreen && isMobile ? (
                <ChevronRightIcon className="rotate-90" />
              ) : (
                <p>Next page</p>
              )}
            </Button>
          </div>

          {/* Thumbnail Visualizer */}
          <div className="overflow-x-auto whitespace-nowrap py-2 space-x-2 max-xs:hidden">
            {pdfLoading || !thumbnails
              ? // Show skeleton loaders if PDF is still loading.
                Array.from({ length: 10 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="inline-block p-1 border rounded opacity-50"
                  >
                    <div className="w-20 h-16 bg-gray-200 animate-pulse" />
                    <div className="mt-1 h-4 bg-gray-200 animate-pulse rounded" />
                  </div>
                ))
              : thumbnails}
          </div>
        </>
      ) : (
        <div>
          <ReactPlayer
            ref={playerRef}
            playing={!hasIntroPlayed}
            controls
            width="100%"
            height="100%"
            url={introVideoUrl}
            fallback={
              <div className="w-full h-full rounded-lg animate-pulse bg-gray-200/60"></div>
            }
          />

          <div className="flex justify-end mt-6">
            <Button
              onClick={() => {
                setHasIntroPlayed(true);
                window.localStorage.setItem("hasIntroPlayed", "true");
              }}
            >
              Start course
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseMedia;

// Memoized Thumbnail component for caching.
const Thumbnail: React.FC<ThumbnailProps> = memo(function ThumbnailComponent({
  page,
  pdfDoc,
  currentPage,
  onClick,
}) {
  return (
    <button
      onClick={() => onClick(page)}
      className={`inline-block border rounded p-1 relative transition-transform transform hover:scale-105 ${
        page === currentPage ? "ring-2 ring-blue-500" : ""
      }`}
    >
      {pdfDoc ? (
        <Page
          pdf={pdfDoc}
          pageNumber={page}
          scale={0.2}
          height={520}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      ) : (
        <div className="w-20 h-28 bg-gray-200 animate-pulse" />
      )}
    </button>
  );
});
