// metadataHelper.ts

import { Metadata } from "next";

export const SITE_URL = "https://eduaipro.ng";
export const SITE_NAME = "EduAIPro";
export const DEFAULT_DESCRIPTION =
  "Transform your teaching with EduAIPro's Accredited Continued Professional Development (CPD) courses. Designed for mentors, teaching assistants, primary, secondary, and higher institution educators, our AI-powered platform equips you with the tools to thrive and make a lasting impact.";
export const DEFAULT_OG_IMAGE = "/og.png";

/**
 * Root-level metadata. This must live on a Server Component (app/layout.tsx) —
 * it establishes the `title.template` every page-level `getPageMetadata` call
 * plugs a plain string into, and the `metadataBase` every relative OG/twitter
 * image path resolves against.
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} | The world's best AI-Powered Accredited CPD Program`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Professional development",
    "professional development courses",
    "education",
    "AI",
    "Teachers training",
    "Mentors professional development",
    "CPD accreditation",
  ],
  referrer: "origin-when-cross-origin",
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: `${SITE_NAME} | The world's best AI-Powered Accredited CPD Program`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | The world's best AI-Powered Accredited CPD Program`,
    description: DEFAULT_DESCRIPTION,
    creator: "@eduaipro",
    images: [DEFAULT_OG_IMAGE],
  },
};

export type PageMetadataInput = {
  /** Plain page title — merges into the root layout's "%s | EduAIPro" template. */
  title: string;
  description?: string;
  /** Path from the site root, e.g. "/about" — used for the canonical URL and OG url. */
  path?: string;
  /** Path or absolute URL to a page-specific social share image. Defaults to /og.png. */
  image?: string;
  /** Set true for pages that should not be indexed (auth flows, transactional pages). */
  noIndex?: boolean;
};

/**
 * Reusable per-page metadata builder. Use on any Server Component page:
 *
 *   export const metadata = getPageMetadata({
 *     title: "About Us",
 *     description: "...",
 *     path: "/about",
 *   });
 *
 * A bare string is also accepted for a quick title-only page:
 *   export const metadata = getPageMetadata("About Us");
 */
export function getPageMetadata(input: string | PageMetadataInput): Metadata {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    path,
    image = DEFAULT_OG_IMAGE,
    noIndex = false,
  } = typeof input === "string" ? { title: input } : input;

  const canonical = path ? `${SITE_URL}${path}` : undefined;

  return {
    title,
    description,
    ...(canonical && { alternates: { canonical } }),
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title,
      description,
      ...(canonical && { url: canonical }),
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@eduaipro",
      images: [image],
    },
  };
}
