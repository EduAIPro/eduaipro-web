// metadataHelper.ts

import { Metadata } from "next";
import { TemplateString } from "next/dist/lib/metadata/types/metadata-types";

const baseMetadata: Metadata = {
  title: {
    template: "%s | EduAIPro",
    default: "EduAIPro | The world's best AI-Powered Accredited CPD Program",
  },
  description:
    "Transform your teaching with EduAIPro's Accredited Continued Professional Development (CPD) courses. Designed for mentors, teaching assistants, primary, secondary, and higher institution educators, our AI-powered platform equips you with the tools to thrive and make a lasting impact.",
  keywords: [
    "Professional development",
    "professional development",
    "professional development courses",
    "education",
    "AI",
    "Teachers training",
    "Mentors professional development",
  ],
  referrer: "origin-when-cross-origin",
  creator: "EduAIPro",
  publisher: "EduAIPro",
  openGraph: {
    title: "EduAIPro",
    description: "The world's best AI-Powered Accredited CPD Program",
    url: "https://eduaipro.ng",
    siteName: "EduAIPro",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 800,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduAIPro",
    description: "The world's best AI-Powered Accredited CPD Program",
    creator: "@eduaipro",
    images: ["https://eduaipro.ng", "https://eduaipro.co.uk"],
  },
};

export function getPageMetadata(pageName: string): Metadata {
  return {
    ...baseMetadata,
    title: {
      ...(baseMetadata.title as TemplateString),
      template: `EduAIPro | ${pageName}`,
    },
    openGraph: {
      ...baseMetadata.openGraph,
      title: pageName,
    },
  };
}
