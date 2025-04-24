/* eslint-disable react-hooks/exhaustive-deps */
// pages/course.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
import { coursesFiles } from "../PersonalDevPlan/data";

// types/course.ts
interface Module {
  title: string;
  pageStarts: number;
  pageEnds: number;
  isCompleted: boolean;
}

interface Course {
  file: string;
  modules: Module[];
}

interface ThumbnailProps {
  page: number;
  pdfDoc: any;
  currentPage: number;
  onClick: (page: number) => void;
}

type ModuleContentProps = {
  currentPage: number;
  fileName: string;
  introHasPlayed: boolean;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setUnitIndex: Dispatch<SetStateAction<number>>;
};

// Setup pdfjs worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ModuleContent: React.FC<ModuleContentProps> = ({
  currentPage,
  setCurrentPage,
  fileName,
  setUnitIndex,
  introHasPlayed,
}) => {
  // Sample course data; in production this would come from your API.
  const [courseData, setCourseData] = useState<Course>({
    file: `/assets/${fileName}`,
    modules: [
      { title: "Introduction", pageStarts: 1, pageEnds: 3, isCompleted: false },
      { title: "Chapter 1", pageStarts: 3, pageEnds: 5, isCompleted: false },
      { title: "Chapter 2", pageStarts: 6, pageEnds: 8, isCompleted: false },
    ],
  });

  const [numPages, setNumPages] = useState<number>(0);
  const [pdfDoc, setPdfDoc] = useState<any | null>(null);
  const [pdfLoading, setPdfLoading] = useState<boolean>(true);
  const [hasIntroPlayed, setHasIntroPlayed] = useState<boolean>(introHasPlayed);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState(600);

  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);

  const isMobile = containerWidth <= 500;

  useEffect(() => {
    const introPlayed = window.localStorage.getItem("hasIntroPlayed");
    if (introPlayed) {
      setHasIntroPlayed(true);
    }
  }, [introHasPlayed]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
    if (window !== undefined) {
      const courseFile = window.localStorage.getItem("lastFile");

      if (courseFile && !courseData.file.includes(courseFile)) {
        setUnitIndex(coursesFiles.indexOf(courseFile));
        setCourseData((prev) => ({ ...prev, file: `/assets/${courseFile}` }));
      }
    }
  }, []);

  useEffect(() => {
    if (!courseData.file.includes(fileName)) {
      setUnitIndex(coursesFiles.indexOf(fileName));
      setCourseData((prev) => ({ ...prev, file: `/assets/${fileName}` }));
      window.localStorage.setItem("lastFile", fileName);
    }
  }, [fileName]);

  // Called when the PDF document is loaded.
  const onDocumentLoadSuccess = useCallback((pdf: any) => {
    setNumPages(pdf.numPages);
    setPdfDoc(pdf);
    setPdfLoading(false);
  }, []);

  // Returns the module that contains the given page.
  const getModuleForPage = useCallback(
    (page: number): Module | undefined =>
      courseData.modules.find(
        (m) => page >= m.pageStarts && page <= m.pageEnds
      ),
    [courseData.modules]
  );

  const playerRef = useRef<ReactPlayer>(null);

  // // Determine if a page is enabled based on module completion.
  // const isPageEnabled = useCallback(
  //   (page: number): boolean => {
  //     const mod = getModuleForPage(page);
  //     if (!mod) return false;
  //     if (mod.isCompleted) return true;
  //     const currentModule = getModuleForPage(currentPage);
  //     return !!currentModule && currentModule.title === mod.title;
  //   },
  //   [currentPage, getModuleForPage]
  // );

  // Handle thumbnail clicks.
  const handleThumbnailClick = (page: number) => setCurrentPage(page);

  // Handle Next button logic.
  const handleNext = useCallback(() => {
    const currentModule = getModuleForPage(currentPage);
    if (!currentModule) return;
    if (currentPage === currentModule.pageEnds) {
      // Mark current module as complete.
      setCourseData((prev) => {
        const updatedModules = prev.modules.map((m) =>
          m.title === currentModule.title ? { ...m, isCompleted: true } : m
        );
        return { ...prev, modules: updatedModules };
      });
    }
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, getModuleForPage, numPages]);

  const handlePrev = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  // Assumes you have a ref (viewerRef) attached to the viewer container.
  const toggleFullScreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else if (viewerRef.current) {
      setIsFullscreen(true);
      viewerRef.current.requestFullscreen();
    }
  }, [viewerRef]);

  const progressPercent = numPages
    ? Math.min((currentPage / numPages) * 100, 100)
    : 0;

  // Memoize the thumbnails for efficient re-renders.
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
          onClick={handleThumbnailClick}
        />
      );
    });
  }, [pdfDoc, numPages, currentPage, handleThumbnailClick]);

  useEffect(() => {
    // Reset the PDF state when file changes.
    setPdfDoc(null);
    setPdfLoading(true);
  }, [courseData.file]);

  return (
    <div
      ref={viewerRef}
      className={cn(
        "xs:space-y-6 bg-white ",
        isFullscreen ? "max-h-screen overflow-y-scroll xs:p-4" : ""
      )}
    >
      {hasIntroPlayed ? (
        <>
          {/* Progress Bar */}
          <div
            className={cn(
              "w-full bg-gray-200 rounded-full h-2",
              isFullscreen ? "max-xs:hidden" : "hidden"
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
              file={courseData.file}
              key={courseData.file}
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
              disabled={currentPage === 1}
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
              disabled={numPages ? currentPage >= numPages : true}
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
            url="https://res.cloudinary.com/dccxqee2z/video/upload/v1745510574/primary_ecezy7.mp4"
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
              className=""
            >
              Start course
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleContent;

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
      {/* <div className="text-xs text-center mt-1">Page {page}</div> */}
    </button>
  );
});
