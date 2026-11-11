"use client";

import { generalFetcher } from "@/api/queries";
import AppLayoutBase from "@/components/layout/app";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SWRConfig } from "swr";

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard" || pathname === "/dashboard/";

  useEffect(() => {
    (window as any).chatwootSettings = {
      hideMessageBubble: isDashboard,
      position: "left", // This can be left or right
      locale: "en", // Language to be set
      type: "standard", // [standard, expanded_bubble]
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const toggleBubble = () => {
      (window as any).$chatwoot?.toggleBubbleVisibility(
        isDashboard ? "hide" : "show",
      );
    };

    toggleBubble();
    window.addEventListener("chatwoot:ready", toggleBubble);
    return () => window.removeEventListener("chatwoot:ready", toggleBubble);
  }, [isDashboard]);

  return (
    <>
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
    </>
  );
}
