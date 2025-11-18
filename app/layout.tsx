"use client";

import { generalFetcher } from "@/api/queries";
import AppLayoutBase from "@/components/layout/app";
import { Toaster } from "@/components/ui/sonner";
import "@radix-ui/themes/styles.css";
import { Montserrat, Work_Sans } from "next/font/google";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import { useEffect } from "react";
import { SWRConfig } from "swr";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    (window as any).chatwootSettings = {
      hideMessageBubble: false,
      position: "left", // This can be left or right
      locale: "en", // Language to be set
      type: "standard", // [standard, expanded_bubble]
    };
  }, []);
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${workSans.variable} antialiased`}
    >
      <body className={montserrat.className}>
        <NextTopLoader color="#0043BE" />
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            provider: () => new Map(),
            fetcher: generalFetcher,
          }}
        >
          <AppLayoutBase>{children}</AppLayoutBase>
        </SWRConfig>
        <Toaster position="top-center" expand richColors theme="light" />
        <Script
          id="chatwoot"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d,t) {
                var BASE_URL="https://app.chatwoot.com";
                var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                g.src=BASE_URL+"/packs/js/sdk.js";
                g.async = true;
                s.parentNode.insertBefore(g,s);
                g.onload=function(){
                  window.chatwootSDK.run({
                    websiteToken: '8qd9zgmt9wox7kuJCW5YieYc',
                    baseUrl: BASE_URL
                  })
                }
              })(document,"script");
            `,
          }}
        />
      </body>
    </html>
  );
}
