"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "../../styles/pdfviewer.css";

const samplePDF = require("@/public/assets/test.pdf");

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

interface PDFViewerProps {
  url: string;
  className?: string;
  fallbackContent?: React.ReactNode;
}

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
  cMapPacked: true,
  isEvalSupported: false,
};

const PDFViewer: React.FC<PDFViewerProps> = ({
  url,
  className = "",
  fallbackContent = null,
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<JSX.Element[]>([]);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);

  useEffect(() => {
    // Reset states
    setNumPages(null);
    setIsLoading(true);
    setError(null);
    setPages([]);
    setPdfData(null);

    const fetchPdf = async () => {
      try {
        // Use a proxy for CORS issues or add a small delay for local testing
        const response = await fetch(url, {
          method: "GET",
          mode: "cors", // Try with cors mode
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/pdf",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        setPdfData(arrayBuffer);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          `Failed to fetch PDF: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
        setIsLoading(false);
      }
    };

    // fetchPdf();
  }, [url]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setIsLoading(false);

    // Pre-render all pages
    const pagesArray = [];
    for (let i = 1; i <= numPages; i++) {
      pagesArray.push(
        <Page
          key={`page_${i}`}
          pageNumber={i}
          renderTextLayer={true}
          renderAnnotationLayer={false}
          className="mb-6"
          // Remove default page styles
          //   customTextRenderer={({ str }) => (
          //     <span className="text-inherit font-inherit">{str}</span>
          //   )}
        />
      );
    }
    setPages(pagesArray);
  }

  function onDocumentLoadError(err: Error): void {
    console.error("Error loading PDF:", err);
    setError(`Error loading PDF: ${err.message}`);
    setIsLoading(false);
  }

  // Helper to render a more detailed error message
  const renderError = () => {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <div className="font-medium mb-1">Failed to load content</div>
          <div className="text-sm">{error}</div>
          <div className="text-sm mt-2">
            This might be caused by:
            <ul className="list-disc pl-5 mt-1">
              <li>CORS restrictions if loading from an external domain</li>
              <li>The file may not exist at the specified location</li>
              <li>The server might be blocking the request</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>
    );
  };

  return (
    <>
      {/* <Script
        src={`//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`}
        strategy="beforeInteractive"
      /> */}
      <div className={`pdf-content ${className}`}>
        {error ? (
          <>
            {renderError()}
            {fallbackContent}
          </>
        ) : samplePDF ? (
          <div className="max-h-screen flex flex-col overflow-y-scroll w-full sm:items-center">
            <Document
              file={samplePDF}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              className="seamless-pdf"
              options={options}
            >
              {pages}
            </Document>
          </div>
        ) : isLoading ? (
          <div className="space-y-4 py-5">
            <div className="flex items-center gap-2 justify-center">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span>Loading content...</span>
            </div>
            {Array(8)
              .fill(9)
              .map((item, index) => (
                <div key={index} className="space-y-4 mb-6">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PDFViewer;
