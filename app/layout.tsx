import RootProviders from "@/components/layout/RootProviders";
import { baseMetadata } from "@/utils/config";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans, Work_Sans } from "next/font/google";
import "./globals.css";

const montserrat = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: "variable",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${workSans.variable} antialiased`}
    >
      <body className={montserrat.className}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
